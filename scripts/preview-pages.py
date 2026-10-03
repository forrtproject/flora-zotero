#!/usr/bin/env python3
"""Render the GitHub Pages site locally, without Ruby.

Jekyll is not installable in every dev environment, and the Pages workflow is
the only place the real build runs. This script does enough of it — assemble the
same page set the workflow assembles, resolve the Liquid the layout actually
uses, convert the markdown — to eyeball the result in a browser before pushing.

It is a preview, not a reimplementation of Jekyll: anything beyond the subset of
Liquid in docs/_layouts/default.html is out of scope.

Usage:  python scripts/preview-pages.py [--out DIR]
        then open DIR/index.html
"""

from __future__ import annotations

import argparse
import html
import re
import shutil
import sys
import tempfile
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"


# ─────────────────────────── page assembly ───────────────────────────
# Delegated to scripts/build_docs.py, the same module the Pages workflow runs,
# so the preview is built from exactly the content CI publishes.

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_docs  # noqa: E402


def assemble(work: Path) -> dict[str, tuple[dict, str]]:
    """Build the content tree into `work` and read it back as pages."""
    build_docs.build(work)
    pages: dict[str, tuple[dict, str]] = {}
    for md in sorted(work.rglob("*.md")):
        rel = md.relative_to(work)
        name = "index" if rel.as_posix() == "index.md" else rel.parent.as_posix()
        fm, body = split_front_matter(md.read_text(encoding="utf-8"))
        pages[name] = (fm, body)
    return pages


def split_front_matter(text: str) -> tuple[dict, str]:
    if not text.startswith("---"):
        return {}, text
    _, raw, body = text.split("---", 2)
    return yaml.safe_load(raw) or {}, body.lstrip("\n")


# ─────────────────────────── markdown ───────────────────────────
# Just enough GFM for a visual check: headings, lists, tables, fenced code,
# emphasis, links, images, and raw HTML blocks passed through untouched.

INLINE_CODE = re.compile(r"`([^`]+)`")
BOLD = re.compile(r"\*\*(.+?)\*\*")
ITALIC = re.compile(r"(?<![\*\w])\*([^\*\n]+)\*(?!\*)")
LINK = re.compile(r"\[([^\]]+)\]\(([^)\s]+)\)")
IMAGE = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)\)")
AUTOLINK = re.compile(r"<((?:https?|mailto):[^>\s]+)>")


def inline(text: str) -> str:
    text = IMAGE.sub(r'<img src="\2" alt="\1">', text)
    text = LINK.sub(r'<a href="\2">\1</a>', text)
    # <https://…> autolinks, which kramdown expands and a browser would
    # otherwise swallow as an unknown tag.
    text = AUTOLINK.sub(r'<a href="\1">\1</a>', text)
    text = BOLD.sub(r"<strong>\1</strong>", text)
    text = ITALIC.sub(r"<em>\1</em>", text)
    text = INLINE_CODE.sub(lambda m: f"<code>{html.escape(m.group(1))}</code>", text)
    return text


def slug(text: str) -> str:
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"[^\w\s-]", "", text.lower())
    return re.sub(r"[\s_]+", "-", text).strip("-")


def markdown(src: str) -> str:
    lines = src.split("\n")
    out: list[str] = []
    i = 0
    list_stack: list[str] = []

    def close_lists(depth: int = 0) -> None:
        while len(list_stack) > depth:
            out.append(f"</{list_stack.pop()}>")

    while i < len(lines):
        line = lines[i]

        # Fenced code
        if line.lstrip().startswith("```"):
            close_lists()
            i += 1
            buf = []
            while i < len(lines) and not lines[i].lstrip().startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1
            out.append(f"<pre><code>{html.escape(chr(10).join(buf))}</code></pre>")
            continue

        # Raw HTML: kramdown passes a block-level element through untouched,
        # content and all (parse_block_html is off by default), so consume the
        # whole element rather than one line at a time.
        m = re.match(r"\s*<([a-zA-Z][\w-]*)", line)
        if m or line.lstrip().startswith("<!--"):
            close_lists()
            if not m:  # comment
                while i < len(lines):
                    out.append(lines[i])
                    if "-->" in lines[i]:
                        break
                    i += 1
                i += 1
                continue
            tag = m.group(1)
            opener = re.compile(rf"<{tag}\b", re.I)
            closer = re.compile(rf"</{tag}\s*>", re.I)
            depth = 0
            while i < len(lines):
                out.append(lines[i])
                depth += len(opener.findall(lines[i])) - len(closer.findall(lines[i]))
                i += 1
                # Void and self-closed elements never reach a closing tag.
                if depth <= 0:
                    break
            continue

        stripped = line.strip()

        if not stripped:
            close_lists()
            i += 1
            continue

        # Headings
        m = re.match(r"(#{1,6})\s+(.*)", stripped)
        if m:
            close_lists()
            level = len(m.group(1))
            body = inline(m.group(2))
            out.append(f'<h{level} id="{slug(m.group(2))}">{body}</h{level}>')
            i += 1
            continue

        if re.match(r"^(---|\*\*\*|___)$", stripped):
            close_lists()
            out.append("<hr>")
            i += 1
            continue

        # Blockquote
        if stripped.startswith(">"):
            close_lists()
            buf = []
            while i < len(lines) and lines[i].strip().startswith(">"):
                buf.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            out.append(f"<blockquote>{markdown(chr(10).join(buf))}</blockquote>")
            continue

        # Tables
        if "|" in stripped and i + 1 < len(lines) and re.match(r"^[\s|:-]+$", lines[i + 1].strip()):
            close_lists()
            header = [c.strip() for c in stripped.strip("|").split("|")]
            i += 2
            rows = []
            while i < len(lines) and "|" in lines[i]:
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            head = "".join(f"<th>{inline(c)}</th>" for c in header)
            body = "".join(
                "<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>"
                for r in rows
            )
            out.append(f"<table><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table>")
            continue

        # Lists
        m = re.match(r"^(\s*)([-*+]|\d+\.)\s+(.*)", line)
        if m:
            indent, marker, body = m.groups()
            tag = "ul" if marker in "-*+" else "ol"
            depth = len(indent) // 2 + 1
            if depth > len(list_stack):
                out.append(f"<{tag}>")
                list_stack.append(tag)
            else:
                close_lists(depth)
                if not list_stack:
                    out.append(f"<{tag}>")
                    list_stack.append(tag)
            out.append(f"<li>{inline(body)}</li>")
            i += 1
            continue

        # Paragraph
        close_lists()
        buf = [stripped]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(
            r"\s*(#{1,6}\s|[-*+]\s|\d+\.\s|<|```)", lines[i]
        ):
            buf.append(lines[i].strip())
            i += 1
        out.append(f"<p>{inline(' '.join(buf))}</p>")

    close_lists()
    return "\n".join(out)


# ─────────────────────────── liquid subset ───────────────────────────

def resolve(expr: str, scope: dict) -> str:
    expr = expr.strip()
    if "|" in expr:
        head, *filters = [p.strip() for p in expr.split("|")]
        value = resolve(head, scope)
        for f in filters:
            m = re.match(r"default:\s*(.+)", f)
            if m and not value:
                value = resolve(m.group(1), scope)
        return value
    if expr.startswith(('"', "'")):
        return expr.strip("\"'")
    cursor = scope
    for part in expr.split("."):
        if isinstance(cursor, dict) and part in cursor:
            cursor = cursor[part]
        else:
            return ""
    return "" if cursor is None else str(cursor)


def render_liquid(template: str, scope: dict) -> str:
    """Handles {{ var | default: x }}, {% if %}/{% elsif %}/{% else %} and
    {% for x in list %} — the only tags docs/_layouts/default.html uses."""

    def for_loops(text: str) -> str:
        opener = re.compile(r"\{%\s*for\s+(\w+)\s+in\s+([\w.]+)\s*%\}")
        tag = re.compile(r"\{%\s*(for|endfor)\b.*?%\}", re.S)
        while True:
            m = opener.search(text)
            if not m:
                return text
            # The sidebar nests a loop inside a loop, so find this `for`'s own
            # `endfor` by depth rather than taking the first one.
            depth, pos = 1, m.end()
            while depth:
                t = tag.search(text, pos)
                if not t:
                    raise ValueError("unbalanced for")
                depth += 1 if t.group(1) == "for" else -1
                pos = t.end()
            body = text[m.end(): t.start()]

            var, listexpr = m.group(1), m.group(2)
            cursor = scope
            for part in listexpr.split("."):
                cursor = cursor.get(part, []) if isinstance(cursor, dict) else []
            chunks = []
            for entry in cursor or []:
                inner = dict(scope)
                inner[var] = entry
                chunks.append(render_liquid(body, inner))
            text = text[: m.start()] + "".join(chunks) + text[pos:]

    def truth(cond: str) -> bool:
        cond = cond.strip()
        # Boolean joins bind looser than the comparisons, so split them first.
        if " and " in cond:
            return all(truth(p) for p in cond.split(" and "))
        if " or " in cond:
            return any(truth(p) for p in cond.split(" or "))
        for op, fn in (
            (" contains ", lambda a, b: b in a),
            ("==", lambda a, b: a == b),
            ("!=", lambda a, b: a != b),
        ):
            if op in cond:
                left, right = cond.split(op, 1)
                return fn(resolve(left, scope), resolve(right, scope))
        return bool(resolve(cond, scope))

    def conditionals(text: str) -> str:
        pattern = re.compile(r"\{%\s*if\s+(.*?)\s*%\}", re.S)
        while True:
            m = pattern.search(text)
            if not m:
                return text
            depth, pos = 1, m.end()
            tag = re.compile(r"\{%\s*(if|elsif|else|endif)\b(.*?)%\}", re.S)
            branches, current, cond = [], [], m.group(1)
            while depth:
                t = tag.search(text, pos)
                if not t:
                    raise ValueError("unbalanced if")
                current.append(text[pos:t.start()])
                kind = t.group(1)
                if kind == "if":
                    depth += 1
                    current.append(t.group(0))
                elif depth > 1:
                    if kind == "endif":
                        depth -= 1
                    current.append(t.group(0))
                else:
                    branches.append((cond, "".join(current)))
                    current = []
                    if kind == "endif":
                        depth = 0
                    elif kind == "else":
                        cond = None
                    else:
                        cond = t.group(2).strip()
                pos = t.end()
            chosen = ""
            for c, body in branches:
                if c is None or truth(c):
                    chosen = body
                    break
            text = text[: m.start()] + conditionals(chosen) + text[pos:]

    text = for_loops(template)
    text = conditionals(text)
    return re.sub(r"\{\{(.*?)\}\}", lambda m: resolve(m.group(1), scope), text)


# ─────────────────────────── build ───────────────────────────

def localize_links(html_text: str) -> str:
    """Point this page's internal links at files a browser can open.

    A real host serves `foo/` as `foo/index.html` and `./` as `./index.html`;
    file:// shows a directory listing instead, so the links are rewritten. This
    is the only way the preview's markup differs from what Jekyll ships.
    """
    return re.sub(
        r'href="(\.{1,2}(?:/[\w.-]+)*/)(#[^"]*)?"',
        lambda m: f'href="{m.group(1)}index.html{m.group(2) or ""}"',
        html_text,
    )



def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(ROOT / "docs" / ".preview"))
    args = ap.parse_args()
    out = Path(args.out)
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)

    site = yaml.safe_load((DOCS / "_config.yml").read_text(encoding="utf-8"))
    # Jekyll exposes docs/_data/*.yml as site.data.<name>; the layout reads the
    # docs nav from there.
    site["data"] = {
        f.stem: yaml.safe_load(f.read_text(encoding="utf-8"))
        for f in (DOCS / "_data").glob("*.yml")
    }
    layout = (DOCS / "_layouts" / "default.html").read_text(encoding="utf-8")

    work = Path(tempfile.mkdtemp(prefix="flora-pages-"))
    for name, (fm, body) in assemble(work).items():
        # Every page but the home page is built as <name>/index.md, so its URL
        # is a directory. Mirror that here.
        nested = name != "index"
        url = f"/{name}/" if nested else "/"
        page = dict(fm)
        page["url"] = url
        # file:// has no server to rewrite /flora-zotero or to serve a
        # directory's index, so asset paths are made relative to this page's
        # depth and page URLs are pointed straight at the file.
        depth = name.count("/") + 1 if nested else 0
        scope_site = dict(site, baseurl="/".join([".."] * depth) if depth else ".")
        content = render_liquid(body, {"site": scope_site, "page": page})
        content = markdown(content)
        rendered = render_liquid(
            layout, {"site": scope_site, "page": page, "content": content}
        )
        rendered = localize_links(rendered)

        target = out / name / "index.html" if nested else out / "index.html"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(rendered, encoding="utf-8")
        print(f"wrote {target}")

    shutil.rmtree(work, ignore_errors=True)

    for asset in ("assets", "logo", "media"):
        src = DOCS / asset
        if src.is_dir():
            shutil.copytree(src, out / asset, dirs_exist_ok=True)
    # The layout points the favicon at assets/favicon.png, which the workflow
    # copies out of the addon; do the same so the preview is not missing it.
    favicon = ROOT / "addon" / "content" / "icons" / "favicon.png"
    if favicon.is_file():
        (out / "assets").mkdir(exist_ok=True)
        shutil.copy(favicon, out / "assets" / "favicon.png")
    print(f"\nOpen {out / 'index.html'}")


if __name__ == "__main__":
    main()

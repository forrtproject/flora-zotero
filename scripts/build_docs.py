#!/usr/bin/env python3
"""Assemble the GitHub Pages content tree.

The site shell (config, layout, stylesheet) is committed under docs/. This
script produces the pages that are derived from files elsewhere in the repo:

  docs/Website.md            -> docs/index.md                     (home)
  README.md                  -> docs/documentation/<slug>/index.md (one per
                                task, per docs/_data/docs_nav.yml)
  Contributing.md            -> docs/contributing/index.md
  .github/RELEASE_GUIDE.md   -> docs/release-guide/index.md

README.md stays the single source of truth for the documentation: it is sliced
by heading rather than copied whole, so a reader lands on one task instead of a
three-hundred-line page. The slicing is checked both ways — every heading named
in the manifest must exist, and every heading in the README must be either
placed on a page or listed under `excluded` — so neither file can drift without
failing the build.

Run from the repo root:  python3 scripts/build_docs.py
"""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
REPO_URL = "https://github.com/forrtproject/flora-zotero"

HEADING = re.compile(r"^(#{1,6})\s+(.*?)\s*#*$")
# Links to repo files the site does not publish, retargeted at GitHub.
REPO_LINK = re.compile(r"\]\((docs|\.github|src|addon|test|scripts)/")


class BuildError(RuntimeError):
    pass


# ───────────────────────────── markdown sections ─────────────────────────────

@dataclass
class Section:
    level: int
    title: str
    lines: list[str] = field(default_factory=list)
    children: list["Section"] = field(default_factory=list)

    def body(self) -> list[str]:
        lines = list(self.lines)
        while lines and not lines[0].strip():
            lines.pop(0)
        return lines

    def render(self, shift: int) -> list[str]:
        """Emit this section and its children, with headings shifted."""
        out = ["#" * (self.level + shift) + " " + self.title, ""]
        out += self.body()
        for child in self.children:
            out += child.render(shift)
        return out

    def render_unwrapped(self) -> list[str]:
        """Emit the contents without this section's own heading.

        Used when a page is built from a single section: the layout already
        prints the page title, so repeating it as an h2 just says it twice.
        """
        out = self.body()
        for child in self.children:
            out += child.render(shift=2 - child.level)
        return out

    def walk(self):
        yield self
        for child in self.children:
            yield from child.walk()


def parse_sections(text: str) -> tuple[list[str], list[Section]]:
    """Split markdown into (lead-in lines before the first heading, sections).

    Fenced code is tracked so that `#` comments inside a block are not mistaken
    for headings.
    """
    preamble: list[str] = []
    roots: list[Section] = []
    stack: list[Section] = []
    fenced = False

    for line in text.split("\n"):
        if line.lstrip().startswith("```"):
            fenced = not fenced

        match = None if fenced else HEADING.match(line)
        if not match:
            (stack[-1].lines if stack else preamble).append(line)
            continue

        section = Section(level=len(match.group(1)), title=match.group(2))
        while stack and stack[-1].level >= section.level:
            stack.pop()
        (stack[-1].children if stack else roots).append(section)
        stack.append(section)

    return preamble, roots


def strip_trailing_blanks(lines: list[str]) -> list[str]:
    while lines and not lines[-1].strip():
        lines.pop()
    return lines


# ───────────────────────────── page emission ─────────────────────────────

def front_matter(**fields) -> str:
    out = ["---"]
    for key, value in fields.items():
        if value is None:
            continue
        if isinstance(value, str) and ("\n" in value or len(value) > 72):
            out.append(f"{key}: >-")
            out += ["  " + part for part in value.split("\n")]
        else:
            out.append(f"{key}: {value}")
    out.append("---")
    out.append("")
    return "\n".join(out) + "\n"


def repo_links(text: str) -> str:
    return REPO_LINK.sub(rf"]({REPO_URL}/blob/main/\1/", text)


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def strip_leading_heading(text: str, heading: str) -> str:
    """Drop the source's own title line; the layout prints the title."""
    lines = text.split("\n")
    for i, line in enumerate(lines):
        if line.strip() == heading:
            return "\n".join(lines[i + 1:]).lstrip("\n")
    raise BuildError(f"expected a {heading!r} heading to strip")


# ───────────────────────────── the build ─────────────────────────────

def build(out_dir: Path) -> list[Path]:
    written: list[Path] = []
    nav = yaml.safe_load((DOCS / "_data" / "docs_nav.yml").read_text(encoding="utf-8"))

    # ── Home: already carries its own front matter and landing markup ──
    home = (DOCS / "Website.md").read_text(encoding="utf-8")
    write(out_dir / "index.md", home)
    written.append(out_dir / "index.md")

    # ── Documentation, sliced out of the README ──
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    # The centred blocks are the logo and the shields badges; the site renders
    # that information in its own chrome.
    readme = re.sub(r'^<p align="center">.*?^</p>\n', "", readme, flags=re.S | re.M)
    preamble, roots = parse_sections(readme)

    by_title: dict[str, Section] = {}
    for root in roots:
        for section in root.walk():
            if section.title in by_title:
                raise BuildError(f"duplicate README heading: {section.title!r}")
            by_title[section.title] = section

    placed: set[str] = set()
    pages: list[dict] = []

    for group in nav["groups"]:
        for page in group["pages"]:
            chunks: list[str] = []
            single = len(page["sections"]) == 1
            for title in page["sections"]:
                section = by_title.get(title)
                if section is None:
                    raise BuildError(
                        f"docs_nav.yml names a heading that is not in README.md: {title!r}"
                    )
                # Whatever level the chosen headings sit at in the README, they
                # become this page's top-level sections — unless the page is
                # built from one section, which the page title already names.
                if single:
                    chunks += section.render_unwrapped()
                else:
                    chunks += section.render(shift=2 - section.level)
                for descendant in section.walk():
                    placed.add(descendant.title)

            body = repo_links("\n".join(strip_trailing_blanks(chunks)))
            target = out_dir / "documentation" / page["slug"] / "index.md"
            write(
                target,
                front_matter(
                    layout="default",
                    section="docs",
                    title=page["title"],
                    slug=page["slug"],
                    source="README.md",
                    lede=" ".join(page["lede"].split()),
                )
                + body
                + "\n",
            )
            written.append(target)
            pages.append(page)

    # Nothing may be dropped silently.
    unplaced = [
        s.title
        for root in roots
        for s in root.walk()
        if s.title not in placed and s.title not in nav["excluded"]
    ]
    if unplaced:
        raise BuildError(
            "README headings are neither placed on a docs page nor listed under "
            "`excluded` in docs/_data/docs_nav.yml: " + ", ".join(repr(t) for t in unplaced)
        )
    stale = [t for t in nav["excluded"] if t not in by_title]
    if stale:
        raise BuildError(
            "docs_nav.yml excludes headings that no longer exist in README.md: "
            + ", ".join(repr(t) for t in stale)
        )

    # ── Documentation index: the README's own opening, then the sections ──
    index = out_dir / "documentation" / "index.md"
    write(
        index,
        front_matter(
            layout="default",
            section="docs",
            title="Documentation",
            slug="index",
            source="README.md",
            lede=(
                "Install the plugin, run your first check, and understand what "
                "it adds to your library."
            ),
        )
        + repo_links("\n".join(strip_trailing_blanks(list(preamble)))).lstrip("\n")
        + "\n",
    )
    written.append(index)

    # ── Standalone pages ──
    contributing = (ROOT / "Contributing.md").read_text(encoding="utf-8")
    target = out_dir / "contributing" / "index.md"
    write(
        target,
        front_matter(
            layout="default",
            title="Contributing",
            source="Contributing.md",
            lede=(
                "How to report a bug, propose a change, or help with code, docs, "
                "testing and data curation."
            ),
        )
        + repo_links(strip_leading_heading(contributing, "## Contributing")),
    )
    written.append(target)

    guide = (ROOT / ".github" / "RELEASE_GUIDE.md").read_text(encoding="utf-8")
    target = out_dir / "release-guide" / "index.md"
    write(
        target,
        front_matter(
            layout="default",
            title="Release Guide",
            source=".github/RELEASE_GUIDE.md",
            lede=(
                "For maintainers: how builds are produced, and how to tag and "
                "publish a new version of the plugin."
            ),
        )
        + repo_links(strip_leading_heading(guide, "# Release Guide")),
    )
    written.append(target)

    return written


def main() -> int:
    out_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else DOCS
    try:
        written = build(out_dir)
    except BuildError as err:
        print(f"build-docs: {err}", file=sys.stderr)
        return 1
    for path in written:
        print(f"wrote {path.relative_to(ROOT) if ROOT in path.parents else path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env bash
# Build the published site with the real Jekyll, matching GitHub Pages.
#
#   scripts/build-site.sh [OUT_DIR] [BASEURL]
#
# OUT_DIR defaults to _site, BASEURL to the value in docs/_config.yml.
# Pass an empty BASEURL to serve the site from a host root instead of from
# the /flora-zotero sub-path GitHub Pages uses.
#
# Needs Docker. scripts/preview-pages.py is a fast approximation for iterating
# on layout; it is not a Jekyll substitute and must not be what gets deployed.
set -euo pipefail

OUT_DIR="${1:-_site}"
BASEURL="${2-__keep__}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

python scripts/build_docs.py

# The bind mount is read-only and Docker Desktop on Windows refuses writes to
# it, so the build happens on a copy inside the container and comes back as a
# tar on stdout. Jekyll's own output goes to stderr to keep stdout clean.
PREP="cp -r /src /tmp/src"
if [ "$BASEURL" != "__keep__" ]; then
  if [ -z "$BASEURL" ]; then
    PREP="$PREP && sed -i /^baseurl:/d /tmp/src/_config.yml"
  else
    PREP="$PREP && sed -i s@^baseurl:.*@baseurl:\ $BASEURL@ /tmp/src/_config.yml"
  fi
fi

# Start clean, so a file left behind by an earlier build is not served.
python -c "import os,shutil,sys; d=sys.argv[1]; os.makedirs(d, exist_ok=True); [shutil.rmtree(e.path) if e.is_dir() else os.remove(e.path) for e in os.scandir(d)]" "$OUT_DIR"
TAR="$(mktemp)"
LOG="$(mktemp)"
trap 'rm -f "$TAR" "$LOG"' EXIT

docker run --rm -v "/$ROOT/docs:/src:ro" jekyll/jekyll:4.2.2 \
  sh -c "$PREP && cd /tmp/src && jekyll build -d /tmp/out --trace 1>&2 && cd /tmp/out && tar cf - ." \
  > "$TAR" 2> "$LOG"

if grep -qiE '^\s*(error|warn)' "$LOG"; then
  echo "Jekyll reported problems:" >&2
  cat "$LOG" >&2
  exit 1
fi

tar xf "$TAR" -C "$OUT_DIR"
echo "Built $(find "$OUT_DIR" -name '*.html' | wc -l | tr -d ' ') pages into $OUT_DIR"

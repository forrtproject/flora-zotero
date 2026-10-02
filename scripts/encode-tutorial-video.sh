#!/bin/bash

# Converts a raw screen recording (e.g. a QuickTime .mov) into the web-ready
# tutorial video shown on the website homepage (docs/Website.md).
#
# Why: .mov recordings are often HEVC, which Chrome and Firefox cannot play,
# and are usually too big for GitHub (files over 100 MB are rejected on push).
# The output is H.264 video + AAC audio in an MP4 that every browser plays,
# with the audio kept, plus a poster image shown before playback starts.
#
# Usage: ./scripts/encode-tutorial-video.sh "path/to/recording.mov" [crf]
#   crf: quality, 18 (best/largest) to 32 (smallest). Default 26.
# Requires ffmpeg (https://ffmpeg.org/download.html) on your PATH.

set -euo pipefail

INPUT="${1:-}"
CRF="${2:-26}"
OUT_DIR="docs/media"
VIDEO="$OUT_DIR/flora-zotero-tutorial.mp4"
POSTER="$OUT_DIR/flora-zotero-tutorial-poster.jpg"

if [ -z "$INPUT" ] || [ ! -f "$INPUT" ]; then
    echo "❌ ERROR: input video not found: '$INPUT'"
    echo "Usage: $0 \"path/to/recording.mov\" [crf]"
    exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
    echo "❌ ERROR: ffmpeg not found on PATH"
    exit 1
fi

if [ ! -f "docs/Website.md" ]; then
    echo "❌ ERROR: run this script from the plugin root directory"
    exit 1
fi

mkdir -p "$OUT_DIR"

echo "Encoding $INPUT -> $VIDEO (crf $CRF)..."
# -map 0:a:0? keeps the first audio track (if any) and re-encodes it to AAC
# -vf scale caps the width at 1920 px, -fpsmax caps the frame rate at 30
# +faststart lets the browser start playing before the whole file has loaded
ffmpeg -hide_banner -loglevel error -stats -y -i "$INPUT" \
    -map 0:v:0 -map "0:a:0?" \
    -c:v libx264 -preset slow -crf "$CRF" -pix_fmt yuv420p -profile:v high \
    -vf "scale='min(1920,iw)':-2" -fpsmax 30 \
    -c:a aac -b:a 128k -ac 2 \
    -movflags +faststart \
    "$VIDEO"

echo "Extracting poster frame -> $POSTER..."
ffmpeg -hide_banner -loglevel error -y -ss 3 -i "$VIDEO" -frames:v 1 -q:v 3 "$POSTER"

SIZE_MB=$(( $(wc -c < "$VIDEO") / 1024 / 1024 ))
echo ""
echo "✓ Done: $VIDEO (${SIZE_MB} MB)"
if ffprobe -v error -select_streams a -show_entries stream=codec_name -of csv=p=0 "$VIDEO" | grep -q .; then
    echo "✓ Audio track included"
else
    echo "⚠️ No audio track found in the input"
fi
if [ "$SIZE_MB" -ge 90 ]; then
    echo "⚠️ Too large for GitHub (100 MB limit). Re-run with a higher crf, e.g.: $0 \"$INPUT\" 30"
    exit 1
elif [ "$SIZE_MB" -ge 50 ]; then
    echo "⚠️ Over 50 MB: GitHub will warn on push. Consider a higher crf, e.g. 28-30."
fi

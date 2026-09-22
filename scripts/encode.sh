#!/usr/bin/env bash
# Normalise un extrait pour le web : MP4 h264 muet, 720p max, 8 s max, + poster JPG.
# Usage : scripts/encode.sh input.mov out/nom [start_seconds]
set -euo pipefail
in="$1"; out="$2"; start="${3:-0}"
ffmpeg -y -ss "$start" -t 8 -i "$in" -an \
  -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart \
  "$out.mp4"
ffmpeg -y -ss "$start" -i "$in" -frames:v 1 -vf "scale='min(1280,iw)':-2" -q:v 3 "$out.jpg"
echo "→ $out.mp4 / $out.jpg  (à uploader sur le bucket, puis renseigner media/poster dans examples.json)"

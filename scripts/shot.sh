#!/usr/bin/env bash
# Capture full-page screenshots of the homepage at several widths.
#
# Motion reveals sections on scroll (initial opacity: 0), and headless Chrome
# never scrolls, so sections below the fold render blank. We serve the page
# through a tiny local proxy that appends a stylesheet forcing the final state.
#
# Usage: scripts/shot.sh <label>   e.g. scripts/shot.sh 01-theme-tokens
set -euo pipefail

LABEL="${1:?usage: shot.sh <label>}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TARGET="${TARGET_URL:-http://localhost:3000/}"
OUT="docs/screenshots"
PROXY_PORT="${PROXY_PORT:-3999}"

mkdir -p "$OUT"

python3 - "$TARGET" "$PROXY_PORT" <<'PY' &
import sys, urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer

TARGET, PORT = sys.argv[1], int(sys.argv[2])

# Neutralise motion's pre-reveal state and any transform offsets.
FORCE = b"""<style id="__shot_force">
*, *::before, *::after {
  opacity: 1 !important;
  transform: none !important;
  visibility: visible !important;
  animation: none !important;
  transition: none !important;
}
</style>"""

class H(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            r = urllib.request.urlopen(TARGET + self.path.lstrip("/"), timeout=30)
            body, ctype = r.read(), r.headers.get("Content-Type", "")
        except Exception as e:
            self.send_error(502, str(e)); return
        if "text/html" in ctype:
            body = body.replace(b"</head>", FORCE + b"</head>", 1)
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *a):
        pass

HTTPServer(("127.0.0.1", PORT), H).serve_forever()
PY
PROXY_PID=$!
trap 'kill $PROXY_PID 2>/dev/null || true' EXIT
sleep 2

for W in 1440 768 390; do
  case "$W" in
    1440) H=6000 ;;
    768)  H=8000 ;;
    390)  H=11000 ;;
  esac
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --window-size="$W,$H" \
    --screenshot="$OUT/${LABEL}-${W}.png" \
    --virtual-time-budget=12000 \
    "http://127.0.0.1:${PROXY_PORT}/" 2>/dev/null
  echo "  $OUT/${LABEL}-${W}.png"
done

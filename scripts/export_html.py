#!/usr/bin/env python3
"""Export the presentation as a single offline HTML file; no dependencies."""
import base64
import mimetypes
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent


def data_uri(relative_path):
    path = ROOT / relative_path
    mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
    encoded = base64.b64encode(path.read_bytes()).decode('ascii')
    return f'data:{mime};base64,{encoded}'


def export():
    html = (ROOT / 'index.html').read_text()
    css = '\n'.join((ROOT / name).read_text() for name in ['style.css', 'film.css', 'ending.css'])
    css = re.sub(r"url\(['\"]?(assets/[^)'\"]+)['\"]?\)",
                 lambda match: f'url("{data_uri(match[1])}")', css)
    html = re.sub(r'  <link rel="preload" as="image"[^>]+>\n', '', html)
    html = html.replace('<link rel="stylesheet" href="style.css">', '<style>\n' + css + '\n</style>')
    html = html.replace('  <link rel="stylesheet" href="film.css">\n', '')
    html = html.replace('  <link rel="stylesheet" href="ending.css">\n', '')
    html = html.replace('  <script src="script.js" defer></script>\n', '')
    html = re.sub(r'src="(assets/[^"]+)"',
                  lambda match: f'src="{data_uri(match[1])}"', html)
    html = html.replace('  <script src="assets/vendor/three.min.js" defer></script>\n', '')
    html = html.replace('  <script src="glasses3d.js" defer></script>\n', '')
    script = '\n'.join((ROOT / name).read_text() for name in ['script.js', 'assets/vendor/three.min.js', 'glasses3d.js']).replace('</script', '<\\/script')
    license_text = (ROOT / 'assets/OFL.txt').read_text()
    html = html.replace('</body>', '<script>\n' + script + '\n</script>\n<!-- Bundled font license:\n' + license_text + '\n-->\n</body>')
    output = ROOT / 'COOK.html'
    output.write_text(html)
    print(f'Exported {output.name}: {output.stat().st_size:,} bytes; all artwork, fonts, styles, and scripts embedded.')


if __name__ == '__main__':
    export()

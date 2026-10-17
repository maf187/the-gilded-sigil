"""Static Jekyll/app-boundary checks; does not pretend to render a browser."""
from pathlib import Path
from html.parser import HTMLParser
import re
root=Path(__file__).resolve().parent.parent
html=(root/'forge.html').read_text(); css=(root/'forge.css').read_text(); js=(root/'forge.js').read_text()
assert html.startswith('---\nlayout: default\n')
assert 'permalink: /forge.html' in html
assert "{{ '/forge.css' | relative_url }}" in html
assert "{{ '/forge.js' | relative_url }}" in html
assert '/app.js' not in html
assert all(x not in html for x in ['<main','<header','<footer','<h1','DESIGN PREVIEW','preview-badge','site-header'])
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.labels=[];self.controls=[]
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if 'id' in attrs:self.ids.append(attrs['id'])
  if tag=='label':self.labels.append(attrs.get('for'))
  if tag in ('input','textarea'):self.controls.append(attrs.get('id'))
p=Parser();p.feed(html)
assert len(p.ids)==len(set(p.ids)), 'Duplicate IDs'
assert set(p.controls)<=set(p.labels), 'Unlabelled input'
assert all(id in p.ids for id in re.findall(r"\$\('([^']+)'\)",js)), 'Missing JS target'
assert 'document.querySelector' not in js
assert "document.getElementById('forge-app')" in js
assert '@import' not in css and ':root' not in css
assert css.count('{') == css.count('}'), 'Unbalanced CSS blocks'
first_rule=re.sub(r'/\*.*?\*/','',css,flags=re.S).strip().split('}',1)[0]
assert first_rule.startswith('#forge-app {'), 'Invalid app variable selector'
assert all('--'+name+':' in first_rule for name in ['bg','panel','gold','cream','muted','border']), 'Missing theme variables'
assert not re.search(r'https?://|fonts.googleapis|wght@',css), 'Leaked font import fragments'
# Every non-media selector is rooted in the app, except its conditional parent width.
clean=re.sub(r'/\*.*?\*/','',css,flags=re.S)
for text in re.findall(r'(?:^|[{}])([^{}]+)\{',clean):
 text=text.strip()
 if text.startswith('@media'):continue
 for selector in text.split(','):
  selector=selector.strip()
  assert selector.startswith('#forge-app') or selector=='body:has(#forge-app) > main', selector
assert 'Cinzel Decorative' in css and 'Cormorant Garamond' in css
assert '#d4af37' in css and '#b89628' in css
assert not any(v in css for v in ['#d3b36b','#12150f','Arial'])
print('PASS Jekyll front matter, relative assets, unique IDs, labels, JS targets, CSS/JS isolation, original theme')

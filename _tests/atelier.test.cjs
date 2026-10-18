const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom'),postcss=require('postcss'),{Liquid}=require('liquidjs'),yaml=require('js-yaml');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const raw=read('atelier.html'),m=raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/),meta=yaml.load(m[1]);
 assert.equal(meta.layout,'default');assert.equal(meta.permalink,'/atelier/');
 const engine=new Liquid({strictFilters:true});engine.registerFilter('relative_url',v=>'/base'+v);
 const rendered=await engine.parseAndRender(m[2],{}),d=new JSDOM(rendered).window.document;
 assert.equal(d.querySelector('#atelier-page-title').textContent,'The Atelier');assert.equal(d.querySelector('#atelier-page-title > span').textContent,'Atelier');
 assert.equal(d.querySelector('link').getAttribute('href'),'/base/atelier.css');assert.equal(d.querySelectorAll('a').length,2);
 for(const a of d.querySelectorAll('a')){assert.ok(a.getAttribute('href').startsWith('/base/'));assert.ok(!a.hasAttribute('target'));}
 assert.equal(d.querySelectorAll('input,form,script,iframe,button').length,0);assert.equal(d.querySelectorAll('main,header,footer,h1').length,0);
 assert.equal(new Set([...d.querySelectorAll('[id]')].map(e=>e.id)).size,d.querySelectorAll('[id]').length);
 assert.ok(d.getElementById(d.querySelector('#atelier-page').getAttribute('aria-labelledby')));assert.equal(d.querySelector('svg').parentElement.getAttribute('aria-hidden'),'true');
 const css=read('atelier.css');postcss.parse(css).walkRules(r=>{for(const s of r.selectors)assert.ok(s.startsWith('#atelier-page')||s==='body:has(#atelier-page) > main',s)});
 for(const s of ['72rem','#d4af37','#e8e2cf','Cinzel Decorative','Cormorant Garamond','text-align: left','max-width: 650px',':focus-visible'])assert.ok(css.includes(s));
 assert.ok(read('articles.html').includes('<h1 id="grimoire-title">The <span>Grimoire</span></h1>'));assert.ok(read('grimoire.css').includes('.grimoire-page #grimoire-title > span { color: var(--gold); }'));
 for(const f of ['index.html','_layouts/default.html']){assert.ok(read(f).includes(`href="{{ '/atelier/' | relative_url }}"`));assert.ok(!read(f).includes('etsy.com'));}
 const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?(e.name==='_tests'?[]:walk(path.join(p,e.name))):[/\.(html|md)$/.test(e.name)?path.join(p,e.name):null].filter(Boolean));
 for(const f of walk(root))assert.ok(!/https?:\/\/[^\s"<>)]*etsy\.com/i.test(fs.readFileSync(f,'utf8')),f);
 for(const f of ['_posts/2026-08-19-the-art-of-the-sigil.md','_posts/2026-08-30-an-incantation-for-wealth-with-warding.md']){const result=await engine.parseAndRender(read(f),{});assert.ok(result.includes('/base/atelier/'));}
 console.log('Atelier front matter, base-path rendering, navigation, accessible static page, scoped CSS, Grimoire title and production Etsy-link checks passed.');
})().catch(e=>{console.error(e);process.exitCode=1});

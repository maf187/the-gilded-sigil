'use strict';
// Execute the real Liquid templates with Jekyll-compatible fixtures, not a Jekyll build.
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {Liquid}=require('liquidjs'),yaml=require('js-yaml'),MarkdownIt=require('markdown-it');
const {JSDOM}=require('jsdom'),postcss=require('postcss');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const md=new MarkdownIt({html:true,typographer:false});
const split=text=>{const m=text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);return m?{meta:yaml.load(m[1]),body:m[2]}:{meta:{},body:text};};
const slug=s=>s.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu,'').trim().replace(/\s+/g,'-');
const posts=fs.readdirSync(path.join(root,'_posts')).filter(f=>f.endsWith('.md')).map(f=>{
 const {meta,body}=split(read('_posts/'+f));const categories=[meta.category||meta.categories||[]].flat();
 const date=new Date(meta.date||f.slice(0,10));const html=md.render(body);const articleSlug=slug(f.slice(11,-3));
 let url=meta.permalink||`/${date.getUTCFullYear()}/${String(date.getUTCMonth()+1).padStart(2,'0')}/${articleSlug}/`;
 if(url.startsWith('https://'))url='/'+url.replace('https://','https:/');
 return {...meta,categories,date,slug:articleSlug,url,content:html,excerpt:html.split(/\n\s*\n/)[0],_source:body};
}).sort((a,b)=>b.date-a.date||b.slug.localeCompare(a.slug));
const categories=items=>{const result={};for(const p of items)for(const c of p.categories)(result[c]??=[]).push(p);return result;};
const engine=new Liquid({root:path.join(root,'_includes'),jekyllInclude:true,strictFilters:true});
engine.registerFilter('relative_url',function(value){return (this.context.get(['site','baseurl'])||'')+value;});
engine.registerFilter('jsonify',JSON.stringify);
engine.registerFilter('date_to_xmlschema',v=>new Date(v).toISOString());
engine.registerFilter('number_of_words',v=>String(v).trim().split(/\s+/).filter(Boolean).length);
// Jekyll exposes Hash#sort as key/value pairs; adapt the plain JS fixture object.
const liquidSort=engine.filters.sort;engine.registerFilter('sort',function(value,...args){return liquidSort.call(this,value&&!Array.isArray(value)&&typeof value==='object'?Object.entries(value):value,...args);});
const context=(items=posts,baseurl='')=>({site:{posts:items,categories:categories(items),baseurl}});
const renderArchive=(items=posts,baseurl='')=>engine.parseAndRender(split(read('articles.html')).body,context(items,baseurl));
const renderPost=(post,items=posts)=>engine.parseAndRender(split(read('_layouts/post.html')).body,{...context(items),page:post,content:post.content});
const dom=html=>new JSDOM(html,{url:'https://thegildedsigil.com/'});
const enhance=d=>{d.window.eval(read('grimoire.js'));};
const interactive=html=>new JSDOM(html,{url:'https://thegildedsigil.com/',runScripts:'outside-only'});
let count=0;const results=[];async function test(name,fn){await fn();count++;results.push(name);console.log('PASS '+name);}
(async()=>{

 await test('Jekyll 3.10 include argument grammar rejects indexed expressions and accepts every production include',()=>{
  // Mirrors FULL_VALID_SYNTAX / VALID_SYNTAX from Jekyll v3.10.0:
  // https://github.com/jekyll/jekyll/blob/v3.10.0/lib/jekyll/tags/include.rb
  // LiquidJS's jekyllInclude option does not enforce this Ruby parser restriction.
  const valid=/^\s*(?:([\w-]+)\s*=\s*(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([\w.-]+))(?=\s|$)\s*)*$/;
  assert.equal(valid.test('category=category[0]'),false);
  assert.equal(valid.test('category=category_name'),true);
  const files=['articles.html',...fs.readdirSync(path.join(root,'_layouts')).filter(f=>f.endsWith('.html')).map(f=>'_layouts/'+f),...fs.readdirSync(path.join(root,'_includes')).filter(f=>f.endsWith('.html')).map(f=>'_includes/'+f)];
  for(const file of files)for(const match of read(file).matchAll(/{%[-]?\s*include\s+\S+(?:\s+([\s\S]*?))?\s*[-]?%}/g))assert.ok(valid.test((match[1]||'').trim()),`${file}: ${match[1]}`);
 });
 const archive=await renderArchive();const a=interactive(archive);const d=a.window.document;
 await test('Real Liquid archive renders every source post, escaped titles, summaries and existing permalinks',()=>{
  const entries=[...d.querySelectorAll('.entry')];assert.equal(entries.length,posts.length);
  entries.forEach((entry,i)=>{assert.equal(entry.querySelector('h3').textContent,posts[i].title);assert.equal(entry.querySelector('h3 a').getAttribute('href'),posts[i].url);if(posts[i].summary)assert.equal(entry.querySelector('.excerpt').textContent,posts[i].summary);});
  assert.equal(d.querySelector('.art-label').textContent,`A growing collection of ${posts.length} writings`);
 });
 await test('No-JS archive retains every link and hides inactive filter UI',()=>{assert.equal(d.querySelector('.filters').hidden,true);assert.equal(d.querySelectorAll('.entry[hidden]').length,0);});
 enhance(a);
 await test('All real category counts and pressed states match filters, including repeat/reset',()=>{
  const expect=categories(posts);for(let repeat=0;repeat<2;repeat++)for(const b of d.querySelectorAll('[data-grimoire-filter]')){b.click();const visible=[...d.querySelectorAll('.entry')].filter(e=>!e.hidden);const n=b.dataset.grimoireFilter==='all'?posts.length:expect[b.dataset.category].length;assert.equal(visible.length,n);assert.equal(Number(b.querySelector('span').textContent),n);assert.equal(d.querySelectorAll('[aria-pressed="true"]').length,1);assert.ok(d.querySelector('.results').textContent.startsWith(`Showing ${n} `));}d.querySelector('[data-grimoire-filter="all"]').click();assert.equal(d.querySelectorAll('.entry[hidden]').length,0);
 });
 await test('Synthetic new posts/categories, multi-category and uncategorized entries grow automatically',async()=>{
  const additions=[{title:'New <Moon> Essay',date:new Date('2026-10-20'),slug:'new-moon',url:'/new-moon/',summary:'New subject',content:'<p>A word.</p>',categories:['moon-lore','tarot']},{title:'Unsorted note',date:new Date('2026-10-19'),slug:'unsorted',url:'/unsorted/',content:'<p>A note.</p>',excerpt:'<p>A note.</p>',categories:[]}];
  const future=interactive(await renderArchive([...additions,...posts]));enhance(future);const doc=future.window.document;
  assert.equal(doc.querySelectorAll('.entry').length,posts.length+2);assert.ok(doc.querySelector('.art-label').textContent.includes(String(posts.length+2)));
  const moon=doc.querySelector('[data-category="moon-lore"]');assert.ok(moon);moon.click();assert.equal(doc.querySelectorAll('.entry:not([hidden])').length,1);
  const tarot=doc.querySelector('[data-category="tarot"]');assert.equal(Number(tarot.querySelector('span').textContent),categories(posts).tarot.length+1);
  doc.querySelector('[data-grimoire-filter="uncategorized"]').click();assert.equal(doc.querySelectorAll('.entry:not([hidden])').length,1);
  assert.equal(doc.querySelector('.feature-sample h2').textContent,additions[0].title);
  assert.equal(doc.querySelectorAll('.series-links a').length,posts.filter(p=>p.categories.includes('tarot')&&p.title.includes('10 Different Ways to Interpret It')).length);
 });
 await test('Empty archive and single-post counts render correctly',async()=>{const empty=dom(await renderArchive([])).window.document;assert.equal(empty.querySelectorAll('.entry').length,0);assert.ok(empty.querySelector('.empty-archive'));assert.equal(empty.querySelector('.entrances'),null);const single=dom(await renderArchive([posts[0]])).window.document;assert.equal(single.querySelector('.results').textContent,'Showing 1 writing');});
 await test('All shared-layout articles preserve rendered prose, links, headings, embeds and checklists before enhancement',async()=>{
  for(const p of posts){const output=dom(await renderPost(p));const actual=output.window.document.querySelector('.article-body');const expected=dom('<article>'+p.content+'</article>').window.document.querySelector('article');assert.equal(actual.innerHTML.trim(),expected.innerHTML.trim(),p.title);assert.equal(output.window.document.querySelector('.reading-header h1').textContent,p.title);assert.equal(output.window.document.querySelector('.contents').hidden,true);assert.ok(output.window.document.querySelector('.reading-meta').textContent.includes('min read'));}
 });
 await test('Every article gets appropriate contents without changing text or content links',async()=>{
  for(const p of posts){const page=interactive(await renderPost(p));const doc=page.window.document;const body=doc.querySelector('.article-body');const originalText=body.textContent;const originalLinks=[...body.querySelectorAll('a')].map(a=>a.getAttribute('href'));enhance(page);assert.equal(body.textContent,originalText);assert.deepEqual([...body.querySelectorAll('a')].map(a=>a.getAttribute('href')),originalLinks);const headings=[...body.querySelectorAll('h2,h3')];if(headings.length>=2){const links=[...doc.querySelectorAll('.contents a')];assert.equal(links.length,headings.length);links.forEach((a,i)=>assert.equal(doc.getElementById(decodeURIComponent(a.hash.slice(1))),headings[i]));}else assert.equal(doc.querySelector('.contents').hidden,true);assert.equal(body.querySelectorAll('input[type="checkbox"][disabled]').length,0);}
 });
 await test('Duplicate/missing heading IDs retain first legacy anchor and avoid all document collisions',async()=>{
  const p={...posts[0],content:'<div id="grimoire-section-3"></div><h2 id="same">One</h2><h3 id="same">Two</h3><h2>Three</h2><p><a href="#same">Legacy link</a></p>'};const page=interactive(await renderPost(p));enhance(page);const doc=page.window.document;const hs=[...doc.querySelectorAll('.article-body h2,.article-body h3')];assert.equal(hs[0].id,'same');assert.notEqual(hs[1].id,'same');assert.notEqual(hs[2].id,'grimoire-section-3');const ids=[...doc.querySelectorAll('[id]')].map(e=>e.id);assert.equal(ids.length,new Set(ids).size);assert.equal(doc.getElementById('same'),hs[0]);
 });
 await test('Series navigation is chronological within the actual series; endpoints omit nonexistent essays',async()=>{
  const series=posts.filter(p=>p.categories.includes('tarot')&&p.title.includes('10 Different Ways to Interpret It')).reverse();
  for(let i=0;i<series.length;i++){const doc=dom(await renderPost(series[i])).window.document;assert.equal(doc.querySelector('[rel="prev"]')?.getAttribute('href')||null,series[i-1]?.url||null);assert.equal(doc.querySelector('[rel="next"]')?.getAttribute('href')||null,series[i+1]?.url||null);}
 });
 await test('Related links share a real category and exclude the current post; all local destinations resolve',async()=>{
  const valid=new Set(posts.map(p=>p.url).concat('/articles.html'));for(const p of posts){const doc=dom(await renderPost(p)).window.document;for(const a of doc.querySelectorAll('.continue-reading a')){const href=a.getAttribute('href');assert.ok(valid.has(href));assert.notEqual(href,p.url);if(href!='/articles.html')assert.ok(posts.find(x=>x.url===href).categories.some(c=>p.categories.includes(c)));}}
 });
 await test('Subpath-aware asset and navigation links use relative_url',async()=>{const doc=dom(await renderArchive(posts,'/test-site')).window.document;assert.equal(doc.querySelector('link').getAttribute('href'),'/test-site/grimoire.css');assert.equal(doc.querySelector('script').getAttribute('src'),'/test-site/grimoire.js');assert.ok([...doc.querySelectorAll('.entry h3 a')].every(a=>a.getAttribute('href').startsWith('/test-site/')));});
 await test('Every CSS selector stays scoped; responsive and reduced-motion styling parses',()=>{const css=read('grimoire.css'),sheet=postcss.parse(css);sheet.walkRules(r=>r.selectors.forEach(s=>assert.ok(s.startsWith('.grimoire-page'),s)));assert.ok(css.includes('@media(max-width:620px)'));assert.ok(css.includes('@media(max-width:900px)'));assert.ok(css.includes('prefers-reduced-motion'));assert.ok(css.includes(':focus-visible'));assert.ok(css.includes('max-width:72rem'));assert.ok(css.includes('minmax(0,700px)'));});
 await test('No hardcoded archive total or sample preview shell remains',()=>{assert.ok(!read('articles.html').includes('15'));assert.ok(!read('_layouts/post.html').includes('Hermit'));assert.ok(!read('grimoire.js').includes('location.hash'));});
 console.log(`${count} Grimoire checks passed against ${posts.length} real post fixtures. LiquidJS/Markdown-it fixture rendering, NOT a Jekyll build or visual audit.`);
 if(process.env.GRIMOIRE_TEST_OUTPUT){fs.mkdirSync(process.env.GRIMOIRE_TEST_OUTPUT,{recursive:true});fs.writeFileSync(path.join(process.env.GRIMOIRE_TEST_OUTPUT,'archive.html'),archive);for(let i=0;i<posts.length;i++)fs.writeFileSync(path.join(process.env.GRIMOIRE_TEST_OUTPUT,`post-${i}.html`),await renderPost(posts[i]));fs.writeFileSync(path.join(process.env.GRIMOIRE_TEST_OUTPUT,'results.json'),JSON.stringify({passed:count,postCount:posts.length,checks:results,limitations:['LiquidJS/Markdown-it fixture rendering is not a full Jekyll build.','No rendered desktop/mobile browser visual audit.']},null,2));}
})().catch(e=>{console.error(e);process.exitCode=1;});

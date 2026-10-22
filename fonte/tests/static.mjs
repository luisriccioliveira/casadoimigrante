import ts from 'typescript';import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import React from 'react';import {renderToStaticMarkup} from 'react-dom/server';
const dir=path.resolve('.verify');fs.mkdirSync(dir,{recursive:true});for(const n of fs.readdirSync('source')){if(!/\.tsx?$/.test(n))continue;let js=ts.transpileModule(fs.readFileSync('source/'+n,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX}}).outputText;js=js.replace(/from\s*(['"])(\.\/[^'"]+)\1/g,(_,q,p)=>'from '+q+p+'.mjs'+q);fs.writeFileSync(path.join(dir,n.replace(/\.tsx?$/,'.mjs')),js)}
globalThis.window={location:new URL('https://example.github.io/casa-do-imigrante/?lang=pt')};globalThis.location=window.location;
const {routeHref}=await import('../.verify/routes.mjs');
for(const root of ['https://example.github.io/','https://example.github.io/casa-do-imigrante/']){for(const p of ['/pt','/es','/pt/imovel/CDI-005','/es/imovel/CDI-005','/admin','/pt?favoritos=1#imoveis']){const u=new URL(routeHref(p),root);assert.equal(u.pathname,new URL(root).pathname);if(p.includes('imovel'))assert.equal(u.searchParams.get('imovel'),'CDI-005')}assert.equal(new URL(routeHref('/pt#sobre'),root).hash,'#sobre')}
assert.equal(routeHref('https://yousis.com.br'),'https://yousis.com.br');assert.equal(routeHref('#imoveis'),'#imoveis');
const fixture=JSON.parse(fs.readFileSync('public/dados-demo.json'));let reads=0;
globalThis.fetch=async input=>{reads++;assert.equal(String(input),'https://example.github.io/casa-do-imigrante/dados-demo.json');return Response.json(fixture)};
const {apiFetch}=await import('../.verify/api.mjs');
let d=await(await apiFetch('/api/public')).json();assert.equal(d.total,6);assert.equal(d.properties.length,4);assert.equal(d.settings.logo,'./images/logo-casa-imigrante.jpg');
let second=await(await apiFetch('/api/public?page=2')).json();assert.equal(second.properties.length,2);assert.equal(reads,1);
let deep=await(await apiFetch('/api/public?property=CDI-005')).json();assert.equal(deep.selectedProperty.id,'CDI-005');
let filtered=await(await apiFetch('/api/public?type=Casa&beds=3')).json();assert(filtered.properties.length>0);assert(filtered.properties.every(p=>p.type==='Casa'&&p.beds>=3));
let fav=await(await apiFetch('/api/public?ids=CDI-005')).json();assert.equal(fav.total,1);assert.equal(fav.properties[0].id,'CDI-005');
assert.equal((await(await apiFetch('/api/public?ids=')).json()).total,0);
let sorted=await(await apiFetch('/api/public?sort=low')).json();assert(sorted.properties.every((p,i,a)=>!i||a[i-1].price<=p.price));
let post=await apiFetch('/api/public',{method:'POST',body:JSON.stringify({name:'NÃO ENVIAR'})});assert.equal(post.status,409);assert.equal(reads,1);assert.equal((await apiFetch('/api/manage')).status,404);
const aborted=new AbortController();aborted.abort();await assert.rejects(()=>apiFetch('/api/public',{signal:aborted.signal}),{name:'AbortError'});
const PublicSite=(await import('../.verify/public-site.mjs')).default;
for(const lang of ['pt','es']){const html=renderToStaticMarkup(React.createElement(PublicSite,{lang,initialData:d}));assert(html.includes('Casa do Imigrante'));assert(html.includes('logo-casa-imigrante.jpg'));assert(html.includes('?lang='+lang+'&amp;imovel='));assert(!/href="\/(?:pt|es|admin)/.test(html));assert(!/src="\/images/.test(html));assert(html.includes('Yousis Tecnologia'));const doc=renderToStaticMarkup(React.createElement(PublicSite,{lang,propertyId:'CDI-005',initialData:deep}));assert(doc.includes(deep.selectedProperty[lang==='es'?'titleEs':'title']))}
const {signatureHtml}=await import('../.verify/signature.mjs');assert(signatureHtml({name:'Nome',email:'nome@example.invalid',phone:'',whatsapp:'',department:'Comercial',company:'Casa do Imigrante',tagline:'',website:'https://example.github.io/casa-do-imigrante/',logo:'./images/logo-casa-imigrante.jpg'}).includes('src="./images/logo-casa-imigrante.jpg"'));
const publicCode=fs.readFileSync('source/public-site.tsx','utf8');assert(publicCode.includes('static-form-note'));assert(!publicCode.includes("method: 'POST'"));assert.equal((publicCode.match(/className="static-form-note"/g)||[]).length,1);
console.log('PASS: rotas na raiz e subpasta, PT/ES, detalhes, filtros, favoritos, paginação, assets relativos, logo na assinatura e bloqueio de envio/área privada.');

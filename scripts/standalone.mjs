// Inlines the built JS and CSS into dist/index.html so the presentation opens
// straight from disk (file://), where browsers block external module scripts.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
let html = readFileSync(join(dist, 'index.html'), 'utf8');

html = html.replace(/<script type="module" crossorigin src="\.\/(assets\/[^"]+\.js)"><\/script>/, (_, file) => {
  const js = readFileSync(join(dist, file), 'utf8').replace(/<\/script/gi, '<\\/script');
  return `<script type="module">${js}</script>`;
});
html = html.replace(/<link rel="stylesheet" crossorigin href="\.\/(assets\/[^"]+\.css)">/, (_, file) => {
  const css = readFileSync(join(dist, file), 'utf8').replace(/url\(\.\//g, 'url(./assets/');
  return `<style>${css}</style>`;
});

if (/src="\.\/assets\/[^"]+\.js"/.test(html)) throw new Error('standalone: script was not inlined');
writeFileSync(join(dist, 'index.html'), html);
console.log('standalone: dist/index.html opens directly from disk');

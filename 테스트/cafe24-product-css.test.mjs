import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const productModuleFiles = [
  "title_list_viewmore_4col.html",
  "title_list_viewmore_4col_seasonal.html",
  "title_list_viewmore_4col_weekly.html",
  "title_list_viewmore_4col_fruit.html",
  "title_list_viewmore_4col_specialty.html",
];

test("regular product cards only reveal detected price specs", async () => {
  const css = await readFile(
    new URL("../cafe24/sample_store-products.css", import.meta.url),
    "utf8",
  );
  const moduleHtml = await readFile(
    new URL("../cafe24/title_list_viewmore_4col.html", import.meta.url),
    "utf8",
  );

  assert.match(
    css,
    /\.ns-product-module \.description \.spec\s*\{[^}]*display:\s*block !important;[^}]*visibility:\s*visible !important;[^}]*flex:\s*0 0 auto !important;[^}]*margin:\s*0 !important;/s,
  );
  assert.doesNotMatch(
    css,
    /margin:\s*auto 0 14px;/,
  );
  assert.match(
    css,
    /\.ns-product-module \.description \.spec li\s*\{[^}]*display:\s*none !important;/s,
  );
  assert.match(
    css,
    /\.ns-product-module \.description \.spec li\.ns-is-price\s*\{[^}]*display:\s*block !important;[^}]*margin-top:\s*12px !important;/s,
  );
  assert.match(
    css,
    /\.ns-product-module \.description \.icon\s*\{[^}]*display:\s*none !important;[^}]*margin:\s*0 !important;/s,
  );
  assert.doesNotMatch(moduleHtml, /class="icon__box"/);
  assert.doesNotMatch(moduleHtml, /class="likeButton/);
  assert.doesNotMatch(moduleHtml, />Cart</);
  assert.doesNotMatch(moduleHtml, />Like</);
  assert.doesNotMatch(moduleHtml, /\{\$option_preview_icon\}/);
  assert.doesNotMatch(moduleHtml, /\{\$image_big\}/);
  assert.doesNotMatch(moduleHtml, /product_Imagestyle/);
  assert.match(moduleHtml, /\$cache = no/);
  assert.match(moduleHtml, /\{\$image_medium\}/);
  assert.match(
    css,
    /\.ns-product-module \.thumbnail > a > img\s*\{[^}]*object-fit:\s*contain;[^}]*object-position:\s*center center;/s,
  );
  assert.match(
    css,
    /\.ns-product-module \.prdList\.grid4 > li:not\(:first-child\) \.thumbnail\s*\{[^}]*aspect-ratio:\s*1 \/ 1;/s,
  );
  assert.match(
    css,
    /\.ns-product-module--simple \.prdList\.grid4 > li:first-child \.thumbnail,[^}]*\.ns-product-module--compact \.prdList\.grid4 > li:first-child \.thumbnail\s*\{[^}]*aspect-ratio:\s*1 \/ 1;/s,
  );
  assert.doesNotMatch(css, /\.prdList__item:hover \.thumbnail > a > img\s*\{[^}]*transform:/s);
  assert.match(
    css,
    /\.ns-product-module \.likeButton,[^}]*\.ns-product-module \.icon__box,[^}]*\.ns-products \.icon__box,[^}]*display:\s*none !important;[^}]*visibility:\s*hidden !important;[^}]*pointer-events:\s*none !important;/s,
  );
  assert.match(
    css,
    /\.ns-product-module \.ec-base-product \.prdList\.grid4 > li:nth-child\(2\)::before\s*\{[^}]*content:\s*"추천";/s,
  );
  assert.match(
    css,
    /\.ns-product-module \.ec-base-product \.prdList\.grid4 > li:nth-child\(4\)::before\s*\{[^}]*content:\s*"제철";/s,
  );
});

test("product cards swap to small image on desktop hover", async () => {
  for (const file of productModuleFiles) {
    const moduleHtml = await readFile(
      new URL(`../cafe24/${file}`, import.meta.url),
      "utf8",
    );

    assert.match(moduleHtml, /\{\$image_small\}/, file);
    assert.match(moduleHtml, /onmouseover="this\.src='\{\$image_small\}'"/, file);
    assert.match(moduleHtml, /onmouseout="this\.src='\{\$image_medium\}'"/, file);
  }
});

test("supplemental product modules keep their own grid shapes", async () => {
  const css = await readFile(
    new URL("../cafe24/sample_store-products.css", import.meta.url),
    "utf8",
  );
  const html = await readFile(
    new URL("../cafe24/index-main-snippet.html", import.meta.url),
    "utf8",
  );

  assert.match(
    css,
    /\.ns-product-module--simple \.ec-base-product \.prdList\.grid4\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\);/s,
  );
  assert.match(
    css,
    /\.ns-product-module--compact \.ec-base-product \.prdList\.grid4\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/s,
  );
  assert.match(
    html,
    /sample_store-home\.css\?v=4/,
  );
  assert.match(
    html,
    /sample_store-products\.css\?v=25/,
  );
  assert.match(
    html,
    /<!--@css\(\/modules\/product_list\/css\/title_list_viewmore_4col\.css\)-->\s*<\/div>\s*<\/div>\s*<link rel="stylesheet" href="https:\/\/ecimg\.cafe24img\.com\/pg3194b74198296008\/richnara80\/web\/upload\/sample_store\/sample_store-products\.css\?v=25"/s,
  );
  assert.match(
    html,
    /function markProductPrices\(\)/,
  );
  assert.match(
    html,
    /\\d\{1,3\}\(,\\d\{3\}\)\+\\s\*원\?/,
  );
  assert.match(
    html,
    /@media \(max-width:640px\) \{\s*\.ns-products > \.ns-product-module \.prdList\.grid4 \{ grid-template-columns:1fr !important; grid-auto-rows:auto !important; \}/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)\s*\{[^}]*\.ns-product-module \.ec-base-product \.prdList\.grid4\s*\{[^}]*grid-template-columns:\s*1fr !important;[^}]*grid-auto-rows:\s*auto !important;/s,
  );
  assert.match(
    css,
    /\.ns-product-module \.prdList\.grid4 > li:first-child \.prdList__item\s*\{[^}]*flex-direction:\s*column !important;/s,
  );
  assert.match(
    html,
    /\.ns-products > \.ns-product-module \.prdList\.grid4/,
  );
});

test("hero feature links point to matching product categories", async () => {
  const html = await readFile(
    new URL("../cafe24/index-main-snippet.html", import.meta.url),
    "utf8",
  );

  assert.match(
    html,
    /<a class="ns-magazine-main" href="\/product\/list\.html\?cate_no=57">/,
  );
  assert.match(
    html,
    /<a class="ns-magazine-tile" href="\/product\/list\.html\?cate_no=43">/,
  );
  assert.match(
    html,
    /<a class="ns-magazine-tile" href="\/origin-story-sample\.html">/,
  );
});

test("exhibition text color overrides Cafe24 heading defaults", async () => {
  const css = await readFile(
    new URL("../cafe24/sample_store-home.css", import.meta.url),
    "utf8",
  );

  assert.match(
    css,
    /\.ns-exhibition h2\s*\{[^}]*color:\s*#fff !important;/s,
  );
  assert.match(
    css,
    /\.ns-exhibition p\s*\{[^}]*color:\s*#dce5dd !important;/s,
  );
});

test("origin story sample uses Cafe24 CDN asset paths", async () => {
  const html = await readFile(
    new URL("../cafe24/origin-story-sample.html", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(html, /src="origin-story-assets\//);
  assert.match(
    html,
    /https:\/\/ecimg\.cafe24img\.com\/pg3194b74198296008\/richnara80\/web\/upload\/sample_store\/origin-story-assets\/farm-orchard-hero\.png/,
  );
  assert.match(
    html,
    /https:\/\/ecimg\.cafe24img\.com\/pg3194b74198296008\/richnara80\/web\/upload\/sample_store\/origin-story-assets\/golden-peach-main\.png/,
  );
  assert.match(html, /<a class="pb-home-link" href="\/">홈으로 가기<\/a>/);
  assert.match(html, /<a class="pb-closing-home" href="\/">홈으로 가기<\/a>/);
});

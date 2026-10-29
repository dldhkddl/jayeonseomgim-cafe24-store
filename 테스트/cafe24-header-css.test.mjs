import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("header only shows top-level Cafe24 categories", async () => {
  const css = await readFile(
    new URL("../cafe24/sample_store-header.css", import.meta.url),
    "utf8",
  );
  const html = await readFile(
    new URL("../cafe24/header-replacement.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /sample_store-header\.css\?v=2/);
  assert.match(html, /href="\/origin-story-sample\.html">산지이야기<\/a>/);
  assert.match(
    css,
    /\.ns-product-categories > ul > li > ul,[^}]*\.ns-product-categories li ul,[^}]*display:\s*none !important;[^}]*visibility:\s*hidden !important;[^}]*pointer-events:\s*none !important;/s,
  );
});

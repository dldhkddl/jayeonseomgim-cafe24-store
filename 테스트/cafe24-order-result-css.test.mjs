import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("order result buttons use nature green on the actual order result page", async () => {
  const css = await readFile(
    new URL("../cafe24/sample_store-order-result.css", import.meta.url),
    "utf8",
  );
  const link = await readFile(
    new URL("../cafe24/order-result-head-link.html", import.meta.url),
    "utf8",
  );

  assert.match(link, /sample_store-order-result\.css\?v=1/);
  assert.match(
    css,
    /#userStyle #mCafe24Order \.ec-base-button\.gColumn \.btnEm\s*\{[^}]*border:\s*1px solid #234837 !important;[^}]*background:\s*#fff !important;[^}]*color:\s*#234837 !important;/s,
  );
  assert.match(
    css,
    /#userStyle #mCafe24Order \.ec-base-button\.gColumn \.btnSubmit\s*\{[^}]*border:\s*1px solid #234837 !important;[^}]*background:\s*#234837 !important;[^}]*color:\s*#fff !important;/s,
  );
});

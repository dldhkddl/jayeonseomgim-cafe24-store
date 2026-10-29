import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("order form payment button uses nature green instead of Cafe24 blue", async () => {
  const css = await readFile(
    new URL("../cafe24/sample_store-order-form.css", import.meta.url),
    "utf8",
  );
  const link = await readFile(
    new URL("../cafe24/order-form-head-link.html", import.meta.url),
    "utf8",
  );

  assert.match(link, /sample_store-order-form\.css\?v=3/);
  assert.match(
    css,
    /#userStyle #mCafe24Order #orderFixItem \.btnSubmit\s*\{[^}]*border:\s*1px solid #234837 !important;[^}]*background:\s*#234837 !important;[^}]*color:\s*#fff !important;/s,
  );
  assert.match(
    css,
    /#userStyle #mCafe24Order input\[type="radio"\],[^}]*accent-color:\s*#234837 !important;/s,
  );
  assert.match(
    css,
    /#userStyle #mCafe24Order input\[type="radio"\]\s*\{[^}]*-webkit-appearance:\s*none !important;[^}]*border:\s*2px solid #cfcfcf !important;/s,
  );
  assert.match(
    css,
    /#userStyle #mCafe24Order input\[type="radio"\]:checked\s*\{[^}]*border-color:\s*#234837 !important;[^}]*radial-gradient\(circle at center,\s*#234837/s,
  );
  assert.match(
    css,
    /#userStyle #mCafe24Order \.required,[^}]*#userStyle #mCafe24Order \.icoRequired,[^}]*#userStyle #mCafe24Order \.txtRequired,[^}]*color:\s*#234837 !important;/s,
  );
});

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Cafe24 footer uses two-sided company/contact layout", async () => {
  const html = await readFile(
    new URL("../cafe24/footer-replacement.html", import.meta.url),
    "utf8",
  );
  const css = await readFile(
    new URL("../cafe24/sample_store-footer.css", import.meta.url),
    "utf8",
  );

  assert.match(html, /sample_store-footer\.css\?v=5/);
  assert.match(html, /<footer id="footer" class="ns-site-footer">/);
  assert.match(html, /샘플상점 푸르/);
  assert.match(html, /Contact/);
  assert.match(html, /Bank Info/);
  assert.match(html, /ns-footer-warehouses/);
  assert.match(html, /제1 물류창고/);
  assert.match(html, /제2 물류창고/);
  assert.match(
    css,
    /#footer\.ns-site-footer\s*\{[^}]*background:\s*#234837;[^}]*color:\s*rgba\(255,\s*255,\s*255,\s*0\.72\);/s,
  );
  assert.match(
    css,
    /#footer\.ns-site-footer \.ns-footer-main\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\) minmax\(320px,\s*0\.7fr\) !important;/s,
  );
  assert.match(
    css,
    /#footer\.ns-site-footer p\s*\{[^}]*color:\s*#fff !important;/s,
  );
  assert.match(
    css,
    /#footer\.ns-site-footer \.ns-footer-warehouses\s*\{[^}]*margin-top:\s*22px !important;/s,
  );
});

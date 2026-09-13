// Run against the production Nitro server, not Vite preview:
// node scripts/check-security.mjs http://127.0.0.1:4177
import assert from "node:assert/strict";

const origin = process.argv[2] ?? "http://127.0.0.1:4177";
const nonces = new Set();
let assetPath;

for (const [path, status, mime] of [
  ["/", 200, "text/html"],
  ["/", 200, "text/html"],
  ["/compliance", 200, "text/html"],
  ["/ofertas", 200, "text/html"],
  ["/security-check-missing", 404, "text/html"],
  ["/robots.txt", 200, "text/plain"],
  ["/llms.txt", 200, "text/plain"],
  ["/sitemap.xml", 200, "application/xml"],
  ["/social-logo.png", 200, "image/png"],
]) {
  const response = await fetch(new URL(path, origin), { redirect: "manual" });
  assert.equal(response.status, status, path);
  assert(response.headers.get("content-type")?.includes(mime), path);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff", path);
  assert.equal(response.headers.get("x-frame-options"), "DENY", path);
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin", path);
  assert(response.headers.get("permissions-policy")?.includes("camera=()"), path);

  const body = await response.text();
  if (mime === "text/html") {
    const csp = response.headers.get("content-security-policy");
    const nonce = csp?.match(/'nonce-([a-f0-9]{32})'/)?.[1];
    assert(nonce, `${path}: nonce missing`);
    assert(!nonces.has(nonce), `${path}: nonce reused`);
    nonces.add(nonce);
    assert(csp.includes("frame-ancestors 'none'"));
    assert(csp.includes("script-src-attr 'none'"));
    assert(!csp.includes("unsafe-eval"));
    assert(
      !csp
        .split(";")
        .find((rule) => rule.trim().startsWith("script-src "))
        .includes("unsafe-inline"),
    );
    assert(response.headers.get("cache-control")?.includes("no-store"));
    const scripts = [...body.matchAll(/<script\b[^>]*>/g)];
    assert(scripts.length > 0);
    for (const [tag] of scripts)
      assert(tag.includes(`nonce="${nonce}"`) || tag.includes(`nonce='${nonce}'`), tag);
    assetPath ??= body.match(/src="([^" ]+\.js)"/)?.[1];
  }
  console.log(`${status} ${path}: OK`);
}

assert(assetPath, "No JavaScript asset found");
const asset = await fetch(new URL(assetPath, origin));
assert.equal(asset.status, 200);
assert(asset.headers.get("content-type")?.includes("javascript"));
assert.equal(asset.headers.get("x-content-type-options"), "nosniff");
assert(asset.headers.get("cache-control")?.includes("immutable"));
console.log("JavaScript asset: headers, MIME and immutable caching OK");

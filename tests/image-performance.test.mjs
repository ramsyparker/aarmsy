import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

execSync("npm run build", { stdio: "pipe" });
const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");

test("the profile avatar is emitted as an optimized Astro asset", () => {
  assert.doesNotMatch(html, /src="\/profile\.png"/);
  assert.match(html, /src="\/_astro\/profile\.[^"]+"/);
});

test("the project preview is emitted as an optimized Astro asset", () => {
  assert.doesNotMatch(html, /\/previews\/fixora\.png/);
  assert.match(html, /\/_astro\/fixora\.[^&"]+/);
});

test("the GitHub activity header omits the profile badge", () => {
  assert.doesNotMatch(html, />GitHub profile\s*</);
  assert.match(html, />Recent Activity</);
});

test("the profile omits the interest badges", () => {
  assert.doesNotMatch(html, /aria-label="Areas I work in"/);
});

test("the GitHub activity reserves its loading layout with an accessible skeleton", () => {
  assert.match(html, /data-github-activity="ramsyparker" data-state="loading"/);
  assert.match(html, /class="activity-summary-skeleton" aria-hidden="true"/);
  assert.match(html, /class="activity-calendar-skeleton" aria-hidden="true"/);
});

import assert from "node:assert/strict";
import test from "node:test";
import { parsePublishedRelease } from "../src/releases.ts";

const repository = "RaynerdTech/autopilot-downloads";
const names = [
  "Autopilot-Windows-x64.exe",
  "Autopilot-macOS-Apple-Silicon.dmg",
  "Autopilot-macOS-Intel.dmg",
];

function release(version = "v0.1.3") {
  return {
    tag_name: version,
    draft: false,
    prerelease: false,
    assets: names.map((name) => ({
      name,
      browser_download_url: `https://github.com/${repository}/releases/download/${version}/${name}`,
    })),
  };
}

test("published version and download URLs follow GitHub release tags", () => {
  for (const version of ["v0.1.3", "v0.1.4", "v2.0.0-rc.1"]) {
    const published = parsePublishedRelease(release(version), repository);
    assert.equal(published?.version, version);
    assert.match(published?.installers.windows ?? "", new RegExp(`/download/${version.replaceAll(".", "\\.")}/`));
    assert.match(published?.installers["mac-apple"] ?? "", /Apple-Silicon\.dmg$/);
    assert.match(published?.installers["mac-intel"] ?? "", /Intel\.dmg$/);
  }
});

test("incomplete release hides the version until every installer is published", () => {
  const incomplete = release();
  incomplete.assets.pop();
  assert.equal(parsePublishedRelease(incomplete, repository), null);
});

test("draft, prerelease, and invalid tags are not advertised", () => {
  assert.equal(parsePublishedRelease({ ...release(), draft: true }, repository), null);
  assert.equal(parsePublishedRelease({ ...release(), prerelease: true }, repository), null);
  assert.equal(parsePublishedRelease(release("not-a-version"), repository), null);
});

test("release asset URLs must point to the matching public repository and tag", () => {
  const tampered = release();
  tampered.assets[0].browser_download_url = "https://example.com/installer.exe";
  assert.equal(parsePublishedRelease(tampered, repository), null);
  assert.equal(parsePublishedRelease(release(), "not/a/valid/repository"), null);
});

test("missing or malformed API data does not invent a version", () => {
  assert.equal(parsePublishedRelease(null, repository), null);
  assert.equal(parsePublishedRelease({ tag_name: "v0.1.3" }, repository), null);
});

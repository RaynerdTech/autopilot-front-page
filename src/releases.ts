// Only published releases with every installer are advertised as downloadable.
const installerNames = {
  windows: "Autopilot-Windows-x64.exe",
  "mac-apple": "Autopilot-macOS-Apple-Silicon.dmg",
  "mac-intel": "Autopilot-macOS-Intel.dmg",
} as const;

export type PublishedRelease = {
  version: string;
  installers: Record<keyof typeof installerNames, string>;
};

export function parsePublishedRelease(value: unknown, repository: string): PublishedRelease | null {
  if (!value || typeof value !== "object" || !/^[\w.-]+\/[\w.-]+$/.test(repository)) return null;

  const release = value as Record<string, unknown>;
  const version = release.tag_name;
  if (
    typeof version !== "string" ||
    !/^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version) ||
    release.draft === true ||
    release.prerelease === true ||
    !Array.isArray(release.assets)
  ) return null;

  const installers = {} as PublishedRelease["installers"];
  for (const [platform, filename] of Object.entries(installerNames) as [keyof typeof installerNames, string][]) {
    const asset = release.assets.find(
      (item: unknown) => item && typeof item === "object" && "name" in item && item.name === filename,
    ) as { browser_download_url?: unknown } | undefined;
    const expectedUrl = `https://github.com/${repository}/releases/download/${version}/${filename}`;
    if (asset?.browser_download_url !== expectedUrl) return null;
    installers[platform] = expectedUrl;
  }

  return { version, installers };
}

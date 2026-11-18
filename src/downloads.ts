export type Platform = "windows" | "mac-apple" | "mac-intel";

// Vite values are public. Accept only public HTTPS links, never credentials.
function downloadUrl(value: string | undefined): string {
  if (!value?.trim()) return "";
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" && !url.username && !url.password ? url.href : "";
  } catch { return ""; }
}

const DEFAULT_RELEASE_REPOSITORY = "RaynerdTech/autopilot-downloads";
const repository = (import.meta.env.VITE_GITHUB_REPOSITORY || DEFAULT_RELEASE_REPOSITORY).trim();
const validRepository = /^[A-Za-z0-9][A-Za-z0-9-]*\/[A-Za-z0-9_.-]+$/.test(repository)
  && repository !== "your-github-name/your-repository";
const latestRelease = validRepository ? `https://github.com/${repository}/releases/latest/download/` : "";
export const releaseRepository = validRepository ? repository : "";
export const latestReleaseApiUrl = validRepository
  ? `https://api.github.com/repos/${repository}/releases/latest`
  : "";

export const releasePageUrl = validRepository
  ? `https://github.com/${repository}/releases/latest`
  : "";

export const customDownloads: Record<Platform, string> = {
  windows: downloadUrl(import.meta.env.VITE_WINDOWS_DOWNLOAD_URL),
  "mac-apple": downloadUrl(import.meta.env.VITE_MAC_APPLE_DOWNLOAD_URL),
  "mac-intel": downloadUrl(import.meta.env.VITE_MAC_INTEL_DOWNLOAD_URL),
};

export const downloads: Record<Platform, string> = {
  windows: customDownloads.windows || (latestRelease && `${latestRelease}Autopilot-Windows-x64.exe`),
  "mac-apple": customDownloads["mac-apple"] || (latestRelease && `${latestRelease}Autopilot-macOS-Apple-Silicon.dmg`),
  "mac-intel": customDownloads["mac-intel"] || (latestRelease && `${latestRelease}Autopilot-macOS-Intel.dmg`),
};

const email = (import.meta.env.VITE_SUPPORT_EMAIL || "raynerdtech@gmail.com").trim();
export const supportEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !email.endsWith("example.com") ? email : "";
export const hasDownloads = Object.values(downloads).some(Boolean);

export function detectPlatform(): "windows" | "mac" | "other" {
  const agent = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod/.test(agent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) return "other";
  if (/Windows/.test(agent)) return "windows";
  if (/Mac/.test(agent)) return "mac";
  return "other";
}

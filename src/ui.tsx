import { AudioLines } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return <span className={"brand" + (compact ? " brand-compact" : "")}>
    <span className="brand-symbol"><AudioLines aria-hidden="true" size={21} strokeWidth={2.2} /></span>
    <span className="brand-name">Autopilot{!compact && <small>by RaynerdTech</small>}</span>
  </span>;
}

export function WindowsIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4.4 10.5 3.2v8H2V4.4ZM12 3 22 1.6v9.6H12V3ZM2 12.7h8.5v8.1L2 19.6v-6.9ZM12 12.7h10v9.7L12 21v-8.3Z" /></svg>;
}

export function AppleIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 3.6c.8-1 .9-2 .9-2.4-1 .1-2.1.7-2.8 1.5-.6.6-1 1.5-1 2.5 1.1.1 2.1-.5 2.9-1.6ZM19.7 17.2c-.5 1.1-.8 1.6-1.5 2.6-.9 1.3-2.1 2.8-3.5 2.8-1.2 0-1.5-.8-3.2-.8-1.7 0-2.1.8-3.2.8-1.4 0-2.5-1.4-3.4-2.7-2.4-3.3-3-7.8-1.5-10.2 1.1-1.7 2.8-2.7 4.4-2.7 1.4 0 2.3.8 3.5.8 1.2 0 1.9-.8 3.5-.8 1.3 0 2.7.7 3.7 1.9-3.2 1.8-2.7 6.6 1.2 8.3Z" /></svg>;
}

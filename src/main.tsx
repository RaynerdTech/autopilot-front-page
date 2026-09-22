import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { PrivacyPage } from "./PrivacyPage";
import "./styles.css";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const isPrivacyPage = path === "/privacy" || path === "/data-and-privacy";

if (isPrivacyPage) {
  document.title = "Data & Privacy | Autopilot by RaynerdTech";
  document.querySelector('meta[name="description"]')?.setAttribute("content", "Learn how Autopilot processes computer audio, screen context, CV information, account data, and payments—and the controls available to you.");
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{isPrivacyPage ? <PrivacyPage /> : <App />}</React.StrictMode>,
);

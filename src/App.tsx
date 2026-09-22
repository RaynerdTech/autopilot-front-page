import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  Check,
  ChevronDown,
  CreditCard,
  Download,
  ExternalLink,
  Headphones,
  PanelTopClose,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { FeatureDemo } from "./FeatureDemo";
import { features, type DemoId } from "./demo-content";
import {
  detectPlatform,
  downloads,
  hasDownloads,
  releasePageUrl,
  supportEmail,
  type Platform,
} from "./downloads";
import { AppleIcon, Brand, WindowsIcon } from "./ui";

const stories: {
  id: Exclude<DemoId, "live">;
  title: string;
  description: string;
  note: string;
}[] = [
  {
    id: "followup",
    title: "Stay ready for the next question.",
    description:
      'A conversation rarely stops at one answer. When they ask "Why?" or "Can you explain that?", Autopilot keeps the last exchange in context so you can continue without repeating everything.',
    note: "One conversation, connected from question to question.",
  },
  {
    id: "screen",
    title: 'When they say "this," Autopilot sees what they mean.',
    description:
      "Questions about the code, chart, document, or error on your screen need visual context. Smart Screen Assist adds what is visible only when it helps answer the question.",
    note: "The question and the screen, understood together.",
  },
  {
    id: "selection",
    title: "Focus on exactly what matters.",
    description:
      "Draw around a question, table, chart, or error. Autopilot reads only that area and responds from the information you selected.",
    note: "You control what it reads.",
  },
  {
    id: "code",
    title: "Go from a coding question to working code.",
    description:
      "Stay in Auto. When someone asks you to write, fix, or explain code, Autopilot recognizes the task and gives you a readable starting point in the language you choose.",
    note: "No interruption. No last-second mode switch.",
  },
  {
    id: "cv",
    title: "When they ask about you, it knows your experience.",
    description:
      "Add your CV once. Autopilot can use the roles, projects, skills, and results in it to help you shape answers about your own background.",
    note: "Your real experience, ready when you need it.",
  },
];

function FeatureStory({
  story,
  index,
}: {
  story: (typeof stories)[number];
  index: number;
}) {
  const feature = features.find((item) => item.id === story.id)!;
  return (
    <section id={story.id} className={"feature-section feature-" + story.id}>
      <div className="wrap feature-layout">
        <div className="feature-copy">
          <div className="section-label">
            <span className="feature-number">0{index + 2} / 06</span>
            <feature.icon size={15} />
            <span>{feature.label}</span>
          </div>
          <h2>{story.title}</h2>
          <p>{story.description}</p>
          <span className="feature-takeaway">
            <Check size={16} />
            {story.note}
          </span>
        </div>
        <FeatureDemo id={story.id} />
      </div>
    </section>
  );
}

function ControlSection() {
  const [mode, setMode] = useState<"Off" | "Manual" | "Smart">("Smart");
  const explanations = {
    Off: "No screen scans or captures. Keep the session audio-only.",
    Manual: "Capture screen context only when you request it.",
    Smart: "Use screen context when the question needs it.",
  };
  return (
    <section className="control-section" id="control">
      <div className="wrap">
        <div className="control-heading">
          <span className="section-label">
            <SlidersHorizontal size={16} /> In your control
          </span>
          <h2>You decide what Autopilot can use.</h2>
        </div>
        <div className="control-grid">
          <article>
            <Headphones size={24} />
            <h3>Choose what it hears.</h3>
            <p>
              All computer audio or a supported application. Your microphone is
              excluded.
            </p>
            <span className="control-detail">
              <AudioLines size={15} /> Computer audio, not your mic
            </span>
          </article>
          <article>
            <SlidersHorizontal size={24} />
            <h3>Choose what it sees.</h3>
            <div
              className="screen-modes"
              role="group"
              aria-label="Preview Screen Assist modes"
            >
              {(["Off", "Manual", "Smart"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={mode === option}
                  onClick={() => setMode(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="mode-explanation" aria-live="polite">
              {explanations[mode]}
            </p>
          </article>
          <article>
            <PanelTopClose size={24} />
            <h3>Keep it within reach.</h3>
            <p>
              An always-on-top window, compact mode, and global shortcuts keep
              your controls nearby.
            </p>
            <span className="control-detail">
              <span className="mini-compact">
                <AudioLines size={13} /> Autopilot <i />
              </span>{" "}
              Emergency stop available
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}

function DownloadButton({
  platform,
  label,
}: {
  platform: Platform;
  label: string;
}) {
  return downloads[platform] ? (
    <a
      className="button button-primary platform-download"
      href={downloads[platform]}
      data-platform={platform}
      aria-label={`${label} installer`}
    >
      <Download size={17} />
      {label}
    </a>
  ) : (
    <button className="button platform-download" type="button" disabled>
      Download unavailable
    </button>
  );
}

function DownloadSection() {
  const [macChip, setMacChip] = useState<"mac-apple" | "mac-intel">(
    "mac-apple",
  );
  const platform = detectPlatform();
  return (
    <section className="download-section" id="download">
      <div className="wrap download-layout">
        <div className="download-copy">
          <span className="section-label">
            <Download size={15} /> Download Autopilot
          </span>
          <h2>Be ready for the next question.</h2>
          <p>
            Install Autopilot on your computer. You will see the available plans
            and complete payment securely inside the app.
          </p>
          <ol className="start-steps">
            <li>
              <span>1</span>
              <p>
                <strong>Download and install</strong>
                <small>Choose the version made for your computer.</small>
              </p>
            </li>
            <li>
              <span>2</span>
              <p>
                <strong>Choose a plan in the app</strong>
                <small>Review the options before making any payment.</small>
              </p>
            </li>
            <li>
              <span>3</span>
              <p>
                <strong>Start your session</strong>
                <small>Open Autopilot before the conversation begins.</small>
              </p>
            </li>
          </ol>
          <div className="payment-note">
            <CreditCard size={17} />
            <span>Plans and pricing are shown inside Autopilot.</span>
          </div>
          <div className="privacy-note">
            <ShieldCheck size={17} />
            <span>
              You control screen access, and your microphone is excluded from
              computer-audio capture.
            </span>
          </div>
        </div>
        <div className="download-options">
          {!hasDownloads && (
            <p className="download-availability" role="status">
              Downloads are temporarily unavailable. Please check back shortly.
            </p>
          )}
          <article
            className={
              "download-option" + (platform === "windows" ? " detected" : "")
            }
          >
            <div className="platform-heading">
              <WindowsIcon />
              <div>
                <h3>Windows</h3>
                <span>64-bit PC</span>
              </div>
              {platform === "windows" && (
                <span className="platform-detected">Your system</span>
              )}
            </div>
            <p className="platform-details">
              Windows x64 <span>.exe installer</span>
            </p>
            <DownloadButton platform="windows" label="Download for Windows" />
          </article>
          <article
            className={
              "download-option" + (platform === "mac" ? " detected" : "")
            }
          >
            <div className="platform-heading">
              <AppleIcon />
              <div>
                <h3>macOS</h3>
                <span>macOS 14.4 or later</span>
              </div>
              {platform === "mac" && (
                <span className="platform-detected">Your system</span>
              )}
            </div>
            <div
              className="chip-options"
              role="group"
              aria-label="Mac processor"
            >
              <button
                type="button"
                aria-pressed={macChip === "mac-apple"}
                onClick={() => setMacChip("mac-apple")}
              >
                Apple Silicon <span>M-series</span>
              </button>
              <button
                type="button"
                aria-pressed={macChip === "mac-intel"}
                onClick={() => setMacChip("mac-intel")}
              >
                Intel
              </button>
            </div>
            <DownloadButton
              platform={macChip}
              label={
                macChip === "mac-apple"
                  ? "Download for Apple Silicon"
                  : "Download for Intel Mac"
              }
            />
            <details className="chip-help">
              <summary>
                Which Mac do I have?
                <ChevronDown size={13} />
              </summary>
              <p>
                Open the Apple menu, then About This Mac. Choose Apple Silicon
                for an M-series chip, or Intel for an Intel processor.
              </p>
            </details>
          </article>
          {releasePageUrl && (
            <a
              className="release-link"
              href={releasePageUrl}
              target="_blank"
              rel="noreferrer"
            >
              View the latest release details <ExternalLink size={13} />
            </a>
          )}
          {platform === "other" && (
            <p className="desktop-only">
              Autopilot runs on a Windows PC or Mac.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section className="questions-section wrap" id="questions">
      <div>
        <span className="section-label">Before you start</span>
        <h2>A few things to know.</h2>
      </div>
      <div className="questions-list">
        <details>
          <summary>
            How does Autopilot answer questions about me?
            <ChevronDown size={18} />
          </summary>
          <p>
            Add your CV to your profile and Autopilot can use the experience,
            skills, projects, and results written in it to shape a relevant
            answer. It can only personalize answers with what you provide. If a
            detail is missing, the answer may stay general instead of using a
            personal example.
          </p>
        </details>
        <details>
          <summary>
            Where do I see plans and pricing?
            <ChevronDown size={18} />
          </summary>
          <p>
            Download and open Autopilot first. The available plans and prices
            appear inside the app before you pay, so you can review your options
            and choose what works for you.
          </p>
        </details>
        <details>
          <summary>
            What happens to my audio, CV, and screen content?
            <ChevronDown size={18} />
          </summary>
          <p>
            Autopilot sends computer audio to its transcription service.
            Relevant CV details and screen content you allow are processed only
            when needed to produce an answer. Your microphone is excluded from
            computer-audio capture, and Screen Assist can be turned Off. Read
            the{" "}
            <a className="inline-link" href="/privacy">
              Data &amp; Privacy page
            </a>{" "}
            for full details.
          </p>
        </details>
        <details>
          <summary>
            Will Autopilot appear when I share my screen?
            <ChevronDown size={18} />
          </summary>
          <p>
            Autopilot is designed to stay out of screen shares, but this can
            vary by your operating system and the app you use to share. Test it
            once before an important session.
          </p>
        </details>
      </div>
    </section>
  );
}

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap header-inner">
          <a href="#top" className="home-link" aria-label="Autopilot home">
            <Brand />
          </a>
          <nav aria-label="Main navigation">
            <a className="nav-link" href="#live">
              See it work
            </a>
            <a className="nav-link" href="#control">
              Your controls
            </a>
            <a className="button button-small button-primary" href="#download">
              Download <ArrowDown size={15} />
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="hero" id="top">
          <div className="wrap hero-content">
            <div className="hero-intro">
              <span className="section-label">
                <span className="signal-dot" /> Real-time support for
                conversations that matter
              </span>
              <h1>Autopilot</h1>
              <p className="hero-statement">
                Know what to say when it matters.
              </p>
              <p className="hero-description">
                Autopilot listens for questions, understands what is on your
                screen, and uses your CV to help you shape clear answers in real
                time.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#download">
                  Download Autopilot <ArrowRight size={17} />
                </a>
                <a className="button button-text" href="#live">
                  See it in action <ArrowDown size={16} />
                </a>
              </div>
              <p className="hero-compatibility">
                <WindowsIcon />
                <AppleIcon /> Windows &amp; macOS <span /> Plans and payment
                inside the app
              </p>
            </div>
            <div id="live" className="hero-demonstration">
              <FeatureDemo id="live" hero />
            </div>
          </div>
        </section>
        <nav className="feature-navigation wrap" aria-label="Explore features">
          {features.map((feature, index) => (
            <a key={feature.id} href={"#" + feature.id}>
              <span className="feature-nav-number">0{index + 1}</span>
              <feature.icon size={18} />
              <span>{feature.label}</span>
              <ArrowDown size={13} />
            </a>
          ))}
        </nav>
        {stories.map((story, index) => (
          <FeatureStory key={story.id} story={story} index={index} />
        ))}
        <ControlSection />
        <DownloadSection />
        <Questions />
      </main>
      <footer className="site-footer wrap">
        <a
          href="#top"
          className="home-link"
          aria-label="Back to Autopilot home"
        >
          <Brand compact />
        </a>
        <p>Built by RaynerdTech.</p>
        <nav aria-label="Footer navigation">
          {supportEmail && <a href={"mailto:" + supportEmail}>Support</a>}
          <a href="/privacy">Data &amp; privacy</a>
          <a href="#download">Downloads</a>
        </nav>
      </footer>
    </>
  );
}

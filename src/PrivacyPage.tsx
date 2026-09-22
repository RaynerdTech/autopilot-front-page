import type { ReactNode } from "react";
import { ArrowLeft, FileText, Headphones, Mail, MonitorUp, ShieldCheck } from "lucide-react";
import { supportEmail } from "./downloads";
import { Brand } from "./ui";

const updated = "22 September 2026";

function PrivacySection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="policy-section"><h2>{title}</h2>{children}</section>;
}

export function PrivacyPage() {
  return <>
    <a className="skip-link" href="#privacy-main">Skip to content</a>
    <header className="site-header">
      <div className="wrap header-inner">
        <a href="/" className="home-link" aria-label="Autopilot home"><Brand /></a>
        <a className="button button-small" href="/"><ArrowLeft size={15} /> Back to Autopilot</a>
      </div>
    </header>
    <main id="privacy-main" className="policy-page">
      <div className="wrap policy-layout">
        <aside className="policy-summary" aria-label="Privacy summary">
          <span className="section-label"><ShieldCheck size={15} /> Data &amp; privacy</span>
          <h1>Your information should work for you—not become the product.</h1>
          <p>This page explains what Autopilot processes, why it is needed, and the controls available to you.</p>
          <div className="policy-principles">
            <span><Headphones size={17} /><b>Audio</b>Computer audio is processed to create the live transcript. Your microphone is excluded from this capture.</span>
            <span><MonitorUp size={17} /><b>Screen</b>Screen content is used only when Screen Assist is enabled and relevant to your request.</span>
            <span><FileText size={17} /><b>CV</b>Your CV is used to personalize answers about your own experience.</span>
          </div>
        </aside>

        <article className="policy-content">
          <p className="policy-effective">Last updated: {updated}</p>
          <PrivacySection title="Who this policy applies to">
            <p>This policy applies to the Autopilot by RaynerdTech desktop application and this website. RaynerdTech is responsible for the personal information described here. By using Autopilot, you acknowledge the processing described in this policy.</p>
          </PrivacySection>

          <PrivacySection title="Information Autopilot processes">
            <ul>
              <li><strong>Account and profile information:</strong> your email address, profile details, preferences, subscription status, and usage limits.</li>
              <li><strong>CV information:</strong> the document you upload and relevant details extracted from it, such as skills, roles, projects, education, and achievements.</li>
              <li><strong>Computer audio and transcripts:</strong> audio from the source you select is streamed for transcription. Autopilot does not intentionally store raw audio after transcription.</li>
              <li><strong>Screen context:</strong> an image of your screen or the area you select may be processed when Screen Assist is set to Smart or Manual. Autopilot does not intentionally retain the captured image after the request is processed.</li>
              <li><strong>Questions, answers, and usage records:</strong> text needed to produce answers, maintain short conversational context, enforce your plan, prevent abuse, and diagnose service problems.</li>
              <li><strong>Technical information:</strong> app version, operating system, security events, and limited diagnostic information needed to keep the service reliable.</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="How the information is used">
            <p>Autopilot uses this information to transcribe computer audio, detect questions and tasks, produce answers, use permitted CV and screen context, authenticate your account, manage access and subscriptions, secure the service, and improve reliability. It is not sold to advertisers.</p>
          </PrivacySection>

          <PrivacySection title="Your controls">
            <ul>
              <li>Set Screen Assist to <strong>Off</strong>, <strong>Manual</strong>, or <strong>Smart</strong> at any time.</li>
              <li>Choose the computer-audio source Autopilot listens to. Microphone input is excluded from computer-audio capture.</li>
              <li>Replace or delete your CV from your profile.</li>
              <li>Stop a live session immediately from the app.</li>
              <li>Request access to or deletion of your account information by contacting support.</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="Service providers and payments">
            <p>Autopilot relies on service providers for authentication, cloud infrastructure, transcription, AI responses, email delivery, and payment processing. They process the information needed to provide their service. Payment card details are entered with the payment provider and are not stored by RaynerdTech.</p>
          </PrivacySection>

          <PrivacySection title="Retention and security">
            <p>Information is kept only as long as needed to provide Autopilot, meet legal obligations, resolve disputes, and protect the service. Access controls, encrypted connections, server-side credentials, and usage checks are used to protect the system. No online service can guarantee absolute security, so please avoid sharing information that is not needed for your session.</p>
          </PrivacySection>

          <PrivacySection title="International processing">
            <p>Some service providers may process information in countries other than yours. Where required, appropriate safeguards are used for these transfers.</p>
          </PrivacySection>

          <PrivacySection title="Changes to this policy">
            <p>This policy may be updated as Autopilot changes. The date at the top of this page will be updated when material changes are published.</p>
          </PrivacySection>

          <PrivacySection title="Contact">
            <p>For privacy questions, account deletion, or support, email <a className="inline-link" href={`mailto:${supportEmail}`}>{supportEmail}</a>.</p>
            <a className="button button-primary policy-contact" href={`mailto:${supportEmail}?subject=Autopilot%20privacy%20request`}><Mail size={16} /> Contact RaynerdTech</a>
          </PrivacySection>
        </article>
      </div>
    </main>
    <footer className="site-footer wrap policy-footer"><a href="/" className="home-link" aria-label="Autopilot home"><Brand compact /></a><p>Built by RaynerdTech.</p><nav aria-label="Footer navigation"><a href={`mailto:${supportEmail}`}>Support</a><a href="/privacy" aria-current="page">Data &amp; privacy</a><a href="/#download">Downloads</a></nav></footer>
  </>;
}

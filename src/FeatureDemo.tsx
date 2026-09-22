import type { CSSProperties, ReactNode } from "react";
import {
  AudioLines, Braces, Check, ChevronDown, CircleStop, FileText, Headphones,
  MessageSquareText, Monitor, MousePointer2, PanelLeftClose, Pause, Play,
  Power, RotateCcw, ScanSearch, Settings, WalletCards,
} from "lucide-react";
import { demos, features, type DemoId } from "./demo-content";
import { Brand } from "./ui";
import { DEMO_DURATION, useDemoTimeline } from "./useDemoTimeline";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const codeExample = "function uniqueIds(ids: string[]): string[] {\n  return [...new Set(ids)];\n}\n\nuniqueIds(['a', 'b', 'a']);\n// ['a', 'b']";

function Wave({ active }: { active: boolean }) {
  return <span className={"audio-wave" + (active ? " is-active" : "")}>
    {[9, 18, 12, 26, 19, 30, 14, 22, 10, 17, 25, 12].map((height, index) =>
      <i key={index} style={{ height, animationDelay: (-index * 0.11) + "s" }} />)}
  </span>;
}

function StreamText({ text, progress }: { text: string; progress: number }) {
  const length = Math.ceil(text.length * clamp(progress));
  return <><span>{text.slice(0, length)}</span>{progress < 1 && <span className="typing-caret" />}</>;
}

function ProductFrame({ children, mode = "answer", full = false, active = true }: {
  children: ReactNode; mode?: "answer" | "coding" | "auto"; full?: boolean; active?: boolean;
}) {
  return <div className={"product-window" + (full ? " product-full" : "")}>
    <div className="product-titlebar">
      <span className="window-dots"><i /><i /><i /></span>
      <span>Autopilot</span>
      <span className="titlebar-right"><Monitor size={12} /> Desktop</span>
    </div>
    <div className="product-layout">
      <aside className="product-sidebar">
        <div className="product-brand"><Brand compact /><PanelLeftClose size={15} /></div>
        <div className="product-nav">
          <small>WORKSPACE</small>
          <span className="selected"><MessageSquareText size={17} /><b>Live workspace</b></span>
          <small>ACCOUNT</small>
          <span><FileText size={17} /><b>My CV</b></span>
          <span><WalletCards size={17} /><b>Usage &amp; billing</b></span>
          <span><Settings size={17} /><b>Settings</b></span>
        </div>
        <div className="product-user"><span>A</span><div>Alex Morgan<small>Signed in</small></div><Power size={14} /></div>
      </aside>
      <div className="product-workspace">
        <div className="product-focus-bar">
          <span className="product-status"><i className={active ? "live" : ""} /><span>{active ? "Listening" : "Ready"}<small>All computer audio</small></span></span>
          <span className="product-mode">{mode === "coding" ? <Braces size={14} /> : <MessageSquareText size={14} />}{mode === "coding" ? "Code" : mode === "auto" ? "Auto" : "Q&A"}</span>
          <span className="product-stop"><CircleStop size={14} /> Stop</span>
        </div>
        <div className="product-feed">{children}</div>
      </div>
    </div>
  </div>;
}

function Response({ question, answer, progress, stage, code = false, previous = false }: {
  question: string; answer: string; progress: number; stage: number; code?: boolean; previous?: boolean;
}) {
  const done = progress >= 1;
  return <div className={"product-response" + (previous ? " previous-response" : "")}>
    <div className="response-meta"><span>{done ? <Check size={12} /> : <AudioLines size={12} />}{done ? "Answered" : "Answering"}</span><span>{code ? "Code" : "Q&A"}{!previous && " · Latest"}</span></div>
    <p className="detected-question">{question}</p>
    {stage < 2 ? <div className="preparing"><span /><span /><span /><small>Preparing the {code ? "code" : "answer"}...</small></div>
      : <div className="answer-body">
        <div className="read-marker"><i />{code ? "START TYPING" : "START READING"}</div>
        {code ? <pre><code><StreamText text={codeExample} progress={progress} /></code></pre>
          : <p><StreamText text={answer} progress={progress} /></p>}
        <div className={"stop-marker" + (!done ? " pending" : "")}><i />{code ? "STOP TYPING" : "STOP READING"}</div>
      </div>}
  </div>;
}

function Transcript({ text, progress, wave = false }: { text: string; progress: number; wave?: boolean }) {
  return <div className="product-transcript"><div><span><Headphones size={13} /> Live transcript</span>{wave && <Wave active />}</div><p><StreamText text={text} progress={progress} /></p></div>;
}

function SourceCode({ stage }: { stage: number }) {
  return <div className={"source-window" + (stage >= 1 ? " context-selected" : "")}>
    <div className="source-bar"><span><Braces size={13} /> payments.ts</span><span>{stage >= 1 ? <><Check size={12} /> Screen context</> : "Visible on your screen"}</span></div>
    <div className="code-lines">
      <div><i>1</i><code><b>for</b> (let attempt = 0; attempt &lt; 3; attempt++) {"{"}</code></div>
      <div className={stage >= 1 ? "line-highlight" : ""}><i>2</i><code>  const key = <em>crypto.randomUUID()</em>;</code></div>
      <div><i>3</i><code>  await charge(customer, {"{ key }"});</code></div>
      <div><i>4</i><code>{"}"}</code></div>
    </div>
  </div>;
}

function SelectionSource({ time, stage }: { time: number; stage: number }) {
  const width = 12 + clamp((time - 450) / 2100) * 88;
  return <div className="selection-source">
    <div className="source-bar"><span><FileText size={13} /> Channel report</span><span><ScanSearch size={13} /> Select area</span></div>
    <div className="report-content">
      <div className="report-muted"><span>Campaign overview</span><span>September</span></div>
      <div className={"selection-target" + (stage >= 1 ? " selected" : "")}>
        <p>Which channel has the lowest cost per signup?</p>
        <table><thead><tr><th>Channel</th><th>Spend</th><th>Signups</th></tr></thead><tbody>
          <tr><td>Search</td><td>$1,200</td><td>120</td></tr>
          <tr><td>Social</td><td>$900</td><td>60</td></tr>
          <tr className={stage === 2 ? "winner" : ""}><td>Referrals</td><td>$600</td><td>120</td></tr>
        </tbody></table>
        <div className="selection-outline" style={{ width: width + "%", height: (stage >= 1 ? 100 : 18 + clamp((time - 450) / 2100) * 82) + "%" }}>
          <i className="selection-corner tl" /><i className="selection-corner tr" /><i className="selection-corner bl" /><i className="selection-corner br" />
          {stage === 0 && <MousePointer2 className="selection-cursor" size={22} fill="white" />}
        </div>
      </div>
    </div>
  </div>;
}

function CVSource({ stage }: { stage: number }) {
  return <div className="cv-source">
    <div className="source-bar"><span><FileText size={13} /> Alex_Morgan_CV.pdf</span><span><Check size={12} /> CV ready</span></div>
    <div className="cv-example">
      <div className="profile-identity"><span>AM</span><div><strong>Alex Morgan</strong><small>Target role · Product manager</small></div></div>
      <div className={"cv-excerpt" + (stage >= 1 ? " context-selected" : "")}><span><FileText size={13} /> Work experience · Northstar</span><p>Led an onboarding redesign with design and engineering. Reduced new-user drop-off by <mark>18%</mark>.</p></div>
      <div className="cv-details"><span>Product discovery</span><span>Cross-functional leadership</span></div>
    </div>
  </div>;
}

function DemoScene({ id, time, stage, playing }: { id: DemoId; time: number; stage: number; playing: boolean }) {
  const data = demos[id];
  const answerProgress = clamp((time - 6400) / 3300);
  const questionProgress = clamp((time - 300) / 2200);
  if (id === "live") return <div className="live-scene">
    <div className="conversation-source"><span><Headphones size={14} /> Example conversation</span><Wave active={playing && stage === 0} /><span className="conversation-state">{stage === 0 ? "Question being asked" : "Question detected"}</span></div>
    <ProductFrame full>
      <div className="feed-heading"><span>Response feed</span><strong>{stage === 0 ? "Listening for a question" : "Latest answer first"}</strong></div>
      <Transcript text={data.question} progress={questionProgress} />
      {stage >= 1 ? <Response {...data} stage={stage} progress={answerProgress} /> : <div className="product-empty"><AudioLines size={26} /><strong>Your next answer starts here.</strong><span>Listening for a question or instruction...</span></div>}
    </ProductFrame>
  </div>;
  if (id === "followup") return <ProductFrame>
    <div className="feed-heading"><span>Response feed</span><strong>Latest answer first</strong></div>
    {stage >= 1 && <><div className="context-note"><MessagesLabel /> Continuing the conversation</div><Response {...data} stage={stage} progress={answerProgress} /></>}
    <Response question={demos.live.question} answer="I'd use an idempotency key and reuse it for retries, so one payment can't be charged twice." stage={2} progress={1} previous />
    {stage === 0 && <div className="followup-prompt"><Headphones size={16} /><span>Then the conversation continues...</span></div>}
  </ProductFrame>;
  if (id === "screen") return <div className="context-scene">
    <SourceCode stage={stage} />
    <div className="context-connection"><Monitor size={13} /><span>Screen Assist</span><b>Smart</b><span className="connection-line" /></div>
    <ProductFrame>
      {stage === 0 ? <><Transcript text={data.question} progress={questionProgress} /><div className="screen-pending">This question needs the screen for context.</div></> : <Response {...data} stage={stage} progress={answerProgress} />}
    </ProductFrame>
  </div>;
  if (id === "selection") return <div className="context-scene">
    <SelectionSource time={time} stage={stage} />
    <div className="selection-result">
      <div className="selection-result-label"><span className="mini-brand"><AudioLines size={15} /></span><strong>Autopilot</strong><span>{stage < 2 ? "Selected area" : "Answered"}</span></div>
      {stage === 2 ? <p><StreamText text={data.answer} progress={answerProgress} /></p> : <p className="result-placeholder">{stage === 0 ? "Select the question and the details it depends on." : "Reading the selected question and table..."}</p>}
    </div>
  </div>;
  if (id === "code") return <ProductFrame mode="auto" active={stage > 0}>
    <div className="demo-session">
      <div><small>Task handling</small><div className="demo-detection"><span><MessageSquareText size={13} /> Auto</span><span className={time >= 900 ? "detected" : ""}><Braces size={13} />{time >= 900 ? "Code detected" : "Listening"}</span></div></div>
      <div><small>Language</small><span className={"demo-language" + (time > 1500 ? " chosen" : "")}>TypeScript <ChevronDown size={13} /></span></div>
    </div>
    {stage >= 1 ? <Response {...data} stage={stage} progress={answerProgress} code /> : <div className="product-empty"><Braces size={28} /><strong>Code when you need it.</strong><span>Listening for a coding instruction...</span></div>}
  </ProductFrame>;
  return <div className="context-scene">
    <CVSource stage={stage} />
    <div className="context-connection"><FileText size={13} /><span>Matching the question to your CV</span><b>{stage >= 1 ? "1 relevant result" : "CV connected"}</b><span className="connection-line" /></div>
    <ProductFrame>
      {stage === 0 ? <Transcript text={data.question} progress={questionProgress} /> : <Response {...data} stage={stage} progress={answerProgress} />}
    </ProductFrame>
  </div>;
}

function MessagesLabel() { return <MessageSquareText size={13} />; }

export function FeatureDemo({ id, hero = false }: { id: DemoId; hero?: boolean }) {
  const timeline = useDemoTimeline();
  const { time, stage, playing, finished, paused, reduced } = timeline;
  const feature = features.find(item => item.id === id)!;
  const data = demos[id];
  const playLabel = finished ? "Replay " : paused ? "Play " : "Pause ";
  return <figure ref={timeline.ref} className={"demo demo-" + id + (hero ? " hero-demo" : "") + (playing ? " is-playing" : " is-paused")}
    aria-label={feature.label + " demonstration"} data-demo={id} data-stage={stage} data-playing={playing}>
    <div className="demo-heading"><span><feature.icon size={15} />{feature.label}</span><span>Illustrative demo</span></div>
    <div className="demo-visual" aria-hidden="true"><DemoScene id={id} time={time} stage={stage} playing={playing} /></div>
    <figcaption className="demo-caption" id={id + "-caption"}>{data.captions[stage]}</figcaption>
    <div className="demo-controls">
      <div className="demo-steps" aria-label={feature.label + " demo steps"}>
        {data.steps.map((label, index) => {
          const start = [0, 3500, 6200][index];
          const end = [3500, 6200, DEMO_DURATION][index];
          return <button key={label} type="button" onClick={() => timeline.seek(index)}
            aria-label={feature.label + ": " + label} aria-pressed={stage === index}
            className={stage === index ? "active" : ""} style={{ "--step-progress": clamp((time - start) / (end - start)) } as CSSProperties}>
            <span className="step-track"><i /></span><span><b>{index + 1}</b>{label}</span>
          </button>;
        })}
      </div>
      {!reduced && <div className="playback-controls">
        <button className="icon-button" type="button" onClick={timeline.toggle} aria-label={playLabel + feature.label + " demo"} title={playLabel + "demo"}>
          {finished ? <RotateCcw size={16} /> : paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
        {!finished && <button className="icon-button replay-button" type="button" onClick={timeline.replay} aria-label={"Replay " + feature.label + " demo"} title="Replay demo"><RotateCcw size={15} /></button>}
      </div>}
    </div>
    <span className="sr-only">Example question: {data.question} Example answer: {id === "code" ? codeExample : data.answer}</span>
  </figure>;
}

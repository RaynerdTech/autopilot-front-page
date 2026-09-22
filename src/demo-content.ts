import { AudioLines, Braces, FileText, ScanSearch, MessagesSquare, MonitorUp } from "lucide-react";

export type DemoId = "live" | "followup" | "screen" | "selection" | "code" | "cv";

export const features = [
  { id: "live", label: "Live answers", icon: AudioLines },
  { id: "followup", label: "Follow-ups", icon: MessagesSquare },
  { id: "screen", label: "Screen Assist", icon: MonitorUp },
  { id: "selection", label: "Select an area", icon: ScanSearch },
  { id: "code", label: "Coding tasks", icon: Braces },
  { id: "cv", label: "Answers from your CV", icon: FileText },
] as const;

export const demos: Record<DemoId, {
  steps: [string, string, string];
  captions: [string, string, string];
  question: string;
  answer: string;
}> = {
  live: {
    steps: ["Listen", "Detect", "Answer"],
    captions: ["The conversation becomes a live transcript.", "A question is detected automatically.", "A response appears while the conversation continues."],
    question: "How would you prevent duplicate payments?",
    answer: "I'd use an idempotency key for each payment and reuse it for retries. The server can then return the original result instead of charging the customer twice.",
  },
  followup: {
    steps: ["First question", "Follow-up", "Connected answer"],
    captions: ["The previous question and answer stay in context.", "A short follow-up doesn't need the whole story again.", "The next response builds on what was just discussed."],
    question: "Why not just disable the button?",
    answer: "That helps with repeat clicks, but a network retry can still send the same payment again. I'd keep the button disabled and also use server-side idempotency to prevent a second charge.",
  },
  screen: {
    steps: ["Question", "Screen context", "Explanation"],
    captions: ["The question refers to something on the screen.", "Smart mode adds the visible context when it's needed.", "The response explains the issue in the visible code."],
    question: "Why does the retry create a second charge?",
    answer: "The retry creates a new idempotency key, so the server sees a new payment. I'd generate the key once, before the retry loop, and reuse it for every attempt.",
  },
  selection: {
    steps: ["Select area", "Read selection", "Answer"],
    captions: ["A selection isolates the part of the screen that matters.", "The selected question and table are sent for analysis.", "Autopilot answers from the highlighted information."],
    question: "Which channel has the lowest cost per signup?",
    answer: "Referrals have the lowest cost per signup at $5, compared with $10 for search and $15 for social. I'd check lead quality before moving more budget there.",
  },
  code: {
    steps: ["Auto detects", "Instruction", "Readable code"],
    captions: ["Stay in Auto while the conversation moves into a coding task.", "Autopilot detects the programming instruction without a mode switch.", "The response includes readable code in the selected language."],
    question: "Remove duplicate IDs and keep the original order.",
    answer: "A Set keeps the first occurrence of each value, preserving insertion order.",
  },
  cv: {
    steps: ["Add your CV", "Match the question", "Answer from experience"],
    captions: ["Add your CV once in your profile.", "Autopilot finds the experience that fits the question.", "A clear answer appears using real details from your CV."],
    question: "Tell me about a product improvement you led.",
    answer: "I led an onboarding redesign after identifying where new users were dropping off. I worked with design and engineering to simplify the flow, which reduced onboarding drop-off by 18%.",
  },
};

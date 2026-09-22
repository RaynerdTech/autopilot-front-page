import { useEffect, useRef, useState } from "react";

export const DEMO_DURATION = 12000;
export const STEP_TIMES = [0, 3500, 6200] as const;

export function useDemoTimeline() {
  const ref = useRef<HTMLElement>(null);
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(query.matches);
    query.addEventListener("change", change);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => {
      query.removeEventListener("change", change);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (reduced) { setTime(DEMO_DURATION); setPaused(true); }
  }, [reduced]);

  const finished = time >= DEMO_DURATION;
  const playing = visible && pageVisible && !paused && !finished && !reduced;

  useEffect(() => {
    if (!playing) return;
    let previous = performance.now();
    const interval = window.setInterval(() => {
      const now = performance.now();
      const elapsed = now - previous;
      previous = now;
      setTime(current => Math.min(DEMO_DURATION, current + elapsed));
    }, 80);
    return () => window.clearInterval(interval);
  }, [playing]);

  const stage = time < STEP_TIMES[1] ? 0 : time < STEP_TIMES[2] ? 1 : 2;
  const seek = (index: number) => {
    setTime(index === 2 ? DEMO_DURATION : STEP_TIMES[index] + 1700);
    setPaused(true);
  };
  const replay = () => { setTime(reduced ? DEMO_DURATION : 0); setPaused(reduced); };
  const toggle = () => {
    if (finished) replay();
    else setPaused(value => !value);
  };

  return { ref, time, stage, playing, paused, finished, reduced, seek, replay, toggle };
}

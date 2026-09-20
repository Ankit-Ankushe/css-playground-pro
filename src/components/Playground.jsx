import { useEffect, useRef } from "react";
import { CheckCircle2, Target } from "lucide-react";
import { buildPreviewDocument } from "../utils/cssSandbox";
import { validateLesson } from "../utils/cssValidator";

export default function Playground({ lesson, css, result, onResult }) {
  const frameRef = useRef(null);
  const doc = buildPreviewDocument({ userCss: css, stage: lesson.stage, target: lesson.target });

  useEffect(() => {
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      const frame = frameRef.current;
      const inner = frame?.contentDocument;
      if (!inner) return;
      onResult(validateLesson(inner, lesson));
    };
    const timers = [80, 320, 700].map((ms) => window.setTimeout(measure, ms));
    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [doc, lesson, onResult]);

  const tone = result.passed
    ? "border-success/50 bg-success/12 text-success-foreground"
    : result.close
      ? "border-warning/60 bg-warning/15 text-warning-foreground"
      : "border-border bg-muted text-muted-foreground";

  return (
    <section className="card-soft flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-5 py-3">
        <h3 className="flex items-center gap-2 text-base font-bold">
          <Target className="size-4 text-primary" />
          Live Preview
        </h3>
        <span className="text-xs font-semibold text-muted-foreground">
          live preview · updates as you type
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center bg-playground p-3 sm:p-4">
        <iframe
          ref={frameRef}
          title="CSS playground preview"
          sandbox="allow-same-origin"
          srcDoc={doc}
          className="h-[400px] w-full rounded-xl border-0 bg-transparent"
        />
      </div>

      <div className={`flex shrink-0 items-start gap-2 border-t px-5 py-3 text-sm font-semibold ${tone}`}>
        {result.passed && <CheckCircle2 className="mt-0.5 size-4 shrink-0" />}
        <p>{result.message}</p>
      </div>
    </section>
  );
}

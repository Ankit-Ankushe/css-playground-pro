import { lazy, Suspense } from "react";
import { AlertTriangle, Code2, RotateCcw, Wand2 } from "lucide-react";
import { ClientOnly } from "@tanstack/react-router";

const CodeMirrorField = lazy(() => import("./CodeMirrorField"));

function EditorFallback({ value }) {
  return (
    <pre className="h-[400px] overflow-auto bg-editor p-4 font-mono text-sm text-editor-foreground">
      {value}
    </pre>
  );
}

export default function CodeEditor({
  value,
  onChange,
  onReset,
  onAutoFill,
  error,
  targetClass = "red-box",
}) {
  return (
    <section className="card-soft flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-5 py-3">
        <h3 className="flex items-center gap-2 text-base font-bold">
          <Code2 className="size-4 text-primary" />
          Your CSS
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAutoFill}
            className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            title="Auto-fill the solution code"
          >
            <Wand2 className="size-3.5" />
            <span>Auto-fill answer</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            title="Reset code to default template"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset code</span>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-editor">
        <ClientOnly fallback={<EditorFallback value={value} />}>
          <Suspense fallback={<EditorFallback value={value} />}>
            <CodeMirrorField value={value} onChange={onChange} />
          </Suspense>
        </ClientOnly>
      </div>

      {error ? (
        <p className="flex shrink-0 items-start gap-2 border-t border-destructive/40 bg-destructive/10 px-5 py-3 text-sm font-semibold text-destructive">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : (
        <p className="shrink-0 border-t border-border px-5 py-3 text-xs text-muted-foreground">
          Only the <span className="font-mono font-semibold">.{targetClass}</span> rules are yours — the HTML stays
          locked, and your CSS only affects the playground.
        </p>
      )}
    </section>
  );
}

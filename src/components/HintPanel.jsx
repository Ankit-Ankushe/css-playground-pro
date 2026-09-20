import { Lightbulb, Wand2 } from "lucide-react";

export default function HintPanel({ hints, revealed, onReveal, onAutoFill }) {
  const hasMore = revealed < hints.length;
  return (
    <section className="card-soft p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-base font-bold">
          <Lightbulb className="size-4 text-accent" />
          Stuck? Grab a hint
        </h3>
        <div className="flex items-center gap-2">
          {revealed > 0 && (
            <button
              type="button"
              onClick={onAutoFill}
              className="flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              title="Auto-fill the complete solution"
            >
              <Wand2 className="size-3" />
              Auto-fill
            </button>
          )}
          <button
            type="button"
            onClick={onReveal}
            disabled={!hasMore}
            className="rounded-full bg-accent px-3 py-1.5 text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {revealed === 0 ? "Show hint" : hasMore ? "Next hint" : "No more hints"}
          </button>
        </div>
      </div>

      {revealed === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Try it yourself first — hints unlock one at a time.
        </p>
      ) : (
        <ol className="mt-3 space-y-2">
          {hints.slice(0, revealed).map((hint, i) => (
            <li
              key={hint}
              className="animate-pop-in rounded-lg bg-secondary/70 p-3 text-sm leading-relaxed text-secondary-foreground"
            >
              <span className="font-bold">Hint {i + 1}: </span>
              {hint}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

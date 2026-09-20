import { Check, Circle, Code } from "lucide-react";
import { getHtmlSnippet } from "../utils/cssSandbox";

export default function ChallengeInstructions({ lesson, checks }) {
  const htmlSnippet = getHtmlSnippet(lesson);
  const moduleIndex = lesson.moduleIndex || lesson.index;
  const moduleTotal = lesson.moduleTotal || 10;
  const moduleTitle = lesson.moduleTitle || "Box Placement Quests";

  return (
    <section className="card-soft p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-bold tracking-wider text-primary uppercase">
              {moduleTitle}
            </span>
            <span className="text-xs font-bold text-muted-foreground uppercase">
              · Quest {moduleIndex} of {moduleTotal}
            </span>
            <span className="text-xs font-semibold text-muted-foreground">·</span>
            <span className="text-xs font-semibold text-muted-foreground">{lesson.subtitle}</span>
          </div>
          <h2 className="mt-1.5 text-2xl font-bold sm:text-3xl">{lesson.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {lesson.description}
          </p>
        </div>

        <details className="shrink-0 rounded-xl border border-border bg-muted/60 p-3 text-sm lg:w-80">
          <summary className="flex cursor-pointer select-none items-center gap-2 font-semibold">
            <Code className="size-4 text-muted-foreground" />
            Locked HTML (<span className="font-mono text-xs">.{lesson.targetClass}</span>)
          </summary>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-card/80 p-2.5 font-mono text-xs leading-relaxed text-muted-foreground">
            {htmlSnippet}
          </pre>
        </details>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Challenge Objectives
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {lesson.goals.map((goal, i) => {
            const ok = checks[i]?.ok;
            return (
              <div
                key={goal}
                className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-sm transition-all ${
                  ok
                    ? "border-success/40 bg-success/10 text-success-foreground shadow-xs"
                    : "border-border/80 bg-card/50 text-foreground"
                }`}
              >
                {ok ? (
                  <Check className="mt-0.5 size-4.5 shrink-0 text-success" />
                ) : (
                  <Circle className="mt-0.5 size-4.5 shrink-0 text-muted-foreground/50" />
                )}
                <span className={ok ? "font-semibold" : "text-muted-foreground"}>{goal}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

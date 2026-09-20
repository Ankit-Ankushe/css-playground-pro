import { RotateCcw, Sparkles, Trophy } from "lucide-react";
import ProgressBar from "./ProgressBar";

export default function Header({ lesson, xp, progress, onResetLesson }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl gradient-hero text-primary-foreground shadow-[var(--shadow-pop)]">
            <Sparkles className="size-5" />
          </span>
          <div>
            <h1 className="text-xl leading-none font-bold">CSS Quest</h1>
            <p className="text-xs text-muted-foreground">Learn CSS by playing</p>
          </div>
        </div>

        <div className="hidden min-w-48 flex-1 sm:block">
          <ProgressBar value={progress} label={`Lesson ${lesson.index} of 1`} />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-accent/25 px-3 py-1.5 text-sm font-bold text-accent-foreground">
            <Trophy className="size-4" />
            {xp} XP
          </span>
          <button
            type="button"
            onClick={onResetLesson}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <RotateCcw className="size-4" />
            <span className="hidden sm:inline">Reset lesson</span>
          </button>
        </div>

        <div className="w-full sm:hidden">
          <ProgressBar value={progress} label={`Lesson ${lesson.index} of 1`} />
        </div>
      </div>
    </header>
  );
}

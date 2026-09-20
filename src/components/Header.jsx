import { useEffect, useRef } from "react";
import {
  Box,
  ChevronLeft,
  ChevronRight,
  Grid,
  Layout,
  Lock,
  RotateCcw,
  Sparkles,
  Trophy,
  Wand2,
  Zap,
} from "lucide-react";
import ProgressBar from "./ProgressBar";
import { MODULES } from "../lessons/quests";

export default function Header({
  lesson,
  xp,
  onResetLesson,
  onPrevLesson,
  onNextLesson,
  canPrev,
  canNext,
  completedQuests = {},
  autofilledQuests = {},
  onSelectQuestInModule,
  onSwitchModule,
  isPart2Unlocked = false,
  isPart3Unlocked = false,
  isPart4Unlocked = false,
  isPart5Unlocked = false,
}) {
  const currentModuleId = lesson.moduleId || "box-placement";
  const currentModule = MODULES.find((m) => m.id === currentModuleId) || MODULES[0];
  const moduleScrollRef = useRef(null);

  const scrollModules = (direction) => {
    if (moduleScrollRef.current) {
      const scrollAmount = direction === "left" ? -140 : 140;
      moduleScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (moduleScrollRef.current) {
      const activeBtn = moduleScrollRef.current.querySelector('[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [currentModuleId]);

  // Active module stats
  const completedInCurrentModule = currentModule.quests.filter(
    (q) => completedQuests[q.id] || autofilledQuests[q.id],
  ).length;
  const moduleProgress = (completedInCurrentModule / currentModule.quests.length) * 100;

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl gradient-hero text-primary-foreground shadow-[var(--shadow-pop)]">
            <Sparkles className="size-5" />
          </span>
          <div>
            <h1 className="text-xl leading-none font-bold">CSS Quest</h1>
            <p className="text-xs text-muted-foreground">{currentModule.title}</p>
          </div>
        </div>

        {/* Module Selector Tabs (Horizontally Scrollable - Shows 2 parts at a time) */}
        <div className="flex items-center gap-1 rounded-xl border border-border bg-muted/60 p-1">
          <button
            type="button"
            onClick={() => scrollModules("left")}
            aria-label="Scroll modules left"
            className="grid size-6 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground shrink-0"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          <div
            ref={moduleScrollRef}
            className="flex w-[266px] sm:w-[286px] items-center gap-1.5 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory py-0.5"
          >
            {MODULES.map((m, mIdx) => {
              const isCurrent = m.id === currentModuleId;
              const isLocked =
                (mIdx === 1 && !isPart2Unlocked) ||
                (mIdx === 2 && !isPart3Unlocked) ||
                (mIdx === 3 && !isPart4Unlocked) ||
                (mIdx === 4 && !isPart5Unlocked);
              const completedCount = m.quests.filter(
                (q) => completedQuests[q.id] || autofilledQuests[q.id],
              ).length;

              return (
                <button
                  key={m.id}
                  data-active={isCurrent}
                  type="button"
                  disabled={isLocked}
                  onClick={() => onSwitchModule(m.id)}
                  className={`flex w-[128px] sm:w-[138px] shrink-0 snap-start items-center justify-between gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                    isCurrent
                      ? "bg-card text-foreground shadow-xs ring-1 ring-border"
                      : isLocked
                        ? "cursor-not-allowed opacity-50 text-muted-foreground"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                  title={
                    isLocked
                      ? mIdx === 1
                        ? "Complete Part 1 to unlock Part 2: Flexbox Quests"
                        : mIdx === 2
                          ? "Complete Part 2 to unlock Part 3: CSS Grid Mastery"
                          : mIdx === 3
                            ? "Complete Part 3 to unlock Part 4: Motion & Transformations"
                            : "Complete Part 4 to unlock Part 5: Selector Sorcery"
                      : m.title
                  }
                >
                  <span className="flex items-center gap-1.5 truncate">
                    {isLocked ? (
                      <Lock className="size-3 text-muted-foreground shrink-0" />
                    ) : m.id === "selector-sorcery" ? (
                      <Wand2 className="size-3.5 text-primary shrink-0" />
                    ) : m.id === "motion-transforms" ? (
                      <Zap className="size-3.5 text-primary shrink-0" />
                    ) : m.id === "grid-mastery" ? (
                      <Grid className="size-3.5 text-primary shrink-0" />
                    ) : m.id === "flexbox-fundamentals" ? (
                      <Layout className="size-3.5 text-primary shrink-0" />
                    ) : (
                      <Box className="size-3.5 text-primary shrink-0" />
                    )}
                    <span className="truncate">{m.shortTitle}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.2 text-[10px] font-semibold text-muted-foreground">
                    {completedCount}/10
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollModules("right")}
            aria-label="Scroll modules right"
            className="grid size-6 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground shrink-0"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>

        {/* 10 Quest Buttons for the ACTIVE Part ONLY */}
        <div className="hidden items-center gap-1.5 md:flex">
          <button
            type="button"
            onClick={onPrevLesson}
            disabled={!canPrev}
            aria-label="Previous quest"
            className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-1">
            {currentModule.quests.map((q, idx) => {
              const questNum = idx + 1;
              const isActive = lesson.id === q.id;
              const isAutofilled = !!autofilledQuests[q.id];
              const isCompleted = !!completedQuests[q.id];

              let badgeStyle =
                "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground";

              if (isActive) {
                if (isAutofilled) {
                  badgeStyle =
                    "border-2 border-destructive bg-destructive/20 text-destructive font-bold ring-2 ring-destructive/40 shadow-xs";
                } else {
                  badgeStyle =
                    "bg-primary text-primary-foreground shadow-xs ring-2 ring-primary/40";
                }
              } else if (isAutofilled) {
                badgeStyle =
                  "border border-destructive/50 bg-destructive/15 text-destructive font-bold hover:bg-destructive/25";
              } else if (isCompleted) {
                badgeStyle =
                  "border border-success/40 bg-success/15 text-success font-semibold hover:bg-success/25";
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => onSelectQuestInModule(idx)}
                  className={`grid size-7.5 place-items-center rounded-lg text-xs font-bold transition-all ${badgeStyle}`}
                  title={`${q.title}: ${
                    isAutofilled ? "Auto-filled (0 XP)" : isCompleted ? "Completed" : "Incomplete"
                  }`}
                >
                  {questNum}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onNextLesson}
            disabled={!canNext}
            aria-label="Next quest"
            className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Progress for Current Part & Total XP */}
        <div className="hidden min-w-36 flex-1 max-w-xs xl:block">
          <ProgressBar value={moduleProgress} label={`Quest ${lesson.moduleIndex} of 10`} />
        </div>

        {/* XP & Reset */}
        <div className="flex items-center gap-2">
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
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Mobile Quick Navigation */}
        <div className="flex w-full items-center justify-between gap-2 md:hidden">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onPrevLesson}
              disabled={!canPrev}
              className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-muted-foreground disabled:opacity-40"
            >
              Prev
            </button>
            <span
              className={`rounded px-1.5 py-0.5 text-xs font-bold ${
                autofilledQuests[lesson.id]
                  ? "bg-destructive/15 text-destructive"
                  : completedQuests[lesson.id]
                    ? "bg-success/15 text-success"
                    : "text-foreground"
              }`}
            >
              Quest {lesson.moduleIndex}/10
            </span>
            <button
              type="button"
              onClick={onNextLesson}
              disabled={!canNext}
              className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-muted-foreground disabled:opacity-40"
            >
              Next
            </button>
          </div>
          <div className="flex-1 max-w-[150px]">
            <ProgressBar value={moduleProgress} label="" />
          </div>
        </div>
      </div>
    </header>
  );
}

import { ArrowRight, Crown, Layout, PartyPopper, Wand2, Zap } from "lucide-react";

const COLORS = ["#38bdf8", "#f59e0b", "#22c55e", "#ef4444", "#a855f7"];

function Confetti() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${(i * 97) % 100}%`,
            background: COLORS[i % COLORS.length],
            animationDelay: `${(i % 10) * 0.12}s`,
            "--drift": `${((i % 7) - 3) * 30}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function SuccessModal({
  open,
  lesson,
  totalLessons = 50,
  isAutofilled = false,
  onNextLesson,
  onReplay,
  onClose,
}) {
  if (!open) return null;

  const isFinalGlobalQuest = lesson.index === totalLessons;
  const isEndOfModule1 = lesson.index === 10;
  const isEndOfModule2 = lesson.index === 20;
  const isEndOfModule3 = lesson.index === 30;
  const isEndOfModule4 = lesson.index === 40;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/45 p-4 backdrop-blur-sm">
      {!isAutofilled && <Confetti />}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quest complete"
        className="animate-pop-in card-soft relative w-full max-w-md p-7 text-center"
      >
        <span
          className={`mx-auto grid size-14 place-items-center rounded-2xl text-primary-foreground ${
            isAutofilled ? "bg-destructive/90 shadow-md" : "gradient-hero"
          }`}
        >
          {isAutofilled ? (
            <Wand2 className="size-7 text-destructive-foreground" />
          ) : isFinalGlobalQuest ? (
            <Crown className="size-7" />
          ) : isEndOfModule4 ? (
            <Wand2 className="size-7" />
          ) : isEndOfModule3 ? (
            <Zap className="size-7" />
          ) : isEndOfModule1 || isEndOfModule2 ? (
            <Layout className="size-7" />
          ) : (
            <PartyPopper className="size-7" />
          )}
        </span>

        <h2 className="mt-4 text-2xl font-bold">
          {isAutofilled
            ? `Quest ${lesson.index} Auto-Filled`
            : isFinalGlobalQuest
              ? "Ultimate Grandmaster! 🏆"
              : isEndOfModule4
                ? "Motion Mastered! 🚀✨"
                : isEndOfModule3
                  ? "CSS Grid Mastered! 📐✨"
                  : isEndOfModule2
                    ? "Flexbox Mastered! ⚡✨"
                    : isEndOfModule1
                      ? "Box Placement Mastered! 📦✨"
                      : `Quest ${lesson.index} Complete!`}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {isAutofilled ? (
            <>
              You revealed the answer for{" "}
              <span className="font-bold text-foreground">{lesson.title}</span>.{" "}
              <span className="font-bold text-destructive">0 XP awarded</span> for auto-filling. You
              can replay from scratch anytime to claim{" "}
              <span className="font-bold text-foreground">+{lesson.xp} XP</span>!
            </>
          ) : isFinalGlobalQuest ? (
            <>
              You conquered all{" "}
              <span className="font-bold text-foreground">50 CSS Quests</span> across Box Placement,
              Flexbox, CSS Grid, Motion & Transformations, and Selector Sorcery! You are a certified CSS layout & selector grandmaster!
            </>
          ) : isEndOfModule4 ? (
            <>
              You finished all 10 Motion & Transformations quests! Next up:{" "}
              <span className="font-bold text-foreground">Part 5: Selector Sorcery & Pseudo-Elements</span>. Ready
              to master pseudo-elements and advanced selectors?
            </>
          ) : isEndOfModule3 ? (
            <>
              You finished all 10 CSS Grid quests! Next up:{" "}
              <span className="font-bold text-foreground">Part 4: Motion & Transformations</span>. Ready
              to animate and transform elements?
            </>
          ) : isEndOfModule2 ? (
            <>
              You finished all 10 Flexbox Fundamentals quests! Next up:{" "}
              <span className="font-bold text-foreground">Part 3: CSS Grid Mastery</span>. Ready to
              conquer 2D layouts?
            </>
          ) : isEndOfModule1 ? (
            <>
              You finished all 10 Box Placement quests! Next up:{" "}
              <span className="font-bold text-foreground">Part 2: Flexbox Fundamentals</span>. Ready
              to unlock flex layout?
            </>
          ) : (
            <>
              You solved <span className="font-bold text-foreground">{lesson.title}</span> perfectly
              and earned <span className="font-bold text-foreground">+{lesson.xp} XP</span>.
            </>
          )}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {!isFinalGlobalQuest ? (
            <button
              type="button"
              onClick={onNextLesson}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {isEndOfModule4
                ? "Start Selector Quests"
                : isEndOfModule3
                  ? "Start Motion Quests"
                  : isEndOfModule2
                    ? "Start CSS Grid Quests"
                    : isEndOfModule1
                      ? "Start Flexbox Quests"
                      : "Next Quest"}
              <ArrowRight className="size-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {isFinalGlobalQuest ? "View Board" : "Keep Exploring"}
          </button>
          <button
            type="button"
            onClick={onReplay}
            className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Try Yourself (For XP)
          </button>
        </div>
      </div>
    </div>
  );
}

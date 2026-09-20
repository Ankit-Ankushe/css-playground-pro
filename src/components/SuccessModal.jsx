import { PartyPopper } from "lucide-react";

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

export default function SuccessModal({ open, lesson, onReplay, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/45 p-4 backdrop-blur-sm">
      <Confetti />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Lesson complete"
        className="animate-pop-in card-soft relative w-full max-w-md p-7 text-center"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-2xl gradient-hero text-primary-foreground">
          <PartyPopper className="size-7" />
        </span>
        <h2 className="mt-4 text-2xl font-bold">Mission complete!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You placed the red box perfectly and earned{" "}
          <span className="font-bold text-foreground">{lesson.xp} XP</span>. You just used class
          selectors, sizing, colors and absolute positioning — real CSS.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Keep exploring
          </button>
          <button
            type="button"
            onClick={onReplay}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Try again from scratch
          </button>
        </div>
      </div>
    </div>
  );
}

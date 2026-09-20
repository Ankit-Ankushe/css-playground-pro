import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import Header from "./Header";
import ChallengeInstructions from "./ChallengeInstructions";
import Playground from "./Playground";
import CodeEditor from "./CodeEditor";
import HintPanel from "./HintPanel";
import SuccessModal from "./SuccessModal";
import { findCssError } from "../utils/cssSandbox";
import lesson1 from "../lessons/lesson1";

const EMPTY_RESULT = { checks: [], passed: false, close: false, message: lesson1.intro };

export default function LessonLayout() {
  const lesson = lesson1;
  const [code, setCode] = useState(lesson.starterCss);
  const [result, setResult] = useState(EMPTY_RESULT);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [xp, setXp] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completed, setCompleted] = useState(false);

  const error = useMemo(() => findCssError(code), [code]);
  const handleResult = useCallback((next) => setResult(next), []);

  useEffect(() => {
    if (result.passed && !completed) {
      setCompleted(true);
      setShowSuccess(true);
      setXp((prev) => prev + lesson.xp);
    }
  }, [result.passed, completed, lesson.xp]);

  const resetCode = () => {
    setCode(lesson.starterCss);
    setResult(EMPTY_RESULT);
  };

  const resetLesson = () => {
    resetCode();
    setHintsRevealed(0);
    setCompleted(false);
    setShowSuccess(false);
    setXp(0);
  };

  const doneChecks = result.checks.filter((c) => c.ok).length;
  const progress = completed ? 100 : (doneChecks / 3) * 100;

  return (
    <div className="min-h-screen">
      <Header lesson={lesson} xp={xp} progress={progress} onResetLesson={resetLesson} />

      <main className="mx-auto w-full max-w-[1600px] space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        {/* Top: Full-width Question / Instructions */}
        <ChallengeInstructions lesson={lesson} checks={result.checks} />

        {/* Bottom 2 divs: Code Editor and Live Preview */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
          <CodeEditor value={code} onChange={setCode} onReset={resetCode} error={error} />
          <Playground lesson={lesson} css={code} result={result} onResult={handleResult} />
        </div>

        {/* Action / Helper row: Hints and Next Lesson */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
          <HintPanel
            hints={lesson.hints}
            revealed={hintsRevealed}
            onReveal={() => setHintsRevealed((n) => Math.min(n + 1, lesson.hints.length))}
          />

          <div className="card-soft flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="text-sm font-bold">Next lesson</p>
              <p className="text-xs text-muted-foreground">
                {completed
                  ? "More quests are on the way — you're ready for them!"
                  : "Finish this challenge to unlock what's next."}
              </p>
            </div>
            <button
              type="button"
              disabled={!completed}
              className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45"
            >
              Next lesson
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </main>

      <SuccessModal
        open={showSuccess}
        lesson={lesson}
        onClose={() => setShowSuccess(false)}
        onReplay={resetLesson}
      />
    </div>
  );
}

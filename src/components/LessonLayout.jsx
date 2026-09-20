import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, Wand2 } from "lucide-react";
import Header from "./Header";
import ChallengeInstructions from "./ChallengeInstructions";
import Playground from "./Playground";
import CodeEditor from "./CodeEditor";
import HintPanel from "./HintPanel";
import SuccessModal from "./SuccessModal";
import Footer from "./Footer";
import { findCssError } from "../utils/cssSandbox";
import { QUESTS } from "../lessons/quests";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";

export default function LessonLayout() {
  const [questIndex, setQuestIndex] = useState(0);
  const lesson = QUESTS[questIndex] || QUESTS[0];

  // Store code per quest so learner code is saved when switching quests
  const [userCodes, setUserCodes] = useState(() => {
    const initial = {};
    QUESTS.forEach((q) => {
      initial[q.id] = q.starterCss;
    });
    return initial;
  });

  const [completedQuests, setCompletedQuests] = useState({});
  const [autofilledQuests, setAutofilledQuests] = useState({});
  const [hintsRevealed, setHintsRevealed] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const currentCode = userCodes[lesson.id] ?? lesson.starterCss;
  const currentHintsCount = hintsRevealed[lesson.id] ?? 0;
  const isCompleted = !!completedQuests[lesson.id];
  const isAutofilled = !!autofilledQuests[lesson.id];

  // Part 2 unlocks once Quest 10 is completed/autofilled or visited
  const isPart2Unlocked =
    !!completedQuests["quest-10"] || !!autofilledQuests["quest-10"] || questIndex >= 10;

  // Part 3 unlocks once Quest 20 is completed/autofilled or visited
  const isPart3Unlocked =
    !!completedQuests["quest-20"] || !!autofilledQuests["quest-20"] || questIndex >= 20;

  // Part 4 unlocks once Quest 30 is completed/autofilled or visited
  const isPart4Unlocked =
    !!completedQuests["quest-30"] || !!autofilledQuests["quest-30"] || questIndex >= 30;

  // Part 5 unlocks once Quest 40 is completed/autofilled or visited
  const isPart5Unlocked =
    !!completedQuests["quest-40"] || !!autofilledQuests["quest-40"] || questIndex >= 40;

  const [result, setResult] = useState(() => ({
    lessonId: lesson.id,
    checks: lesson.goals.map((g) => ({ label: g, ok: false })),
    passed: false,
    close: false,
    message: lesson.intro,
  }));

  const error = useMemo(() => findCssError(currentCode), [currentCode]);

  // Only accept validation results matching the currently active quest
  const handleResult = useCallback(
    (next) => {
      if (next && next.lessonId === lesson.id) {
        setResult(next);
      }
    },
    [lesson.id],
  );

  // Track completion only when the validation result belongs to this quest
  useEffect(() => {
    if (result.lessonId === lesson.id && result.passed && !completedQuests[lesson.id]) {
      setCompletedQuests((prev) => ({ ...prev, [lesson.id]: true }));
      setShowSuccess(true);
    }
  }, [result.lessonId, result.passed, lesson.id, completedQuests]);

  // Calculate total XP (0 XP for auto-filled quests)
  const totalXp = useMemo(() => {
    return QUESTS.reduce((acc, q) => {
      if (completedQuests[q.id] && !autofilledQuests[q.id]) {
        return acc + q.xp;
      }
      return acc;
    }, 0);
  }, [completedQuests, autofilledQuests]);

  const handleCodeChange = (newCode) => {
    setUserCodes((prev) => ({ ...prev, [lesson.id]: newCode }));
  };

  const handleAutoFill = () => {
    if (lesson.solution) {
      setAutofilledQuests((prev) => ({ ...prev, [lesson.id]: true }));
      setUserCodes((prev) => ({ ...prev, [lesson.id]: lesson.solution }));
    }
  };

  const resetCode = () => {
    setUserCodes((prev) => ({ ...prev, [lesson.id]: lesson.starterCss }));
    setResult({
      lessonId: lesson.id,
      checks: lesson.goals.map((g) => ({ label: g, ok: false })),
      passed: false,
      close: false,
      message: lesson.intro,
    });
  };

  const resetLesson = () => {
    resetCode();
    setHintsRevealed((prev) => ({ ...prev, [lesson.id]: 0 }));
    setAutofilledQuests((prev) => {
      const next = { ...prev };
      delete next[lesson.id];
      return next;
    });
    setCompletedQuests((prev) => {
      const next = { ...prev };
      delete next[lesson.id];
      return next;
    });
    setShowSuccess(false);
  };

  const handleNextQuest = () => {
    if (questIndex < QUESTS.length - 1) {
      setShowSuccess(false);
      const nextIndex = questIndex + 1;
      const nextLesson = QUESTS[nextIndex];
      setResult({
        lessonId: nextLesson.id,
        checks: nextLesson.goals.map((g) => ({ label: g, ok: false })),
        passed: false,
        close: false,
        message: nextLesson.intro,
      });
      setQuestIndex(nextIndex);
    }
  };

  const handlePrevQuest = () => {
    if (questIndex > 0) {
      setShowSuccess(false);
      const prevIndex = questIndex - 1;
      const prevLesson = QUESTS[prevIndex];
      setResult({
        lessonId: prevLesson.id,
        checks: prevLesson.goals.map((g) => ({ label: g, ok: false })),
        passed: false,
        close: false,
        message: prevLesson.intro,
      });
      setQuestIndex(prevIndex);
    }
  };

  const handleSelectQuestInModule = (moduleIdx) => {
    let targetGlobalIndex = moduleIdx;
    if (lesson.moduleId === "selector-sorcery") {
      targetGlobalIndex = moduleIdx + 40;
    } else if (lesson.moduleId === "motion-transforms") {
      targetGlobalIndex = moduleIdx + 30;
    } else if (lesson.moduleId === "grid-mastery") {
      targetGlobalIndex = moduleIdx + 20;
    } else if (lesson.moduleId === "flexbox-fundamentals") {
      targetGlobalIndex = moduleIdx + 10;
    }

    if (
      targetGlobalIndex >= 0 &&
      targetGlobalIndex < QUESTS.length &&
      targetGlobalIndex !== questIndex
    ) {
      setShowSuccess(false);
      const targetLesson = QUESTS[targetGlobalIndex];
      setResult({
        lessonId: targetLesson.id,
        checks: targetLesson.goals.map((g) => ({ label: g, ok: false })),
        passed: false,
        close: false,
        message: targetLesson.intro,
      });
      setQuestIndex(targetGlobalIndex);
    }
  };

  const handleSwitchModule = (targetModuleId) => {
    if (targetModuleId === lesson.moduleId) return;

    setShowSuccess(false);
    const targetGlobalIndex =
      targetModuleId === "selector-sorcery"
        ? 40
        : targetModuleId === "motion-transforms"
          ? 30
          : targetModuleId === "grid-mastery"
            ? 20
            : targetModuleId === "flexbox-fundamentals"
              ? 10
              : 0;
    const targetLesson = QUESTS[targetGlobalIndex];
    setResult({
      lessonId: targetLesson.id,
      checks: targetLesson.goals.map((g) => ({ label: g, ok: false })),
      passed: false,
      close: false,
      message: targetLesson.intro,
    });
    setQuestIndex(targetGlobalIndex);
  };

  const isFinalGlobalQuest = questIndex === QUESTS.length - 1;
  const isEndOfModule1 = questIndex === 9; // Quest 10 of Part 1
  const isEndOfModule2 = questIndex === 19; // Quest 20 of Part 2
  const isEndOfModule3 = questIndex === 29; // Quest 30 of Part 3
  const isEndOfModule4 = questIndex === 39; // Quest 40 of Part 4

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header
        lesson={lesson}
        xp={totalXp}
        onResetLesson={resetLesson}
        onPrevLesson={handlePrevQuest}
        onNextLesson={handleNextQuest}
        canPrev={questIndex > 0}
        canNext={questIndex < QUESTS.length - 1}
        completedQuests={completedQuests}
        autofilledQuests={autofilledQuests}
        onSelectQuestInModule={handleSelectQuestInModule}
        onSwitchModule={handleSwitchModule}
        isPart2Unlocked={isPart2Unlocked}
        isPart3Unlocked={isPart3Unlocked}
        isPart4Unlocked={isPart4Unlocked}
        isPart5Unlocked={isPart5Unlocked}
      />

      <main className="mx-auto w-full max-w-[1600px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        {/* Top: Full-width Question / Instructions */}
        <ChallengeInstructions lesson={lesson} checks={result.checks} />

        {/* Middle 2 divs: Resizable Code Editor and Live Preview with Dragger */}
        <div className="hidden lg:block">
          <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-[480px] w-full items-stretch gap-1"
          >
            <ResizablePanel defaultSize="50%" minSize="28%" maxSize="72%" className="h-full">
              <CodeEditor
                value={currentCode}
                onChange={handleCodeChange}
                onReset={resetCode}
                onAutoFill={handleAutoFill}
                error={error}
                targetClass={lesson.targetClass}
              />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize="50%" minSize="28%" maxSize="72%" className="h-full">
              <Playground lesson={lesson} css={currentCode} result={result} onResult={handleResult} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile / Tablet Responsive Fallback */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:hidden">
          <CodeEditor
            value={currentCode}
            onChange={handleCodeChange}
            onReset={resetCode}
            onAutoFill={handleAutoFill}
            error={error}
            targetClass={lesson.targetClass}
          />
          <Playground lesson={lesson} css={currentCode} result={result} onResult={handleResult} />
        </div>

        {/* Bottom Helper Row: Hints & Navigation */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
          <HintPanel
            hints={lesson.hints}
            revealed={currentHintsCount}
            onAutoFill={handleAutoFill}
            onReveal={() =>
              setHintsRevealed((prev) => ({
                ...prev,
                [lesson.id]: Math.min((prev[lesson.id] || 0) + 1, lesson.hints.length),
              }))
            }
          />

          <div className="card-soft flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold">
                  {isCompleted
                    ? isAutofilled
                      ? `${lesson.moduleShortTitle} · Quest ${lesson.moduleIndex} (Auto-filled)`
                      : `${lesson.moduleShortTitle} · Quest ${lesson.moduleIndex} Complete!`
                    : `${lesson.moduleShortTitle} · Quest ${lesson.moduleIndex} of 10`}
                </p>
                {isAutofilled ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-destructive/40 bg-destructive/15 px-2.5 py-0.5 text-xs font-bold text-destructive">
                    <Wand2 className="size-3" /> Auto-filled (0 XP)
                  </span>
                ) : isCompleted ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/15 px-2.5 py-0.5 text-xs font-bold text-success">
                    <CheckCircle className="size-3" /> +{lesson.xp} XP Earned
                  </span>
                ) : null}
              </div>
              <p className="text-xs text-muted-foreground">
                {isAutofilled ? (
                  <>
                    Auto-filled answer (0 XP awarded). Click{" "}
                    <button
                      type="button"
                      onClick={resetLesson}
                      className="font-semibold text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      Reset quest
                    </button>{" "}
                    to solve it yourself and claim +{lesson.xp} XP.
                  </>
                ) : isFinalGlobalQuest ? (
                  isCompleted ? (
                    "🏆 Congratulations! You have conquered all 5 parts: Box Placement, Flexbox, CSS Grid, Motion & Transformations, and Selector Sorcery!"
                  ) : (
                    "Final trial of Selector Sorcery! Solve it to claim ultimate Grandmaster status."
                  )
                ) : isEndOfModule4 ? (
                  isCompleted ? (
                    "✨ Part 4 Complete! Click 'Start Part 5' to begin Selector Sorcery."
                  ) : (
                    "Complete Quest 40 to unlock Part 5: Selector Sorcery."
                  )
                ) : isEndOfModule3 ? (
                  isCompleted ? (
                    "✨ Part 3 Complete! Click 'Start Part 4' to begin Motion & Transformations."
                  ) : (
                    "Complete Quest 30 to unlock Part 4: Motion & Transformations."
                  )
                ) : isEndOfModule2 ? (
                  isCompleted ? (
                    "⚡ Part 2 Complete! Click 'Start Part 3' to begin CSS Grid Mastery."
                  ) : (
                    "Complete Quest 20 to unlock Part 3: CSS Grid Mastery."
                  )
                ) : isEndOfModule1 ? (
                  isCompleted ? (
                    "📦 Part 1 Complete! Click 'Start Part 2' to begin Flexbox Fundamentals."
                  ) : (
                    "Complete Quest 10 to unlock Part 2: Flexbox Fundamentals."
                  )
                ) : isCompleted ? (
                  "Great work! Proceed to the next quest to earn more XP."
                ) : (
                  "Solve this quest to level up your CSS skills."
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevQuest}
                disabled={questIndex === 0}
                className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="size-4" />
                Prev
              </button>

              <button
                type="button"
                onClick={handleNextQuest}
                disabled={isFinalGlobalQuest}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold transition-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                  isCompleted
                    ? "bg-primary text-primary-foreground hover:scale-[1.03]"
                    : "border border-border bg-card text-foreground hover:bg-muted"
                } disabled:cursor-not-allowed disabled:opacity-40`}
              >
                {isFinalGlobalQuest ? (
                  <>
                    <Sparkles className="size-4" />
                    Grandmaster
                  </>
                ) : isEndOfModule4 ? (
                  <>
                    Start Part 5: Selectors
                    <ArrowRight className="size-4" />
                  </>
                ) : isEndOfModule3 ? (
                  <>
                    Start Part 4: Motion
                    <ArrowRight className="size-4" />
                  </>
                ) : isEndOfModule2 ? (
                  <>
                    Start Part 3: CSS Grid
                    <ArrowRight className="size-4" />
                  </>
                ) : isEndOfModule1 ? (
                  <>
                    Start Part 2: Flexbox
                    <ArrowRight className="size-4" />
                  </>
                ) : (
                  <>
                    Next Quest
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <SuccessModal
        open={showSuccess}
        lesson={lesson}
        totalLessons={QUESTS.length}
        isAutofilled={isAutofilled}
        onNextLesson={handleNextQuest}
        onClose={() => setShowSuccess(false)}
        onReplay={resetLesson}
      />
    </div>
  );
}

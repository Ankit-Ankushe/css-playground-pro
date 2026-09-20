// Measures the real rendered box inside the preview iframe and compares it
// to the lesson target using a forgiving tolerance.

function parseRgb(value = "") {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const [r, g, b] = match[1].split(",").map((n) => parseFloat(n));
  return { r, g, b };
}

export function isRedish(color) {
  const rgb = parseRgb(color);
  if (!rgb) return false;
  const { r, g, b } = rgb;
  return r >= 130 && g <= 110 && b <= 110 && r - Math.max(g, b) >= 60;
}

export function validateLesson(doc, lesson) {
  const empty = {
    checks: [],
    passed: false,
    close: false,
    message: "Write some CSS to get started.",
  };
  if (!doc) return empty;

  const stage = doc.querySelector(".stage");
  const box = doc.querySelector(".red-box");
  if (!stage || !box) return empty;

  const stageRect = stage.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();
  const styles = doc.defaultView.getComputedStyle(box);

  const left = boxRect.left - stageRect.left;
  const top = boxRect.top - stageRect.top;
  const { target, tolerance } = lesson;

  const sizeOk =
    Math.abs(boxRect.width - target.width) <= tolerance &&
    Math.abs(boxRect.height - target.height) <= tolerance;
  const colorOk = isRedish(styles.backgroundColor);
  const posOk =
    Math.abs(left - target.left) <= tolerance && Math.abs(top - target.top) <= tolerance;

  const distance = Math.hypot(left - target.left, top - target.top);

  const checks = [
    { id: "size", label: `Size is ${target.width}px × ${target.height}px`, ok: sizeOk },
    { id: "color", label: "Background is red", ok: colorOk },
    {
      id: "position",
      label: `Sits on the target (left ${target.left}px, top ${target.top}px)`,
      ok: posOk,
    },
  ];

  const passed = checks.every((c) => c.ok);
  const close = !passed && distance <= 70 && (sizeOk || colorOk);

  let message = "Your mission: guide the red box to its target!";
  if (passed) message = "🎉 Mission complete! You placed the red box perfectly!";
  else if (close) message = "So close! A few pixels off — nudge it a little more.";
  else if (checks.some((c) => c.ok)) message = "Not quite there! Try adjusting the position.";

  return { checks, passed, close, message, distance };
}

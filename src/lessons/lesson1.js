// Lesson configuration is kept separate from the UI so new challenges
// can be added by dropping another file in this folder.

export const lesson1 = {
  id: "lesson-1",
  index: 1,
  title: "Place the Red Box",
  subtitle: "Selectors, size, color & position",
  xp: 120,
  intro: "Your mission: guide the red box to its target!",
  description:
    "The playground below has a dashed target zone. Write CSS for the .red-box class so the box becomes the right size, the right color, and lands right on the target.",
  goals: [
    "Make the box 80px wide and 80px tall",
    "Give it a red background (crimson works too!)",
    "Position it absolutely at left: 220px and top: 150px",
  ],
  starterCss: `.red-box {
  /* Write your CSS here */
}
`,
  // Playground geometry (px) — used by both the sandbox and the validator.
  stage: { width: 520, height: 320 },
  target: { left: 220, top: 150, width: 80, height: 80 },
  tolerance: 10,
  hints: [
    "Everything you write goes inside `.red-box { ... }`. That is a class selector — it styles the element with class=\"red-box\".",
    "Start with the size and the color: `width: 80px;` `height: 80px;` `background-color: red;`",
    "The stage is already `position: relative`, so add `position: absolute;` to the box and nudge it with `left` and `top`.",
    "Full answer: `position: absolute; left: 220px; top: 150px; width: 80px; height: 80px; background-color: red;`",
  ],
  solution: `.red-box {
  position: absolute;
  left: 220px;
  top: 150px;
  width: 80px;
  height: 80px;
  background-color: red;
}
`,
};

export default lesson1;

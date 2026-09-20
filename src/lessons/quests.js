// CSS Quest Curriculum: Modules & Quests

export const MODULES = [
  {
    id: "box-placement",
    title: "Part 1: Box Placement Quests",
    shortTitle: "Box Placement",
    icon: "box",
    quests: [
      {
        id: "quest-1",
        index: 1,
        title: "Place the Red Box",
        subtitle: "Selectors, size, color & position",
        targetClass: "red-box",
        type: "placement",
        xp: 100,
        intro: "Your mission: guide the red box to its target!",
        description:
          "The playground below has a dashed target zone. Write CSS for the .red-box class so the box becomes the right size, red color, and lands right on the target.",
        goals: [
          "Make the box 80px wide and 80px tall",
          "Give it a red background (red, crimson, etc.)",
          "Position it absolutely at left: 220px and top: 150px",
        ],
        starterCss: `.red-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: { left: 220, top: 150, width: 80, height: 80, borderRadius: "8px" },
        tolerance: 10,
        expected: {
          width: 80,
          height: 80,
          left: 220,
          top: 150,
          position: "absolute",
          color: "red",
        },
        hints: [
          "Write your styles inside `.red-box { ... }` selector.",
          "Set the dimensions and background: `width: 80px; height: 80px; background-color: red;`",
          "Use absolute positioning: `position: absolute; left: 220px; top: 150px;`",
          "Full solution: `position: absolute; left: 220px; top: 150px; width: 80px; height: 80px; background: red;`",
        ],
        solution: `.red-box {
  position: absolute;
  left: 220px;
  top: 150px;
  width: 80px;
  height: 80px;
  background-color: red;
}`,
      },
      {
        id: "quest-2",
        index: 2,
        title: "Top-Right Lookout",
        subtitle: "Positioning with top and right",
        targetClass: "lookout-box",
        type: "placement",
        xp: 110,
        intro: "Send the lookout box to guard the upper-right corner!",
        description:
          "Anchor .lookout-box near the top-right corner of the stage using absolute positioning with top and right coordinates.",
        goals: [
          "Set width to 50px and height to 50px",
          "Use absolute positioning",
          "Place it at top: 20px and right: 20px",
        ],
        starterCss: `.lookout-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: { left: 450, top: 20, right: 20, width: 50, height: 50, borderRadius: "8px" },
        tolerance: 10,
        expected: {
          width: 50,
          height: 50,
          top: 20,
          right: 20,
          computedLeft: 450,
          computedTop: 20,
          position: "absolute",
        },
        hints: [
          "Target the `.lookout-box` selector.",
          "Set dimensions: `width: 50px; height: 50px;`",
          "Instead of `left`, position from the right side: `position: absolute; top: 20px; right: 20px;`",
          "Full solution: `position: absolute; top: 20px; right: 20px; width: 50px; height: 50px;`",
        ],
        solution: `.lookout-box {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
}`,
      },
      {
        id: "quest-3",
        index: 3,
        title: "The Center Stage",
        subtitle: "Rounded corners & absolute alignment",
        targetClass: "center-box",
        type: "placement",
        xp: 120,
        intro: "Guide the rounded box onto the center stage!",
        description:
          "Position .center-box at top: 150px and left: 200px, make it 120px by 120px, and curve its edges with border-radius: 15px.",
        goals: [
          "Set size to 120px wide and 120px tall",
          "Add rounded corners with border-radius: 15px",
          "Position absolutely at left: 200px and top: 150px",
        ],
        starterCss: `.center-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: { left: 200, top: 150, width: 120, height: 120, borderRadius: "15px" },
        tolerance: 10,
        expected: {
          width: 120,
          height: 120,
          left: 200,
          top: 150,
          borderRadius: 15,
          position: "absolute",
        },
        hints: [
          "Target `.center-box` in your CSS block.",
          "Set dimensions: `width: 120px; height: 120px;`",
          "Use `border-radius: 15px;` to round the corners.",
          "Add `position: absolute; top: 150px; left: 200px;` to place it on the target.",
        ],
        solution: `.center-box {
  position: absolute;
  top: 150px;
  left: 200px;
  width: 120px;
  height: 120px;
  border-radius: 15px;
}`,
      },
      {
        id: "quest-4",
        index: 4,
        title: "Bottom-Left Dropzone",
        subtitle: "Positioning with bottom and left",
        targetClass: "dropzone-box",
        type: "placement",
        xp: 130,
        intro: "Deploy the box down into the bottom-left dropzone!",
        description:
          "Anchor .dropzone-box 30px from the bottom and 30px from the left with a size of 90px × 90px.",
        goals: [
          "Set width to 90px and height to 90px",
          "Use absolute positioning",
          "Position at bottom: 30px and left: 30px",
        ],
        starterCss: `.dropzone-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: { left: 30, top: 200, bottom: 30, width: 90, height: 90, borderRadius: "8px" },
        tolerance: 10,
        expected: {
          width: 90,
          height: 90,
          bottom: 30,
          left: 30,
          computedLeft: 30,
          computedTop: 200,
          position: "absolute",
        },
        hints: [
          "Target the `.dropzone-box` class selector.",
          "Set `width: 90px; height: 90px;`",
          "Anchor from the bottom: `position: absolute; bottom: 30px; left: 30px;`",
          "Full solution: `position: absolute; bottom: 30px; left: 30px; width: 90px; height: 90px;`",
        ],
        solution: `.dropzone-box {
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 90px;
  height: 90px;
}`,
      },
      {
        id: "quest-5",
        index: 5,
        title: "Deep Corner Orbit",
        subtitle: "Bottom & right coordination",
        targetClass: "orbit-box",
        type: "placement",
        xp: 140,
        intro: "Navigate the orbit box into the bottom-right sector!",
        description:
          "Position .orbit-box at the lower-right corner using bottom: 20px and right: 20px with dimensions of 70px × 70px.",
        goals: [
          "Set size to 70px wide and 70px tall",
          "Use absolute positioning",
          "Position at bottom: 20px and right: 20px",
        ],
        starterCss: `.orbit-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {
          left: 430,
          top: 230,
          right: 20,
          bottom: 20,
          width: 70,
          height: 70,
          borderRadius: "8px",
        },
        tolerance: 10,
        expected: {
          width: 70,
          height: 70,
          bottom: 20,
          right: 20,
          computedLeft: 430,
          computedTop: 230,
          position: "absolute",
        },
        hints: [
          "Write your rules inside `.orbit-box { ... }`.",
          "Set dimensions: `width: 70px; height: 70px;`",
          "Combine bottom and right: `position: absolute; bottom: 20px; right: 20px;`",
          "Full solution: `position: absolute; bottom: 20px; right: 20px; width: 70px; height: 70px;`",
        ],
        solution: `.orbit-box {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 70px;
  height: 70px;
}`,
      },
      {
        id: "quest-6",
        index: 6,
        title: "The Tall Obelisk",
        subtitle: "Vertical aspect ratios",
        targetClass: "obelisk-box",
        type: "placement",
        xp: 150,
        intro: "Erect the tall obelisk pillar on the left side!",
        description:
          "Style .obelisk-box to be a tall vertical tower with width: 40px and height: 200px, placed at top: 50px and left: 60px.",
        goals: [
          "Set width to 40px and height to 200px",
          "Use absolute positioning",
          "Position at top: 50px and left: 60px",
        ],
        starterCss: `.obelisk-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: { left: 60, top: 50, width: 40, height: 200, borderRadius: "8px" },
        tolerance: 10,
        expected: {
          width: 40,
          height: 200,
          top: 50,
          left: 60,
          position: "absolute",
        },
        hints: [
          "Target `.obelisk-box` in your stylesheet.",
          "Set tall dimensions: `width: 40px; height: 200px;`",
          "Use absolute positioning: `position: absolute; top: 50px; left: 60px;`",
          "Full solution: `position: absolute; top: 50px; left: 60px; width: 40px; height: 200px;`",
        ],
        solution: `.obelisk-box {
  position: absolute;
  top: 50px;
  left: 60px;
  width: 40px;
  height: 200px;
}`,
      },
      {
        id: "quest-7",
        index: 7,
        title: "The Wide Runway",
        subtitle: "Horizontal strip layout",
        targetClass: "runway-box",
        type: "placement",
        xp: 160,
        intro: "Stretch the horizontal runway across the base!",
        description:
          "Create a wide horizontal runway for .runway-box with width: 350px, height: 40px, placed at bottom: 60px and left: 100px.",
        goals: [
          "Set width to 350px and height to 40px",
          "Use absolute positioning",
          "Position at bottom: 60px and left: 100px",
        ],
        starterCss: `.runway-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: { left: 100, top: 220, bottom: 60, width: 350, height: 40, borderRadius: "8px" },
        tolerance: 10,
        expected: {
          width: 350,
          height: 40,
          bottom: 60,
          left: 100,
          computedLeft: 100,
          computedTop: 220,
          position: "absolute",
        },
        hints: [
          "Target `.runway-box` with your CSS.",
          "Set wide dimensions: `width: 350px; height: 40px;`",
          "Position from the bottom-left: `position: absolute; bottom: 60px; left: 100px;`",
          "Full solution: `position: absolute; bottom: 60px; left: 100px; width: 350px; height: 40px;`",
        ],
        solution: `.runway-box {
  position: absolute;
  bottom: 60px;
  left: 100px;
  width: 350px;
  height: 40px;
}`,
      },
      {
        id: "quest-8",
        index: 8,
        title: "The Circular Portal",
        subtitle: "Full circle border-radius",
        targetClass: "portal-box",
        type: "placement",
        xp: 180,
        intro: "Open a perfectly circular portal in the upper realm!",
        description:
          "Transform .portal-box into a 100px × 100px perfect circle using border-radius: 50%, placed at top: 100px and right: 80px.",
        goals: [
          "Set width to 100px and height to 100px",
          "Make it a circle with border-radius: 50%",
          "Position at top: 100px and right: 80px",
        ],
        starterCss: `.portal-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: { left: 340, top: 100, right: 80, width: 100, height: 100, borderRadius: "50%" },
        tolerance: 10,
        expected: {
          width: 100,
          height: 100,
          top: 100,
          right: 80,
          computedLeft: 340,
          computedTop: 100,
          borderRadius: "50%",
          position: "absolute",
        },
        hints: [
          "Target `.portal-box` in your CSS.",
          "Give it square dimensions: `width: 100px; height: 100px;`",
          "Turn it into a circle: `border-radius: 50%;`",
          "Position it: `position: absolute; top: 100px; right: 80px;`",
        ],
        solution: `.portal-box {
  position: absolute;
  top: 100px;
  right: 80px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}`,
      },
      {
        id: "quest-9",
        index: 9,
        title: "Precision Pocket",
        subtitle: "Exact coordinate targeting",
        targetClass: "pocket-box",
        type: "placement",
        xp: 200,
        intro: "Land the micro-cube directly into the precision pocket!",
        description:
          "Hit the exact micro coordinates for .pocket-box: width: 20px, height: 20px, top: 137px, and left: 284px.",
        goals: [
          "Set width to 20px and height to 20px",
          "Use absolute positioning",
          "Position precisely at top: 137px and left: 284px",
        ],
        starterCss: `.pocket-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: { left: 284, top: 137, width: 20, height: 20, borderRadius: "4px" },
        tolerance: 6,
        expected: {
          width: 20,
          height: 20,
          top: 137,
          left: 284,
          position: "absolute",
        },
        hints: [
          "Target `.pocket-box` in your CSS.",
          "Make it a small cube: `width: 20px; height: 20px;`",
          "Position accurately: `position: absolute; top: 137px; left: 284px;`",
          "Full solution: `position: absolute; top: 137px; left: 284px; width: 20px; height: 20px;`",
        ],
        solution: `.pocket-box {
  position: absolute;
  top: 137px;
  left: 284px;
  width: 20px;
  height: 20px;
}`,
      },
      {
        id: "quest-10",
        index: 10,
        title: "Grandmaster Box Placement",
        subtitle: "The ultimate CSS placement trial",
        targetClass: "grandmaster-box",
        type: "placement",
        xp: 250,
        intro: "The final trial! Combine pill shaping, purple styling, and absolute placement!",
        description:
          "Complete the ultimate placement quest: style .grandmaster-box with width: 150px, height: 50px, border-radius: 25px, background-color: purple, and position it at top: 175px and left: 150px.",
        goals: [
          "Set width to 150px and height to 50px",
          "Give it a purple background and border-radius: 25px",
          "Position absolutely at left: 150px and top: 175px",
        ],
        starterCss: `.grandmaster-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: { left: 150, top: 175, width: 150, height: 50, borderRadius: "25px" },
        tolerance: 10,
        expected: {
          width: 150,
          height: 50,
          top: 175,
          left: 150,
          borderRadius: 25,
          color: "purple",
          position: "absolute",
        },
        hints: [
          "Target `.grandmaster-box` in your CSS.",
          "Set dimensions and pill shape: `width: 150px; height: 50px; border-radius: 25px;`",
          "Give it a purple shade: `background-color: purple;`",
          "Position it: `position: absolute; top: 175px; left: 150px;`",
        ],
        solution: `.grandmaster-box {
  position: absolute;
  top: 175px;
  left: 150px;
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background-color: purple;
}`,
      },
    ],
  },
  {
    id: "flexbox-fundamentals",
    title: "Part 2: Flexbox Fundamentals",
    shortTitle: "Flexbox Fundamentals",
    icon: "layout",
    quests: [
      {
        id: "quest-11",
        index: 11,
        moduleIndex: 1,
        title: "The Flex Awakening",
        subtitle: "Activating the flex container",
        targetClass: "container",
        type: "flexbox",
        boxCount: 3,
        xp: 120,
        intro: "Wake up the flex layout! Align all child boxes into a row.",
        description:
          "By default, block elements stack vertically. Apply display: flex to .container so the three child boxes naturally line up side-by-side in a horizontal row.",
        goals: [
          "Target the .container class",
          "Set display: flex to align child boxes horizontally",
        ],
        starterCss: `.container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: flex;",
        expected: {
          display: "flex",
        },
        hints: [
          "Write your CSS inside `.container { ... }`.",
          "Enable flex layout with `display: flex;`.",
          "Child elements automatically become flex items arranged in a row.",
        ],
        solution: `.container {
  display: flex;
}`,
      },
      {
        id: "quest-12",
        index: 12,
        moduleIndex: 2,
        title: "Center Stage",
        subtitle: "Main-axis centering with justify-content",
        targetClass: "container",
        type: "flexbox",
        boxCount: 3,
        xp: 130,
        intro: "Center all three boxes along the main horizontal axis!",
        description:
          "Use justify-content: center on .container to group and align the child boxes right in the middle along the main axis.",
        goals: [
          "Set display: flex on .container",
          "Center items along the main axis with justify-content: center",
        ],
        starterCss: `.container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: flex; justify-content: center;",
        expected: {
          display: "flex",
          justifyContent: "center",
        },
        hints: [
          "First enable flexbox: `display: flex;`.",
          "Use `justify-content` to position items along the main axis.",
          "Add `justify-content: center;`.",
        ],
        solution: `.container {
  display: flex;
  justify-content: center;
}`,
      },
      {
        id: "quest-13",
        index: 13,
        moduleIndex: 3,
        title: "The Far Right",
        subtitle: "Aligning items to the flex end",
        targetClass: "container",
        type: "flexbox",
        boxCount: 3,
        xp: 130,
        intro: "Push all child boxes all the way to the right side!",
        description:
          "Align all child items to the end of the main axis using justify-content: flex-end (or end).",
        goals: [
          "Set display: flex on .container",
          "Align items to the right using justify-content: flex-end",
        ],
        starterCss: `.container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: flex; justify-content: flex-end;",
        expected: {
          display: "flex",
          justifyContent: ["flex-end", "end"],
        },
        hints: [
          "Start with `display: flex;`.",
          "Use `justify-content: flex-end;` (or `end`).",
          "This packs all flex items at the end of the main axis.",
        ],
        solution: `.container {
  display: flex;
  justify-content: flex-end;
}`,
      },
      {
        id: "quest-14",
        index: 14,
        moduleIndex: 4,
        title: "Social Distancing",
        subtitle: "Maximized edge spacing with space-between",
        targetClass: "container",
        type: "flexbox",
        boxCount: 3,
        xp: 140,
        intro: "Spread the boxes out so the outer ones touch the container walls!",
        description:
          "Distribute child items across .container with equal space between them, placing the first and last boxes flush against the edges.",
        goals: [
          "Set display: flex on .container",
          "Distribute items with justify-content: space-between",
        ],
        starterCss: `.container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: flex; justify-content: space-between;",
        expected: {
          display: "flex",
          justifyContent: "space-between",
        },
        hints: [
          "Set `display: flex;` on `.container`.",
          "Use `justify-content: space-between;` to push the outer items to the edges.",
        ],
        solution: `.container {
  display: flex;
  justify-content: space-between;
}`,
      },
      {
        id: "quest-15",
        index: 15,
        moduleIndex: 5,
        title: "Evenly Distributed",
        subtitle: "Uniform spacing everywhere with space-evenly",
        targetClass: "container",
        type: "flexbox",
        boxCount: 3,
        xp: 150,
        intro: "Create uniform spacing between every box and both edges!",
        description:
          "Use justify-content: space-evenly so the space between any two items, and the space to the edges, is exactly the same.",
        goals: [
          "Set display: flex on .container",
          "Evenly space all items with justify-content: space-evenly",
        ],
        starterCss: `.container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: flex; justify-content: space-evenly;",
        expected: {
          display: "flex",
          justifyContent: "space-evenly",
        },
        hints: ["Enable flexbox: `display: flex;`.", "Use `justify-content: space-evenly;`."],
        solution: `.container {
  display: flex;
  justify-content: space-evenly;
}`,
      },
      {
        id: "quest-16",
        index: 16,
        moduleIndex: 6,
        title: "The Floor Drop",
        subtitle: "Cross-axis alignment with align-items",
        targetClass: "container",
        type: "flexbox",
        boxCount: 3,
        xp: 150,
        intro: "Drop all child boxes down to the floor of the container!",
        description:
          "Control cross-axis (vertical) alignment using align-items: flex-end (or end) so all boxes sit at the bottom edge.",
        goals: [
          "Set display: flex on .container",
          "Align items to the bottom with align-items: flex-end",
        ],
        starterCss: `.container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: flex; align-items: flex-end;",
        expected: {
          display: "flex",
          alignItems: ["flex-end", "end"],
        },
        hints: [
          "Set `display: flex;`.",
          "Use `align-items` for cross-axis alignment.",
          "Set `align-items: flex-end;` (or `end`).",
        ],
        solution: `.container {
  display: flex;
  align-items: flex-end;
}`,
      },
      {
        id: "quest-17",
        index: 17,
        moduleIndex: 7,
        title: "Perfect Bullseye",
        subtitle: "2D centering with justify-content & align-items",
        targetClass: "container",
        type: "flexbox",
        boxCount: 3,
        xp: 160,
        intro: "Center items in both horizontal and vertical directions!",
        description:
          "Achieve the classic CSS centering trick: combine justify-content: center and align-items: center on .container.",
        goals: [
          "Set display: flex on .container",
          "Center horizontally with justify-content: center",
          "Center vertically with align-items: center",
        ],
        starterCss: `.container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: flex; justify-content: center; align-items: center;",
        expected: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        hints: [
          "Set `display: flex;`.",
          "Add `justify-content: center;` for horizontal centering.",
          "Add `align-items: center;` for vertical centering.",
        ],
        solution: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
      },
      {
        id: "quest-18",
        index: 18,
        moduleIndex: 8,
        title: "The Column Stack",
        subtitle: "Changing the main axis direction",
        targetClass: "container",
        type: "flexbox",
        boxCount: 3,
        xp: 160,
        intro: "Rotate the layout axis so boxes stack in a vertical column!",
        description:
          "Change the main axis direction from row to column using flex-direction: column.",
        goals: [
          "Set display: flex on .container",
          "Stack items vertically with flex-direction: column",
        ],
        starterCss: `.container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: flex; flex-direction: column;",
        expected: {
          display: "flex",
          flexDirection: "column",
        },
        hints: [
          "Enable flexbox: `display: flex;`.",
          "Set `flex-direction: column;` to align items top-to-bottom.",
        ],
        solution: `.container {
  display: flex;
  flex-direction: column;
}`,
      },
      {
        id: "quest-19",
        index: 19,
        moduleIndex: 9,
        title: "Reverse Gravity",
        subtitle: "Reversing order with row-reverse",
        targetClass: "container",
        type: "flexbox",
        boxCount: 3,
        xp: 170,
        intro: "Invert the reading flow so Box 3 is on the left and Box 1 is on the right!",
        description:
          "Reverse the horizontal flow of child boxes using flex-direction: row-reverse on .container.",
        goals: [
          "Set display: flex on .container",
          "Reverse horizontal sequence with flex-direction: row-reverse",
        ],
        starterCss: `.container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: flex; flex-direction: row-reverse;",
        expected: {
          display: "flex",
          flexDirection: "row-reverse",
        },
        hints: ["Set `display: flex;`.", "Set `flex-direction: row-reverse;`."],
        solution: `.container {
  display: flex;
  flex-direction: row-reverse;
}`,
      },
      {
        id: "quest-20",
        index: 20,
        moduleIndex: 10,
        title: "The Wrap Around",
        subtitle: "Multi-line flex wrapping",
        targetClass: "container",
        type: "flexbox",
        boxCount: 6,
        xp: 200,
        intro: "Allow overflowing flex items to wrap onto multiple lines!",
        description:
          "When there are 6 boxes that cannot fit on a single line, use flex-wrap: wrap on .container so they break naturally onto new lines.",
        goals: [
          "Set display: flex on .container",
          "Enable multi-line wrapping with flex-wrap: wrap",
        ],
        starterCss: `.container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: flex; flex-wrap: wrap;",
        expected: {
          display: "flex",
          flexWrap: "wrap",
        },
        hints: ["Enable flexbox: `display: flex;`.", "Allow items to wrap: `flex-wrap: wrap;`."],
        solution: `.container {
  display: flex;
  flex-wrap: wrap;
}`,
      },
    ],
  },
  {
    id: "grid-mastery",
    title: "Part 3: CSS Grid Mastery",
    shortTitle: "CSS Grid",
    icon: "grid",
    quests: [
      {
        id: "quest-21",
        index: 21,
        moduleIndex: 1,
        title: "The Grid Awakening",
        subtitle: "Two-column fractional grid",
        targetClass: "grid-container",
        type: "grid",
        gridItemCount: 4,
        xp: 150,
        intro: "Step into 2D layouts! Turn the container into a 2-column grid.",
        description:
          "Set display: grid on .grid-container and define two equal columns using fractional units (1fr 1fr).",
        goals: [
          "Set display: grid on .grid-container",
          "Define two equal columns with grid-template-columns: 1fr 1fr",
        ],
        starterCss: `.grid-container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: grid; grid-template-columns: 1fr 1fr;",
        expected: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        },
        hints: [
          "Target the `.grid-container` selector.",
          "Enable grid: `display: grid;`",
          "Set columns to two equal fractions: `grid-template-columns: 1fr 1fr;`",
        ],
        solution: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}`,
      },
      {
        id: "quest-22",
        index: 22,
        moduleIndex: 2,
        title: "Defining the Rows",
        subtitle: "Explicit row heights",
        targetClass: "grid-container",
        type: "grid",
        gridItemCount: 4,
        xp: 160,
        intro: "Take control of vertical sizing with explicit grid rows.",
        description:
          "Set display: grid on .grid-container and set grid-template-rows: 100px 100px to give each row a height of 100px.",
        goals: [
          "Set display: grid on .grid-container",
          "Set grid-template-rows: 100px 100px",
        ],
        starterCss: `.grid-container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: grid; grid-template-rows: 100px 100px;",
        expected: {
          display: "grid",
          gridTemplateRows: "100px 100px",
        },
        hints: [
          "Enable grid layout: `display: grid;`",
          "Define row heights: `grid-template-rows: 100px 100px;`",
        ],
        solution: `.grid-container {
  display: grid;
  grid-template-rows: 100px 100px;
}`,
      },
      {
        id: "quest-23",
        index: 23,
        moduleIndex: 3,
        title: "Minding the Gap",
        subtitle: "Spacing grid tracks with gap",
        targetClass: "grid-container",
        type: "grid",
        gridItemCount: 4,
        xp: 170,
        intro: "Add breathing room between your grid items with the gap property.",
        description:
          "Create a 2-column grid on .grid-container and add a 20px gap between all rows and columns.",
        goals: [
          "Set display: grid on .grid-container",
          "Set grid-template-columns: 1fr 1fr",
          "Add spacing with gap: 20px",
        ],
        starterCss: `.grid-container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: grid; grid-template-columns: 1fr 1fr; gap: 20px;",
        expected: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        },
        hints: [
          "Enable grid and 2 columns: `display: grid; grid-template-columns: 1fr 1fr;`",
          "Add space between items: `gap: 20px;`",
        ],
        solution: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}`,
      },
      {
        id: "quest-24",
        index: 24,
        moduleIndex: 4,
        title: "The Repeat Function",
        subtitle: "Clean track repetition",
        targetClass: "grid-container",
        type: "grid",
        gridItemCount: 4,
        xp: 180,
        intro: "Don't repeat yourself! Use CSS repeat() to build 4 equal columns cleanly.",
        description:
          "Set display: grid on .grid-container and create 4 equal 1fr columns using grid-template-columns: repeat(4, 1fr).",
        goals: [
          "Set display: grid on .grid-container",
          "Use grid-template-columns: repeat(4, 1fr)",
        ],
        starterCss: `.grid-container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: grid; grid-template-columns: repeat(4, 1fr);",
        expected: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        },
        hints: [
          "Use the `repeat(count, track)` syntax.",
          "Write: `grid-template-columns: repeat(4, 1fr);` inside `.grid-container`.",
        ],
        solution: `.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}`,
      },
      {
        id: "quest-25",
        index: 25,
        moduleIndex: 5,
        title: "The Banner Span",
        subtitle: "Spanning grid columns",
        targetClass: "hero-item",
        type: "grid-item",
        layoutContext: "3-col-grid",
        xp: 190,
        intro: "Make the hero banner stand out by spanning it across 2 columns!",
        description:
          "The container is already a 3-column grid. Style .hero-item with grid-column: span 2 so it occupies 2 column tracks.",
        goals: [
          "Target .hero-item selector",
          "Make it span 2 columns with grid-column: span 2",
        ],
        starterCss: `.hero-item {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "grid-column: span 2;",
        expected: {
          targetSelector: ".hero-item",
          gridColumn: "span 2",
        },
        hints: [
          "Target the `.hero-item` class.",
          "Use column span: `grid-column: span 2;` (or `grid-column: 1 / 3;`).",
        ],
        solution: `.hero-item {
  grid-column: span 2;
}`,
      },
      {
        id: "quest-26",
        index: 26,
        moduleIndex: 6,
        title: "The Tall Sidebar",
        subtitle: "Spanning multiple rows",
        targetClass: "sidebar-item",
        type: "grid-item",
        layoutContext: "sidebar-grid",
        xp: 200,
        intro: "Stretch the sidebar vertically across multiple rows!",
        description:
          "In this 2-column, 2-row grid, style .sidebar-item with grid-row: span 2 so it spans two full rows downwards.",
        goals: [
          "Target .sidebar-item selector",
          "Make it span 2 rows with grid-row: span 2",
        ],
        starterCss: `.sidebar-item {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "grid-row: span 2;",
        expected: {
          targetSelector: ".sidebar-item",
          gridRow: "span 2",
        },
        hints: [
          "Target `.sidebar-item`.",
          "Span 2 vertical rows: `grid-row: span 2;`.",
        ],
        solution: `.sidebar-item {
  grid-row: span 2;
}`,
      },
      {
        id: "quest-27",
        index: 27,
        moduleIndex: 7,
        title: "Full Width Footer",
        subtitle: "Negative line numbers for edge-to-edge span",
        targetClass: "footer-item",
        type: "grid-item",
        layoutContext: "footer-grid",
        xp: 210,
        intro: "Use negative grid lines to stretch an item across the entire grid width!",
        description:
          "Negative index -1 points to the last grid line. Style .footer-item with grid-column: 1 / -1 so it stretches across all columns.",
        goals: [
          "Target .footer-item selector",
          "Span edge-to-edge with grid-column: 1 / -1",
        ],
        starterCss: `.footer-item {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "grid-column: 1 / -1;",
        expected: {
          targetSelector: ".footer-item",
          gridColumn: "1 / -1",
        },
        hints: [
          "Target `.footer-item`.",
          "Use line numbers from start to end: `grid-column: 1 / -1;`.",
        ],
        solution: `.footer-item {
  grid-column: 1 / -1;
}`,
      },
      {
        id: "quest-28",
        index: 28,
        moduleIndex: 8,
        title: "Precision Targeting",
        subtitle: "Specific grid coordinate placement",
        targetClass: "target-item",
        type: "grid-item",
        layoutContext: "precision-grid",
        xp: 220,
        intro: "Place an item at exact coordinates using line numbers.",
        description:
          "Place .target-item precisely starting at column line 2 and row line 3 using grid-column-start: 2 and grid-row-start: 3.",
        goals: [
          "Target .target-item selector",
          "Set grid-column-start: 2",
          "Set grid-row-start: 3",
        ],
        starterCss: `.target-item {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "grid-column-start: 2; grid-row-start: 3;",
        expected: {
          targetSelector: ".target-item",
          gridColumnStart: "2",
          gridRowStart: "3",
        },
        hints: [
          "Target `.target-item`.",
          "Set start coordinates: `grid-column-start: 2; grid-row-start: 3;`.",
        ],
        solution: `.target-item {
  grid-column-start: 2;
  grid-row-start: 3;
}`,
      },
      {
        id: "quest-29",
        index: 29,
        moduleIndex: 9,
        title: "Centering the Grid Items",
        subtitle: "Aligning items inside their grid cells",
        targetClass: "grid-container",
        type: "grid",
        gridItemCount: 4,
        xp: 230,
        intro: "Center all grid items within their individual grid cells along both axes!",
        description:
          "Set display: grid on .grid-container with two 1fr columns, then align items horizontally with justify-items: center and vertically with align-items: center.",
        goals: [
          "Set display: grid and grid-template-columns: 1fr 1fr",
          "Set justify-items: center",
          "Set align-items: center",
        ],
        starterCss: `.grid-container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle:
          "display: grid; grid-template-columns: 1fr 1fr; justify-items: center; align-items: center;",
        expected: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyItems: "center",
          alignItems: "center",
        },
        hints: [
          "Set display & columns: `display: grid; grid-template-columns: 1fr 1fr;`",
          "Align items inside cells: `justify-items: center; align-items: center;`",
        ],
        solution: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
}`,
      },
      {
        id: "quest-30",
        index: 30,
        moduleIndex: 10,
        title: "The Holy Grail Layout",
        subtitle: "Fixed sidebar with flexible main content",
        targetClass: "grid-container",
        type: "grid",
        gridItemCount: 4,
        xp: 250,
        intro:
          "Build the classic application layout: a fixed 200px sidebar alongside flexible content!",
        description:
          "On .grid-container, enable grid layout with a 200px first column and a flexible 1fr second column (grid-template-columns: 200px 1fr) with a 15px gap.",
        goals: [
          "Set display: grid on .grid-container",
          "Set grid-template-columns: 200px 1fr",
          "Set gap: 15px",
        ],
        starterCss: `.grid-container {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "display: grid; grid-template-columns: 200px 1fr; gap: 15px;",
        expected: {
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "15px",
        },
        hints: [
          "Enable grid: `display: grid;`",
          "Define 200px and 1fr columns: `grid-template-columns: 200px 1fr;`",
          "Add 15px spacing: `gap: 15px;`",
        ],
        solution: `.grid-container {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 15px;
}`,
      },
    ],
  },
  {
    id: "motion-transforms",
    title: "Part 4: Motion & Transformations",
    shortTitle: "Motion",
    icon: "zap",
    quests: [
      {
        id: "quest-31",
        index: 31,
        moduleIndex: 1,
        title: "The Smooth Shift",
        subtitle: "Smooth state transitions",
        targetClass: "motion-box",
        type: "motion",
        xp: 150,
        intro: "Bring elements to life by smoothing property changes with CSS transitions!",
        description:
          "Set transition: all 0.5s ease on .motion-box so that any property change animates smoothly over half a second.",
        goals: [
          "Target .motion-box selector",
          "Set transition: all 0.5s ease (or 0.5s ease)",
        ],
        starterCss: `.motion-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "transition: all 0.5s ease;",
        expected: {
          targetSelector: ".motion-box",
          transition: "all 0.5s ease",
        },
        hints: [
          "Target `.motion-box`.",
          "Add transition: `transition: all 0.5s ease;` (or `transition: 0.5s ease;`).",
        ],
        solution: `.motion-box {
  transition: all 0.5s ease;
}`,
      },
      {
        id: "quest-32",
        index: 32,
        moduleIndex: 2,
        title: "Growing Up",
        subtitle: "Hover scaling with scale()",
        targetClass: "motion-box",
        isHoverQuest: true,
        type: "motion",
        xp: 160,
        intro: "Make the box expand when the user hovers over it!",
        description:
          "Write a hover rule for .motion-box:hover with transform: scale(1.5) to scale the element to 150% size on hover.",
        goals: [
          "Target the .motion-box:hover pseudo-class",
          "Set transform: scale(1.5)",
        ],
        starterCss: `.motion-box:hover {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "transform: scale(1.5);",
        expected: {
          targetSelector: ".motion-box:hover",
          transform: "scale(1.5)",
        },
        hints: [
          "Use the `:hover` pseudo-class: `.motion-box:hover { ... }`.",
          "Apply the scale function: `transform: scale(1.5);`.",
        ],
        solution: `.motion-box:hover {
  transform: scale(1.5);
}`,
      },
      {
        id: "quest-33",
        index: 33,
        moduleIndex: 3,
        title: "The Barrel Roll",
        subtitle: "2D rotation with rotate()",
        targetClass: "spin-box",
        type: "motion",
        xp: 170,
        intro: "Rotate elements around their center using angular degrees.",
        description:
          "Apply transform: rotate(45deg) to .spin-box to rotate the box by 45 degrees clockwise.",
        goals: [
          "Target .spin-box selector",
          "Set transform: rotate(45deg)",
        ],
        starterCss: `.spin-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "transform: rotate(45deg);",
        expected: {
          targetSelector: ".spin-box",
          transform: "rotate(45deg)",
        },
        hints: [
          "Target `.spin-box`.",
          "Use rotation in degrees: `transform: rotate(45deg);`.",
        ],
        solution: `.spin-box {
  transform: rotate(45deg);
}`,
      },
      {
        id: "quest-34",
        index: 34,
        moduleIndex: 4,
        title: "The Levitation Act",
        subtitle: "Vertical floating on hover",
        targetClass: "motion-box",
        isHoverQuest: true,
        type: "motion",
        xp: 180,
        intro: "Create a classic floating hover effect using negative Y translation!",
        description:
          "Apply transform: translateY(-20px) on .motion-box:hover so the box lifts upwards by 20px when hovered.",
        goals: [
          "Target the .motion-box:hover pseudo-class",
          "Set transform: translateY(-20px)",
        ],
        starterCss: `.motion-box:hover {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "transform: translateY(-20px);",
        expected: {
          targetSelector: ".motion-box:hover",
          transform: "translateY(-20px)",
        },
        hints: [
          "Target `.motion-box:hover`.",
          "Shift upward using negative translation: `transform: translateY(-20px);`.",
        ],
        solution: `.motion-box:hover {
  transform: translateY(-20px);
}`,
      },
      {
        id: "quest-35",
        index: 35,
        moduleIndex: 5,
        title: "The Pivot Point",
        subtitle: "Changing origin of rotation",
        targetClass: "hinge-box",
        type: "motion",
        xp: 190,
        intro: "Change the anchor point around which an element rotates and scales!",
        description:
          "Set transform-origin: top left (or 0 0) on .hinge-box so transforms pivot around the top-left corner instead of the center.",
        goals: [
          "Target .hinge-box selector",
          "Set transform-origin: top left",
        ],
        starterCss: `.hinge-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "transform-origin: top left;",
        expected: {
          targetSelector: ".hinge-box",
          transformOrigin: "top left",
        },
        hints: [
          "Target `.hinge-box`.",
          "Set origin to corner: `transform-origin: top left;`.",
        ],
        solution: `.hinge-box {
  transform-origin: top left;
}`,
      },
      {
        id: "quest-36",
        index: 36,
        moduleIndex: 6,
        title: "The Skewed Perspective",
        subtitle: "Slanting elements along X axis",
        targetClass: "skew-box",
        type: "motion",
        xp: 200,
        intro: "Distort and slant 2D shapes along the horizontal plane.",
        description:
          "Apply transform: skewX(-15deg) to .skew-box to give it a dynamic italicized slant.",
        goals: [
          "Target .skew-box selector",
          "Set transform: skewX(-15deg)",
        ],
        starterCss: `.skew-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "transform: skewX(-15deg);",
        expected: {
          targetSelector: ".skew-box",
          transform: "skewX(-15deg)",
        },
        hints: [
          "Target `.skew-box`.",
          "Apply horizontal skew: `transform: skewX(-15deg);`.",
        ],
        solution: `.skew-box {
  transform: skewX(-15deg);
}`,
      },
      {
        id: "quest-37",
        index: 37,
        moduleIndex: 7,
        title: "Combine and Conquer",
        subtitle: "Multiple chained transform functions",
        targetClass: "combo-box",
        type: "motion",
        xp: 210,
        intro: "Chain multiple transform functions in a single declaration!",
        description:
          "Apply transform: translateX(50px) rotate(90deg) on .combo-box to translate right by 50px and rotate 90 degrees.",
        goals: [
          "Target .combo-box selector",
          "Set transform: translateX(50px) rotate(90deg)",
        ],
        starterCss: `.combo-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "transform: translateX(50px) rotate(90deg);",
        expected: {
          targetSelector: ".combo-box",
          transform: "translateX(50px) rotate(90deg)",
        },
        hints: [
          "Target `.combo-box`.",
          "Chain functions separated by space: `transform: translateX(50px) rotate(90deg);`.",
        ],
        solution: `.combo-box {
  transform: translateX(50px) rotate(90deg);
}`,
      },
      {
        id: "quest-38",
        index: 8,
        moduleIndex: 8,
        title: "The Dramatic Pause",
        subtitle: "Delaying transition start",
        targetClass: "delay-box",
        isHoverQuest: true,
        type: "motion",
        xp: 220,
        intro: "Wait for the moment! Add a delay before an animation kicks off.",
        description:
          "Set transition-delay: 1s (or include 1s delay in transition shorthand) on .delay-box so the transition waits 1 full second before starting.",
        goals: [
          "Target .delay-box selector",
          "Set transition-delay: 1s",
        ],
        starterCss: `.delay-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "transition-delay: 1s;",
        expected: {
          targetSelector: ".delay-box",
          transitionDelay: "1s",
        },
        hints: [
          "Target `.delay-box`.",
          "Add delay: `transition-delay: 1s;`.",
        ],
        solution: `.delay-box {
  transition-delay: 1s;
}`,
      },
      {
        id: "quest-39",
        index: 39,
        moduleIndex: 9,
        title: "Robotic Movement",
        subtitle: "Constant velocity with linear timing",
        targetClass: "linear-box",
        isHoverQuest: true,
        type: "motion",
        xp: 230,
        intro: "Control transition velocity using timing functions!",
        description:
          "Set transition-timing-function: linear (or include linear in transition shorthand) on .linear-box for constant speed animation.",
        goals: [
          "Target .linear-box selector",
          "Set transition-timing-function: linear",
        ],
        starterCss: `.linear-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "transition-timing-function: linear;",
        expected: {
          targetSelector: ".linear-box",
          transitionTimingFunction: "linear",
        },
        hints: [
          "Target `.linear-box`.",
          "Set linear timing: `transition-timing-function: linear;`.",
        ],
        solution: `.linear-box {
  transition-timing-function: linear;
}`,
      },
      {
        id: "quest-40",
        index: 40,
        moduleIndex: 10,
        title: "The Interactive Card",
        subtitle: "Rich compound 3D hover effect",
        targetClass: "card-box",
        isHoverQuest: true,
        type: "motion",
        xp: 250,
        intro:
          "Craft a polished modern card hover effect by combining scale, lift, and tilt!",
        description:
          "On .card-box:hover, apply transform: scale(1.1) translateY(-10px) rotate(5deg) to create a lively interactive card.",
        goals: [
          "Target the .card-box:hover pseudo-class",
          "Set transform: scale(1.1) translateY(-10px) rotate(5deg)",
        ],
        starterCss: `.card-box:hover {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "transform: scale(1.1) translateY(-10px) rotate(5deg);",
        expected: {
          targetSelector: ".card-box:hover",
          transform: "scale(1.1) translateY(-10px) rotate(5deg)",
        },
        hints: [
          "Target `.card-box:hover`.",
          "Combine scale, translateY, and rotate in order: `transform: scale(1.1) translateY(-10px) rotate(5deg);`.",
        ],
        solution: `.card-box:hover {
  transform: scale(1.1) translateY(-10px) rotate(5deg);
}`,
      },
    ],
  },
  {
    id: "selector-sorcery",
    title: "Part 5: Selector Sorcery & Pseudo-Elements",
    shortTitle: "Selectors",
    icon: "sparkles",
    quests: [
      {
        id: "quest-41",
        index: 41,
        moduleIndex: 1,
        title: "The Firstborn",
        subtitle: "Targeting the first child element",
        targetClass: "box-list",
        type: "selectors",
        xp: 150,
        intro:
          "Cast your first selector spell! Select only the very first child div in the list.",
        description:
          "Target .box-list div:first-child (or .box-list > div:first-child) and give it background-color: gold.",
        goals: [
          "Target .box-list div:first-child selector",
          "Set background-color: gold",
        ],
        starterCss: `.box-list div:first-child {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "background-color: gold;",
        expected: {
          targetSelector: ".box-list div:first-child",
          backgroundColor: "gold",
        },
        hints: [
          "Use the `:first-child` pseudo-class: `.box-list div:first-child`.",
          "Set the background: `background-color: gold;`.",
        ],
        solution: `.box-list div:first-child {
  background-color: gold;
}`,
      },
      {
        id: "quest-42",
        index: 42,
        moduleIndex: 2,
        title: "Zebra Stripes",
        subtitle: "Alternating elements with nth-child(odd)",
        targetClass: "box-list",
        type: "selectors",
        xp: 160,
        intro: "Create alternating zebra stripes using structural nth-child arithmetic!",
        description:
          "Target .box-list div:nth-child(odd) (or 2n+1) and set background-color: darkgray (or darkgrey).",
        goals: [
          "Target .box-list div:nth-child(odd)",
          "Set background-color: darkgray",
        ],
        starterCss: `.box-list div:nth-child(odd) {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "background-color: darkgray;",
        expected: {
          targetSelector: ".box-list div:nth-child(odd)",
          backgroundColor: "darkgray",
        },
        hints: [
          "Use `:nth-child(odd)`: `.box-list div:nth-child(odd)`.",
          "Apply color: `background-color: darkgray;`.",
        ],
        solution: `.box-list div:nth-child(odd) {
  background-color: darkgray;
}`,
      },
      {
        id: "quest-43",
        index: 43,
        moduleIndex: 3,
        title: "The Exact Target",
        subtitle: "Pinpoint index with nth-child(N)",
        targetClass: "box-list",
        type: "selectors",
        xp: 170,
        intro: "Pick out a specific numbered item in the list and magnify it.",
        description:
          "Target the fourth child element using .box-list div:nth-child(4) and apply transform: scale(1.2).",
        goals: [
          "Target .box-list div:nth-child(4)",
          "Set transform: scale(1.2)",
        ],
        starterCss: `.box-list div:nth-child(4) {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "transform: scale(1.2);",
        expected: {
          targetSelector: ".box-list div:nth-child(4)",
          transform: "scale(1.2)",
        },
        hints: [
          "Use the exact index: `.box-list div:nth-child(4)`.",
          "Scale it up: `transform: scale(1.2);`.",
        ],
        solution: `.box-list div:nth-child(4) {
  transform: scale(1.2);
}`,
      },
      {
        id: "quest-44",
        index: 44,
        moduleIndex: 4,
        title: "The Outcast (Not)",
        subtitle: "Negation with the :not() pseudo-class",
        targetClass: "box-list",
        type: "selectors",
        xp: 180,
        intro: "Dim every element EXCEPT the special VIP item using :not()!",
        description:
          "Target .box-list div:not(.special) and set opacity: 0.5 so only non-special boxes are dimmed.",
        goals: [
          "Target .box-list div:not(.special)",
          "Set opacity: 0.5",
        ],
        starterCss: `.box-list div:not(.special) {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "opacity: 0.5;",
        expected: {
          targetSelector: ".box-list div:not(.special)",
          opacity: "0.5",
        },
        hints: [
          "Use the negation pseudo-class: `.box-list div:not(.special)`.",
          "Dim the elements: `opacity: 0.5;`.",
        ],
        solution: `.box-list div:not(.special) {
  opacity: 0.5;
}`,
      },
      {
        id: "quest-45",
        index: 45,
        moduleIndex: 5,
        title: "The Sibling Reaction",
        subtitle: "Adjacent sibling combinator (+)",
        targetClass: "trigger-box",
        isHoverQuest: true,
        type: "selectors",
        xp: 190,
        intro: "Trigger a visual change on a neighboring element when its sibling is hovered!",
        description:
          "Target .trigger-box:hover + .target-box and set background-color: green (or #22c55e).",
        goals: [
          "Target .trigger-box:hover + .target-box",
          "Set background-color: green",
        ],
        starterCss: `.trigger-box:hover + .target-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "background-color: green;",
        expected: {
          targetSelector: ".trigger-box:hover + .target-box",
          backgroundColor: "green",
        },
        hints: [
          "Combine hover and adjacent sibling (+): `.trigger-box:hover + .target-box`.",
          "Set background color: `background-color: green;`.",
        ],
        solution: `.trigger-box:hover + .target-box {
  background-color: green;
}`,
      },
      {
        id: "quest-46",
        index: 46,
        moduleIndex: 6,
        title: "The Ghost Element (Before)",
        subtitle: "Injecting shapes with ::before",
        targetClass: "tooltip-box",
        type: "selectors",
        xp: 200,
        intro: "Spawn a pseudo-element out of thin air using ::before and content: \"\"!",
        description:
          "Target .tooltip-box::before. Provide content: \"\", width: 20px, height: 20px, background-color: red, and display: block.",
        goals: [
          "Target .tooltip-box::before with content: \"\"",
          "Set width: 20px, height: 20px, and display: block",
          "Set background-color: red",
        ],
        starterCss: `.tooltip-box::before {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "content: ''; width: 20px; height: 20px; background-color: red; display: block;",
        expected: {
          targetSelector: ".tooltip-box::before",
          content: '""',
          width: "20px",
          height: "20px",
          backgroundColor: "red",
          display: "block",
        },
        hints: [
          "Always specify `content: \"\";` for pseudo-elements to render!",
          "Add dimensions and color: `width: 20px; height: 20px; background-color: red; display: block;`.",
        ],
        solution: `.tooltip-box::before {
  content: "";
  width: 20px;
  height: 20px;
  background-color: red;
  display: block;
}`,
      },
      {
        id: "quest-47",
        index: 47,
        moduleIndex: 7,
        title: "The Notification Badge",
        subtitle: "Dynamic badge with ::after",
        targetClass: "icon-box",
        type: "selectors",
        xp: 210,
        intro: "Attach a notification counter badge to an icon using ::after!",
        description:
          "On .icon-box::after, set content: \"3\", background-color: red, position: absolute, top: -5px, and right: -5px.",
        goals: [
          "Target .icon-box::after with content: \"3\"",
          "Position absolutely at top: -5px and right: -5px",
          "Set background-color: red",
        ],
        starterCss: `.icon-box::after {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: 'content: "3"; background-color: red; position: absolute; top: -5px; right: -5px;',
        expected: {
          targetSelector: ".icon-box::after",
          content: '"3"',
          backgroundColor: "red",
          position: "absolute",
          top: "-5px",
          right: "-5px",
        },
        hints: [
          "Set the badge text in content: `content: \"3\";`.",
          "Position in corner: `position: absolute; top: -5px; right: -5px; background-color: red;`.",
        ],
        solution: `.icon-box::after {
  content: "3";
  background-color: red;
  position: absolute;
  top: -5px;
  right: -5px;
}`,
      },
      {
        id: "quest-48",
        index: 48,
        moduleIndex: 8,
        title: "The CSS Triangle",
        subtitle: "Zero-dimension border geometry",
        targetClass: "triangle-box",
        type: "selectors",
        xp: 220,
        intro:
          "Craft a pure CSS triangle using zero-size boxes and intersecting transparent borders!",
        description:
          "Style .triangle-box with width: 0, height: 0, border-left: 20px solid transparent, border-right: 20px solid transparent, and border-top: 20px solid blue.",
        goals: [
          "Set width: 0 and height: 0",
          "Set border-left: 20px solid transparent and border-right: 20px solid transparent",
          "Set border-top: 20px solid blue",
        ],
        starterCss: `.triangle-box {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle:
          "width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid transparent; border-top: 20px solid blue;",
        expected: {
          targetSelector: ".triangle-box",
          width: "0",
          height: "0",
          borderTop: "20px solid blue",
        },
        hints: [
          "Collapse box dimensions: `width: 0; height: 0;`.",
          "Add border wings: `border-left: 20px solid transparent; border-right: 20px solid transparent; border-top: 20px solid blue;`.",
        ],
        solution: `.triangle-box {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid blue;
}`,
      },
      {
        id: "quest-49",
        index: 49,
        moduleIndex: 9,
        title: "The Empty State",
        subtitle: "Detecting blank nodes with :empty",
        targetClass: "data-box",
        type: "selectors",
        xp: 230,
        intro: "Detect container elements that have zero child nodes or text!",
        description:
          "Target .data-box:empty and apply border: 2px dashed red to highlight unfilled containers.",
        goals: [
          "Target .data-box:empty selector",
          "Set border: 2px dashed red",
        ],
        starterCss: `.data-box:empty {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle: "border: 2px dashed red;",
        expected: {
          targetSelector: ".data-box:empty",
          border: "2px dashed red",
        },
        hints: [
          "Use `:empty` selector: `.data-box:empty`.",
          "Style border: `border: 2px dashed red;`.",
        ],
        solution: `.data-box:empty {
  border: 2px dashed red;
}`,
      },
      {
        id: "quest-50",
        index: 50,
        moduleIndex: 10,
        title: "The Glowing Backdrop",
        subtitle: "Blur aura behind cards with ::before",
        targetClass: "card-box",
        type: "selectors",
        xp: 250,
        intro: "Craft a modern glowing ambient lighting backdrop beneath a card!",
        description:
          "On .card-box::before, set content: \"\", position: absolute, width: 100%, height: 100%, background-color: cyan, z-index: -1, and filter: blur(15px).",
        goals: [
          "Target .card-box::before with content: \"\"",
          "Set position: absolute, width: 100%, height: 100%, and z-index: -1",
          "Set background-color: cyan and filter: blur(15px)",
        ],
        starterCss: `.card-box::before {
  /* Write your CSS here */
}
`,
        stage: { width: 520, height: 320 },
        target: {},
        targetStyle:
          'content: ""; position: absolute; width: 100%; height: 100%; background-color: cyan; z-index: -1; filter: blur(15px);',
        expected: {
          targetSelector: ".card-box::before",
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "cyan",
          zIndex: "-1",
          filter: "blur(15px)",
        },
        hints: [
          "Include `content: \"\";` and `position: absolute; width: 100%; height: 100%;`.",
          "Add neon color and blur: `background-color: cyan; z-index: -1; filter: blur(15px);`.",
        ],
        solution: `.card-box::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: cyan;
  z-index: -1;
  filter: blur(15px);
}`,
      },
    ],
  },
];

// Flattened list of all 50 quests with module metadata attached
export const ALL_QUESTS = MODULES.flatMap((m, mIdx) =>
  m.quests.map((q, qIdx) => ({
    ...q,
    moduleId: m.id,
    moduleTitle: m.title,
    moduleShortTitle: m.shortTitle,
    moduleNumber: mIdx + 1,
    moduleIndex: q.moduleIndex || qIdx + 1,
    moduleTotal: m.quests.length,
  })),
);

export const QUESTS = ALL_QUESTS;
export const lesson1 = ALL_QUESTS[0];
export default ALL_QUESTS;



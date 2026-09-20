# CSS Playground Pro

Project: CSS Quest – Interactive CSS Learning Game

Role

You are a senior frontend engineer and UI/UX designer. Build a polished, interactive CSS learning web application using React and Vite.

The goal is to teach CSS in a playful, visual, and beginner-friendly manner. Users should learn CSS by writing real CSS code, interacting with challenges, and seeing the results instantly.

1. Technology Stack

React

Vite

JavaScript (prefer JavaScript over TypeScript)

CSS or Tailwind CSS for styling

CodeMirror or Monaco Editor for the code editor (choose a lightweight option appropriate for the project)

React state management using React hooks

No backend required for the initial version

Use local state for lesson progress

The application should be modular and easy to expand with additional lessons.

2. Application Concept

Create a gamified CSS learning platform called "CSS Quest."

The user learns CSS through interactive challenges.

Each lesson should contain:

A lesson title and description.

A visual challenge area.

A target preview showing the expected result.

A live playground where the user's CSS is applied to an HTML element.

A CSS code editor.

A Run / Preview button or live preview functionality.

A hint system.

A success state when the challenge is completed.

A Reset Code button.

A Next Lesson button (disabled until the lesson is completed).

The first version should focus on building and polishing ONE fully functional lesson.

Do not build multiple incomplete lessons.

3. Lesson 1: Place the Red Box

Lesson Objective

Teach the beginner how to use CSS properties to position and style a box.

The user should understand:

CSS class selectors

Width

Height

Background color

Margin or positioning (depending on the challenge design)

How CSS changes the appearance of an HTML element

Challenge Design

Display a large playground container.

Inside the container, there should be a red box that the user needs to place in a specific target location.

The target can be represented by a dashed outline or a highlighted target zone.

The user writes CSS in the editor to move or style the red box until it matches the expected target.

The target position and challenge requirements must be clearly defined.

HTML Provided to the User

The application should display a fixed HTML structure that the learner cannot modify.

Example:

The learner should only write CSS for the .red-box class.

Example starting CSS:

.red-box {
/* Write your CSS here */
}

The HTML should remain protected from editing.

Expected Interaction

The learner opens Lesson 1.

They see the playground and target.

They read the challenge instructions.

They write CSS in the editor.

Their CSS is applied to the preview.

They receive visual feedback.

Once the box reaches the target, the application displays a success animation.

The learner can proceed to the next lesson placeholder.

The target should be validated using a defined tolerance rather than requiring an impossible pixel-perfect match.

4. User Interface Layout

Create a clean, modern learning interface.

Header

Include:

CSS Quest logo

Lesson progress (Lesson 1)

XP or points display

Reset lesson option

Main Content

Use a two-panel desktop layout.

Left Panel: Challenge Playground

Include:

Lesson title

Challenge instructions

Target preview

Interactive playground

Visual feedback

Hint button

Right Panel: CSS Code Editor

Include:

A code editor with CSS syntax highlighting

.red-box starter class

Line numbers

Dark editor theme

Reset Code button

Run Code button (if not using live updates)

Error feedback when CSS is invalid

Responsive Design

On mobile devices:

Stack the playground and editor vertically.

Keep the target and preview visible.

Ensure the code editor is comfortable to use.

Use responsive spacing and accessible controls.

5. Playful Learning Experience

Make the application feel like a game, not a boring code editor.

Add:

XP rewards for completing a challenge.

A progress bar.

Friendly microcopy.

Success animations.

A small celebration effect when the lesson is completed.

Hint system with progressive hints.

Clear visual feedback.

A beginner-friendly design.

Example messages:

Before completion:
"Your mission: guide the red box to its target!"

After a failed attempt:
"Not quite there! Try adjusting the position."

After success:
"🎉 Mission complete! You placed the red box perfectly!"

Avoid excessive animations that distract from learning.

6. CSS Execution and Security

Implement a safe CSS playground.

Requirements:

Allow users to edit CSS only.

Keep the provided HTML structure fixed.

Scope learner CSS to the playground.

Prevent CSS from affecting the rest of the application.

Sanitize or restrict unsafe CSS constructs where appropriate.

Do not execute arbitrary JavaScript from user input.

Handle malformed CSS gracefully.

Prevent user CSS from hiding the target or altering the challenge validation logic.

Prefer a sandboxed iframe or another appropriately isolated preview approach if needed.

The application should not use eval() to execute user code.

7. Lesson Validation

Create a validation system that checks whether the learner has achieved the target.

For Lesson 1, validate:

The red box's position.

The required dimensions.

The required background color.

Use a defined tolerance for position matching.

The validation should not depend on a hardcoded success button.

The user must actually complete the challenge.

Show:

Incomplete state

Almost complete state (optional)

Completed state

Ensure validation works consistently after reset and repeated attempts.

8. Code Architecture

Organize the project into reusable components.

Suggested structure:

src/
├── components/
│ ├── Header.jsx
│ ├── LessonLayout.jsx
│ ├── Playground.jsx
│ ├── CodeEditor.jsx
│ ├── ChallengeInstructions.jsx
│ ├── HintPanel.jsx
│ ├── ProgressBar.jsx
│ └── SuccessModal.jsx
├── lessons/
│ └── lesson1.js
├── utils/
│ ├── cssValidator.js
│ └── cssSandbox.js
├── App.jsx
├── main.jsx
└── index.css

Keep lesson configuration separate from the UI so additional challenges can be added without rewriting the entire application.

9. Design System

Visual style:

Modern educational game.

Friendly and approachable.

Clean typography.

Rounded cards.

Subtle shadows.

Professional spacing.

Dark code editor.

Light or soft-colored playground.

Clear accent colors.

Smooth but restrained transitions.

Use accessible contrast and keyboard-friendly controls.

Avoid making the interface look like a complex professional IDE.

The learner should immediately understand:

What to do.

Where to write CSS.

Where to see the result.

How to know whether they succeeded.

10. Deliverables

Build a working React + Vite application.

The first implementation must include:

Functional Lesson 1.

Fixed HTML playground.

CSS editor.

Live or Run-based CSS preview.

Target position.

Challenge validation.

Hint system.

Reset functionality.

Success animation.

Responsive design.

Clean component architecture.

Instructions for running the project locally.

Start by implementing Lesson 1 completely and test the core challenge before adding any additional features.

Do not add authentication, a backend, or unnecessary features in this initial version.

Prioritize a polished and enjoyable learning experience over the number of features.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

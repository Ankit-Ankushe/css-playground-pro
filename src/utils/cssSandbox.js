// Builds the sandboxed preview document for both Box Placement and Flexbox quests.

const BLOCKED_PATTERNS = [
  /@import/gi,
  /url\s*\(/gi,
  /expression\s*\(/gi,
  /javascript\s*:/gi,
  /behavior\s*:/gi,
  /-moz-binding/gi,
  /<\s*\/?\s*(script|style|iframe|link)/gi,
];

/** Strip constructs that could load or run anything outside the playground. */
export function sanitizeCss(css = "") {
  let safe = String(css).slice(0, 8000);
  for (const pattern of BLOCKED_PATTERNS) {
    safe = safe.replace(pattern, "/* blocked */");
  }
  return safe;
}

/** Very light syntax check so we can show friendly feedback. */
export function findCssError(css = "") {
  let depth = 0;
  for (const char of css) {
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth < 0) return "There's an extra closing brace } somewhere.";
    }
  }
  if (depth > 0) return "A block is missing its closing brace }.";
  const declarations = css.replace(/\/\*[\s\S]*?\*\//g, "").match(/\{([^}]*)\}/g) || [];
  for (const block of declarations) {
    const body = block.slice(1, -1).trim();
    if (!body) continue;
    const parts = body
      .split(";")
      .map((p) => p.trim())
      .filter(Boolean);
    for (const part of parts) {
      if (!part.includes(":")) {
        return `"${part}" looks off — declarations need the shape property: value;`;
      }
    }
  }
  return null;
}

export function getHtmlSnippet(lessonOrClass = "red-box") {
  if (typeof lessonOrClass === "object") {
    if (lessonOrClass?.type === "flexbox") {
      const boxCount = lessonOrClass.boxCount || 3;
      const boxes = Array.from({ length: boxCount })
        .map((_, i) => `    <div class="box box-${i + 1}">${i + 1}</div>`)
        .join("\n");
      return `<div class="stage">
  <div class="container">
${boxes}
  </div>
</div>`;
    }

    if (lessonOrClass?.type === "selectors" || lessonOrClass?.moduleId === "selector-sorcery") {
      if (lessonOrClass.index >= 41 && lessonOrClass.index <= 44) {
        return `<div class="stage">
  <div class="box-list">
    <div>Item 1</div>
    <div>Item 2</div>
    <div class="special">VIP (Special)</div>
    <div>Item 4</div>
    <div>Item 5</div>
  </div>
</div>`;
      }
      if (lessonOrClass.index === 45) {
        return `<div class="stage">
  <div class="sibling-container">
    <div class="trigger-box">Hover Me!</div>
    <div class="target-box">Sibling Target</div>
  </div>
</div>`;
      }
      if (lessonOrClass.index === 46) {
        return `<div class="stage">
  <div class="tooltip-box">Tooltip Anchor</div>
</div>`;
      }
      if (lessonOrClass.index === 47) {
        return `<div class="stage">
  <div class="icon-box">🔔</div>
</div>`;
      }
      if (lessonOrClass.index === 48) {
        return `<div class="stage">
  <div class="triangle-box"></div>
</div>`;
      }
      if (lessonOrClass.index === 49) {
        return `<div class="stage">
  <div class="empty-state-group">
    <div class="data-box">Has Loaded Data</div>
    <div class="data-box"></div>
  </div>
</div>`;
      }
      if (lessonOrClass.index === 50) {
        return `<div class="stage">
  <div class="card-box">
    <h3>Cyber Card</h3>
    <p>Glow backdrop</p>
  </div>
</div>`;
      }
    }

    if (lessonOrClass?.type === "motion" || lessonOrClass?.moduleId === "motion-transforms") {
      const targetClass = lessonOrClass.targetClass || "motion-box";
      return `<div class="stage">
  <div class="motion-stage-center">
    <div class="${targetClass}">
      <div class="box-content">${lessonOrClass.shortTitle || lessonOrClass.title || "Motion Box"}</div>
    </div>
  </div>
</div>`;
    }

    if (lessonOrClass?.type === "grid" || lessonOrClass?.type === "grid-item" || lessonOrClass?.moduleId === "grid-mastery") {
      if (lessonOrClass.index === 25) {
        return `<div class="stage">
  <div class="grid-container">
    <div class="grid-item hero-item">Hero Banner</div>
    <div class="grid-item item-2">Card 2</div>
    <div class="grid-item item-3">Card 3</div>
    <div class="grid-item item-4">Card 4</div>
  </div>
</div>`;
      }
      if (lessonOrClass.index === 26) {
        return `<div class="stage">
  <div class="grid-container">
    <div class="grid-item sidebar-item">Sidebar</div>
    <div class="grid-item item-2">Header / Card 1</div>
    <div class="grid-item item-3">Main / Card 2</div>
  </div>
</div>`;
      }
      if (lessonOrClass.index === 27) {
        return `<div class="stage">
  <div class="grid-container">
    <div class="grid-item item-1">Card 1</div>
    <div class="grid-item item-2">Card 2</div>
    <div class="grid-item item-3">Card 3</div>
    <div class="grid-item footer-item">Full Width Footer</div>
  </div>
</div>`;
      }
      if (lessonOrClass.index === 28) {
        return `<div class="stage">
  <div class="grid-container">
    <div class="grid-item item-1">Start Cell (1, 1)</div>
    <div class="grid-item target-item">Target Item</div>
  </div>
</div>`;
      }

      const itemCount = lessonOrClass.gridItemCount || 4;
      const items = Array.from({ length: itemCount })
        .map((_, i) => `    <div class="grid-item item-${i + 1}">Item ${i + 1}</div>`)
        .join("\n");
      return `<div class="stage">
  <div class="grid-container">
${items}
  </div>
</div>`;
    }
  }

  const targetClass =
    typeof lessonOrClass === "string" ? lessonOrClass : lessonOrClass?.targetClass || "red-box";

  return `<div class="stage">
  <div class="target-zone"></div>
  <div class="${targetClass}"></div>
</div>`;
}

export const HTML_SNIPPET = getHtmlSnippet("red-box");

export function buildPreviewDocument({
  userCss = "",
  stage = { width: 520, height: 320 },
  target = {},
  targetClass = "red-box",
  lesson = {},
}) {
  const isSelectors = lesson.type === "selectors" || lesson.moduleId === "selector-sorcery";
  const isMotion = lesson.type === "motion" || lesson.moduleId === "motion-transforms";
  const isGrid = lesson.type === "grid" || lesson.type === "grid-item" || lesson.moduleId === "grid-mastery";
  const isFlexbox = lesson.type === "flexbox" || targetClass === "container";

  if (isSelectors) {
    let stageInnerHtml = "";
    if (lesson.index >= 41 && lesson.index <= 44) {
      stageInnerHtml = `
        <div class="box-list">
          <div>Item 1</div>
          <div>Item 2</div>
          <div class="special">VIP (Special)</div>
          <div>Item 4</div>
          <div>Item 5</div>
        </div>
      `;
    } else if (lesson.index === 45) {
      stageInnerHtml = `
        <div class="sibling-container">
          <div class="trigger-box">Hover Me!</div>
          <div class="target-box">Sibling Target</div>
        </div>
      `;
    } else if (lesson.index === 46) {
      stageInnerHtml = `<div class="tooltip-box">Tooltip Anchor</div>`;
    } else if (lesson.index === 47) {
      stageInnerHtml = `<div class="icon-box">🔔</div>`;
    } else if (lesson.index === 48) {
      stageInnerHtml = `<div class="triangle-box"></div>`;
    } else if (lesson.index === 49) {
      stageInnerHtml = `
        <div class="empty-state-group">
          <div class="data-box">Has Loaded Data</div>
          <div class="data-box"></div>
        </div>
      `;
    } else if (lesson.index === 50) {
      stageInnerHtml = `
        <div class="card-box">
          <h3>Cyber Card</h3>
          <p>Glow backdrop</p>
        </div>
      `;
    }

    return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: transparent; font-family: system-ui, sans-serif; }
  body { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 12px; }

  .stage {
    position: relative;
    width: ${stage.width}px;
    height: ${stage.height}px;
    max-width: 100%;
    border-radius: 18px;
    background:
      radial-gradient(circle at 18% 18%, rgba(56,189,248,0.16), transparent 55%),
      repeating-linear-gradient(0deg, rgba(15,23,42,0.06) 0 1px, transparent 1px 40px),
      repeating-linear-gradient(90deg, rgba(15,23,42,0.06) 0 1px, transparent 1px 40px),
      #f2f9fb;
    border: 1px solid rgba(15,23,42,0.08);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .hover-hint-banner {
    position: absolute;
    top: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(14,165,233,0.12);
    border: 1px solid rgba(14,165,233,0.3);
    border-radius: 9999px;
    padding: 4px 12px;
    font-size: 11px;
    font-weight: 700;
    color: #0369a1;
    pointer-events: none;
  }

  /* List of items for quests 41-44 */
  .box-list {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .box-list div {
    width: 80px;
    height: 80px;
    background: #e2e8f0;
    border: 2px solid #cbd5e1;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 12px;
    color: #475569;
    text-align: center;
    transition: all 250ms ease;
  }

  .box-list div.special {
    border-color: #8b5cf6;
    background: #f5f3ff;
    color: #7c3aed;
  }

  /* Sibling container for quest 45 */
  .sibling-container {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .trigger-box, .target-box {
    width: 130px;
    height: 90px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 13px;
    text-align: center;
    padding: 10px;
    transition: all 250ms ease;
  }

  .trigger-box {
    background: linear-gradient(135deg, #38bdf8, #0284c7);
    color: white;
    cursor: pointer;
  }

  .target-box {
    background: #e2e8f0;
    color: #475569;
    border: 2px dashed #94a3b8;
  }

  /* Tooltip for quest 46 */
  .tooltip-box {
    position: relative;
    background: #0f172a;
    color: white;
    font-weight: 800;
    font-size: 14px;
    padding: 14px 24px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Icon box for quest 47 */
  .icon-box {
    position: relative;
    width: 70px;
    height: 70px;
    background: #f1f5f9;
    border: 2px solid #e2e8f0;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }

  /* Triangle for quest 48 */
  .triangle-box {
    transition: all 250ms ease;
  }

  /* Empty state for quest 49 */
  .empty-state-group {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .data-box {
    width: 140px;
    height: 90px;
    background: white;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 12px;
    color: #475569;
    text-align: center;
    padding: 8px;
  }

  /* Card box for quest 50 */
  .card-box {
    position: relative;
    width: 200px;
    height: 130px;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 16px;
  }
  .card-box h3 { margin: 0 0 4px; font-size: 16px; font-weight: 800; }
  .card-box p { margin: 0; font-size: 11px; opacity: 0.7; }
</style>
<style id="learner-css">
${sanitizeCss(userCss)}
</style>
</head>
<body>
  <div class="stage">
    ${lesson.index === 45 ? `<div class="hover-hint-banner">✨ Hover over "Hover Me!" to test adjacent sibling!</div>` : ""}
    ${stageInnerHtml}
  </div>
</body>
</html>`;
  }

  if (isMotion) {
    const isCard = targetClass === "card-box";
    const targetStyle = lesson.targetStyle || "";

    return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: transparent; font-family: system-ui, sans-serif; }
  body { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 12px; }

  .stage {
    position: relative;
    width: ${stage.width}px;
    height: ${stage.height}px;
    max-width: 100%;
    border-radius: 18px;
    background:
      radial-gradient(circle at 18% 18%, rgba(56,189,248,0.16), transparent 55%),
      repeating-linear-gradient(0deg, rgba(15,23,42,0.06) 0 1px, transparent 1px 40px),
      repeating-linear-gradient(90deg, rgba(15,23,42,0.06) 0 1px, transparent 1px 40px),
      #f2f9fb;
    border: 1px solid rgba(15,23,42,0.08);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .hover-hint-banner {
    position: absolute;
    top: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(14,165,233,0.12);
    border: 1px solid rgba(14,165,233,0.3);
    border-radius: 9999px;
    padding: 4px 12px;
    font-size: 11px;
    font-weight: 700;
    color: #0369a1;
    letter-spacing: 0.02em;
    pointer-events: none;
    animation: float 2s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }

  .motion-stage-center {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Ghost target guide */
  .target-motion-ghost {
    position: absolute;
    width: ${isCard ? "180px" : "110px"};
    height: ${isCard ? "140px" : "110px"};
    border: 2px dashed rgba(14,116,144,0.55);
    border-radius: 14px;
    background: rgba(14,165,233,0.06);
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: rgba(14,116,144,0.7);
    ${targetStyle}
  }

  /* Interactive motion elements */
  .motion-box, .spin-box, .hinge-box, .skew-box, .combo-box, .delay-box, .linear-box, .card-box {
    width: ${isCard ? "180px" : "110px"};
    height: ${isCard ? "140px" : "110px"};
    border-radius: 14px;
    background: linear-gradient(135deg, #0ea5e9, #2563eb);
    color: white;
    font-weight: 800;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 12px;
    cursor: pointer;
    box-shadow: 0 8px 20px -4px rgba(14,165,233,0.35);
    user-select: none;
  }

  .card-box {
    background: linear-gradient(135deg, #6366f1, #a855f7);
    box-shadow: 0 10px 25px -5px rgba(99,102,241,0.4);
  }
  .spin-box { background: linear-gradient(135deg, #f59e0b, #ea580c); }
  .hinge-box { background: linear-gradient(135deg, #10b981, #0d9488); }
  .skew-box { background: linear-gradient(135deg, #ec4899, #be185d); }
  .combo-box { background: linear-gradient(135deg, #8b5cf6, #4338ca); }

  /* For transition demonstration quests */
  .delay-box:hover, .linear-box:hover {
    transform: translateX(50px) scale(1.05);
    background: linear-gradient(135deg, #38bdf8, #0284c7);
  }
  .motion-box:hover {
    background: linear-gradient(135deg, #38bdf8, #0284c7);
  }
</style>
<style id="learner-css">
${sanitizeCss(userCss)}
</style>
</head>
<body>
  <div class="stage">
    ${lesson.isHoverQuest || lesson.index === 31 || lesson.index === 38 || lesson.index === 39 ? `<div class="hover-hint-banner">✨ Hover over the box to test effect!</div>` : ""}
    <div class="motion-stage-center">
      ${targetStyle && !lesson.isHoverQuest ? `<div class="target-motion-ghost">Target State</div>` : ""}
      <div class="${targetClass}">
        <span>${lesson.shortTitle || lesson.title}</span>
      </div>
    </div>
  </div>
</body>
</html>`;
  }

  if (isGrid) {
    const targetStyle = lesson.targetStyle || "display: grid; grid-template-columns: 1fr 1fr;";
    let baseContainerStyle = "position: relative; width: 100%; height: 100%;";
    if (lesson.index === 25) {
      baseContainerStyle += " display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;";
    } else if (lesson.index === 26) {
      baseContainerStyle += " display: grid; grid-template-columns: 140px 1fr; grid-template-rows: 100px 100px; gap: 12px;";
    } else if (lesson.index === 27) {
      baseContainerStyle += " display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;";
    } else if (lesson.index === 28) {
      baseContainerStyle += " display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 60px); gap: 10px;";
    }

    let ghostHtml = "";
    if (lesson.index === 25) {
      ghostHtml = `
        <div class="target-grid-item" style="grid-column: span 2;">Target Span 2</div>
        <div class="target-grid-item">2</div>
        <div class="target-grid-item">3</div>
        <div class="target-grid-item">4</div>
      `;
    } else if (lesson.index === 26) {
      ghostHtml = `
        <div class="target-grid-item" style="grid-row: span 2;">Target Row Span 2</div>
        <div class="target-grid-item">2</div>
        <div class="target-grid-item">3</div>
      `;
    } else if (lesson.index === 27) {
      ghostHtml = `
        <div class="target-grid-item">1</div>
        <div class="target-grid-item">2</div>
        <div class="target-grid-item">3</div>
        <div class="target-grid-item" style="grid-column: 1 / -1;">Target Footer (1 / -1)</div>
      `;
    } else if (lesson.index === 28) {
      ghostHtml = `
        <div class="target-grid-item" style="grid-column-start: 1; grid-row-start: 1;">(1,1)</div>
        <div class="target-grid-item" style="grid-column-start: 2; grid-row-start: 3;">Target (Col 2, Row 3)</div>
      `;
    }

    let liveItemsHtml = "";
    if (lesson.index === 25) {
      liveItemsHtml = `
        <div class="grid-item hero-item">Hero Banner</div>
        <div class="grid-item item-2">Card 2</div>
        <div class="grid-item item-3">Card 3</div>
        <div class="grid-item item-4">Card 4</div>
      `;
    } else if (lesson.index === 26) {
      liveItemsHtml = `
        <div class="grid-item sidebar-item">Sidebar</div>
        <div class="grid-item item-2">Header / Card 1</div>
        <div class="grid-item item-3">Main / Card 2</div>
      `;
    } else if (lesson.index === 27) {
      liveItemsHtml = `
        <div class="grid-item item-1">Card 1</div>
        <div class="grid-item item-2">Card 2</div>
        <div class="grid-item item-3">Card 3</div>
        <div class="grid-item footer-item">Full Width Footer</div>
      `;
    } else if (lesson.index === 28) {
      liveItemsHtml = `
        <div class="grid-item item-1">Start Cell (1, 1)</div>
        <div class="grid-item target-item">Target Item</div>
      `;
    } else {
      const count = lesson.gridItemCount || 4;
      liveItemsHtml = Array.from({ length: count })
        .map((_, i) => `<div class="grid-item item-${i + 1}">Item ${i + 1}</div>`)
        .join("");
    }

    return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: transparent; font-family: system-ui, sans-serif; }
  body { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 12px; }

  .stage {
    position: relative;
    width: ${stage.width}px;
    height: ${stage.height}px;
    max-width: 100%;
    border-radius: 18px;
    background:
      radial-gradient(circle at 18% 18%, rgba(56,189,248,0.16), transparent 55%),
      repeating-linear-gradient(0deg, rgba(15,23,42,0.06) 0 1px, transparent 1px 40px),
      repeating-linear-gradient(90deg, rgba(15,23,42,0.06) 0 1px, transparent 1px 40px),
      #f2f9fb;
    border: 1px solid rgba(15,23,42,0.08);
    overflow: hidden;
    padding: 16px;
  }

  /* Ghost target guide */
  .target-grid-container {
    position: absolute;
    inset: 16px;
    pointer-events: none;
    ${baseContainerStyle}
    ${targetStyle}
  }

  .target-grid-item {
    min-height: 50px;
    border: 2px dashed rgba(14,116,144,0.6);
    border-radius: 10px;
    background: rgba(14,165,233,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
    color: rgba(14,116,144,0.7);
    padding: 8px;
  }

  /* Live grid container */
  .grid-container {
    ${baseContainerStyle}
    transition: all 250ms ease;
  }

  .grid-item {
    min-height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.25);
    box-shadow: 0 3px 10px rgba(15,23,42,0.12);
    padding: 10px;
    transition: all 240ms cubic-bezier(0.2, 0.9, 0.3, 1.1);
  }

  .item-1, .grid-item:nth-child(1) { background: linear-gradient(135deg, #38bdf8, #0284c7); }
  .item-2, .grid-item:nth-child(2) { background: linear-gradient(135deg, #f59e0b, #d97706); }
  .item-3, .grid-item:nth-child(3) { background: linear-gradient(135deg, #22c55e, #16a34a); }
  .item-4, .grid-item:nth-child(4) { background: linear-gradient(135deg, #a855f7, #7e22ce); }
  .item-5, .grid-item:nth-child(5) { background: linear-gradient(135deg, #ec4899, #be185d); }
  .item-6, .grid-item:nth-child(6) { background: linear-gradient(135deg, #6366f1, #4338ca); }

  .hero-item { background: linear-gradient(135deg, #06b6d4, #0e7490) !important; font-weight: 800; }
  .sidebar-item { background: linear-gradient(135deg, #8b5cf6, #6d28d9) !important; font-weight: 800; }
  .footer-item { background: linear-gradient(135deg, #10b981, #047857) !important; font-weight: 800; }
  .target-item { background: linear-gradient(135deg, #f43f5e, #be123c) !important; font-weight: 800; }
</style>
<style id="learner-css">
${sanitizeCss(userCss)}
</style>
</head>
<body>
  <div class="stage">
    ${ghostHtml ? `<div class="target-grid-container">${ghostHtml}</div>` : ""}
    <div class="grid-container">
      ${liveItemsHtml}
    </div>
  </div>
</body>
</html>`;
  }
  const boxCount = lesson.boxCount || 3;
  const isWrap = boxCount > 3;

  if (isFlexbox) {
    const targetStyle = lesson.targetStyle || "display: flex;";
    const targetBoxes = Array.from({ length: boxCount })
      .map((_, i) => `<div class="target-box target-box-${i + 1}">${i + 1}</div>`)
      .join("");
    const liveBoxes = Array.from({ length: boxCount })
      .map((_, i) => `<div class="box box-${i + 1}">${i + 1}</div>`)
      .join("");

    return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: transparent; font-family: system-ui, sans-serif; }
  body { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 12px; }
  
  .stage {
    position: relative;
    width: ${stage.width}px;
    height: ${stage.height}px;
    max-width: 100%;
    border-radius: 18px;
    background:
      radial-gradient(circle at 18% 18%, rgba(56,189,248,0.16), transparent 55%),
      repeating-linear-gradient(0deg, rgba(15,23,42,0.06) 0 1px, transparent 1px 40px),
      repeating-linear-gradient(90deg, rgba(15,23,42,0.06) 0 1px, transparent 1px 40px),
      #f2f9fb;
    border: 1px solid rgba(15,23,42,0.08);
    overflow: hidden;
    padding: 16px;
  }

  /* Ghost target showing where items should land */
  .target-container {
    position: absolute;
    inset: 16px;
    pointer-events: none;
    gap: 12px;
    ${targetStyle}
  }

  .target-box {
    width: ${isWrap ? "135px" : "80px"};
    height: ${isWrap ? "60px" : "80px"};
    border: 2px dashed rgba(14,116,144,0.65);
    border-radius: 12px;
    background: rgba(14,165,233,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 18px;
    color: rgba(14,116,144,0.7);
  }

  /* Live container and boxes styled by learner */
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    gap: 12px;
    transition: all 250ms ease;
  }

  .box {
    width: ${isWrap ? "135px" : "80px"};
    height: ${isWrap ? "60px" : "80px"};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 18px;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.25);
    box-shadow: 0 4px 12px rgba(15,23,42,0.15);
    transition: all 240ms cubic-bezier(0.2, 0.9, 0.3, 1.1);
  }

  .box-1 { background: linear-gradient(135deg, #38bdf8, #0284c7); }
  .box-2 { background: linear-gradient(135deg, #f59e0b, #d97706); }
  .box-3 { background: linear-gradient(135deg, #22c55e, #16a34a); }
  .box-4 { background: linear-gradient(135deg, #a855f7, #7e22ce); }
  .box-5 { background: linear-gradient(135deg, #ec4899, #be185d); }
  .box-6 { background: linear-gradient(135deg, #6366f1, #4338ca); }
</style>
<style id="learner-css">
${sanitizeCss(userCss)}
</style>
</head>
<body>
  <div class="stage">
    <div class="target-container">
      ${targetBoxes}
    </div>
    <div class="container">
      ${liveBoxes}
    </div>
  </div>
</body>
</html>`;
  }

  // Box Placement Sandboxing
  const borderRadius = target.borderRadius || "10px";
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: transparent; font-family: system-ui, sans-serif; }
  body { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 12px; }
  .stage {
    position: relative;
    width: ${stage.width}px;
    height: ${stage.height}px;
    max-width: 100%;
    border-radius: 18px;
    background:
      radial-gradient(circle at 18% 18%, rgba(56,189,248,0.16), transparent 55%),
      repeating-linear-gradient(0deg, rgba(15,23,42,0.06) 0 1px, transparent 1px 40px),
      repeating-linear-gradient(90deg, rgba(15,23,42,0.06) 0 1px, transparent 1px 40px),
      #f2f9fb;
    border: 1px solid rgba(15,23,42,0.08);
    overflow: hidden;
  }
  .target-zone {
    position: absolute;
    left: ${target.left}px;
    top: ${target.top}px;
    width: ${target.width}px;
    height: ${target.height}px;
    border: 3px dashed rgba(14,116,144,0.75);
    border-radius: ${borderRadius};
    background: rgba(14,165,233,0.1);
  }
  .target-zone::after {
    content: "target";
    position: absolute;
    left: 0; right: 0; bottom: -22px;
    text-align: center;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(14,116,144,0.9);
  }
  .${targetClass} { width: 40px; height: 40px; background: #cbd5e1; border-radius: 8px; transition: all 180ms ease; }
</style>
<style id="learner-css">
${sanitizeCss(userCss)}
</style>
<style>
  /* Challenge integrity */
  .stage { position: relative !important; width: ${stage.width}px !important; height: ${stage.height}px !important; display: block !important; opacity: 1 !important; transform: none !important; zoom: 1 !important; }
  .target-zone { left: ${target.left}px !important; top: ${target.top}px !important; width: ${target.width}px !important; height: ${target.height}px !important; border-radius: ${borderRadius} !important; display: block !important; visibility: visible !important; opacity: 1 !important; transform: none !important; }
  .${targetClass} { display: block !important; visibility: visible !important; opacity: 1 !important; transform: none !important; }
</style>
</head>
<body>
${getHtmlSnippet(targetClass)}
</body>
</html>`;
}

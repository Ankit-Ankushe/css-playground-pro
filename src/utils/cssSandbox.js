// Builds the sandboxed preview document. Learner CSS is injected as plain
// text inside a <style> tag of a sandboxed iframe — never evaluated as JS.

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

export const HTML_SNIPPET = `<div class="stage">
  <div class="target-zone"></div>
  <div class="red-box"></div>
</div>`;

export function buildPreviewDocument({ userCss, stage, target }) {
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
    border-radius: 10px;
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
  .red-box { width: 40px; height: 40px; background: #cbd5e1; border-radius: 8px; transition: all 180ms ease; }
</style>
<style id="learner-css">
${sanitizeCss(userCss)}
</style>
<style>
  /* Challenge integrity: learner CSS cannot hide or move the target or the box. */
  .stage { position: relative !important; width: ${stage.width}px !important; height: ${stage.height}px !important; display: block !important; opacity: 1 !important; transform: none !important; zoom: 1 !important; }
  .target-zone { left: ${target.left}px !important; top: ${target.top}px !important; width: ${target.width}px !important; height: ${target.height}px !important; display: block !important; visibility: visible !important; opacity: 1 !important; transform: none !important; }
  .red-box { display: block !important; visibility: visible !important; opacity: 1 !important; transform: none !important; }
</style>
</head>
<body>
${HTML_SNIPPET}
</body>
</html>`;
}

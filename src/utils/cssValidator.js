// Dynamic CSS Validator supporting Box Placement, Flexbox Fundamentals, and CSS Grid Mastery

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
  return r >= 130 && g <= 120 && b <= 120 && r - Math.max(g, b) >= 40;
}

export function isPurplish(color) {
  const rgb = parseRgb(color);
  if (!rgb) return false;
  const { r, g, b } = rgb;
  return r >= 70 && b >= 70 && g <= 140 && Math.min(r, b) > g;
}

function matchesValue(actual, expected) {
  if (!expected) return true;
  if (Array.isArray(expected)) {
    return expected.some((exp) => actual?.toLowerCase() === exp.toLowerCase());
  }
  return actual?.toLowerCase() === expected.toLowerCase();
}

/** Helper to extract raw declared CSS rules from the sandboxed document */
function getDeclaredRules(doc) {
  const result = {};
  try {
    const styleEls = doc.querySelectorAll("style");
    styleEls.forEach((styleEl) => {
      const text = styleEl.textContent || "";
      const ruleMatches = text.matchAll(/([^{]+)\{([^}]+)\}/g);
      for (const match of ruleMatches) {
        const selector = match[1].trim();
        const body = match[2];
        result[selector] = result[selector] || {};
        body.split(";").forEach((decl) => {
          const colonIdx = decl.indexOf(":");
          if (colonIdx > 0) {
            const prop = decl.slice(0, colonIdx).trim().toLowerCase();
            const val = decl.slice(colonIdx + 1).trim().toLowerCase();
            if (prop) result[selector][prop] = val;
          }
        });
      }
    });
  } catch (e) {
    // fallback gracefully
  }
  return result;
}

function getRulesForSelector(declaredRules, selector) {
  const normalize = (s) =>
    s
      .replace(/\s*::\s*/g, "::")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*\+\s*/g, "+")
      .replace(/\s*>\s*/g, ">")
      .replace(/\s*\(\s*/g, "(")
      .replace(/\s*\)\s*/g, ")")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const targetNorm = normalize(selector);

  // Direct exact match
  if (declaredRules[selector]) return declaredRules[selector];

  for (const [key, val] of Object.entries(declaredRules)) {
    const keyNorm = normalize(key);
    if (keyNorm === targetNorm) return val;
    // Allow single colon pseudo-element alias (:before == ::before)
    if (keyNorm.replace(/::/g, ":") === targetNorm.replace(/::/g, ":")) return val;
    // Allow > child combinator vs space descendant
    if (keyNorm.replace(/>/g, " ") === targetNorm.replace(/>/g, " ")) return val;
  }
  return {};
}

export function validateLesson(doc, lesson) {
  const empty = {
    lessonId: lesson?.id,
    checks: (lesson?.goals || []).map((goal) => ({ label: goal, ok: false })),
    passed: false,
    close: false,
    message: lesson?.intro || "Write some CSS to get started.",
  };
  if (!doc || !lesson) return empty;

  const declaredRules = getDeclaredRules(doc);

  // ==========================================
  // SELECTOR SORCERY & PSEUDO-ELEMENTS (Part 5)
  // ==========================================
  if (lesson.type === "selectors" || lesson.moduleId === "selector-sorcery") {
    const checks = [];

    // Quest 41: The Firstborn (.box-list div:first-child)
    if (lesson.index === 41) {
      const decl =
        getRulesForSelector(declaredRules, ".box-list div:first-child") ||
        getRulesForSelector(declaredRules, ".box-list > div:first-child") ||
        getRulesForSelector(declaredRules, ".box-list div:first-of-type");
      const bg = decl["background-color"] || decl.background || "";
      const isGold = bg.includes("gold") || bg.includes("#ffd700") || bg.includes("255, 215, 0") || bg.includes("255,215,0");
      const hasSelector = Object.keys(decl).length > 0;

      checks.push(
        { id: "selector", label: lesson.goals[0], ok: hasSelector },
        { id: "color", label: lesson.goals[1], ok: isGold },
      );
    }
    // Quest 42: Zebra Stripes (.box-list div:nth-child(odd))
    else if (lesson.index === 42) {
      const decl =
        getRulesForSelector(declaredRules, ".box-list div:nth-child(odd)") ||
        getRulesForSelector(declaredRules, ".box-list > div:nth-child(odd)") ||
        getRulesForSelector(declaredRules, ".box-list div:nth-child(2n+1)");
      const bg = decl["background-color"] || decl.background || "";
      const isDarkgray =
        bg.includes("darkgray") ||
        bg.includes("darkgrey") ||
        bg.includes("gray") ||
        bg.includes("grey") ||
        bg.includes("#a9a9a9") ||
        bg.includes("#808080") ||
        bg.includes("169, 169, 169");
      const hasSelector = Object.keys(decl).length > 0;

      checks.push(
        { id: "selector", label: lesson.goals[0], ok: hasSelector },
        { id: "color", label: lesson.goals[1], ok: isDarkgray },
      );
    }
    // Quest 43: The Exact Target (.box-list div:nth-child(4))
    else if (lesson.index === 43) {
      const decl =
        getRulesForSelector(declaredRules, ".box-list div:nth-child(4)") ||
        getRulesForSelector(declaredRules, ".box-list > div:nth-child(4)");
      const trans = decl.transform || "";
      const isScale12 =
        trans.includes("scale(1.2") ||
        trans.includes("scale(1.20") ||
        trans.includes("scale(1.2,");
      const hasSelector = Object.keys(decl).length > 0;

      checks.push(
        { id: "selector", label: lesson.goals[0], ok: hasSelector },
        { id: "scale", label: lesson.goals[1], ok: isScale12 },
      );
    }
    // Quest 44: The Outcast (Not) (.box-list div:not(.special))
    else if (lesson.index === 44) {
      const decl =
        getRulesForSelector(declaredRules, ".box-list div:not(.special)") ||
        getRulesForSelector(declaredRules, ".box-list > div:not(.special)");
      const op = decl.opacity || "";
      const isOp5 = op === "0.5" || op === ".5";
      const hasSelector = Object.keys(decl).length > 0;

      checks.push(
        { id: "selector", label: lesson.goals[0], ok: hasSelector },
        { id: "opacity", label: lesson.goals[1], ok: isOp5 },
      );
    }
    // Quest 45: The Sibling Reaction (.trigger-box:hover + .target-box)
    else if (lesson.index === 45) {
      const decl = getRulesForSelector(declaredRules, ".trigger-box:hover + .target-box");
      const bg = decl["background-color"] || decl.background || "";
      const isGreen =
        bg.includes("green") ||
        bg.includes("#22c55e") ||
        bg.includes("#16a34a") ||
        bg.includes("#008000") ||
        bg.includes("34, 197, 94");
      const hasSelector = Object.keys(decl).length > 0;

      checks.push(
        { id: "selector", label: lesson.goals[0], ok: hasSelector },
        { id: "color", label: lesson.goals[1], ok: isGreen },
      );
    }
    // Quest 46: The Ghost Element (Before) (.tooltip-box::before)
    else if (lesson.index === 46) {
      const decl = getRulesForSelector(declaredRules, ".tooltip-box::before");
      const hasContent = "content" in decl && decl.content !== "none";
      const w = decl.width || "";
      const h = decl.height || "";
      const d = decl.display || "";
      const bg = decl["background-color"] || decl.background || "";

      const hasDims = (w.includes("20px") || w.includes("20 px")) && (h.includes("20px") || h.includes("20 px")) && (d.includes("block") || d.includes("inline-block"));
      const isRed = bg.includes("red") || bg.includes("crimson") || isRedish(bg);

      checks.push(
        { id: "content", label: lesson.goals[0], ok: hasContent },
        { id: "dims", label: lesson.goals[1], ok: hasDims },
        { id: "color", label: lesson.goals[2], ok: isRed },
      );
    }
    // Quest 47: The Notification Badge (.icon-box::after)
    else if (lesson.index === 47) {
      const decl = getRulesForSelector(declaredRules, ".icon-box::after");
      const content = decl.content || "";
      const hasContent3 = content.includes("3") || content.includes('"3"') || content.includes("'3'");
      const pos = decl.position || "";
      const top = decl.top || "";
      const right = decl.right || "";
      const bg = decl["background-color"] || decl.background || "";

      const isPositioned = pos.includes("absolute") && top.includes("-5px") && right.includes("-5px");
      const isRed = bg.includes("red") || bg.includes("crimson") || isRedish(bg);

      checks.push(
        { id: "content", label: lesson.goals[0], ok: hasContent3 },
        { id: "position", label: lesson.goals[1], ok: isPositioned },
        { id: "color", label: lesson.goals[2], ok: isRed },
      );
    }
    // Quest 48: The CSS Triangle (.triangle-box)
    else if (lesson.index === 48) {
      const decl = getRulesForSelector(declaredRules, ".triangle-box");
      const w = decl.width || "";
      const h = decl.height || "";
      const bLeft = decl["border-left"] || "";
      const bRight = decl["border-right"] || "";
      const bTop = decl["border-top"] || "";

      const isZeroSize = (w === "0" || w === "0px") && (h === "0" || h === "0px");
      const hasWings = bLeft.includes("transparent") && bRight.includes("transparent");
      const hasTopBlue = bTop.includes("blue") && (bTop.includes("20px") || bTop.includes("20 px"));

      checks.push(
        { id: "zero-size", label: lesson.goals[0], ok: isZeroSize },
        { id: "wings", label: lesson.goals[1], ok: hasWings },
        { id: "top-border", label: lesson.goals[2], ok: hasTopBlue },
      );
    }
    // Quest 49: The Empty State (.data-box:empty)
    else if (lesson.index === 49) {
      const decl = getRulesForSelector(declaredRules, ".data-box:empty");
      const border = decl.border || decl["border-style"] || "";
      const isDashedRed =
        (decl.border && decl.border.includes("dashed") && decl.border.includes("red")) ||
        (decl["border-style"] === "dashed" && (decl["border-color"] === "red" || isRedish(decl["border-color"])));
      const hasSelector = Object.keys(decl).length > 0;

      checks.push(
        { id: "selector", label: lesson.goals[0], ok: hasSelector },
        { id: "dashed-red", label: lesson.goals[1], ok: isDashedRed },
      );
    }
    // Quest 50: The Glowing Backdrop (.card-box::before)
    else if (lesson.index === 50) {
      const decl = getRulesForSelector(declaredRules, ".card-box::before");
      const hasContent = "content" in decl && decl.content !== "none";
      const pos = decl.position || "";
      const w = decl.width || "";
      const h = decl.height || "";
      const zIndex = decl["z-index"] || "";
      const bg = decl["background-color"] || decl.background || "";
      const filter = decl.filter || "";

      const isPositionedBack = pos.includes("absolute") && (w.includes("100%") || w.includes("100 %")) && (h.includes("100%") || h.includes("100 %")) && zIndex.includes("-1");
      const isCyanBlur = (bg.includes("cyan") || bg.includes("aqua") || bg.includes("#00ffff")) && filter.includes("blur(15px)");

      checks.push(
        { id: "content", label: lesson.goals[0], ok: hasContent },
        { id: "backdrop-pos", label: lesson.goals[1], ok: isPositionedBack },
        { id: "cyan-blur", label: lesson.goals[2], ok: isCyanBlur },
      );
    } else {
      checks.push(
        { id: "selector", label: lesson.goals[0] || "Target selector", ok: Object.keys(declaredRules).length > 0 },
      );
    }

    const passed = checks.every((c) => c.ok);
    const close = !passed && checks.some((c) => c.ok);

    let message = lesson.intro || "Use advanced CSS selectors and pseudo-elements!";
    if (passed) {
      message = `🎉 Selector Quest ${lesson.moduleIndex || (lesson.index - 40)} complete! Sorcery mastered!`;
    } else if (close) {
      message = "Your selector is active! Fine-tune the properties to pass.";
    } else {
      message = "Cast your CSS selector spell to get started!";
    }

    return { lessonId: lesson.id, checks, passed, close, message };
  }

  // ==========================================
  // MOTION & TRANSFORMATIONS VALIDATION (Part 4)
  // ==========================================
  if (lesson.type === "motion" || lesson.moduleId === "motion-transforms") {
    const targetClass = lesson.targetClass || "motion-box";
    const boxEl = doc.querySelector(`.${targetClass}`);
    const boxStyles = boxEl ? doc.defaultView?.getComputedStyle(boxEl) || {} : {};
    const baseDecl = getRulesForSelector(declaredRules, `.${targetClass}`);
    const hoverDecl = getRulesForSelector(declaredRules, `.${targetClass}:hover`);

    const checks = [];

    // Quest 31: The Smooth Shift (transition: all 0.5s ease)
    if (lesson.index === 31) {
      const transDecl = baseDecl.transition || "";
      const durDecl = baseDecl["transition-duration"] || "";
      const durComputed = parseFloat(boxStyles.transitionDuration || "0");
      const hasHalfSec =
        transDecl.includes("0.5s") ||
        transDecl.includes("500ms") ||
        durDecl.includes("0.5s") ||
        durDecl.includes("500ms") ||
        Math.abs(durComputed - 0.5) <= 0.05;

      const hasTarget = Object.keys(baseDecl).length > 0;
      checks.push(
        { id: "target", label: lesson.goals[0], ok: hasTarget },
        { id: "transition", label: lesson.goals[1], ok: hasHalfSec },
      );
    }
    // Quest 32: Growing Up (.motion-box:hover transform: scale(1.5))
    else if (lesson.index === 32) {
      const transDecl = hoverDecl.transform || "";
      const hasScale15 =
        transDecl.includes("scale(1.5") ||
        transDecl.includes("scale(1.50") ||
        transDecl.includes("scale(1.5,") ||
        (transDecl.includes("scalex(1.5)") && transDecl.includes("scaley(1.5)"));

      const hasHoverSelector = Object.keys(hoverDecl).length > 0;
      checks.push(
        { id: "hover-selector", label: lesson.goals[0], ok: hasHoverSelector },
        { id: "scale", label: lesson.goals[1], ok: hasScale15 },
      );
    }
    // Quest 33: The Barrel Roll (.spin-box transform: rotate(45deg))
    else if (lesson.index === 33) {
      const transDecl = baseDecl.transform || "";
      const isRotate45 =
        transDecl.includes("rotate(45deg)") ||
        transDecl.includes("rotatez(45deg)") ||
        transDecl.includes("rotate(45 deg)") ||
        (boxStyles.transform && boxStyles.transform !== "none" && transDecl.includes("rotate"));

      const hasTarget = Object.keys(baseDecl).length > 0;
      checks.push(
        { id: "target", label: lesson.goals[0], ok: hasTarget },
        { id: "rotate", label: lesson.goals[1], ok: isRotate45 },
      );
    }
    // Quest 34: The Levitation Act (.motion-box:hover transform: translateY(-20px))
    else if (lesson.index === 34) {
      const transDecl = hoverDecl.transform || "";
      const isTranslateNeg20 =
        transDecl.includes("translatey(-20px)") ||
        transDecl.includes("translatey(-20 px)") ||
        transDecl.includes("translate(0, -20px)") ||
        transDecl.includes("translate(0px, -20px)");

      const hasHoverSelector = Object.keys(hoverDecl).length > 0;
      checks.push(
        { id: "hover-selector", label: lesson.goals[0], ok: hasHoverSelector },
        { id: "levitate", label: lesson.goals[1], ok: isTranslateNeg20 },
      );
    }
    // Quest 35: The Pivot Point (.hinge-box transform-origin: top left)
    else if (lesson.index === 35) {
      const originDecl = baseDecl["transform-origin"] || "";
      const originComputed = boxStyles.transformOrigin || "";
      const isTopLeft =
        originDecl.includes("top left") ||
        originDecl.includes("left top") ||
        originDecl.includes("0 0") ||
        originDecl.includes("0% 0%") ||
        originDecl.includes("0px 0px") ||
        originComputed === "0px 0px";

      const hasTarget = Object.keys(baseDecl).length > 0;
      checks.push(
        { id: "target", label: lesson.goals[0], ok: hasTarget },
        { id: "origin", label: lesson.goals[1], ok: isTopLeft },
      );
    }
    // Quest 36: The Skewed Perspective (.skew-box transform: skewX(-15deg))
    else if (lesson.index === 36) {
      const transDecl = baseDecl.transform || "";
      const isSkewNeg15 =
        transDecl.includes("skewx(-15deg)") ||
        transDecl.includes("skew(-15deg)") ||
        transDecl.includes("skewx(-15 deg)") ||
        transDecl.includes("skew(-15 deg)");

      const hasTarget = Object.keys(baseDecl).length > 0;
      checks.push(
        { id: "target", label: lesson.goals[0], ok: hasTarget },
        { id: "skew", label: lesson.goals[1], ok: isSkewNeg15 },
      );
    }
    // Quest 37: Combine and Conquer (.combo-box transform: translateX(50px) rotate(90deg))
    else if (lesson.index === 37) {
      const transDecl = baseDecl.transform || "";
      const hasTranslate50 =
        transDecl.includes("translatex(50px)") ||
        transDecl.includes("translate(50px") ||
        transDecl.includes("translatex(50 px)");
      const hasRotate90 =
        transDecl.includes("rotate(90deg)") ||
        transDecl.includes("rotatez(90deg)") ||
        transDecl.includes("rotate(90 deg)");

      const isCombined = hasTranslate50 && hasRotate90;
      const hasTarget = Object.keys(baseDecl).length > 0;
      checks.push(
        { id: "target", label: lesson.goals[0], ok: hasTarget },
        { id: "combo", label: lesson.goals[1], ok: isCombined },
      );
    }
    // Quest 38: The Dramatic Pause (.delay-box transition-delay: 1s)
    else if (lesson.index === 38) {
      const delayDecl = baseDecl["transition-delay"] || "";
      const transDecl = baseDecl.transition || "";
      const delayComputed = parseFloat(boxStyles.transitionDelay || "0");
      const is1sDelay =
        delayDecl.includes("1s") ||
        delayDecl.includes("1000ms") ||
        transDecl.includes("1s") ||
        Math.abs(delayComputed - 1) <= 0.1;

      const hasTarget = Object.keys(baseDecl).length > 0;
      checks.push(
        { id: "target", label: lesson.goals[0], ok: hasTarget },
        { id: "delay", label: lesson.goals[1], ok: is1sDelay },
      );
    }
    // Quest 39: Robotic Movement (.linear-box transition-timing-function: linear)
    else if (lesson.index === 39) {
      const timingDecl = baseDecl["transition-timing-function"] || "";
      const transDecl = baseDecl.transition || "";
      const timingComputed = boxStyles.transitionTimingFunction || "";
      const isLinear =
        timingDecl.includes("linear") ||
        transDecl.includes("linear") ||
        timingComputed === "linear";

      const hasTarget = Object.keys(baseDecl).length > 0;
      checks.push(
        { id: "target", label: lesson.goals[0], ok: hasTarget },
        { id: "timing", label: lesson.goals[1], ok: isLinear },
      );
    }
    // Quest 40: The Interactive Card (.card-box:hover transform: scale(1.1) translateY(-10px) rotate(5deg))
    else if (lesson.index === 40) {
      const transDecl = hoverDecl.transform || "";
      const hasScale = transDecl.includes("scale(1.1") || transDecl.includes("scale(1.10");
      const hasLift = transDecl.includes("translatey(-10px)") || transDecl.includes("translate(0, -10px)");
      const hasTilt = transDecl.includes("rotate(5deg)") || transDecl.includes("rotatez(5deg)");

      const isFullCard = hasScale && hasLift && hasTilt;
      const hasHoverSelector = Object.keys(hoverDecl).length > 0;

      checks.push(
        { id: "hover-selector", label: lesson.goals[0], ok: hasHoverSelector },
        { id: "card-combo", label: lesson.goals[1], ok: isFullCard },
      );
    } else {
      checks.push(
        { id: "target", label: lesson.goals[0] || "Target the element", ok: Object.keys(baseDecl).length > 0 },
      );
    }

    const passed = checks.every((c) => c.ok);
    const close = !passed && checks.some((c) => c.ok);

    let message = lesson.intro || "Apply CSS transforms and transitions to animate the element!";
    if (passed) {
      message = `🎉 Motion Quest ${lesson.moduleIndex || (lesson.index - 30)} complete! Dynamic and smooth!`;
    } else if (close) {
      message = "You're close! Check the exact transform or transition values.";
    } else {
      message = "Write your CSS transform/transition rules to get started!";
    }

    return { lessonId: lesson.id, checks, passed, close, message };
  }

  // ==========================================
  // CSS GRID VALIDATION (Part 3)
  // ==========================================
  if (lesson.type === "grid" || lesson.type === "grid-item" || lesson.moduleId === "grid-mastery") {
    const isChildTarget = lesson.type === "grid-item" || (lesson.targetClass && lesson.targetClass !== "grid-container");
    const container = doc.querySelector(".grid-container");
    const targetEl = isChildTarget ? doc.querySelector(`.${lesson.targetClass}`) : container;

    if (!container && !isChildTarget) return empty;

    const containerStyles = container ? doc.defaultView?.getComputedStyle(container) || {} : {};
    const targetStyles = targetEl ? doc.defaultView?.getComputedStyle(targetEl) || {} : {};
    const containerDecl = declaredRules[".grid-container"] || {};
    const targetDecl = declaredRules[`.${lesson.targetClass}`] || {};

    const isGrid =
      containerStyles.display === "grid" ||
      containerStyles.display === "inline-grid" ||
      containerDecl.display === "grid" ||
      containerDecl.display === "inline-grid";

    const checks = [];

    // Quest 21: The Grid Awakening (2 equal fractional columns)
    if (lesson.index === 21) {
      const colsDecl = containerDecl["grid-template-columns"] || "";
      const colTracks = (containerStyles.gridTemplateColumns || "").trim().split(/\s+/).filter(Boolean);
      const isTwoCols =
        colTracks.length === 2 ||
        colsDecl.includes("1fr 1fr") ||
        colsDecl.includes("repeat(2, 1fr)") ||
        colsDecl.includes("repeat(2,1fr)");

      checks.push(
        { id: "display", label: lesson.goals[0], ok: isGrid },
        { id: "columns", label: lesson.goals[1], ok: isGrid && isTwoCols },
      );
    }
    // Quest 22: Defining the Rows (2 rows of 100px)
    else if (lesson.index === 22) {
      const rowsDecl = containerDecl["grid-template-rows"] || "";
      const rowTracks = (containerStyles.gridTemplateRows || "").trim().split(/\s+/).filter(Boolean);
      const isTwo100pxRows =
        (rowTracks.length >= 2 && rowTracks.slice(0, 2).every((r) => Math.abs(parseFloat(r) - 100) <= 5)) ||
        rowsDecl.includes("100px 100px") ||
        rowsDecl.includes("repeat(2, 100px)") ||
        rowsDecl.includes("repeat(2,100px)");

      checks.push(
        { id: "display", label: lesson.goals[0], ok: isGrid },
        { id: "rows", label: lesson.goals[1], ok: isGrid && isTwo100pxRows },
      );
    }
    // Quest 23: Minding the Gap (2 columns, 20px gap)
    else if (lesson.index === 23) {
      const colsDecl = containerDecl["grid-template-columns"] || "";
      const colTracks = (containerStyles.gridTemplateColumns || "").trim().split(/\s+/).filter(Boolean);
      const isTwoCols =
        colTracks.length === 2 ||
        colsDecl.includes("1fr 1fr") ||
        colsDecl.includes("repeat(2, 1fr)");

      const gapDecl = containerDecl.gap || containerDecl["grid-gap"] || "";
      const gapComputed = parseFloat(containerStyles.gap || containerStyles.rowGap || "0");
      const is20pxGap = Math.abs(gapComputed - 20) <= 3 || gapDecl.includes("20px");

      checks.push(
        { id: "display", label: lesson.goals[0], ok: isGrid },
        { id: "columns", label: lesson.goals[1], ok: isGrid && isTwoCols },
        { id: "gap", label: lesson.goals[2], ok: isGrid && is20pxGap },
      );
    }
    // Quest 24: The Repeat Function (repeat(4, 1fr))
    else if (lesson.index === 24) {
      const colsDecl = containerDecl["grid-template-columns"] || "";
      const colTracks = (containerStyles.gridTemplateColumns || "").trim().split(/\s+/).filter(Boolean);
      const isRepeat4 =
        colsDecl.includes("repeat(4,") ||
        colsDecl.includes("repeat(4 ,") ||
        (colTracks.length === 4 && colsDecl.includes("repeat"));

      checks.push(
        { id: "display", label: lesson.goals[0], ok: isGrid },
        { id: "repeat", label: lesson.goals[1], ok: isGrid && isRepeat4 },
      );
    }
    // Quest 25: The Banner Span (.hero-item grid-column: span 2)
    else if (lesson.index === 25) {
      const colDecl = targetDecl["grid-column"] || targetDecl["grid-column-end"] || "";
      const colStart = targetStyles.gridColumnStart || "";
      const colEnd = targetStyles.gridColumnEnd || "";
      const isSpan2 =
        colDecl.includes("span 2") ||
        colDecl.includes("1 / 3") ||
        colDecl.includes("1/3") ||
        colDecl.includes("1 / span 2") ||
        colEnd.includes("span 2") ||
        colEnd === "3" ||
        (targetEl && targetEl.getBoundingClientRect().width > 200);

      checks.push(
        { id: "target", label: lesson.goals[0], ok: !!targetDecl["grid-column"] || isSpan2 },
        { id: "span", label: lesson.goals[1], ok: isSpan2 },
      );
    }
    // Quest 26: The Tall Sidebar (.sidebar-item grid-row: span 2)
    else if (lesson.index === 26) {
      const rowDecl = targetDecl["grid-row"] || targetDecl["grid-row-end"] || "";
      const rowEnd = targetStyles.gridRowEnd || "";
      const isRowSpan2 =
        rowDecl.includes("span 2") ||
        rowDecl.includes("1 / 3") ||
        rowDecl.includes("1/3") ||
        rowDecl.includes("1 / span 2") ||
        rowEnd.includes("span 2") ||
        rowEnd === "3" ||
        (targetEl && targetEl.getBoundingClientRect().height > 120);

      checks.push(
        { id: "target", label: lesson.goals[0], ok: !!targetDecl["grid-row"] || isRowSpan2 },
        { id: "row-span", label: lesson.goals[1], ok: isRowSpan2 },
      );
    }
    // Quest 27: Full Width Footer (.footer-item grid-column: 1 / -1)
    else if (lesson.index === 27) {
      const colDecl = targetDecl["grid-column"] || "";
      const colStartDecl = targetDecl["grid-column-start"] || "";
      const colEndDecl = targetDecl["grid-column-end"] || "";
      const isFullSpan =
        colDecl.includes("1 / -1") ||
        colDecl.includes("1/-1") ||
        colDecl.includes("1 / span 3") ||
        colDecl.includes("1 / 4") ||
        colDecl.includes("span 3") ||
        (colStartDecl === "1" && colEndDecl === "-1") ||
        (targetEl && targetEl.getBoundingClientRect().width > 400);

      checks.push(
        { id: "target", label: lesson.goals[0], ok: !!colDecl || isFullSpan },
        { id: "full-width", label: lesson.goals[1], ok: isFullSpan },
      );
    }
    // Quest 28: Precision Targeting (.target-item grid-column-start: 2, grid-row-start: 3)
    else if (lesson.index === 28) {
      const colStartDecl = targetDecl["grid-column-start"] || targetDecl["grid-column"] || "";
      const rowStartDecl = targetDecl["grid-row-start"] || targetDecl["grid-row"] || "";
      const colStartComputed = targetStyles.gridColumnStart;
      const rowStartComputed = targetStyles.gridRowStart;

      const isCol2 =
        colStartDecl.startsWith("2") ||
        colStartDecl.includes("2 /") ||
        colStartDecl.includes("2/") ||
        colStartComputed === "2";

      const isRow3 =
        rowStartDecl.startsWith("3") ||
        rowStartDecl.includes("3 /") ||
        rowStartDecl.includes("3/") ||
        rowStartComputed === "3";

      checks.push(
        { id: "target", label: lesson.goals[0], ok: isCol2 || isRow3 || Object.keys(targetDecl).length > 0 },
        { id: "col-start", label: lesson.goals[1], ok: isCol2 },
        { id: "row-start", label: lesson.goals[2], ok: isRow3 },
      );
    }
    // Quest 29: Centering the Grid Items (justify-items: center; align-items: center)
    else if (lesson.index === 29) {
      const colsDecl = containerDecl["grid-template-columns"] || "";
      const isTwoCols =
        (containerStyles.gridTemplateColumns || "").trim().split(/\s+/).filter(Boolean).length === 2 ||
        colsDecl.includes("1fr 1fr");

      const justifyItemsOk =
        containerStyles.justifyItems === "center" || containerDecl["justify-items"] === "center";
      const alignItemsOk =
        containerStyles.alignItems === "center" || containerDecl["align-items"] === "center";

      checks.push(
        { id: "display-cols", label: lesson.goals[0], ok: isGrid && isTwoCols },
        { id: "justify-items", label: lesson.goals[1], ok: isGrid && justifyItemsOk },
        { id: "align-items", label: lesson.goals[2], ok: isGrid && alignItemsOk },
      );
    }
    // Quest 30: The Holy Grail Layout (200px 1fr, gap: 15px)
    else if (lesson.index === 30) {
      const colsDecl = containerDecl["grid-template-columns"] || "";
      const colTracks = (containerStyles.gridTemplateColumns || "").trim().split(/\s+/).filter(Boolean);
      const isHolyGrailCols =
        (colTracks.length >= 2 && Math.abs(parseFloat(colTracks[0]) - 200) <= 10) ||
        colsDecl.includes("200px 1fr");

      const gapDecl = containerDecl.gap || containerDecl["grid-gap"] || "";
      const gapComputed = parseFloat(containerStyles.gap || containerStyles.rowGap || "0");
      const is15pxGap = Math.abs(gapComputed - 15) <= 3 || gapDecl.includes("15px");

      checks.push(
        { id: "display", label: lesson.goals[0], ok: isGrid },
        { id: "columns", label: lesson.goals[1], ok: isGrid && isHolyGrailCols },
        { id: "gap", label: lesson.goals[2], ok: isGrid && is15pxGap },
      );
    } else {
      checks.push(
        { id: "display", label: lesson.goals[0] || "Set display: grid", ok: isGrid },
      );
    }

    const passed = checks.every((c) => c.ok);
    const close = !passed && (isGrid || isChildTarget) && checks.some((c) => c.ok);

    let message = lesson.intro || "Use CSS Grid properties to align your layout!";
    if (passed) {
      message = `🎉 CSS Grid Quest ${lesson.moduleIndex || (lesson.index - 20)} complete! Perfectly constructed!`;
    } else if (close) {
      message = "Grid rule applied! Fine-tune the remaining property to pass.";
    } else if (isGrid) {
      message = "Grid layout is active! Now configure your tracks and items.";
    }

    return { lessonId: lesson.id, checks, passed, close, message };
  }

  // ==========================================
  // FLEXBOX VALIDATION
  // ==========================================
  if (lesson.type === "flexbox" || lesson.targetClass === "container") {
    const container = doc.querySelector(".container");
    if (!container) return empty;

    const styles = doc.defaultView?.getComputedStyle(container) || {};
    const expected = lesson.expected || {};

    const isFlex = styles.display === "flex" || styles.display === "inline-flex";
    const justifyOk = matchesValue(styles.justifyContent, expected.justifyContent);
    const alignOk = matchesValue(styles.alignItems, expected.alignItems);
    const directionOk = matchesValue(styles.flexDirection, expected.flexDirection);
    const wrapOk = matchesValue(styles.flexWrap, expected.flexWrap);

    const checks = [];

    // Quest 11: The Flex Awakening
    if (lesson.index === 11) {
      checks.push(
        { id: "target", label: lesson.goals[0], ok: isFlex || styles.display !== "block" },
        { id: "display", label: lesson.goals[1], ok: isFlex },
      );
    }
    // Quest 12: Center Stage
    else if (lesson.index === 12) {
      checks.push(
        { id: "display", label: lesson.goals[0], ok: isFlex },
        { id: "justify", label: lesson.goals[1], ok: isFlex && justifyOk },
      );
    }
    // Quest 13: The Far Right
    else if (lesson.index === 13) {
      checks.push(
        { id: "display", label: lesson.goals[0], ok: isFlex },
        { id: "justify", label: lesson.goals[1], ok: isFlex && justifyOk },
      );
    }
    // Quest 14: Social Distancing
    else if (lesson.index === 14) {
      checks.push(
        { id: "display", label: lesson.goals[0], ok: isFlex },
        { id: "justify", label: lesson.goals[1], ok: isFlex && justifyOk },
      );
    }
    // Quest 15: Evenly Distributed
    else if (lesson.index === 15) {
      checks.push(
        { id: "display", label: lesson.goals[0], ok: isFlex },
        { id: "justify", label: lesson.goals[1], ok: isFlex && justifyOk },
      );
    }
    // Quest 16: The Floor Drop
    else if (lesson.index === 16) {
      checks.push(
        { id: "display", label: lesson.goals[0], ok: isFlex },
        { id: "align", label: lesson.goals[1], ok: isFlex && alignOk },
      );
    }
    // Quest 17: Perfect Bullseye
    else if (lesson.index === 17) {
      checks.push(
        { id: "display", label: lesson.goals[0], ok: isFlex },
        { id: "justify", label: lesson.goals[1], ok: isFlex && justifyOk },
        { id: "align", label: lesson.goals[2], ok: isFlex && alignOk },
      );
    }
    // Quest 18: The Column Stack
    else if (lesson.index === 18) {
      checks.push(
        { id: "display", label: lesson.goals[0], ok: isFlex },
        { id: "direction", label: lesson.goals[1], ok: isFlex && directionOk },
      );
    }
    // Quest 19: Reverse Gravity
    else if (lesson.index === 19) {
      checks.push(
        { id: "display", label: lesson.goals[0], ok: isFlex },
        { id: "direction", label: lesson.goals[1], ok: isFlex && directionOk },
      );
    }
    // Quest 20: The Wrap Around
    else if (lesson.index === 20) {
      checks.push(
        { id: "display", label: lesson.goals[0], ok: isFlex },
        { id: "wrap", label: lesson.goals[1], ok: isFlex && wrapOk },
      );
    } else {
      checks.push(
        { id: "display", label: lesson.goals[0] || "Set display: flex", ok: isFlex },
        {
          id: "props",
          label: lesson.goals[1] || "Configure flex alignment",
          ok: justifyOk && alignOk && directionOk && wrapOk,
        },
      );
    }

    const passed = checks.every((c) => c.ok);
    const close = !passed && isFlex && checks.some((c) => c.ok);

    let message = lesson.intro || "Use flexbox properties to align the child elements!";
    if (passed) {
      message = `🎉 Flexbox Quest ${lesson.moduleIndex || lesson.index} complete! Perfectly aligned!`;
    } else if (close) {
      message = "Flex is active! Now fine-tune the alignment property.";
    } else if (isFlex) {
      message = "Great start! Flexbox enabled. Now add the target alignment.";
    }

    return { lessonId: lesson.id, checks, passed, close, message };
  }

  // ==========================================
  // BOX PLACEMENT VALIDATION
  // ==========================================
  const targetClass = lesson.targetClass || "red-box";
  const stage = doc.querySelector(".stage");
  const box = doc.querySelector(`.${targetClass}`);
  if (!stage || !box) return empty;

  const stageRect = stage.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();
  const styles = doc.defaultView?.getComputedStyle(box) || {};

  const left = boxRect.left - stageRect.left;
  const top = boxRect.top - stageRect.top;
  const tolerance = lesson.tolerance || 10;
  const target = lesson.target || {};
  const expected = lesson.expected || {};

  const expectedWidth = expected.width ?? target.width;
  const expectedHeight = expected.height ?? target.height;
  const sizeOk =
    Math.abs(boxRect.width - expectedWidth) <= tolerance &&
    Math.abs(boxRect.height - expectedHeight) <= tolerance;

  const expectedLeft = target.left;
  const expectedTop = target.top;
  const posOk =
    Math.abs(left - expectedLeft) <= tolerance && Math.abs(top - expectedTop) <= tolerance;

  const isAbsolute = styles.position === "absolute" || styles.position === "fixed";
  const distance = Math.hypot(left - expectedLeft, top - expectedTop);

  let borderRadiusOk = true;
  if (expected.borderRadius) {
    const rawRadius = styles.borderRadius || "0px";
    const numRadius = parseFloat(rawRadius) || 0;
    if (expected.borderRadius === "50%") {
      borderRadiusOk = numRadius >= Math.min(boxRect.width, boxRect.height) * 0.4;
    } else {
      const expRadius = parseFloat(expected.borderRadius);
      borderRadiusOk = Math.abs(numRadius - expRadius) <= 5;
    }
  }

  let colorOk = true;
  if (expected.color === "red") {
    colorOk = isRedish(styles.backgroundColor);
  } else if (expected.color === "purple") {
    colorOk = isPurplish(styles.backgroundColor);
  }

  const checks = [];
  switch (lesson.index) {
    case 1:
      checks.push(
        { id: "size", label: lesson.goals[0], ok: sizeOk },
        { id: "color", label: lesson.goals[1], ok: colorOk },
        { id: "position", label: lesson.goals[2], ok: posOk },
      );
      break;

    case 2:
    case 4:
    case 5:
    case 6:
    case 7:
    case 9:
      checks.push(
        { id: "size", label: lesson.goals[0], ok: sizeOk },
        { id: "positioning", label: lesson.goals[1], ok: isAbsolute },
        { id: "coords", label: lesson.goals[2], ok: posOk },
      );
      break;

    case 3:
    case 8:
      checks.push(
        { id: "size", label: lesson.goals[0], ok: sizeOk },
        { id: "radius", label: lesson.goals[1], ok: borderRadiusOk },
        { id: "coords", label: lesson.goals[2], ok: posOk },
      );
      break;

    case 10:
      checks.push(
        { id: "size", label: lesson.goals[0], ok: sizeOk },
        { id: "styling", label: lesson.goals[1], ok: colorOk && borderRadiusOk },
        { id: "coords", label: lesson.goals[2], ok: posOk },
      );
      break;

    default:
      checks.push(
        { id: "size", label: lesson.goals[0] || "Size matches target", ok: sizeOk },
        { id: "position", label: lesson.goals[1] || "Position matches target", ok: posOk },
      );
      break;
  }

  const passed = checks.every((c) => c.ok);
  const close = !passed && distance <= 70 && sizeOk;

  let message = lesson.intro || "Your mission: guide the element to its target!";
  if (passed) {
    message = `🎉 Quest ${lesson.index} complete! You placed the ${targetClass.replace("-", " ")} perfectly!`;
  } else if (close) {
    message = "So close! Just a few pixels off — nudge it a little more.";
  } else if (checks.some((c) => c.ok)) {
    message = "Making great progress! Keep adjusting to hit all goals.";
  }

  return { lessonId: lesson.id, checks, passed, close, message, distance };
}

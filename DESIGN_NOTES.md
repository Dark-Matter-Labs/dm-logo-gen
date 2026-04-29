# Design Notes

Decisions made during build — review and adjust as needed.

## Lockup element order (Tool 4 — Project)

The spec says: `Dm → pill/MC → Lab → Arc`. However the reference image `projec-with-lab-arc.png` shows `Ne (LAB) | Rc (ARC) | Multivalent currencies (pill)` — i.e. Lab/Arc stamps come *before* the project pill. I followed the reference image order: `Dm → Lab(s) → Arc(s) → pill/MC`.

## Stamp letter font size

Cap height target is ~50% of stamp height (BASE=80px). Inter Bold cap-height ratio is ~0.73×fontSize, so fontSize ≈ 55px. This renders "Dm" visually centred and proportionate to the reference images.

## Wordmark font size

Set to 44% of BASE (≈35px) so that longer strings like "Dark matter labs" fit comfortably inside the frame at single scale. The frame width grows with text, so the font size stays fixed.

## Pill font size

Set to 35% of BASE (≈28px) — slightly smaller than wordmarks to match the softer pill aesthetic in the reference image.

## Text measurement

A hidden SVG is rendered with all text strings and measured via `getBBox()` in `useLayoutEffect`. This fires before the first visible paint, so there is no visible layout flicker. Fallback: character-count × fontSize × 0.6.

## Superscript "04" label

Anchored to the right edge of the stamp/wordmark with `textAnchor="end"`, offset `LABEL_INSET` from the right and top. Matches the atomic-number-style placement visible in reference images.

## Gap between lockup elements

Set to 25% of BASE (20px). This matches the visual rhythm in the reference images — enough breathing room but tight enough to read as a single lockup.

## Canvas padding

25% of BASE (20px) on all sides. Kept tight — users can crop further or use transparent export.

## PNG export

Drawn at 4× screen resolution via an offscreen Canvas. SVG is serialized, loaded into an `<img>`, then drawn to canvas. The canvas is never added to the DOM.

## Dark UI mode

Toggling "Dark UI" sets a CSS class on `<body>`. The logo mode (light/dark/transparent) is separate from the UI theme — you can preview a light-mode logo in a dark UI.

## Stroke weight

Fixed at 1.5px at all sizes (not scaled with canvas). This matches the thin-border aesthetic of the reference images. If used at very small sizes, consider increasing to 1.5–2px.

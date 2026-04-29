// All proportions derived from Figma spec: 37.795px box
const FIGMA_BOX = 37.795
export const BASE = 80
const SCALE = BASE / FIGMA_BOX  // ≈ 2.117

// Stroke: 1.333px in Figma → scaled
export const STROKE = parseFloat((1.333 * SCALE).toFixed(2))  // ≈ 2.82

// Stamp letter glyphs: 16px / weight 500 in Figma
export const LETTER_SIZE = Math.round(16 * SCALE)  // ≈ 34
export const LETTER_WEIGHT = '500'

// Superscript labels (04, LAB, ARC): 5.333px / weight 700 in Figma
export const LABEL_SIZE = Math.round(5.333 * SCALE)  // ≈ 11
export const LABEL_WEIGHT = '700'

// Vertical center of "Dm" text: 48.2% from top (from Figma spacing)
// Top gap 8.72px, bottom gap 10.08px → center at (8.72 + (37.795-8.72-10.08)/2) / 37.795
export const LETTER_CY_RATIO = 0.482

// Wordmark text: same size and weight as stamp letters (16px / 500 in Figma)
export const WORDMARK_FONT_SIZE = Math.round(16 * SCALE)  // ≈ 34
export const WORDMARK_FONT_WEIGHT = '500'

// Wordmark padding — asymmetric, from Figma spacing screenshot
// Left gap:  7.56 / 37.795 = 20.0% of box height
// Right gap: 5.28 / 37.795 = 13.97% of box height
export const WORDMARK_PAD_LEFT = Math.round(BASE * (7.56 / FIGMA_BOX))   // ≈ 16
export const WORDMARK_PAD_RIGHT = Math.round(BASE * (5.28 / FIGMA_BOX))  // ≈ 11
// Keep WORDMARK_PAD_X as an alias for backward compat (used in wordmarkWidth)
export const WORDMARK_PAD_X = WORDMARK_PAD_LEFT

// Gap between lockup elements (~25% of stamp height)
export const GAP = Math.round(BASE * 0.25)

// Canvas padding around logo (~25% of stamp height on all sides)
export const CANVAS_PAD = Math.round(BASE * 0.25)

// Superscript inset from top-right corner
// Matches Figma: 04 sits near top-right, inset ~6% of box
export const LABEL_INSET = Math.round(BASE * 0.06)

// Pill padding
export const PILL_PAD_X = Math.round(BASE * 0.18)

// Given a measured text width, compute total wordmark element width
export function wordmarkWidth(textWidth) {
  return textWidth + WORDMARK_PAD_LEFT + WORDMARK_PAD_RIGHT
}

// Total lockup width given array of element widths
export function lockupWidth(widths) {
  if (widths.length === 0) return 0
  return widths.reduce((a, b) => a + b, 0) + GAP * (widths.length - 1)
}

import React, { useRef, useLayoutEffect, useState, useCallback } from 'react'
import {
  BASE, STROKE, LABEL_SIZE, LABEL_WEIGHT, LETTER_SIZE, LETTER_WEIGHT,
  LETTER_CY_RATIO, WORDMARK_FONT_SIZE, WORDMARK_FONT_WEIGHT,
  WORDMARK_PAD_LEFT, WORDMARK_PAD_RIGHT,
  PILL_PAD_LEFT, PILL_PAD_RIGHT,
  GAP, CANVAS_PAD, LABEL_INSET
} from '../lib/layout.js'

const H = BASE

// "04" / "LAB" / "ARC" superscript — weight 700, anchored top-right
function SuperLabel({ x, y, label, ink }) {
  return (
    <text
      x={x - LABEL_INSET}
      y={y + LABEL_INSET + LABEL_SIZE * 0.85}
      fontFamily="Inter, sans-serif"
      fontWeight={LABEL_WEIGHT}
      fontSize={LABEL_SIZE}
      fill={ink}
      textAnchor="end"
    >
      {label}
    </text>
  )
}

// Stamp letter glyphs (Dm, Ne, Rc …) — weight 500, vertically placed per Figma ratio
function LetterGlyph({ cx, cy, text, ink }) {
  return (
    <text
      x={cx}
      y={cy}
      fontFamily="Inter, sans-serif"
      fontWeight={LETTER_WEIGHT}
      fontSize={LETTER_SIZE}
      fill={ink}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {text}
    </text>
  )
}

// Wordmark text — weight 500, vertically placed matching stamp (LETTER_CY_RATIO)
function WordmarkText({ x, y, text, ink }) {
  return (
    <text
      x={x + WORDMARK_PAD_LEFT}
      y={y + H * LETTER_CY_RATIO}
      fontFamily="Inter, sans-serif"
      fontWeight={WORDMARK_FONT_WEIGHT}
      fontSize={WORDMARK_FONT_SIZE}
      fill={ink}
      textAnchor="start"
      dominantBaseline="central"
    >
      {text}
    </text>
  )
}

// ─── Element renderers ────────────────────────────────────────────────────────

// STD stamp — full rectangular border + "04" label
export function renderStdStamp({ x, y, letters, ink }) {
  const w = BASE
  const cy = y + H * LETTER_CY_RATIO
  return {
    width: w,
    el: (
      <g key={`std-stamp-${x}`}>
        <rect x={x} y={y} width={w} height={H} fill="none" stroke={ink} strokeWidth={STROKE} />
        <SuperLabel x={x + w} y={y} label="04" ink={ink} />
        <LetterGlyph cx={x + w / 2} cy={cy} text={letters} ink={ink} />
      </g>
    ),
  }
}

// STD wordmark — full rectangular border + "04" label
export function renderStdWordmark({ x, y, text, measuredWidth, ink }) {
  const w = measuredWidth + WORDMARK_PAD_LEFT + WORDMARK_PAD_RIGHT
  return {
    width: w,
    el: (
      <g key={`std-wm-${x}`}>
        <rect x={x} y={y} width={w} height={H} fill="none" stroke={ink} strokeWidth={STROKE} />
        <SuperLabel x={x + w} y={y} label="04" ink={ink} />
        <WordmarkText x={x} y={y} text={text} ink={ink} />
      </g>
    ),
  }
}

// LAB stamp — left + right vertical bars only
export function renderLabStamp({ x, y, letters, ink }) {
  const w = BASE
  const cy = y + H * LETTER_CY_RATIO
  return {
    width: w,
    el: (
      <g key={`lab-stamp-${x}`}>
        <line x1={x} y1={y} x2={x} y2={y + H} stroke={ink} strokeWidth={STROKE} />
        <line x1={x + w} y1={y} x2={x + w} y2={y + H} stroke={ink} strokeWidth={STROKE} />
        <SuperLabel x={x + w} y={y} label="LAB" ink={ink} />
        <LetterGlyph cx={x + w / 2} cy={cy} text={letters} ink={ink} />
      </g>
    ),
  }
}

// LAB wordmark — left + right vertical bars
export function renderLabWordmark({ x, y, text, measuredWidth, ink }) {
  const w = measuredWidth + WORDMARK_PAD_LEFT + WORDMARK_PAD_RIGHT
  return {
    width: w,
    el: (
      <g key={`lab-wm-${x}`}>
        <line x1={x} y1={y} x2={x} y2={y + H} stroke={ink} strokeWidth={STROKE} />
        <line x1={x + w} y1={y} x2={x + w} y2={y + H} stroke={ink} strokeWidth={STROKE} />
        <SuperLabel x={x + w} y={y} label="LAB" ink={ink} />
        <WordmarkText x={x} y={y} text={text} ink={ink} />
      </g>
    ),
  }
}

// ARC stamp — top + bottom horizontal bars only
export function renderArcStamp({ x, y, letters, ink }) {
  const w = BASE
  const cy = y + H * LETTER_CY_RATIO
  return {
    width: w,
    el: (
      <g key={`arc-stamp-${x}`}>
        <line x1={x} y1={y} x2={x + w} y2={y} stroke={ink} strokeWidth={STROKE} />
        <line x1={x} y1={y + H} x2={x + w} y2={y + H} stroke={ink} strokeWidth={STROKE} />
        <SuperLabel x={x + w} y={y} label="ARC" ink={ink} />
        <LetterGlyph cx={x + w / 2} cy={cy} text={letters} ink={ink} />
      </g>
    ),
  }
}

// ARC wordmark — top + bottom horizontal bars
export function renderArcWordmark({ x, y, text, measuredWidth, ink }) {
  const w = measuredWidth + WORDMARK_PAD_LEFT + WORDMARK_PAD_RIGHT
  return {
    width: w,
    el: (
      <g key={`arc-wm-${x}`}>
        <line x1={x} y1={y} x2={x + w} y2={y} stroke={ink} strokeWidth={STROKE} />
        <line x1={x} y1={y + H} x2={x + w} y2={y + H} stroke={ink} strokeWidth={STROKE} />
        <SuperLabel x={x + w} y={y} label="ARC" ink={ink} />
        <WordmarkText x={x} y={y} text={text} ink={ink} />
      </g>
    ),
  }
}

// MC stamp — circle border, no superscript
export function renderMcStamp({ x, y, letters, ink }) {
  const w = BASE
  const cx = x + w / 2
  const cy = y + H * LETTER_CY_RATIO
  const r = (Math.min(w, H) / 2) - STROKE
  return {
    width: w,
    el: (
      <g key={`mc-stamp-${x}`}>
        <circle cx={x + w / 2} cy={y + H / 2} r={r} fill="none" stroke={ink} strokeWidth={STROKE} />
        <LetterGlyph cx={cx} cy={cy} text={letters} ink={ink} />
      </g>
    ),
  }
}

// Project pill — stadium shape
// Width = H (two semicircles) + PILL_PAD_LEFT + text + PILL_PAD_RIGHT
// Text left edge aligns with where the straight line starts (x + H/2 + PILL_PAD_LEFT)
export function renderPill({ x, y, text, measuredWidth, ink }) {
  const r = H / 2
  const w = H + PILL_PAD_LEFT + measuredWidth + PILL_PAD_RIGHT
  const textX = x + r + PILL_PAD_LEFT
  const textY = y + H * LETTER_CY_RATIO
  return {
    width: w,
    el: (
      <g key={`pill-${x}`}>
        <rect x={x} y={y} width={w} height={H} rx={r} ry={r} fill="none" stroke={ink} strokeWidth={STROKE} />
        <text
          x={textX}
          y={textY}
          fontFamily="Inter, sans-serif"
          fontWeight="500"
          fontSize={WORDMARK_FONT_SIZE}
          fill={ink}
          textAnchor="start"
          dominantBaseline="central"
        >
          {text}
        </text>
      </g>
    ),
  }
}

// ─── Text measurement hook ────────────────────────────────────────────────────
function useMeasuredWidths(items) {
  const [widths, setWidths] = useState({})
  const svgRef = useRef(null)

  const measure = useCallback(() => {
    if (!svgRef.current) return
    const newWidths = {}
    const textEls = svgRef.current.querySelectorAll('text[data-measure]')
    textEls.forEach((el) => {
      const key = el.getAttribute('data-measure')
      try {
        const bbox = el.getBBox()
        newWidths[key] = bbox.width
      } catch {
        newWidths[key] = el.textContent.length * parseFloat(el.getAttribute('font-size')) * 0.6
      }
    })
    // Only re-render if a measured value actually changed
    setWidths((prev) => {
      const keys = Object.keys(newWidths)
      if (keys.length !== Object.keys(prev).length) return newWidths
      for (const k of keys) {
        if (newWidths[k] !== prev[k]) return newWidths
      }
      return prev
    })
  }, [])

  useLayoutEffect(() => {
    measure()
  })

  const measureSVG = (
    <svg
      ref={svgRef}
      style={{ position: 'absolute', visibility: 'hidden', top: -9999, left: -9999, width: 1, height: 1 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {items.map(({ key, text, fontSize, weight }) => (
        <text
          key={key}
          data-measure={key}
          fontFamily="Inter, sans-serif"
          fontWeight={weight === 'bold' ? '700' : '500'}
          fontSize={fontSize}
        >
          {text}
        </text>
      ))}
    </svg>
  )

  return { widths, measureSVG }
}

// ─── Main LogoSVG component ───────────────────────────────────────────────────
// lockup: array of element descriptors
// mode: 'light' | 'dark' | 'transparent'
// inkColor: 'black' | 'white' (for transparent mode)
export default function LogoSVG({ lockup, mode, inkColor, svgRef }) {
  let bgFill, ink
  if (mode === 'light') {
    bgFill = '#ffffff'
    ink = '#000000'
  } else if (mode === 'dark') {
    bgFill = '#000000'
    ink = '#ffffff'
  } else {
    bgFill = null
    ink = inkColor === 'white' ? '#ffffff' : '#000000'
  }

  // Build measurement items for wordmarks and pills
  const measureItems = lockup.flatMap((el) => {
    if (el.type === 'std-wordmark' || el.type === 'lab-wordmark' || el.type === 'arc-wordmark') {
      return [{ key: `wm-${el.text}`, text: el.text, fontSize: WORDMARK_FONT_SIZE, weight: 'medium' }]
    }
    if (el.type === 'pill') {
      return [{ key: `pill-${el.text}`, text: el.text, fontSize: WORDMARK_FONT_SIZE, weight: 'medium' }]
    }
    return []
  })

  const { widths, measureSVG } = useMeasuredWidths(measureItems)

  // Layout pass
  let curX = CANVAS_PAD
  const elements = []

  for (const el of lockup) {
    const y = CANVAS_PAD
    const params = { x: curX, y, ink }

    let result
    if (el.type === 'std-stamp') {
      result = renderStdStamp({ ...params, letters: el.letters || 'Dm' })
    } else if (el.type === 'lab-stamp') {
      result = renderLabStamp({ ...params, letters: el.letters })
    } else if (el.type === 'arc-stamp') {
      result = renderArcStamp({ ...params, letters: el.letters })
    } else if (el.type === 'mc-stamp') {
      result = renderMcStamp({ ...params, letters: el.letters })
    } else if (el.type === 'std-wordmark') {
      const mw = widths[`wm-${el.text}`] ?? el.text.length * WORDMARK_FONT_SIZE * 0.6
      result = renderStdWordmark({ ...params, text: el.text, measuredWidth: mw })
    } else if (el.type === 'lab-wordmark') {
      const mw = widths[`wm-${el.text}`] ?? el.text.length * WORDMARK_FONT_SIZE * 0.6
      result = renderLabWordmark({ ...params, text: el.text, measuredWidth: mw })
    } else if (el.type === 'arc-wordmark') {
      const mw = widths[`wm-${el.text}`] ?? el.text.length * WORDMARK_FONT_SIZE * 0.6
      result = renderArcWordmark({ ...params, text: el.text, measuredWidth: mw })
    } else if (el.type === 'pill') {
      const mw = widths[`pill-${el.text}`] ?? el.text.length * WORDMARK_FONT_SIZE * 0.55
      result = renderPill({ ...params, text: el.text, measuredWidth: mw })
    } else {
      continue
    }

    elements.push(result.el)
    curX += result.width + GAP
  }

  const totalWidth = curX - GAP + CANVAS_PAD
  const totalHeight = H + CANVAS_PAD * 2

  return (
    <>
      {measureSVG}
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width={totalWidth}
        height={totalHeight}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        style={{ display: 'block' }}
      >
        {bgFill && <rect x={0} y={0} width={totalWidth} height={totalHeight} fill={bgFill} />}
        {elements}
      </svg>
    </>
  )
}

import React from 'react'
import { downloadSVG, downloadPNG } from '../lib/export.js'

export default function DownloadButtons({ svgRef, basename = 'dml-logo', mode }) {
  function getEl() {
    return svgRef?.current
  }

  function handleSVG() {
    const el = getEl()
    if (el) downloadSVG(el, `${basename}.svg`)
  }

  function handlePNGTransparent() {
    const el = getEl()
    if (el) downloadPNG(el, `${basename}-transparent.png`, null)
  }

  function handlePNGBlack() {
    const el = getEl()
    if (el) downloadPNG(el, `${basename}-black-bg.png`, '#000000')
  }

  function handlePNGWhite() {
    const el = getEl()
    if (el) downloadPNG(el, `${basename}-white-bg.png`, '#ffffff')
  }

  const btnClass =
    'px-3 py-1.5 text-xs font-medium border border-black text-black hover:bg-black hover:text-white transition-colors cursor-pointer dark-btn'

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button onClick={handleSVG} className={btnClass}>
        SVG
      </button>
      <button onClick={handlePNGTransparent} className={btnClass}>
        PNG — transparent
      </button>
      <button onClick={handlePNGBlack} className={btnClass}>
        PNG — black bg
      </button>
      <button onClick={handlePNGWhite} className={btnClass}>
        PNG — white bg
      </button>
    </div>
  )
}

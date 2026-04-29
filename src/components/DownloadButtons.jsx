import React from 'react'
import { downloadSVG, downloadPNG } from '../lib/export.js'

export default function DownloadButtons({ svgRef, basename = 'dml-logo', darkUI }) {
  function getEl() { return svgRef?.current }

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

  const base = darkUI
    ? 'px-3 py-1.5 text-xs font-medium border border-white text-white hover:bg-white hover:text-black transition-colors cursor-pointer'
    : 'px-3 py-1.5 text-xs font-medium border border-black text-black hover:bg-black hover:text-white transition-colors cursor-pointer'

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button onClick={handleSVG} className={base}>SVG</button>
      <button onClick={handlePNGTransparent} className={base}>PNG — transparent</button>
      <button onClick={handlePNGBlack} className={base}>PNG — black bg</button>
      <button onClick={handlePNGWhite} className={base}>PNG — white bg</button>
    </div>
  )
}

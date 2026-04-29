import React, { useRef } from 'react'
import LogoSVG from './LogoSVG.jsx'
import DownloadButtons from './DownloadButtons.jsx'

export default function Preview({ lockup, mode, inkColor, basename }) {
  const svgRef = useRef(null)

  const previewBg =
    mode === 'dark' ? '#000000' : mode === 'light' ? '#ffffff' : inkColor === 'white' ? '#555555' : '#f0f0f0'

  return (
    <div className="flex flex-col gap-4">
      <div
        style={{ background: previewBg, padding: 0 }}
        className="border border-gray-200 inline-block"
      >
        <LogoSVG lockup={lockup} mode={mode} inkColor={inkColor} svgRef={svgRef} />
      </div>
      <DownloadButtons svgRef={svgRef} basename={basename} mode={mode} />
    </div>
  )
}

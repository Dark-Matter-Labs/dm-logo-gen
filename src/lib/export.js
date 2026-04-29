// SVG export: serialize node and trigger download
export function downloadSVG(svgEl, filename = 'logo.svg') {
  const serializer = new XMLSerializer()
  const svgStr = serializer.serializeToString(svgEl)
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  triggerDownload(url, filename)
  URL.revokeObjectURL(url)
}

// PNG export: render SVG at 4× scale via canvas
export function downloadPNG(svgEl, filename = 'logo.png', bgColor = null) {
  const serializer = new XMLSerializer()
  const svgStr = serializer.serializeToString(svgEl)
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const svgWidth = parseFloat(svgEl.getAttribute('width')) || svgEl.viewBox?.baseVal?.width || 400
  const svgHeight = parseFloat(svgEl.getAttribute('height')) || svgEl.viewBox?.baseVal?.height || 200
  const scale = 4

  const canvas = document.createElement('canvas')
  canvas.width = svgWidth * scale
  canvas.height = svgHeight * scale
  const ctx = canvas.getContext('2d')

  if (bgColor) {
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    URL.revokeObjectURL(url)
    canvas.toBlob((pngBlob) => {
      const pngUrl = URL.createObjectURL(pngBlob)
      triggerDownload(pngUrl, filename)
      URL.revokeObjectURL(pngUrl)
    }, 'image/png')
  }
  img.onerror = () => URL.revokeObjectURL(url)
  img.src = url
}

function triggerDownload(url, filename) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}

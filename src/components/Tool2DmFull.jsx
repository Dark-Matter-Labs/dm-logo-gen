import React, { useState } from 'react'
import Preview from './Preview.jsx'
import { FieldSet, RadioGroup } from './FormParts.jsx'

export default function Tool2DmFull() {
  const [mode, setMode] = useState('light')
  const [inkColor, setInkColor] = useState('black')
  const [showStamp, setShowStamp] = useState(true)

  const lockup = [
    ...(showStamp ? [{ type: 'std-stamp', letters: 'Dm' }] : []),
    { type: 'std-wordmark', text: 'Dark matter labs' },
  ]

  return (
    <div className="grid grid-cols-[320px_1fr] gap-8 items-start">
      <div className="flex flex-col gap-6">
        <FieldSet label="Mode">
          <RadioGroup
            name="mode2"
            options={['light', 'dark', 'transparent']}
            value={mode}
            onChange={setMode}
          />
        </FieldSet>
        {mode === 'transparent' && (
          <FieldSet label="Ink color">
            <RadioGroup
              name="inkColor2"
              options={['black', 'white']}
              value={inkColor}
              onChange={setInkColor}
            />
          </FieldSet>
        )}
        <FieldSet label="Options">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showStamp}
              onChange={(e) => setShowStamp(e.target.checked)}
              className="accent-black"
            />
            Include Dm stamp
          </label>
        </FieldSet>
      </div>
      <Preview lockup={lockup} mode={mode} inkColor={inkColor} basename="dm-full" />
    </div>
  )
}

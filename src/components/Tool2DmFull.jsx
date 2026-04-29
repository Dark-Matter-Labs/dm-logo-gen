import React, { useState } from 'react'
import Preview from './Preview.jsx'
import { FieldSet, RadioGroup } from './FormParts.jsx'

export default function Tool2DmFull({ darkUI }) {
  const [mode, setMode] = useState('light')
  const [inkColor, setInkColor] = useState('black')

  const lockup = [{ type: 'std-wordmark', text: 'Dark matter labs' }]

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
      </div>
      <Preview lockup={lockup} mode={mode} inkColor={inkColor} basename="dm-full" darkUI={darkUI} />
    </div>
  )
}

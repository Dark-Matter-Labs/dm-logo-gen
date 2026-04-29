import React, { useState } from 'react'
import Preview from './Preview.jsx'
import { FieldSet, RadioGroup, Label } from './FormParts.jsx'

export default function Tool1Dm({ darkUI }) {
  const [mode, setMode] = useState('light')
  const [inkColor, setInkColor] = useState('black')

  const lockup = [{ type: 'std-stamp', letters: 'Dm' }]

  return (
    <div className="grid grid-cols-[320px_1fr] gap-8 items-start">
      <div className="flex flex-col gap-6">
        <FieldSet label="Mode">
          <RadioGroup
            name="mode"
            options={['light', 'dark', 'transparent']}
            value={mode}
            onChange={setMode}
          />
        </FieldSet>
        {mode === 'transparent' && (
          <FieldSet label="Ink color">
            <RadioGroup
              name="inkColor"
              options={['black', 'white']}
              value={inkColor}
              onChange={setInkColor}
            />
          </FieldSet>
        )}
      </div>
      <Preview lockup={lockup} mode={mode} inkColor={inkColor} basename="dm-stamp" darkUI={darkUI} />
    </div>
  )
}

import React, { useState } from 'react'
import Preview from './Preview.jsx'
import { FieldSet, RadioGroup } from './FormParts.jsx'

function formatCode(raw) {
  const letters = raw.replace(/[^a-zA-Z]/g, '').slice(0, 2)
  if (!letters) return ''
  if (letters.length === 1) return letters[0].toUpperCase()
  return letters[0].toUpperCase() + letters[1].toLowerCase()
}

export default function Tool3LabArc({ darkUI }) {
  const [category, setCategory] = useState('lab')
  const [code, setCode] = useState('Ne')
  const [name, setName] = useState('Next economics')
  const [includeDm, setIncludeDm] = useState(true)
  const [view, setView] = useState('both') // 'stamp' | 'wordmark' | 'both'
  const [mode, setMode] = useState('light')
  const [inkColor, setInkColor] = useState('black')

  const stampType = category === 'lab' ? 'lab-stamp' : 'arc-stamp'
  const wordmarkType = category === 'lab' ? 'lab-wordmark' : 'arc-wordmark'

  const codeDisplay = formatCode(code)
  const codeValid = codeDisplay.length === 2
  const nameDisplay = name.trim() || 'Lab name'

  const lockup = [
    ...(includeDm ? [{ type: 'std-stamp', letters: 'Dm' }] : []),
    ...(view === 'stamp' || view === 'both'
      ? [{ type: stampType, letters: codeDisplay || 'Ne' }]
      : []),
    ...(view === 'wordmark' || view === 'both'
      ? [{ type: wordmarkType, text: nameDisplay }]
      : []),
  ]

  const basename = `dml-${category}-${(codeDisplay || 'xx').toLowerCase()}`

  return (
    <div className="grid grid-cols-[320px_1fr] gap-8 items-start">
      <div className="flex flex-col gap-6">
        <FieldSet label="Category">
          <RadioGroup
            name="category"
            options={['lab', 'arc']}
            value={category}
            onChange={setCategory}
          />
        </FieldSet>

        <FieldSet label="2-letter code">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={4}
            placeholder="Ne"
            className="w-full border border-black px-2 py-1 text-sm font-mono focus:outline-none"
          />
          {code.length > 0 && !codeValid && (
            <p className="text-xs text-red-600 mt-1">Enter exactly 2 letters</p>
          )}
          {codeValid && (
            <p className="text-xs text-gray-500 mt-1">Displays as: {codeDisplay}</p>
          )}
        </FieldSet>

        <FieldSet label="Full name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Next economics"
            className="w-full border border-black px-2 py-1 text-sm focus:outline-none"
          />
        </FieldSet>

        <FieldSet label="Show">
          <RadioGroup
            name="view"
            options={[
              { value: 'stamp', label: 'Stamp only' },
              { value: 'wordmark', label: 'Wordmark only' },
              { value: 'both', label: 'Stamp + wordmark' },
            ]}
            value={view}
            onChange={setView}
          />
        </FieldSet>

        <FieldSet label="Options">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={includeDm}
              onChange={(e) => setIncludeDm(e.target.checked)}
              className="accent-black"
            />
            Include Dm stamp
          </label>
        </FieldSet>

        <FieldSet label="Mode">
          <RadioGroup
            name="mode3"
            options={['light', 'dark', 'transparent']}
            value={mode}
            onChange={setMode}
          />
        </FieldSet>
        {mode === 'transparent' && (
          <FieldSet label="Ink color">
            <RadioGroup
              name="inkColor3"
              options={['black', 'white']}
              value={inkColor}
              onChange={setInkColor}
            />
          </FieldSet>
        )}
      </div>

      <Preview lockup={lockup} mode={mode} inkColor={inkColor} basename={basename} darkUI={darkUI} />
    </div>
  )
}

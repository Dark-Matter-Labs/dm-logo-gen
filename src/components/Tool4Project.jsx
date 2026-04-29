import React, { useState } from 'react'
import Preview from './Preview.jsx'
import { FieldSet, RadioGroup } from './FormParts.jsx'

function formatCode(raw) {
  const letters = raw.replace(/[^a-zA-Z]/g, '').slice(0, 2)
  if (!letters) return ''
  if (letters.length === 1) return letters[0].toUpperCase()
  return letters[0].toUpperCase() + letters[1].toLowerCase()
}

function CodeInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={4}
      placeholder={placeholder || 'Xx'}
      className="w-20 border border-black px-2 py-1 text-sm font-mono focus:outline-none"
    />
  )
}

export default function Tool4Project({ darkUI }) {
  const [projectName, setProjectName] = useState('Multivalent currencies')
  const [projectShape, setProjectShape] = useState('pill') // 'pill' | 'mc'
  const [mcCode, setMcCode] = useState('Mc')
  const [includeDm, setIncludeDm] = useState(true)
  const [includeLab, setIncludeLab] = useState(true)
  const [labCodes, setLabCodes] = useState(['Ne', ''])
  const [includeArc, setIncludeArc] = useState(true)
  const [arcCodes, setArcCodes] = useState(['Rc', ''])
  const [mode, setMode] = useState('light')
  const [inkColor, setInkColor] = useState('black')

  function setLabCode(i, val) {
    const next = [...labCodes]
    next[i] = val
    setLabCodes(next)
  }
  function setArcCode(i, val) {
    const next = [...arcCodes]
    next[i] = val
    setArcCodes(next)
  }

  // Build lockup
  const lockup = []

  if (includeDm) lockup.push({ type: 'std-stamp', letters: 'Dm' })

  // Lab stamps come before project element per spec order
  if (includeLab) {
    for (const c of labCodes) {
      const cd = formatCode(c)
      if (cd.length === 2) lockup.push({ type: 'lab-stamp', letters: cd })
    }
  }

  // Arc stamps
  if (includeArc) {
    for (const c of arcCodes) {
      const cd = formatCode(c)
      if (cd.length === 2) lockup.push({ type: 'arc-stamp', letters: cd })
    }
  }

  // Project element last
  if (projectShape === 'pill') {
    lockup.push({ type: 'pill', text: projectName || 'Project name' })
  } else {
    const cd = formatCode(mcCode)
    lockup.push({ type: 'mc-stamp', letters: cd || 'Mc' })
  }

  const basename = `dml-project-${(projectName || 'logo').toLowerCase().replace(/\s+/g, '-').slice(0, 20)}`

  return (
    <div className="grid grid-cols-[320px_1fr] gap-8 items-start">
      <div className="flex flex-col gap-6">
        <FieldSet label="Project name">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Multivalent currencies"
            className="w-full border border-black px-2 py-1 text-sm focus:outline-none"
          />
        </FieldSet>

        <FieldSet label="Project element">
          <RadioGroup
            name="projectShape"
            options={[
              { value: 'pill', label: 'Pill (name in stadium shape)' },
              { value: 'mc', label: 'MC circle (2-letter code)' },
            ]}
            value={projectShape}
            onChange={setProjectShape}
          />
          {projectShape === 'mc' && (
            <div className="mt-2">
              <label className="text-xs text-gray-500 block mb-1">2-letter code</label>
              <CodeInput value={mcCode} onChange={setMcCode} placeholder="Mc" />
            </div>
          )}
        </FieldSet>

        <FieldSet label="Context">
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={includeDm}
                onChange={(e) => setIncludeDm(e.target.checked)}
                className="accent-black"
              />
              Include Dm stamp
            </label>

            <div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLab}
                  onChange={(e) => setIncludeLab(e.target.checked)}
                  className="accent-black"
                />
                Include Lab context
              </label>
              {includeLab && (
                <div className="mt-2 ml-5 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <CodeInput value={labCodes[0]} onChange={(v) => setLabCode(0, v)} placeholder="Ne" />
                    <span className="text-xs text-gray-400">Lab 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CodeInput value={labCodes[1]} onChange={(v) => setLabCode(1, v)} placeholder="(optional)" />
                    <span className="text-xs text-gray-400">Lab 2</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeArc}
                  onChange={(e) => setIncludeArc(e.target.checked)}
                  className="accent-black"
                />
                Include Arc context
              </label>
              {includeArc && (
                <div className="mt-2 ml-5 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <CodeInput value={arcCodes[0]} onChange={(v) => setArcCode(0, v)} placeholder="Rc" />
                    <span className="text-xs text-gray-400">Arc 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CodeInput value={arcCodes[1]} onChange={(v) => setArcCode(1, v)} placeholder="(optional)" />
                    <span className="text-xs text-gray-400">Arc 2</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FieldSet>

        <FieldSet label="Mode">
          <RadioGroup
            name="mode4"
            options={['light', 'dark', 'transparent']}
            value={mode}
            onChange={setMode}
          />
        </FieldSet>
        {mode === 'transparent' && (
          <FieldSet label="Ink color">
            <RadioGroup
              name="inkColor4"
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

import React from 'react'

export function FieldSet({ label, children }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">{label}</p>
      {children}
    </div>
  )
}

export function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value
        const label = typeof opt === 'string' ? opt : opt.label
        return (
          <label key={val} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name={name}
              value={val}
              checked={value === val}
              onChange={() => onChange(val)}
              className="accent-black"
            />
            {label}
          </label>
        )
      })}
    </div>
  )
}

export function Label({ children }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">{children}</p>
  )
}

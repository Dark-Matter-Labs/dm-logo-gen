import React, { useState, useEffect } from 'react'
import Tool1Dm from './components/Tool1Dm.jsx'
import Tool2DmFull from './components/Tool2DmFull.jsx'
import Tool3LabArc from './components/Tool3LabArc.jsx'
import Tool4Project from './components/Tool4Project.jsx'

const TABS = [
  { id: 'dm-stamp', label: 'Dm stamp' },
  { id: 'dm-full', label: 'Dark Matter Labs' },
  { id: 'lab-arc', label: 'Lab / Arc logo' },
  { id: 'project', label: 'Project logo' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('dm-stamp')
  const [darkUI, setDarkUI] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', darkUI)
  }, [darkUI])

  return (
    <div style={{ minHeight: '100vh', background: darkUI ? '#111' : '#fff', color: darkUI ? '#fff' : '#000' }}>
      {/* Top bar */}
      <header
        style={{ borderBottom: `1px solid ${darkUI ? '#333' : '#000'}` }}
        className="flex items-center justify-between px-6 py-3"
      >
        <span className="text-sm font-medium tracking-tight">
          Dark Matter Labs — Logo Generator
        </span>
        <button
          onClick={() => setDarkUI((d) => !d)}
          style={{ border: `1px solid ${darkUI ? '#666' : '#000'}`, background: 'none', color: 'inherit' }}
          className="text-xs px-3 py-1 cursor-pointer hover:opacity-60 transition-opacity"
        >
          {darkUI ? 'Light UI' : 'Dark UI'}
        </button>
      </header>

      {/* Tab bar */}
      <nav
        style={{ borderBottom: `1px solid ${darkUI ? '#333' : '#000'}` }}
        className="flex px-6"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? `2px solid ${darkUI ? '#fff' : '#000'}` : '2px solid transparent',
              color: 'inherit',
              padding: '10px 16px 8px',
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 600 : 400,
              cursor: 'pointer',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="px-6 py-8" style={{ maxWidth: 1200 }}>
        {activeTab === 'dm-stamp' && <Tool1Dm />}
        {activeTab === 'dm-full' && <Tool2DmFull />}
        {activeTab === 'lab-arc' && <Tool3LabArc />}
        {activeTab === 'project' && <Tool4Project />}
      </main>
    </div>
  )
}

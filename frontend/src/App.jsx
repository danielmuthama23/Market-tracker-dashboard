import React from 'react'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Market Tracker Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <Dashboard />
      </main>
    </div>
  )
}

import React from 'react'

/**
 * Minimal date range picker.
 * start/end: 'YYYY-MM-DD' strings or empty
 * onChange: fn({ start, end })
 */
export default function DateRangePicker({ start = '', end = '', onChange }) {
  return (
    <div className="p-3 bg-white rounded shadow-sm flex items-center gap-3">
      <label className="text-sm font-medium">From:</label>
      <input
        type="date"
        value={start}
        onChange={(e) => onChange({ start: e.target.value, end })}
        className="border rounded px-2 py-1"
      />
      <label className="text-sm font-medium">To:</label>
      <input
        type="date"
        value={end}
        onChange={(e) => onChange({ start, end: e.target.value })}
        className="border rounded px-2 py-1"
      />
      <div className="ml-2 text-sm text-slate-500">Or use presets below</div>
    </div>
  )
}

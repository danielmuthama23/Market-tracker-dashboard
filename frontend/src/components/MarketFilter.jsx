import React from 'react'

/**
 * MarketFilter: simple dropdown for markets.
 * markets: array of strings
 * selected: string or null
 * onChange: fn(newSelected)
 */
export default function MarketFilter({ markets = [], selected = '', onChange }) {
  return (
    <div className="p-3 bg-white rounded shadow-sm flex items-center gap-3">
      <label className="text-sm font-medium">Market:</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="">All Markets</option>
        {markets.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  )
}

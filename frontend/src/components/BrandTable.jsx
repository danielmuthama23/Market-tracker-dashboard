import React, { useState, useMemo } from 'react'

/**
 * BrandTable
 * data: array of { market, brand, total_sales, total_volume }
 * onBrandClick: fn(brand)
 */
export default function BrandTable({ data = [], onBrandClick }) {
  const [sortKey, setSortKey] = useState('total_sales')
  const [desc, setDesc] = useState(true)
  const [query, setQuery] = useState('')

  const sorted = useMemo(() => {
    const filtered = data.filter((r) =>
      `${r.brand} ${r.market}`.toLowerCase().includes(query.toLowerCase())
    )
    return filtered.sort((a, b) => {
      const av = Number(a[sortKey] ?? 0)
      const bv = Number(b[sortKey] ?? 0)
      return desc ? bv - av : av - bv
    })
  }, [data, sortKey, desc, query])

  const toggleSort = (key) => {
    if (key === sortKey) setDesc(!desc)
    else {
      setSortKey(key)
      setDesc(true)
    }
  }

  return (
    <div className="bg-white rounded shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <input
          placeholder="Search brand or market..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded px-3 py-1 w-1/3"
        />
        <div className="text-sm text-slate-500">Rows: {sorted.length}</div>
      </div>

      <table className="min-w-full text-left">
        <thead>
          <tr className="text-sm text-slate-600 border-b">
            <th className="py-2">Brand</th>
            <th className="py-2">Market</th>
            <th className="py-2 cursor-pointer" onClick={() => toggleSort('total_sales')}>
              Total Sales {sortKey === 'total_sales' ? (desc ? '↓' : '↑') : ''}
            </th>
            <th className="py-2 cursor-pointer" onClick={() => toggleSort('total_volume')}>
              Total Volume {sortKey === 'total_volume' ? (desc ? '↓' : '↑') : ''}
            </th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((r, idx) => (
            <tr
              key={`${r.market}-${r.brand}-${idx}`}
              className="hover:bg-slate-50 cursor-pointer"
              onClick={() => onBrandClick(r.brand)}
            >
              <td className="py-2">{r.brand}</td>
              <td className="py-2">{r.market}</td>
              <td className="py-2">{Number(r.total_sales).toLocaleString()}</td>
              <td className="py-2">{Number(r.total_volume).toLocaleString()}</td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan="4" className="py-4 text-center text-slate-500">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

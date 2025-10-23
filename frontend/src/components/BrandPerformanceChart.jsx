import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

/**
 * brandSeries: array of { date: 'YYYY-MM-DD', sales, volume }
 */
export default function BrandPerformanceChart({ data = [], metric = 'sales' }) {
  // ensure dates are sorted
  const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="bg-white rounded shadow-sm p-4">
      <h3 className="text-lg font-medium mb-2">Brand Performance</h3>
      {sorted.length === 0 ? (
        <div className="text-slate-500">No time series data to show</div>
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={sorted}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={metric} stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

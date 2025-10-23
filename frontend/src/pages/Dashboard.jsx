import React, { useEffect, useState } from 'react'
import FileUpload from '../components/FileUpload'
import MarketFilter from '../components/MarketFilter'
import DateRangePicker from '../components/DateRangePicker'
import BrandTable from '../components/BrandTable'
import BrandPerformanceChart from '../components/BrandPerformanceChart'
import { fetchAggregatedData, fetchBrandPerformance } from '../api/trackerApi'

export default function Dashboard() {
  const [aggregated, setAggregated] = useState([])
  const [markets, setMarkets] = useState([])
  const [selectedMarket, setSelectedMarket] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [loading, setLoading] = useState(false)
  const [selectedBrandSeries, setSelectedBrandSeries] = useState([])
  const [brandName, setBrandName] = useState('')

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await fetchAggregatedData({
        market: selectedMarket || undefined,
        start: dateRange.start || undefined,
        end: dateRange.end || undefined
      })
      // data is list of objects: { market, brand, total_sales, total_volume }
      setAggregated(Array.isArray(data) ? data : [])
      // extract market list
      const m = Array.from(new Set((data || []).map((d) => d.market))).sort()
      setMarkets(m)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarket, dateRange])

  const handleUploadDone = () => {
    loadData()
  }

  const handleBrandClick = async (brand) => {
    setBrandName(brand)
    try {
      const series = await fetchBrandPerformance(brand, { start: dateRange.start, end: dateRange.end })
      // optional: if backend returns full rows, map to {date, sales, volume}
      const mapped = series.map((r) => ({
        date: r.date,
        sales: Number(r.sales || 0),
        volume: Number(r.volume || 0)
      }))
      // optionally filter by dateRange on frontend if backend lacks that filter
      let filtered = mapped
      if (dateRange.start && dateRange.end) {
        const s = new Date(dateRange.start)
        const e = new Date(dateRange.end)
        filtered = mapped.filter((x) => {
          const d = new Date(x.date)
          return d >= s && d <= e
        })
      }
      setSelectedBrandSeries(filtered)
    } catch (err) {
      console.error(err)
      setSelectedBrandSeries([])
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FileUpload onUploaded={handleUploadDone} />
        <MarketFilter markets={markets} selected={selectedMarket} onChange={setSelectedMarket} />
        <DateRangePicker start={dateRange.start} end={dateRange.end} onChange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Brand Listings</h2>
            <div className="text-sm text-slate-500">{loading ? 'Loading…' : `${aggregated.length} rows`}</div>
          </div>
          <BrandTable data={aggregated} onBrandClick={handleBrandClick} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Top Brands (by sales)</h2>
          <div className="bg-white rounded shadow-sm p-4">
            {/* Quick top N list */}
            {aggregated.length === 0 ? (
              <div className="text-slate-500">No data</div>
            ) : (
              <ol className="list-decimal pl-5 space-y-2">
                {aggregated
                  .slice()
                  .sort((a, b) => Number(b.total_sales || 0) - Number(a.total_sales || 0))
                  .slice(0, 5)
                  .map((r) => (
                    <li key={`${r.market}-${r.brand}`} className="flex justify-between">
                      <span>{r.brand} — {r.market}</span>
                      <span className="font-medium">{Number(r.total_sales || 0).toLocaleString()}</span>
                    </li>
                  ))}
              </ol>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">
          {brandName ? `Performance — ${brandName}` : 'Select a brand to view performance'}
        </h2>
        <BrandPerformanceChart data={selectedBrandSeries} metric="sales" />
      </div>
    </div>
  )
}

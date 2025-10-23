import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // proxied to backend by Vite dev server
  timeout: 20000
})

export async function uploadFile(file) {
  const form = new FormData()
  form.append('file', file)
  const resp = await api.post('/upload/', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return resp.data
}

/**
 * Fetch aggregated data
 * query: { markets: [..], start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' }
 */
export async function fetchAggregatedData({ market, start, end }) {
  const params = {}
  if (market) params.market = market
  if (start && end) {
    params.start = start
    params.end = end
  }
  const resp = await api.get('/data/', { params })
  return resp.data
}

export async function fetchBrandPerformance(brandName, { start, end }) {
  // backend brand endpoint doesn't accept date filters in this implementation,
  // so get all and frontend can filter by date if needed
  const resp = await api.get(`/brand/${encodeURIComponent(brandName)}/`)
  return resp.data
}

import React, { useState } from 'react'
import { uploadFile } from '../api/trackerApi'

export default function FileUpload({ onUploaded }) {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setStatus({ type: 'error', message: 'Please select a file (.csv or .xlsx).' })
      return
    }
    setLoading(true)
    setStatus(null)
    try {
      const data = await uploadFile(file)
      setStatus({ type: 'success', message: data.message || 'Uploaded successfully' })
      onUploaded?.()
    } catch (err) {
      const message = err?.response?.data?.error || err.message || 'Upload failed'
      setStatus({ type: 'error', message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          {loading ? 'Uploading…' : 'Upload'}
        </button>
      </form>

      {status && (
        <div className={`mt-3 text-sm ${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {status.message}
        </div>
      )}
      <div className="mt-2 text-xs text-slate-500">
        Accepts CSV and XLSX. Upload replaces or inserts records by brand+market+date.
      </div>
    </div>
  )
}

import { useState } from 'react'
import { getSupabaseClient } from '../supabaseClient.js'

function SupabaseTest() {
  const { client, error: configError } = getSupabaseClient()
  const [rows, setRows] = useState([])
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const isDisabled = loading || !client

  async function handleInsert() {
    if (!client) {
      return
    }

    setLoading(true)
    setError('')
    setStatus('')

    const { data, error: insertError } = await client
      .from('resumes')
      .insert({
        title: 'Test CV',
        data: { hello: 'world', ts: Date.now() },
      })
      .select()

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setStatus(`Inserted ${data?.length || 0} row.`)
    setLoading(false)
  }

  async function handleLoad() {
    if (!client) {
      return
    }

    setLoading(true)
    setError('')
    setStatus('')

    const { data, error: selectError } = await client
      .from('resumes')
      .select('id, created_at, title, data')
      .order('created_at', { ascending: false })
      .limit(5)

    if (selectError) {
      setError(selectError.message)
      setLoading(false)
      return
    }

    setRows(data || [])
    setStatus(`Loaded ${data?.length || 0} rows.`)
    setLoading(false)
  }

  return (
    <section className="card supabase-test" aria-labelledby="supabase-test-heading">
      <h2 id="supabase-test-heading">Supabase DB Test</h2>
      {configError ? (
        <div className="supabase-test-warning">
          <p>{configError}</p>
          <pre>{`VITE_SUPABASE_URL=...\nVITE_SUPABASE_ANON_KEY=...`}</pre>
          <p>After adding env vars, restart your dev server.</p>
        </div>
      ) : null}
      <div className="supabase-test-actions">
        <button type="button" className="btn btn-secondary" onClick={handleInsert} disabled={isDisabled}>
          Insert test resume
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleLoad} disabled={isDisabled}>
          Load latest resumes
        </button>
      </div>

      {status ? <p className="status-message">{status}</p> : null}
      {error ? <p className="error-message">{error}</p> : null}

      <ul className="supabase-test-list">
        {rows.map((row) => (
          <li key={row.id}>
            <strong>{row.title}</strong>
            <div>{new Date(row.created_at).toLocaleString()}</div>
            <pre>{JSON.stringify(row.data, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SupabaseTest

import { useState, useEffect, useRef } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Check, LogOut, MapPin, ChevronDown, ChevronUp, Bold, Italic, List } from 'lucide-react'
import { supabase } from '../lib/supabase'

const base = import.meta.env.BASE_URL
const ADMIN_PASSWORD = 'KPRAdmin2025'

const BLANK = {
  title: '',
  description: '',
  discipline: 'Technology',
  type: 'Hybrid',
  location: '',
  salary: '',
  benefits: [''],
  is_active: true,
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('kpr-admin') === '1')
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saveErr, setSaveErr] = useState(null)
  const [expandedDesc, setExpandedDesc] = useState(null)

  const load = async () => {
    if (!supabase) { setLoading(false); return }
    setLoading(true)
    const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
    setJobs(data || [])
    setLoading(false)
  }

  useEffect(() => { if (authed) load() }, [authed])

  const login = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('kpr-admin', '1')
      setAuthed(true)
    } else {
      setPwErr(true)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('kpr-admin')
    setAuthed(false)
  }

  const openAdd = () => { setForm(BLANK); setEditing(null); setShowForm(true); setSaveErr(null) }

  const openEdit = (job) => {
    setForm({
      title: job.title || '',
      description: job.description || '',
      discipline: job.discipline || 'Technology',
      type: job.type || 'Hybrid',
      location: job.location || '',
      salary: job.salary || '',
      benefits: job.benefits?.length ? job.benefits : [''],
      is_active: job.is_active ?? true,
    })
    setEditing(job.id)
    setShowForm(true)
    setSaveErr(null)
  }

  const closeForm = () => { setShowForm(false); setEditing(null); setForm(BLANK) }

  const save = async (e) => {
    e.preventDefault()
    if (!supabase) return
    setSaving(true)
    const payload = { ...form, benefits: form.benefits.filter(b => b.trim()) }
    const result = editing
      ? await supabase.from('jobs').update(payload).eq('id', editing)
      : await supabase.from('jobs').insert(payload)
    if (result.error) { setSaveErr(result.error.message); setSaving(false); return }
    closeForm()
    load()
    setSaving(false)
  }

  const confirmDelete = async () => {
    if (!supabase || !deleteTarget) return
    await supabase.from('jobs').delete().eq('id', deleteTarget)
    setDeleteTarget(null)
    load()
  }

  const toggleActive = async (job) => {
    if (!supabase) return
    await supabase.from('jobs').update({ is_active: !job.is_active }).eq('id', job.id)
    load()
  }

  const descRef = useRef(null)
  const wrapDesc = (marker) => {
    const el = descRef.current
    if (!el) return
    const s = el.selectionStart, e = el.selectionEnd
    const selected = form.description.slice(s, e) || 'text'
    const next = form.description.slice(0, s) + marker + selected + marker + form.description.slice(e)
    setForm(f => ({ ...f, description: next }))
    setTimeout(() => { el.focus(); el.setSelectionRange(s + marker.length, s + marker.length + selected.length) }, 0)
  }
  const insertBullet = () => {
    const el = descRef.current
    if (!el) return
    const s = el.selectionStart
    const before = form.description.slice(0, s)
    const after = form.description.slice(s)
    const prefix = before.length === 0 || before.endsWith('\n') ? '• ' : '\n• '
    const next = before + prefix + after
    setForm(f => ({ ...f, description: next }))
    setTimeout(() => { el.focus(); el.setSelectionRange(s + prefix.length, s + prefix.length) }, 0)
  }

  const setBenefit = (i, val) => {
    const b = [...form.benefits]; b[i] = val
    setForm(f => ({ ...f, benefits: b }))
  }

  /* ── LOGIN ── */
  if (!authed) return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__brand">
          <img src={`${base}logo-white.webp`} alt="Key Partnership" />
        </div>
        <h1 className="admin-login__title">Admin Portal</h1>
        <p className="admin-login__sub">Job Management</p>
        <form onSubmit={login}>
          <input
            type="password"
            className={`admin-login__input${pwErr ? ' admin-login__input--err' : ''}`}
            placeholder="Enter password"
            value={pw}
            onChange={e => { setPw(e.target.value); setPwErr(false) }}
            autoFocus
          />
          {pwErr && <p className="admin-login__error">Incorrect password — try again.</p>}
          <button type="submit" className="btn btn-green admin-login__btn">Sign In</button>
        </form>
      </div>
    </div>
  )

  const liveCount = jobs.filter(j => j.is_active).length

  /* ── DASHBOARD ── */
  return (
    <div className="admin-wrap">
      <header className="admin-header">
        <img src={`${base}logo-white.webp`} alt="Key Partnership" style={{ height: 30, filter: 'brightness(0) invert(1)' }} />
        <span className="admin-header__title">Job Management</span>
        <button className="admin-logout-btn" onClick={logout}><LogOut size={15} /> Sign Out</button>
      </header>

      <div className="admin-body">
        {!supabase && (
          <div className="admin-notice admin-notice--warn">
            <strong>Setup required:</strong> Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your environment variables and redeploy.
          </div>
        )}

        <div className="admin-controls">
          <div>
            <h2 className="admin-controls__heading">Live Roles</h2>
            <p className="admin-controls__sub">{liveCount} live · {jobs.length - liveCount} draft</p>
          </div>
          <button className="btn btn-green" onClick={openAdd} disabled={!supabase}>
            <Plus size={16} /> Add New Role
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">Loading roles...</div>
        ) : jobs.length === 0 ? (
          <div className="admin-empty">
            <p>No roles yet.</p>
            <button className="btn btn-green" onClick={openAdd} disabled={!supabase}><Plus size={15} /> Add your first role</button>
          </div>
        ) : (
          <div className="admin-jobs-list">
            {jobs.map(job => (
              <div key={job.id} className={`admin-job-card${job.is_active ? '' : ' admin-job-card--draft'}`}>
                <div className="admin-job-card__body">
                  <div className="admin-job-card__badges">
                    <span className="job-badge" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>{job.discipline}</span>
                    <span className="job-listing-type" style={{ fontSize: '0.7rem' }}>{job.type}</span>
                    {!job.is_active && <span className="admin-draft-badge">Draft</span>}
                  </div>
                  <h3 className="admin-job-card__title">{job.title}</h3>
                  <div className="admin-job-card__meta">
                    {job.location && <span><MapPin size={12} />{job.location}</span>}
                    {job.salary && <span>💰 {job.salary}</span>}
                    <span style={{ opacity: 0.45 }}>Published {formatDate(job.created_at)}</span>
                  </div>
                  {job.benefits?.filter(Boolean).length > 0 && (
                    <div className="admin-job-card__benefits">
                      {job.benefits.filter(Boolean).map((b, i) => (
                        <span key={i} className="benefit-pill"><Check size={10} />{b}</span>
                      ))}
                    </div>
                  )}
                  {job.description && (
                    <div className="admin-job-card__desc-wrap">
                      <button className="admin-desc-toggle" type="button" onClick={() => setExpandedDesc(expandedDesc === job.id ? null : job.id)}>
                        {expandedDesc === job.id ? <><ChevronUp size={13} /> Hide description</> : <><ChevronDown size={13} /> Show description</>}
                      </button>
                      {expandedDesc === job.id && <p className="admin-job-card__desc">{job.description}</p>}
                    </div>
                  )}
                </div>
                <div className="admin-job-card__actions">
                  <button className="admin-action-btn" onClick={() => toggleActive(job)} title={job.is_active ? 'Set to Draft' : 'Publish'}>
                    {job.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button className="admin-action-btn" onClick={() => openEdit(job)} title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button className="admin-action-btn admin-action-btn--danger" onClick={() => setDeleteTarget(job.id)} title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── ADD / EDIT MODAL ── */}
      {showForm && (
        <div className="admin-overlay" onClick={closeForm}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__hdr">
              <h3>{editing ? 'Edit Role' : 'Add New Role'}</h3>
              <button className="admin-modal__close" onClick={closeForm}><X size={20} /></button>
            </div>
            <form className="admin-form" onSubmit={save}>
              {saveErr && <p className="admin-form__error">{saveErr}</p>}

              <div className="af-field af-field--full">
                <label>Job Title *</label>
                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Senior Software Engineer" />
              </div>

              <div className="af-row">
                <div className="af-field">
                  <label>Discipline</label>
                  <select value={form.discipline} onChange={e => setForm(f => ({ ...f, discipline: e.target.value }))}>
                    <option>Technology</option>
                    <option>Commercial</option>
                    <option>Data & AI</option>
                  </select>
                </div>
                <div className="af-field">
                  <label>Work Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>Onsite</option>
                  </select>
                </div>
              </div>

              <div className="af-row">
                <div className="af-field">
                  <label><MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />Location</label>
                  <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. London (Hybrid)" />
                </div>
                <div className="af-field">
                  <label>💰 Salary</label>
                  <input value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} placeholder="e.g. £60,000 – £75,000" />
                </div>
              </div>

              <div className="af-field af-field--full">
                <label>Job Description</label>
                <div className="af-desc-toolbar">
                  <button type="button" className="af-fmt-btn" onClick={() => wrapDesc('**')} title="Bold"><Bold size={13} /></button>
                  <button type="button" className="af-fmt-btn" onClick={() => wrapDesc('*')} title="Italic"><Italic size={13} /></button>
                  <button type="button" className="af-fmt-btn" onClick={insertBullet} title="Bullet point"><List size={13} /></button>
                  <span className="af-fmt-hint">Select text then click Bold/Italic</span>
                </div>
                <textarea ref={descRef} rows={10} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the role, responsibilities, and ideal candidate..." style={{ fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.7 }} />
              </div>

              <div className="af-field af-field--full">
                <label>Benefits</label>
                <div className="af-benefits">
                  {form.benefits.map((b, i) => (
                    <div key={i} className="af-benefit-row">
                      <input value={b} onChange={e => setBenefit(i, e.target.value)} placeholder={`e.g. 25 days holiday`} />
                      {form.benefits.length > 1 && (
                        <button type="button" className="af-benefit-del" onClick={() => setForm(f => ({ ...f, benefits: f.benefits.filter((_, x) => x !== i) }))}>
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  {form.benefits.length < 8 && (
                    <button type="button" className="af-add-benefit" onClick={() => setForm(f => ({ ...f, benefits: [...f.benefits, ''] }))}>
                      <Plus size={13} /> Add benefit
                    </button>
                  )}
                </div>
              </div>

              <div className="af-footer">
                <label className="af-publish-toggle">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} />
                  <span>Publish live now</span>
                </label>
                <div className="af-footer__actions">
                  <button type="button" className="btn admin-btn-cancel" onClick={closeForm}>Cancel</button>
                  <button type="submit" className="btn btn-green" disabled={saving}>{saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Role'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM ── */}
      {deleteTarget && (
        <div className="admin-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal admin-modal--sm" onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 8 }}>Delete this role?</h3>
            <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>This action cannot be undone.</p>
            <div className="af-footer__actions" style={{ marginTop: 28 }}>
              <button className="btn admin-btn-cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn admin-btn-delete" onClick={confirmDelete}>Delete Role</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

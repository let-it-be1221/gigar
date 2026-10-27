import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPlus, FiEdit3, FiTrash2, FiStar, FiUpload, FiX,
  FiSave, FiLoader, FiUsers, FiSearch, FiInbox, FiImage,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import AdminShell from '../../components/AdminShell'
import Loader from '../../components/Loader'
import SmartImage from '../../components/SmartImage'
import { adminApi } from '../../api/client'

const EMPTY = {
  name: '', logo_url: '', cover_image: '',
  sector: '', location: '', project_name: '',
  year: '', equipment_category: '', units_installed: 1,
  testimonial_author: '', testimonial: '',
  description: '', is_featured: false, is_active: true, sort_order: 0,
}

const CATEGORIES = [
  'building-elevators', 'building-lifts', 'paint-booths',
  'vehicle-test-equipment', 'facility-equipment', 'car-lifts',
  'gps-speed-limit', 'heavy-equipment',
]

export default function AdminCustomerManager() {
  const [customers, setCustomers]       = useState([])
  const [loading, setLoading]           = useState(true)
  const [editing, setEditing]           = useState(null) // null=list, object=edit, 'new'=new
  const [form, setForm]                 = useState(EMPTY)
  const [saving, setSaving]              = useState(false)
  const [uploading, setUploading]       = useState(false)
  const [confirm, setConfirm]           = useState(null)
  const [search, setSearch]             = useState('')
  const coverInputRef = useRef(null)
  const logoInputRef  = useRef(null)

  const fetch = () => {
    setLoading(true)
    adminApi.listCustomers()
      .then(({ data }) => setCustomers(data.data || []))
      .catch(() => toast.error('Could not load customers'))
      .finally(() => setLoading(false))
  }
  useEffect(() => { fetch() }, [])

  const startNew = () => { setForm(EMPTY); setEditing('new') }
  const startEdit = (c) => { setForm({ ...EMPTY, ...c }); setEditing(c) }
  const cancel = () => { setEditing(null); setForm(EMPTY) }

  const set = (k) => (e) => {
    const v = e?.target?.type === 'checkbox' ? e.target.checked : (e?.target?.value ?? e)
    setForm((f) => ({ ...f, [k]: v }))
  }

  const uploadFile = async (file, target) => {
    if (!file) return
    setUploading(true)
    try {
      const { data } = await adminApi.uploadMedia(file)
      setForm((f) => ({ ...f, [target]: data.url }))
      toast.success(`${target === 'logo_url' ? 'Logo' : 'Cover'} uploaded`)
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const submit = async (e) => {
    e?.preventDefault?.()
    if (!form.name?.trim()) {
      toast.error('Customer name is required')
      return
    }
    setSaving(true)
    try {
      if (editing === 'new') {
        const { data } = await adminApi.createCustomer(form)
        toast.success('Customer added')
        setCustomers((c) => [data.customer, ...c])
      } else {
        const { data } = await adminApi.updateCustomer(editing.id, form)
        toast.success('Customer updated')
        setCustomers((c) => c.map((x) => x.id === editing.id ? data.customer : x))
      }
      cancel()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const toggleFeatured = async (c) => {
    try {
      const { data } = await adminApi.toggleCustomerFeature(c.id)
      setCustomers((cs) => cs.map((x) => x.id === c.id ? { ...x, is_featured: data.is_featured } : x))
      toast.success(data.is_featured ? 'Marked as featured' : 'Unfeatured')
    } catch {
      toast.error('Could not update')
    }
  }

  const destroy = async (c) => {
    try {
      await adminApi.deleteCustomer(c.id)
      setCustomers((cs) => cs.filter((x) => x.id !== c.id))
      toast.success('Customer deleted')
    } catch {
      toast.error('Delete failed')
    } finally {
      setConfirm(null)
    }
  }

  const filtered = customers.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminShell
      title="Customer Stories"
      subtitle="Add, edit, feature or delete customer success stories shown on /customers."
      action={
        editing === null && (
          <button onClick={startNew} className="btn-primary">
            <FiPlus /> New Customer
          </button>
        )
      }
    >
      {editing === null ? (
        <>
          {/* Search bar */}
          <div className="mb-6 relative w-full sm:max-w-sm">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gigar-navy/40" />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers by name…"
              className="input-field !rounded-full !py-2 pl-10"
            />
          </div>

          {loading ? (
            <Loader fullscreen label="Loading customers…" />
          ) : filtered.length === 0 ? (
            <div className="card-soft p-12 text-center">
              <FiUsers className="mx-auto h-16 w-16 text-gigar-navy/30" />
              <h3 className="mt-4 font-display text-xl font-bold text-gigar-navy">No customers yet</h3>
              <p className="mt-2 text-gigar-navy/60">Add your first customer success story to showcase the businesses that trust Gigar.</p>
              <button onClick={startNew} className="mt-6 btn-primary"><FiPlus /> New Customer</button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`card-soft overflow-hidden ${!c.is_active ? 'opacity-60' : ''}`}
                >
                  <div className="relative h-32 overflow-hidden">
                    <SmartImage src={c.cover_image} alt={c.name} fallbackSeed={c.slug || c.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/80 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <div>
                        <div className="font-display text-base font-bold text-white line-clamp-1">{c.name}</div>
                        <div className="text-xs text-white/80">{c.sector || 'Uncategorized'} · {c.location || '—'}</div>
                      </div>
                      {c.is_featured && (
                        <FiStar className="h-5 w-5 text-gigar-gold" />
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3 flex flex-wrap gap-1.5 text-[10px]">
                      <span className="rounded-md bg-gigar-red/10 px-2 py-0.5 font-semibold text-gigar-red">
                        {(c.units_installed || 0).toLocaleString()} units
                      </span>
                      {c.year && <span className="rounded-md bg-gigar-navy/5 px-2 py-0.5 text-gigar-navy/70">{c.year}</span>}
                      {c.equipment_category && (
                        <span className="rounded-md bg-gigar-navy/5 px-2 py-0.5 capitalize text-gigar-navy/70">
                          {c.equipment_category.replace(/-/g, ' ')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gigar-navy/70 line-clamp-2">
                      {c.project_name || (c.description?.replace(/<[^>]+>/g, '').slice(0, 100))}
                    </p>
                    <div className="mt-3 flex items-center gap-1">
                      <button onClick={() => startEdit(c)} className="flex items-center gap-1.5 rounded-lg bg-gigar-navy/5 px-3 py-1.5 text-xs font-semibold text-gigar-navy hover:bg-gigar-red hover:text-white transition">
                        <FiEdit3 className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button onClick={() => toggleFeatured(c)} className="flex items-center gap-1.5 rounded-lg bg-gigar-navy/5 px-3 py-1.5 text-xs font-semibold text-gigar-navy hover:bg-gigar-gold hover:text-gigar-navy transition">
                        <FiStar className="h-3.5 w-3.5" /> {c.is_featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button onClick={() => setConfirm(c)} className="flex items-center gap-1.5 rounded-lg bg-gigar-navy/5 px-3 py-1.5 text-xs font-semibold text-gigar-navy hover:bg-red-600 hover:text-white transition ml-auto">
                        <FiTrash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Edit / New form */
        <div className="card-soft p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-gigar-navy">
                {editing === 'new' ? 'Add new customer' : 'Edit customer'}
              </h3>
              <p className="text-sm text-gigar-navy/70">Fields marked with <span className="text-gigar-red">*</span> are required.</p>
            </div>
            <button onClick={cancel} className="flex h-9 w-9 items-center justify-center rounded-full bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-navy/10">
              <FiX />
            </button>
          </div>

          <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
            {/* Left — main content */}
            <div className="space-y-4 lg:col-span-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Customer name <span className="text-gigar-red">*</span></label>
                <input className="input-field" value={form.name} onChange={set('name')} placeholder="e.g. Hilton Addis Ababa" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Sector</label>
                  <input className="input-field" value={form.sector} onChange={set('sector')} placeholder="Hotel / Hospital / Workshop…" list="sector-list" />
                  <datalist id="sector-list">
                    <option value="Hotel" /><option value="Hospital" /><option value="Workshop" />
                    <option value="Government" /><option value="Real Estate" /><option value="Industrial" />
                  </datalist>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Location</label>
                  <input className="input-field" value={form.location} onChange={set('location')} placeholder="e.g. Addis Ababa" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Project name</label>
                <input className="input-field" value={form.project_name} onChange={set('project_name')} placeholder="e.g. Full VRF cooling + 14 elevators for the new tower wing" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Description (HTML allowed)</label>
                <textarea rows="6" className="input-field font-mono text-sm" value={form.description} onChange={set('description')} placeholder="<p>What was delivered, scope, outcome…</p>" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Testimonial</label>
                <textarea rows="3" className="input-field" value={form.testimonial} onChange={set('testimonial')} placeholder="A short quote from the customer about their experience with Gigar" />
                <input className="input-field mt-2" value={form.testimonial_author} onChange={set('testimonial_author')} placeholder="Testimonial author (e.g. Dawit Bekele, Facilities Manager)" />
              </div>
            </div>

            {/* Right — sidebar */}
            <div className="space-y-5">
              {/* Cover image upload */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Cover image</label>
                <div
                  onClick={() => coverInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) uploadFile(f, 'cover_image') }}
                  className="relative h-36 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gigar-navy/15 bg-gigar-mist transition hover:border-gigar-red hover:bg-gigar-red/5"
                >
                  {form.cover_image ? (
                    <SmartImage src={form.cover_image} alt="cover" className="h-full w-full object-cover" />
                  ) : uploading ? (
                    <div className="flex h-full items-center justify-center"><FiLoader className="h-6 w-6 animate-spin text-gigar-red" /></div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                      <FiImage className="h-8 w-8 text-gigar-red" />
                      <span className="mt-1 text-xs font-semibold text-gigar-navy">Click or drag a cover image</span>
                    </div>
                  )}
                </div>
                <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => uploadFile(e.target.files?.[0], 'cover_image')} />
                <input className="input-field mt-2" value={form.cover_image} onChange={set('cover_image')} placeholder="or paste URL" />
              </div>

              {/* Logo upload */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Logo (square)</label>
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => logoInputRef.current?.click()}
                    className="flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gigar-navy/15 bg-gigar-mist transition hover:border-gigar-red"
                  >
                    {form.logo_url ? (
                      <SmartImage src={form.logo_url} alt="logo" className="h-full w-full object-contain p-1" />
                    ) : (
                      <FiImage className="h-6 w-6 text-gigar-red/50" />
                    )}
                  </div>
                  <input className="input-field flex-1" value={form.logo_url} onChange={set('logo_url')} placeholder="paste logo URL" />
                </div>
                <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => uploadFile(e.target.files?.[0], 'logo_url')} />
              </div>

              {/* Category + units + year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Equipment category</label>
                  <select className="input-field" value={form.equipment_category} onChange={set('equipment_category')}>
                    <option value="">— none —</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Units installed</label>
                  <input type="number" min="0" className="input-field" value={form.units_installed} onChange={set('units_installed')} />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Year</label>
                <input type="number" min="1985" max="2099" className="input-field" value={form.year} onChange={set('year')} placeholder="e.g. 2024" />
              </div>

              {/* Toggles */}
              <label className="flex items-center gap-3 rounded-xl bg-gigar-gold/10 p-3 text-sm font-semibold text-gigar-navy cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={set('is_featured')} className="h-4 w-4 accent-gigar-gold" />
                <FiStar className="h-4 w-4 text-gigar-gold" /> Feature on homepage
              </label>
              <label className="flex items-center gap-3 rounded-xl bg-gigar-mist p-3 text-sm font-semibold text-gigar-navy cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={set('is_active')} className="h-4 w-4 accent-gigar-red" />
                Active (visible on the website)
              </label>

              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  <FiSave /> {saving ? 'Saving…' : 'Save'}
                </button>
                <button type="button" onClick={cancel} className="btn-outline">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Delete confirm */}
      <AnimatePresence>
        {confirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setConfirm(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gigar-navy/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <h3 className="font-display text-xl font-bold text-gigar-navy">Delete this customer?</h3>
              <p className="mt-2 text-sm text-gigar-navy/70">
                You're about to permanently delete <strong className="text-gigar-navy">"{confirm.name}"</strong>. This cannot be undone.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setConfirm(null)} className="btn-outline">Cancel</button>
                <button onClick={() => destroy(confirm)} className="btn-primary !bg-red-600 hover:!bg-red-700">
                  <FiTrash2 /> Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  )
}

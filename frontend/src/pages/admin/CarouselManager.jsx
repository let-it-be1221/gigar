import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPlus, FiEdit3, FiTrash2, FiEye, FiEyeOff, FiUpload,
  FiX, FiImage, FiVideo, FiSave, FiLoader,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import AdminShell from '../../components/AdminShell'
import Loader from '../../components/Loader'
import { adminApi } from '../../api/client'

const EMPTY = {
  title: '', subtitle: '', image_url: '', video_url: '',
  cta_text: 'Learn more', cta_link: '/services',
  badge: '', category: '', is_active: true, sort_order: 0,
}

export default function AdminCarouselManager() {
  const [slides, setSlides]           = useState([])
  const [loading, setLoading]         = useState(true)
  const [editing, setEditing]         = useState(null) // null = list, slide object = edit, 'new' = new
  const [form, setForm]               = useState(EMPTY)
  const [saving, setSaving]           = useState(false)
  const [uploading, setUploading]     = useState(false)
  const [confirm, setConfirm]         = useState(null)
  const fileInputRef = useRef(null)
  const videoInputRef = useRef(null)

  const fetch = () => {
    setLoading(true)
    adminApi.listCarousel()
      .then(({ data }) => setSlides(data.data || []))
      .catch(() => toast.error('Could not load carousel'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  const startNew = () => {
    setForm(EMPTY)
    setEditing('new')
  }
  const startEdit = (s) => {
    setForm({ ...EMPTY, ...s })
    setEditing(s)
  }
  const cancel = () => { setEditing(null); setForm(EMPTY) }

  const uploadFile = async (file, target = 'image_url') => {
    if (!file) return
    setUploading(true)
    try {
      const { data } = await adminApi.uploadMedia(file)
      setForm((f) => ({ ...f, [target]: data.url }))
      toast.success(target === 'video_url' ? 'Video uploaded' : 'Image uploaded')
    } catch (err) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const submit = async (e) => {
    e?.preventDefault?.()
    if (!form.title?.trim() || !form.image_url?.trim()) {
      toast.error('Title and image are required')
      return
    }
    setSaving(true)
    try {
      if (editing === 'new') {
        const { data } = await adminApi.createCarouselSlide(form)
        toast.success('Slide created')
        setSlides((s) => [data.slide, ...s])
      } else {
        const { data } = await adminApi.updateCarouselSlide(editing.id, form)
        toast.success('Slide updated')
        setSlides((s) => s.map((x) => x.id === editing.id ? data.slide : x))
      }
      cancel()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (s) => {
    try {
      const { data } = await adminApi.toggleCarouselSlide(s.id)
      setSlides((sl) => sl.map((x) => x.id === s.id ? { ...x, is_active: data.is_active } : x))
      toast.success(data.is_active ? 'Slide activated' : 'Slide deactivated')
    } catch {
      toast.error('Could not toggle slide')
    }
  }

  const destroy = async (s) => {
    try {
      await adminApi.deleteCarouselSlide(s.id)
      setSlides((sl) => sl.filter((x) => x.id !== s.id))
      toast.success('Slide deleted')
    } catch {
      toast.error('Delete failed')
    } finally {
      setConfirm(null)
    }
  }

  const set = (k) => (e) => {
    const v = e?.target?.type === 'checkbox' ? e.target.checked : e?.target?.value ?? e
    setForm((f) => ({ ...f, [k]: v }))
  }

  if (loading) return <AdminShell title="Carousel Slides"><Loader fullscreen label="Loading slides…" /></AdminShell>

  return (
    <AdminShell
      title="Carousel Slides"
      subtitle="Manage the rotating slides shown on the homepage hero."
      action={
        editing === null && (
          <button onClick={startNew} className="btn-primary">
            <FiPlus /> New Slide
          </button>
        )
      }
    >
      {editing === null ? (
        // List view
        slides.length === 0 ? (
          <div className="card-soft p-12 text-center">
            <FiImage className="mx-auto h-16 w-16 text-gigar-navy/30" />
            <h3 className="mt-4 font-display text-xl font-bold text-gigar-navy">No carousel slides yet</h3>
            <p className="mt-2 text-gigar-navy/60">Create your first slide to make the homepage hero come alive.</p>
            <button onClick={startNew} className="mt-6 btn-primary"><FiPlus /> New Slide</button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {slides.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`card-soft overflow-hidden ${!s.is_active ? 'opacity-60' : ''}`}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={s.image_url} alt={s.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      {s.badge && (
                        <span className="chip !bg-gigar-gold/30 !text-gigar-gold">{s.badge}</span>
                      )}
                      <h3 className="mt-1 font-display text-lg font-bold text-white line-clamp-1">{s.title}</h3>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      s.is_active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {s.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gigar-navy/70 line-clamp-2">{s.subtitle}</p>
                  <div className="mt-2 text-xs text-gigar-navy/50">
                    Order: <strong>{s.sort_order}</strong> · {s.category || 'Uncategorized'}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button onClick={() => startEdit(s)} className="flex items-center gap-1.5 rounded-lg bg-gigar-navy/5 px-3 py-1.5 text-xs font-semibold text-gigar-navy hover:bg-gigar-red hover:text-white transition">
                      <FiEdit3 className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button onClick={() => toggleActive(s)} className="flex items-center gap-1.5 rounded-lg bg-gigar-navy/5 px-3 py-1.5 text-xs font-semibold text-gigar-navy hover:bg-gigar-gold hover:text-gigar-navy transition">
                      {s.is_active ? <FiEyeOff className="h-3.5 w-3.5" /> : <FiEye className="h-3.5 w-3.5" />}
                      {s.is_active ? 'Hide' : 'Show'}
                    </button>
                    <button onClick={() => setConfirm(s)} className="flex items-center gap-1.5 rounded-lg bg-gigar-navy/5 px-3 py-1.5 text-xs font-semibold text-gigar-navy hover:bg-red-600 hover:text-white transition ml-auto">
                      <FiTrash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )
      ) : (
        // Edit / New form
        <div className="card-soft p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-gigar-navy">
                {editing === 'new' ? 'Create new slide' : 'Edit slide'}
              </h3>
              <p className="text-sm text-gigar-navy/70">Fill in the slide details below. Title and image are required.</p>
            </div>
            <button onClick={cancel} className="flex h-9 w-9 items-center justify-center rounded-full bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-navy/10">
              <FiX />
            </button>
          </div>

          <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
            {/* Image upload + preview */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Slide image *</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) uploadFile(f) }}
                  className="relative h-48 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gigar-navy/15 bg-gigar-mist transition hover:border-gigar-red hover:bg-gigar-red/5"
                >
                  {form.image_url ? (
                    <img src={form.image_url} alt="preview" className="h-full w-full object-cover" />
                  ) : uploading ? (
                    <div className="flex h-full items-center justify-center">
                      <FiLoader className="h-8 w-8 animate-spin text-gigar-red" />
                    </div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                      <FiUpload className="h-10 w-10 text-gigar-red" />
                      <span className="mt-2 text-sm font-semibold text-gigar-navy">Click to upload or drag an image</span>
                      <span className="text-xs text-gigar-navy/60">JPG / PNG / WebP · landscape orientation works best</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => uploadFile(e.target.files?.[0])}
                />
                <input
                  className="input-field mt-2"
                  value={form.image_url} onChange={set('image_url')}
                  placeholder="Or paste image URL here…"
                />
              </div>

              {/* Video upload (optional) — if set, the carousel slide will play
                  this video as its background instead of the still image.
                  The image_url above becomes the video's poster frame. */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">
                  Background video <span className="font-normal text-gigar-navy/50">(optional — overrides the image)</span>
                </label>
                <div
                  onClick={() => videoInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) uploadFile(f, 'video_url') }}
                  className="relative h-32 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gigar-navy/15 bg-gigar-mist transition hover:border-gigar-red hover:bg-gigar-red/5"
                >
                  {form.video_url ? (
                    <div className="flex h-full items-center justify-center gap-3 px-4">
                      <FiVideo className="h-8 w-8 text-gigar-red" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-gigar-navy">{form.video_url.split('/').pop()}</div>
                        <div className="text-xs text-gigar-navy/60">Video set — will play as the slide background</div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setForm((f) => ({ ...f, video_url: '' })) }}
                        className="rounded-full bg-gigar-navy/10 p-1.5 text-gigar-navy hover:bg-red-600 hover:text-white"
                        title="Remove video"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  ) : uploading ? (
                    <div className="flex h-full items-center justify-center">
                      <FiLoader className="h-6 w-6 animate-spin text-gigar-red" />
                    </div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                      <FiVideo className="h-8 w-8 text-gigar-red" />
                      <span className="mt-1 text-sm font-semibold text-gigar-navy">Click to upload or drag a video</span>
                      <span className="text-xs text-gigar-navy/60">MP4 / WebM · landscape · max 50MB</span>
                    </div>
                  )}
                </div>
                <input
                  ref={videoInputRef} type="file" accept="video/*" className="hidden"
                  onChange={(e) => uploadFile(e.target.files?.[0], 'video_url')}
                />
                <input
                  className="input-field mt-2"
                  value={form.video_url} onChange={set('video_url')}
                  placeholder="Or paste video URL here…"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Title *</label>
                <input className="input-field" value={form.title} onChange={set('title')} placeholder="e.g. Building Elevators & Escalators" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Subtitle</label>
                <textarea rows="2" className="input-field" value={form.subtitle} onChange={set('subtitle')} placeholder="Short description shown beneath the title" />
              </div>
            </div>

            {/* Meta sidebar */}
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Badge</label>
                <input className="input-field" value={form.badge} onChange={set('badge')} placeholder="e.g. Featured Product" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Category</label>
                <input className="input-field" value={form.category} onChange={set('category')} placeholder="e.g. Elevators, Lifts, Paint Booths" list="cat-list" />
                <datalist id="cat-list">
                  <option value="Elevators" />
                  <option value="Lifts" />
                  <option value="Paint Booths" />
                  <option value="Vehicle Test Equipment" />
                  <option value="Facility Equipment" />
                </datalist>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">CTA text</label>
                  <input className="input-field" value={form.cta_text} onChange={set('cta_text')} placeholder="Learn more" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Sort order</label>
                  <input type="number" className="input-field" value={form.sort_order} onChange={set('sort_order')} placeholder="0" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">CTA link</label>
                <input className="input-field" value={form.cta_link} onChange={set('cta_link')} placeholder="/services or /products" />
              </div>
              <label className="flex items-center gap-3 rounded-xl bg-gigar-mist p-3 text-sm font-semibold text-gigar-navy cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={set('is_active')} className="h-4 w-4 accent-gigar-red" />
                <FiEye className="h-4 w-4 text-gigar-red" /> Active (visible on homepage)
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
              <h3 className="font-display text-xl font-bold text-gigar-navy">Delete this slide?</h3>
              <p className="mt-2 text-sm text-gigar-navy/70">
                You're about to delete <strong className="text-gigar-navy">"{confirm.title}"</strong>. This cannot be undone.
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

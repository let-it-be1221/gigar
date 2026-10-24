import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiSave, FiUpload, FiTrash2, FiEye, FiStar, FiX, FiImage,
  FiVideo, FiYoutube, FiLoader,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import AdminShell from '../../components/AdminShell'
import Loader from '../../components/Loader'
import { adminApi } from '../../api/client'

const EMPTY = {
  title: '', slug: '', excerpt: '', description: '',
  media_type: 'image', media_url: '', media_poster: '',
  category: '', tags: [], is_featured: false,
  status: 'draft', published_at: '',
}

export default function AdminPostEditor() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [form, setForm]           = useState(EMPTY)
  const [tagInput, setTagInput]   = useState('')
  const [loading, setLoading]     = useState(isEdit)
  const [saving, setSaving]       = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview]     = useState(false)

  useEffect(() => {
    if (!isEdit) return
    setLoading(true)
    adminApi.getPost(id)
      .then(({ data }) => {
        setForm({
          ...EMPTY,
          ...data,
          tags: data.tags || [],
          published_at: data.published_at ? data.published_at.slice(0, 16) : '',
        })
      })
      .catch(() => toast.error('Could not load post'))
      .finally(() => setLoading(false))
  }, [id])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target?.value ?? e }))

  const addTag = (e) => {
    e?.preventDefault?.()
    const t = tagInput.trim().replace(/^#/, '')
    if (t && !form.tags.includes(t)) {
      setForm((f) => ({ ...f, tags: [...f.tags, t] }))
    }
    setTagInput('')
  }

  const removeTag = (t) => setForm((f) => ({ ...f, tags: f.tags.filter((x) => x !== t) }))

  const uploadFile = async (file) => {
    if (!file) return
    setUploading(true)
    try {
      const { data } = await adminApi.uploadMedia(file)
      setForm((f) => ({
        ...f,
        media_url: data.path,
        media_type: data.type === 'video' ? 'video' : 'image',
      }))
      toast.success('File uploaded — auto-linked to post')
    } catch (err) {
      toast.error('Upload failed: ' + (err?.response?.data?.message || 'unknown error'))
    } finally {
      setUploading(false)
    }
  }

  const onPickFile = (e) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
    e.target.value = ''
  }

  const submit = async (publishNow = false) => {
    if (!form.title?.trim() || !form.description?.trim()) {
      toast.error('Title and description are required')
      return
    }
    setSaving(true)
    const payload = { ...form, status: publishNow ? 'published' : form.status }
    if (publishNow && !payload.published_at) {
      payload.published_at = new Date().toISOString()
    }
    try {
      if (isEdit) {
        await adminApi.updatePost(id, payload)
        toast.success('Post updated')
      } else {
        await adminApi.createPost(payload)
        toast.success('Post created')
        navigate('/admin/posts')
        return
      }
    } catch (err) {
      toast.error('Save failed: ' + (err?.response?.data?.message || 'check fields'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AdminShell><Loader fullscreen label="Loading editor…" /></AdminShell>

  return (
    <AdminShell
      title={isEdit ? 'Edit Post' : 'New Post'}
      subtitle={isEdit ? 'Update the article and save your changes.' : 'Compose a new blog article for the website.'}
      action={
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setPreview((v) => !v)} className="btn-outline">
            <FiEye /> {preview ? 'Close preview' : 'Preview'}
          </button>
          <button onClick={() => submit(false)} disabled={saving} className="btn-outline">
            <FiSave /> Save {isEdit ? 'changes' : 'draft'}
          </button>
          <button onClick={() => submit(true)} disabled={saving} className="btn-primary">
            <FiStar /> {saving ? 'Saving…' : 'Publish'}
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Title + slug */}
          <div className="card-soft p-6">
            <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Title <span className="text-gigar-red">*</span></label>
            <input
              className="input-field text-lg font-semibold"
              value={form.title} onChange={set('title')}
              placeholder="e.g. Gigar Trading Launches Next-Generation BendPak Car Lifts…"
            />
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Slug</label>
              <input
                className="input-field" value={form.slug} onChange={set('slug')}
                placeholder="auto-generated if left empty"
              />
            </div>
          </div>

          {/* Media */}
          <div className="card-soft p-6">
            <h3 className="font-display text-lg font-bold text-gigar-navy">Cover media</h3>
            <p className="mt-1 text-sm text-gigar-navy/70">Upload an image or video, or paste an external URL (e.g. YouTube embed).</p>

            {/* Media type tabs */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { v: 'image',   label: 'Image',   icon: FiImage },
                { v: 'video',   label: 'Video',   icon: FiVideo },
                { v: 'youtube', label: 'YouTube', icon: FiYoutube },
                { v: 'none',    label: 'None',    icon: FiX },
              ].map((opt) => (
                <button
                  key={opt.v}
                  onClick={() => setForm((f) => ({ ...f, media_type: opt.v }))}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    form.media_type === opt.v ? 'bg-gigar-red text-white shadow-gigar-glow' : 'bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-navy/10'
                  }`}
                >
                  <opt.icon className="h-3.5 w-3.5" /> {opt.label}
                </button>
              ))}
            </div>

            {/* Upload zone */}
            {(form.media_type === 'image' || form.media_type === 'video') && (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) uploadFile(f) }}
                className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gigar-navy/15 bg-gigar-mist p-8 text-center transition hover:border-gigar-red hover:bg-gigar-red/5"
              >
                {uploading ? (
                  <><FiLoader className="h-8 w-8 animate-spin text-gigar-red" /><span className="mt-2 text-sm font-semibold text-gigar-navy">Uploading…</span></>
                ) : (
                  <>
                    <FiUpload className="h-10 w-10 text-gigar-red" />
                    <span className="mt-2 text-sm font-semibold text-gigar-navy">Click to upload or drag a file here</span>
                    <span className="text-xs text-gigar-navy/60">Images: JPG/PNG/WebP · Videos: MP4/WebM · max 50MB</span>
                  </>
                )}
                <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={onPickFile} />
              </div>
            )}

            {/* URL field */}
            {form.media_type !== 'none' && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Media URL</label>
                  <input
                    className="input-field" value={form.media_url} onChange={set('media_url')}
                    placeholder={form.media_type === 'youtube' ? 'https://www.youtube.com/embed/VIDEO_ID' : 'storage path or external URL'}
                  />
                </div>
                {form.media_type === 'video' && (
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Poster image URL</label>
                    <input className="input-field" value={form.media_poster} onChange={set('media_poster')} placeholder="Optional poster" />
                  </div>
                )}
              </div>
            )}

            {/* Preview */}
            {form.media_url && form.media_type !== 'none' && (
              <div className="mt-4 overflow-hidden rounded-xl border border-gigar-navy/10">
                {form.media_type === 'youtube' ? (
                  <div className="aspect-video">
                    <iframe src={form.media_url} className="h-full w-full" title="Preview" />
                  </div>
                ) : form.media_type === 'video' ? (
                  <video src={form.media_url.startsWith('http') ? form.media_url : `${import.meta.env.VITE_PUBLIC_BASE_URL || 'http://localhost:8000'}/storage/${form.media_url}`} controls poster={form.media_poster} className="aspect-video w-full object-cover" />
                ) : (
                  <img
                    src={form.media_url.startsWith('http') ? form.media_url : `${import.meta.env.VITE_PUBLIC_BASE_URL || 'http://localhost:8000'}/storage/${form.media_url}`}
                    alt="preview" className="aspect-video w-full object-cover"
                  />
                )}
              </div>
            )}
          </div>

          {/* Description (rich text via textarea with simple HTML hint) */}
          <div className="card-soft p-6">
            <label className="mb-1.5 block text-sm font-semibold text-gigar-navy">Article body <span className="text-gigar-red">*</span></label>
            <p className="mb-3 text-xs text-gigar-navy/60">You can use basic HTML tags: &lt;p&gt;, &lt;h3&gt;, &lt;strong&gt;, &lt;ul&gt;&lt;li&gt;, &lt;a&gt;…</p>
            <textarea
              rows="14"
              className="input-field font-mono text-sm"
              value={form.description} onChange={set('description')}
              placeholder="<p>Start writing your article…</p>"
            />
            <div className="mt-2 text-xs text-gigar-navy/50">{form.description.length} characters</div>
          </div>
        </div>

        {/* Right — meta sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="card-soft p-5">
            <h3 className="font-display text-base font-bold text-gigar-navy">Status</h3>
            <div className="mt-3 space-y-3">
              <label className="block text-sm font-semibold text-gigar-navy">Publish state</label>
              <select className="input-field" value={form.status} onChange={set('status')}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              <label className="block text-sm font-semibold text-gigar-navy">Publish date</label>
              <input
                type="datetime-local"
                className="input-field"
                value={form.published_at} onChange={set('published_at')}
              />
              <label className="flex items-center gap-3 rounded-xl bg-gigar-gold/10 p-3 text-sm font-semibold text-gigar-navy cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))} className="h-4 w-4 accent-gigar-gold" />
                <FiStar className="h-4 w-4 text-gigar-gold" />
                Feature on homepage
              </label>
            </div>
          </div>

          {/* Category */}
          <div className="card-soft p-5">
            <h3 className="font-display text-base font-bold text-gigar-navy">Category</h3>
            <input
              className="input-field mt-3"
              value={form.category} onChange={set('category')}
              placeholder="e.g. Products, Projects, Safety, Guides…"
              list="cat-suggestions"
            />
            <datalist id="cat-suggestions">
              <option value="Products" />
              <option value="Projects" />
              <option value="Safety" />
              <option value="Guides" />
              <option value="Accessibility" />
            </datalist>
          </div>

          {/* Tags */}
          <div className="card-soft p-5">
            <h3 className="font-display text-base font-bold text-gigar-navy">Tags</h3>
            <form onSubmit={addTag} className="mt-3 flex gap-2">
              <input
                className="input-field !py-2"
                value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag…"
              />
              <button type="submit" className="btn-primary !px-4 !py-2">Add</button>
            </form>
            {form.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {form.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full bg-gigar-navy/5 px-2.5 py-1 text-xs font-medium text-gigar-navy">
                    #{t}
                    <button onClick={() => removeTag(t)} className="text-gigar-navy/40 hover:text-gigar-red">
                      <FiX className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="card-soft p-5">
            <h3 className="font-display text-base font-bold text-gigar-navy">Excerpt</h3>
            <p className="mt-1 text-xs text-gigar-navy/60">Short summary shown on blog cards (max 200 chars).</p>
            <textarea
              rows="3" maxLength="500"
              className="input-field mt-3"
              value={form.excerpt} onChange={set('excerpt')}
              placeholder="Short teaser for the blog listing…"
            />
          </div>
        </div>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPreview(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gigar-navy/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white p-6 sm:p-10"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-extrabold text-gigar-navy">{form.title || 'Untitled post'}</h2>
                <button onClick={() => setPreview(false)} className="rounded-full bg-gigar-navy/5 p-2 hover:bg-gigar-navy/10">
                  <FiX />
                </button>
              </div>
              {form.excerpt && <p className="mt-2 text-gigar-navy/70">{form.excerpt}</p>}
              <div className="mt-6 markdown-body" dangerouslySetInnerHTML={{ __html: form.description }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  )
}

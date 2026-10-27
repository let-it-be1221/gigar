import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit3, FiTrash2, FiStar, FiSearch, FiInbox } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AdminShell from '../../components/AdminShell'
import Loader from '../../components/Loader'
import { adminApi } from '../../api/client'
import { formatDate } from '../../utils/format'

export default function AdminPostList() {
  const [posts, setPosts]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [confirm, setConfirm] = useState(null)

  const fetch = () => {
    setLoading(true)
    const params = {}
    if (filter !== 'all') params.status = filter
    adminApi.listPosts(params)
      .then(({ data }) => setPosts(data.data || []))
      .catch(() => toast.error('Failed to load posts'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [filter])

  const toggleFeature = async (post) => {
    try {
      const { data } = await adminApi.toggleFeature(post.id)
      setPosts((p) => p.map((x) => x.id === post.id ? { ...x, is_featured: data.is_featured } : x))
      toast.success(data.is_featured ? 'Post marked as featured' : 'Post unfeatured')
    } catch {
      toast.error('Could not update post')
    }
  }

  const destroy = async (post) => {
    try {
      await adminApi.deletePost(post.id)
      setPosts((p) => p.filter((x) => x.id !== post.id))
      toast.success('Post deleted')
    } catch {
      toast.error('Delete failed')
    } finally {
      setConfirm(null)
    }
  }

  const filtered = posts.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminShell
      title="Manage Posts"
      subtitle="Create, edit, feature or delete blog articles."
      action={
        <Link to="/admin/posts/new" className="btn-primary">
          <FiPlus /> New Post
        </Link>
      }
    >
      {/* Filter bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gigar-navy/40" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by title…"
            className="input-field !rounded-full !py-2 pl-10"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'published', 'draft', 'archived'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
                filter === f ? 'bg-gigar-red text-white' : 'bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-navy/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader fullscreen label="Loading posts…" />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FiInbox className="h-16 w-16 text-gigar-navy/30" />
          <h3 className="mt-4 font-display text-xl font-bold text-gigar-navy">No posts found</h3>
          <p className="mt-2 text-gigar-navy/60">Create your first post to see it here.</p>
          <Link to="/admin/posts/new" className="mt-6 btn-primary"><FiPlus /> New Post</Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-gigar-soft">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gigar-navy/10">
              <thead className="bg-gigar-mist">
                <tr>
                  {['Title', 'Status', 'Category', 'Date', 'Featured', 'Actions'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gigar-navy/70">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gigar-navy/10">
                {filtered.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    whileHover={{ backgroundColor: 'rgba(200,16,46,0.03)' }}
                  >
                    <td className="px-5 py-4">
                      <Link to={`/admin/posts/${p.id}/edit`} className="font-semibold text-gigar-navy hover:text-gigar-red line-clamp-1">
                        {p.title}
                      </Link>
                      <div className="text-xs text-gigar-navy/60 line-clamp-1">{p.excerpt || ''}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'published' ? 'bg-green-100 text-green-700' :
                        p.status === 'draft' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gigar-navy/70">{p.category || '—'}</td>
                    <td className="px-5 py-4 text-sm text-gigar-navy/70">{formatDate(p.created_at)}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleFeature(p)}
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                          p.is_featured ? 'bg-gigar-gold text-gigar-navy' : 'bg-gigar-navy/5 text-gigar-navy/40 hover:bg-gigar-navy/10'
                        }`}
                        title="Toggle featured"
                      >
                        <FiStar className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link
                          to={`/admin/posts/${p.id}/edit`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-red hover:text-white transition"
                          title="Edit"
                        >
                          <FiEdit3 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setConfirm(p)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gigar-navy/5 text-gigar-navy hover:bg-red-600 hover:text-white transition"
                          title="Delete"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      <AnimatePresence>
        {confirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gigar-navy/60 backdrop-blur-sm"
            onClick={() => setConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <h3 className="font-display text-xl font-bold text-gigar-navy">Delete this post?</h3>
              <p className="mt-2 text-sm text-gigar-navy/70">
                You're about to permanently delete <strong className="text-gigar-navy">"{confirm.title}"</strong>. This action cannot be undone.
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

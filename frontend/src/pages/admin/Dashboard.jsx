import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiFileText, FiEdit3, FiPlus, FiStar, FiTrendingUp,
  FiCheckCircle, FiClock, FiArrowRight, FiGrid,
} from 'react-icons/fi'
import AdminShell from '../../components/AdminShell'
import Loader from '../../components/Loader'
import { adminApi } from '../../api/client'
import { formatDate } from '../../utils/format'

export default function AdminDashboard() {
  const [stats, setStats]       = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    adminApi.dashboard()
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <AdminShell><Loader fullscreen label="Loading dashboard…" /></AdminShell>

  const cards = [
    { label: 'Total Posts',     value: stats?.total_posts ?? 0,     icon: FiFileText,    color: 'bg-gigar-navy text-white' },
    { label: 'Published',       value: stats?.published_posts ?? 0, icon: FiCheckCircle,  color: 'bg-green-600 text-white' },
    { label: 'Drafts',          value: stats?.draft_posts ?? 0,     icon: FiClock,        color: 'bg-gigar-gold text-gigar-navy' },
    { label: 'Featured',        value: stats?.featured_posts ?? 0, icon: FiStar,         color: 'bg-gigar-red text-white' },
  ]

  return (
    <AdminShell title="Dashboard" subtitle="Welcome back, here's what's happening on your site.">
      {/* Stat cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className={`relative overflow-hidden rounded-2xl p-6 shadow-gigar-soft ${c.color}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-70">{c.label}</div>
                <div className="mt-2 font-display text-4xl font-extrabold">{c.value}</div>
              </div>
              <c.icon className="h-10 w-10 opacity-30" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-gigar-navy to-gigar-red p-6 text-white"
      >
        <div>
          <h3 className="font-display text-xl font-extrabold">Ready to publish?</h3>
          <p className="mt-1 text-sm text-white/80">Create a new blog post with images or video in just a few clicks.</p>
        </div>
        <Link to="/admin/posts/new" className="btn-primary !bg-white !text-gigar-red hover:!bg-gigar-gold hover:!text-gigar-navy">
          <FiPlus /> New Post
        </Link>
      </motion.div>

      {/* Recent posts */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-gigar-navy">Recent posts</h3>
            <Link to="/admin/posts" className="inline-flex items-center gap-1 text-sm font-semibold text-gigar-red hover:gap-2 transition-all">
              View all <FiArrowRight />
            </Link>
          </div>
          <div className="space-y-3">
            {stats?.recent_posts?.length > 0 ? (
              stats.recent_posts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="card-soft flex items-center justify-between p-4 hover:border-gigar-red/30"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold ${
                      p.status === 'published' ? 'bg-green-100 text-green-700' :
                      p.status === 'draft' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {p.status === 'published' ? <FiCheckCircle /> : <FiEdit3 />}
                    </div>
                    <div>
                      <Link to={`/admin/posts/${p.id}/edit`} className="font-semibold text-gigar-navy hover:text-gigar-red line-clamp-1">
                        {p.title}
                      </Link>
                      <div className="text-xs text-gigar-navy/60">{formatDate(p.created_at)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.is_featured && <FiStar className="h-4 w-4 text-gigar-gold" />}
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'published' ? 'bg-green-100 text-green-700' :
                      p.status === 'draft' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="card-soft p-8 text-center text-gigar-navy/60">
                No posts yet — create your first post!
              </div>
            )}
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-6">
          <div className="card-soft p-6">
            <h4 className="font-display text-base font-bold text-gigar-navy">Quick actions</h4>
            <div className="mt-4 space-y-2">
              {[
                { label: 'New post',         to: '/admin/posts/new', icon: FiPlus },
                { label: 'All posts',        to: '/admin/posts',     icon: FiGrid },
                { label: 'View site',        to: '/',                icon: FiTrendingUp, external: true },
              ].map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  className="flex items-center justify-between rounded-xl bg-gigar-navy/5 px-4 py-3 text-sm font-medium text-gigar-navy transition hover:bg-gigar-navy/10 hover:translate-x-1"
                >
                  <span className="flex items-center gap-2"><a.icon className="h-4 w-4 text-gigar-red" /> {a.label}</span>
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="card-soft p-6">
            <h4 className="font-display text-base font-bold text-gigar-navy">Tips &amp; best practices</h4>
            <ul className="mt-3 space-y-2 text-sm text-gigar-navy/70">
              <li>• Add a clear, descriptive title (60–90 chars).</li>
              <li>• Always include a high-quality cover image (1200×800 or larger).</li>
              <li>• Write a short excerpt (140–200 chars) for previews.</li>
              <li>• Tag and categorize posts to help readers find content.</li>
              <li>• Mark important posts as “Featured” to surface them on the homepage.</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}

import { useEffect, useState, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiFilter, FiX, FiTag, FiInbox } from 'react-icons/fi'
import BlogCard from '../components/BlogCard'
import Loader from '../components/Loader'
import { publicApi } from '../api/client'

export default function Blog() {
  const [params, setParams] = useSearchParams()
  const [posts, setPosts]       = useState([])
  const [meta, setMeta]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('category') || '')
  const [categories, setCategories] = useState([])
  const abortRef = useRef(null)

  const fetchPosts = async () => {
    // Abort any in-flight request so we don't show stale results when
    // a newer request overtakes it.
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    try {
      const payload = { page: params.get('page') || 1, per_page: 9 }
      if (params.get('q')) payload.q = params.get('q')
      if (params.get('category')) payload.category = params.get('category')
      const { data } = await publicApi.posts(payload, { signal: controller.signal })
      setPosts(data.data || [])
      setMeta({ current_page: data.current_page, last_page: data.last_page, total: data.total, per_page: data.per_page })
    } catch (err) {
      // AbortError is expected when a newer request supersedes this one —
      // don't clear posts or show error in that case.
      if (err?.name !== 'CanceledError' && err?.code !== 'ERR_CANCELED') {
        setPosts([])
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }

  useEffect(() => {
    publicApi.stats()
      .then(({ data }) => setCategories(data.categories || []))
      .catch(() => setCategories([]))
  }, [])

  // Debounce: when `params` changes (e.g., user types in the search box),
  // wait 300ms before firing the request. This collapses rapid keystrokes
  // into a single API call.
  useEffect(() => {
    const t = setTimeout(fetchPosts, 300)
    return () => clearTimeout(t)
  }, [params])

  const submitSearch = (e) => {
    e.preventDefault()
    const next = new URLSearchParams(params)
    if (search) next.set('q', search); else next.delete('q')
    next.delete('page')
    setParams(next)
  }

  const setCat = (cat) => {
    const next = new URLSearchParams(params)
    if (cat) next.set('category', cat); else next.delete('category')
    next.delete('page')
    setParams(next)
    setCategory(cat)
  }

  const goPage = (n) => {
    const next = new URLSearchParams(params)
    next.set('page', n)
    setParams(next)
  }

  return (
    <>
      {/* Hero header */}
      <section className="relative isolate overflow-hidden bg-gigar-navy py-16 text-white lg:py-20">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-gigar-navy via-gigar-navy/85 to-gigar-red/70" />
        </div>
        <div className="container-page relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20">
              News & Blog
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
              News, projects & technical insights
            </h1>
            <p className="mt-3 max-w-2xl text-white/80">
              Product launches, installation walkthroughs and technical guides from the Gigar Trading team in Addis Ababa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-gigar-navy/10 bg-white py-6">
        <div className="container-page">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <form onSubmit={submitSearch} className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gigar-navy/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="input-field !rounded-full pl-11 pr-12"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => { setSearch(''); setParams(new URLSearchParams()) }}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gigar-navy/40 hover:text-gigar-red"
                >
                  <FiX />
                </button>
              )}
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gigar-red px-3 py-1.5 text-xs font-semibold text-white hover:bg-gigar-redDark">
                Search
              </button>
            </form>

            {/* Category filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <FiFilter className="text-gigar-navy/40" />
                <button
                  onClick={() => setCat('')}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    !category ? 'bg-gigar-red text-white' : 'bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-navy/10'
                  }`}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      category === c ? 'bg-gigar-red text-white' : 'bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-navy/10'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 lg:py-20">
        <div className="container-page">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-80 rounded-2xl shimmer" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FiInbox className="h-16 w-16 text-gigar-navy/30" />
              <h3 className="mt-4 font-display text-xl font-bold text-gigar-navy">No posts found</h3>
              <p className="mt-2 text-gigar-navy/60">Try a different search or category filter.</p>
              <button onClick={() => { setSearch(''); setCat(''); setParams(new URLSearchParams()) }} className="mt-6 btn-outline">
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-gigar-navy/60">
                Showing {posts.length} of {meta?.total || posts.length} posts
              </div>
              <AnimatePresence mode="popLayout">
                <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((p, i) => (
                    <BlogCard key={p.id} post={p} index={i} compact />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {meta && meta.last_page > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  {Array.from({ length: meta.last_page }).map((_, i) => {
                    const n = i + 1
                    return (
                      <button
                        key={n}
                        onClick={() => goPage(n)}
                        className={`h-9 w-9 rounded-full text-sm font-semibold transition ${
                          meta.current_page === n
                            ? 'bg-gigar-red text-white shadow-gigar-glow'
                            : 'bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-navy/10'
                        }`}
                      >
                        {n}
                      </button>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

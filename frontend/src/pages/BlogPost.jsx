import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowLeft, FiClock, FiTag, FiShare2, FiChevronRight,
} from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import Loader from '../components/Loader'
import BlogCard from '../components/BlogCard'
import AnimatedSection from '../components/AnimatedSection'
import { publicApi } from '../api/client'
import { formatDate, getMediaPath } from '../utils/format'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost]           = useState(null)
  const [related, setRelated]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    publicApi.postBySlug(slug)
      .then(({ data }) => {
        setPost(data.post)
        setRelated(data.related || [])
      })
      .catch(() => setError('Post not found or no longer available.'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="py-32"><Loader fullscreen label="Loading article…" /></div>

  if (error || !post) {
    return (
      <div className="container-page py-32 text-center">
        <h2 className="font-display text-3xl font-extrabold text-gigar-navy">{error || 'Post not found'}</h2>
        <Link to="/blog" className="mt-6 inline-block btn-primary">Back to all posts</Link>
      </div>
    )
  }

  const cover = getMediaPath(post.media_url)
  const isYoutube = post.media_type === 'youtube'
  const isVideo = post.media_type === 'video'

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-gigar-mist py-6">
        <div className="container-page flex items-center gap-2 text-sm text-gigar-navy/70">
          <Link to="/" className="hover:text-gigar-red">Home</Link>
          <FiChevronRight className="h-3.5 w-3.5" />
          <Link to="/blog" className="hover:text-gigar-red">Blog</Link>
          <FiChevronRight className="h-3.5 w-3.5" />
          <span className="line-clamp-1 font-medium text-gigar-navy">{post.title}</span>
        </div>
      </section>

      {/* Article header */}
      <section className="py-12 lg:py-16">
        <div className="container-page max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {post.category && (
              <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="chip">
                <FiTag className="h-3 w-3" /> {post.category}
              </Link>
            )}
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-gigar-navy sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && <p className="mt-4 text-lg leading-relaxed text-gigar-navy/70">{post.excerpt}</p>}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-b border-gigar-navy/10 py-4">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Gigar" className="h-10 w-10 rounded-lg shadow-sm" />
                <div>
                  <div className="text-sm font-semibold text-gigar-navy">Gigar Trading Team</div>
                  <div className="flex items-center gap-1 text-xs text-gigar-navy/60">
                    <FiClock className="h-3 w-3" /> {formatDate(post.published_at || post.created_at)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-red hover:text-white transition">
                  <FiShare2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover media */}
      <section className="container-page">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-gigar-glow"
        >
          {isYoutube ? (
            <div className="aspect-video">
              <iframe
                src={post.media_url}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : isVideo ? (
            <video controls poster={getMediaPath(post.media_poster)} className="aspect-video w-full object-cover">
              <source src={cover} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          ) : (
            cover && (
              <motion.img
                src={cover}
                alt={post.title}
                className="aspect-[16/9] w-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            )
          )}
        </motion.div>
      </section>

      {/* Body */}
      <section className="py-12 lg:py-16">
        <div className="container-page max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="markdown-body"
          >
            <div dangerouslySetInnerHTML={{ __html: post.description }} />
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-gigar-navy/10 pt-6">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-gigar-navy/5 px-3 py-1.5 text-xs font-medium text-gigar-navy/70">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-10">
            <Link to="/blog" className="btn-outline">
              <FiArrowLeft /> All posts
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-gigar-mist py-16 lg:py-20">
          <div className="container-page">
            <AnimatedSection className="mb-10 text-center">
              <span className="section-eyebrow">Keep reading</span>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-gigar-navy sm:text-3xl">Related articles</h2>
            </AnimatedSection>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <BlogCard key={p.id} post={p} index={i} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

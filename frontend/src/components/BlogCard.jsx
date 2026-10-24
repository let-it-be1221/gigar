import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiClock, FiTag } from 'react-icons/fi'
import { formatDate, truncate, getMediaPath } from '../utils/format'

export default function BlogCard({ post, index = 0, compact = false }) {
  const cover = getMediaPath(post.media_url)
  const poster = getMediaPath(post.media_poster)
  const isVideo = post.media_type === 'video' || post.media_type === 'youtube'

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-gigar-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-gigar-glow ${
        compact ? '' : 'lg:flex-row'
      }`}
    >
      {/* Cover */}
      <Link
        to={`/blog/${post.slug}`}
        className={`relative block overflow-hidden ${compact ? 'aspect-[16/9]' : 'lg:w-1/2 aspect-[16/10] lg:aspect-auto'}`}
      >
        <motion.img
          src={cover || '/logo.png'}
          alt={post.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gigar-red/90 text-white shadow-lg backdrop-blur transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        )}

        {post.category && (
          <span className="absolute left-3 top-3 chip !bg-gigar-navy/80 !text-white">
            <FiTag className="h-3 w-3" /> {post.category}
          </span>
        )}

        {post.is_featured && (
          <span className="absolute right-3 top-3 rounded-full bg-gigar-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gigar-navy shadow">
            ★ Featured
          </span>
        )}
      </Link>

      {/* Body */}
      <div className={`flex flex-1 flex-col p-6 ${compact ? '' : 'lg:p-8'}`}>
        <div className="mb-3 flex items-center gap-3 text-xs font-medium text-gigar-navy/60">
          <span className="inline-flex items-center gap-1">
            <FiClock className="h-3.5 w-3.5" /> {formatDate(post.published_at || post.created_at)}
          </span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className="font-display text-xl font-bold text-gigar-navy transition-colors hover:text-gigar-red">
            {post.title}
          </h3>
        </Link>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-gigar-navy/70">
          {post.excerpt || truncate(post.description?.replace(/<[^>]+>/g, ''), 160)}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-md bg-gigar-navy/5 px-2 py-1 text-[11px] font-medium text-gigar-navy/70">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gigar-red transition-all hover:gap-2.5"
          >
            Read more <FiArrowRight className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Gigar" className="h-6 w-6 rounded" />
            <span className="text-xs font-medium text-gigar-navy/60">Gigar Team</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

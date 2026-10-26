import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

// All emoji icons removed — UI is now text-driven, no emoji per category.
export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white p-6 shadow-gigar-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-gigar-glow hover:border-gigar-red/30"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gigar-red/10 blur-2xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          {/* Index badge in place of emoji */}
          <div className="flex h-14 min-w-14 items-center justify-center rounded-xl bg-gigar-red/10 px-4">
            <span className="font-display text-lg font-extrabold text-gigar-red">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <span className="rounded-full bg-gigar-navy/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gigar-navy/60">
            Service
          </span>
        </div>

        <h3 className="mt-5 font-display text-lg font-bold text-gigar-navy transition-colors group-hover:text-gigar-red">
          {service.title}
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gigar-red/80">
          {service.tagline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gigar-navy/70">
          {service.description}
        </p>

        <a
          href="/contact"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gigar-navy transition-colors group-hover:text-gigar-red"
        >
          Learn more
          <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.article>
  )
}

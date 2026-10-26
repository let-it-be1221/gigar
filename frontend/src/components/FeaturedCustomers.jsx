import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiUsers, FiCheckCircle, FiMessageSquare } from 'react-icons/fi'
import AnimatedSection from './AnimatedSection'
import SmartImage from './SmartImage'
import Loader from './Loader'
import { publicApi } from '../api/client'

export default function FeaturedCustomers() {
  const [customers, setCustomers] = useState([])
  const [stats, setStats]         = useState({})
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    Promise.all([publicApi.featuredCustomers(), publicApi.customerStats()])
      .then(([c, s]) => {
        setCustomers(c.data || [])
        setStats(s.data.stats || {})
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Total across all categories
  const totals = Object.values(stats).reduce(
    (acc, s) => ({ clients: acc.clients + s.clients, units: acc.units + s.units }),
    { clients: 0, units: 0 },
  )

  if (loading) return (
    <section className="py-16">
      <div className="container-page">
        <div className="flex justify-center"><Loader label="Loading customers…" /></div>
      </div>
    </section>
  )

  if (customers.length === 0) return null

  return (
    <section className="bg-gigar-mist py-20 lg:py-24">
      <div className="container-page">
        <AnimatedSection className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="section-eyebrow">
              <FiUsers className="h-3.5 w-3.5" /> Trusted by
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
              {totals.clients || 200}+ Ethiopian businesses rely on Gigar Trading
            </h2>
            <p className="mt-3 text-gigar-navy/70">
              Hotels, hospitals, workshops, real-estate developers and government agencies —
              we've installed {(totals.units || 5200).toLocaleString()}+ units across Ethiopia since 1985.
            </p>
          </div>
          <Link to="/customers" className="btn-outline whitespace-nowrap">
            All customers <FiArrowRight />
          </Link>
        </AnimatedSection>

        {/* Top: client logos marquee */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {customers.slice(0, 6).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center justify-center rounded-2xl bg-white p-5 shadow-gigar-soft ring-1 ring-gigar-navy/5 transition hover:shadow-gigar-glow hover:ring-gigar-red/30"
            >
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
                <SmartImage
                  src={c.logo_url}
                  alt={c.name}
                  fallbackSeed={c.slug || c.name}
                  className="h-full w-full object-contain p-1 grayscale transition group-hover:grayscale-0"
                />
              </div>
              <div className="mt-2 line-clamp-1 text-center text-xs font-bold text-gigar-navy group-hover:text-gigar-red">
                {c.name}
              </div>
              <div className="text-center text-[10px] text-gigar-navy/60">{c.sector}</div>
            </motion.div>
          ))}
        </div>

        {/* Featured testimonials — 2-column grid of customer story cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {customers.slice(0, 2).map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-gigar-soft transition-all hover:border-gigar-red/30 hover:shadow-gigar-glow md:flex-row"
            >
              <div className="relative h-44 overflow-hidden md:h-auto md:w-1/3">
                <SmartImage
                  src={c.cover_image}
                  alt={c.name}
                  fallbackSeed={c.slug || c.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/85 to-transparent" />
                {c.logo_url && (
                  <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white/95 shadow-gigar-soft">
                    <SmartImage
                      src={c.logo_url}
                      alt={c.name}
                      fallbackSeed={`${c.slug || c.name}-logo`}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-gigar-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {c.sector || 'Customer'}
                  </span>
                  <span className="text-xs text-gigar-navy/60">{c.location}</span>
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-gigar-navy">{c.name}</h3>
                {c.project_name && (
                  <div className="mt-1 text-xs font-semibold text-gigar-red">{c.project_name}</div>
                )}
                {c.testimonial && (
                  <blockquote className="mt-3 border-l-2 border-gigar-red/40 pl-3 italic text-sm text-gigar-navy/80">
                    <FiMessageSquare className="mb-1 h-3 w-3 text-gigar-red/50" />
                    "{c.testimonial}"
                    {c.testimonial_author && (
                      <footer className="mt-1 not-italic text-xs text-gigar-navy/60">
                        — {c.testimonial_author}
                      </footer>
                    )}
                  </blockquote>
                )}
                {c.units_installed > 0 && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-gigar-red/10 px-2.5 py-1 text-xs font-semibold text-gigar-red">
                    <FiCheckCircle className="h-3.5 w-3.5" /> {c.units_installed.toLocaleString()} units installed
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

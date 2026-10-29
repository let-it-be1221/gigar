import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMapPin, FiCalendar, FiAward, FiCheckCircle, FiChevronRight,
  FiArrowRight, FiInbox, FiMessageSquare, FiUsers, FiTrendingUp,
} from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import SmartImage from '../components/SmartImage'
import Loader from '../components/Loader'
import { publicApi } from '../api/client'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [sectors, setSectors]     = useState([])
  const [stats, setStats]         = useState({})
  const [sector, setSector]       = useState('')
  const [loading, setLoading]     = useState(true)
  const [total, setTotal]         = useState(0)

  useEffect(() => {
    publicApi.customerSectors()
      .then(({ data }) => setSectors(data.sectors || []))
      .catch(() => setSectors([]))

    publicApi.customerStats()
      .then(({ data }) => setStats(data.stats || {}))
      .catch(() => setStats({}))
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = { per_page: 24 }
    if (sector) params.sector = sector
    publicApi.customers(params)
      .then(({ data }) => {
        setCustomers(data.data || [])
        setTotal(data.total || 0)
      })
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false))
  }, [sector])

  // Total clients + total units across all customers (for hero stats)
  const totals = Object.values(stats).reduce(
    (acc, s) => ({ clients: acc.clients + s.clients, units: acc.units + s.units }),
    { clients: 0, units: 0 },
  )

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gigar-navy py-20 text-white lg:py-28">
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src="https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=80&auto=format&fit=crop"
            alt="" className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gigar-navy via-gigar-navy/85 to-gigar-red/70" />
        </div>
        <div className="container-page relative">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20">
              <FiUsers className="h-3.5 w-3.5" /> Our Customers
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Trusted by Ethiopian businesses since 1985
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              Hotels, hospitals, workshops, real-estate developers and government agencies — over 200 organizations
              depend on Gigar Trading for premium equipment, professional installation and lifetime after-sales support.
            </p>
          </AnimatedSection>

          {/* Hero stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { v: `${totals.clients || 200}+`, l: 'Active customers', icon: FiUsers },
              { v: `${(totals.units || 5200).toLocaleString()}+`, l: 'Units installed', icon: FiTrendingUp },
              { v: '39+', l: 'Years of trust', icon: FiAward },
              { v: '6', l: 'Sectors served', icon: FiCheckCircle },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur"
              >
                <s.icon className="h-6 w-6 text-gigar-gold" />
                <div className="mt-3 font-display text-3xl font-extrabold">{s.v}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/70">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector filter */}
      <section className="sticky top-16 z-30 border-b border-gigar-navy/10 bg-white/95 py-4 backdrop-blur lg:top-20">
        <div className="container-page flex items-center justify-center gap-2 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setSector('')}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              !sector ? 'bg-gigar-red text-white shadow-gigar-glow' : 'bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-navy/10'
            }`}
          >
            All sectors
          </button>
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                sector === s ? 'bg-gigar-red text-white shadow-gigar-glow' : 'bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-navy/10'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Customers grid */}
      <section className="py-16 lg:py-24">
        <div className="container-page">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0,1,2,3,4,5].map((i) => <div key={i} className="h-96 rounded-2xl shimmer" />)}
            </div>
          ) : customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FiInbox className="h-16 w-16 text-gigar-navy/30" />
              <h3 className="mt-4 font-display text-xl font-bold text-gigar-navy">No customers yet</h3>
              <p className="mt-2 text-gigar-navy/60">Customer stories will appear here once the admin adds them.</p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gigar-navy/60">
                  Showing {customers.length} of {total} customers {sector && `in ${sector}`}
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {customers.map((c, i) => (
                    <motion.article
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      whileHover={{ y: -8 }}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-gigar-soft transition-all hover:border-gigar-red/30 hover:shadow-gigar-glow"
                    >
                      {/* Whole card is a link to the customer detail page */}
                      <Link to={`/customers/${c.slug}`} className="absolute inset-0 z-10" aria-label={`View ${c.name} story`} />
                      {/* Cover image */}
                      <div className="relative h-48 overflow-hidden">
                        <SmartImage
                          src={c.cover_image}
                          alt={c.name}
                          fallbackSeed={c.slug || c.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/85 via-gigar-navy/30 to-transparent" />
                        {/* Logo floating card */}
                        <div className="absolute left-4 top-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white/95 shadow-gigar-soft backdrop-blur">
                          <SmartImage
                            src={c.logo_url}
                            alt={c.name}
                            fallbackSeed={`${c.slug || c.name}-logo`}
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        {/* Sector chip */}
                        {c.sector && (
                          <span className="absolute right-4 top-4 rounded-full bg-gigar-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                            {c.sector}
                          </span>
                        )}
                        {/* Name + location overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <h3 className="font-display text-xl font-bold text-white drop-shadow-md">{c.name}</h3>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/85">
                            {c.location && (
                              <span className="inline-flex items-center gap-1"><FiMapPin className="h-3.5 w-3.5" /> {c.location}</span>
                            )}
                            {c.year && (
                              <span className="inline-flex items-center gap-1"><FiCalendar className="h-3.5 w-3.5" /> {c.year}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col p-6">
                        {c.project_name && (
                          <div className="mb-3 rounded-lg bg-gigar-mist px-3 py-2 text-sm font-semibold text-gigar-navy">
                            <span className="text-gigar-red">Project:</span> {c.project_name}
                          </div>
                        )}
                        {c.description && (
                          <div
                            className="text-sm leading-relaxed text-gigar-navy/75 line-clamp-3 markdown-body"
                            dangerouslySetInnerHTML={{ __html: c.description }}
                          />
                        )}

                        {/* Stat row: units installed + category */}
                        {(c.units_installed || c.equipment_category) && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {c.units_installed > 0 && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-gigar-red/10 px-2.5 py-1 text-xs font-semibold text-gigar-red">
                                <FiCheckCircle className="h-3.5 w-3.5" /> {c.units_installed.toLocaleString()} units installed
                              </span>
                            )}
                            {c.equipment_category && (
                              <span className="rounded-md bg-gigar-navy/5 px-2.5 py-1 text-xs font-semibold text-gigar-navy/70 capitalize">
                                {c.equipment_category.replace(/-/g, ' ')}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Testimonial */}
                        {c.testimonial && (
                          <blockquote className="mt-4 border-l-2 border-gigar-red/40 pl-3 italic text-sm text-gigar-navy/75">
                            <FiMessageSquare className="mb-1 h-3.5 w-3.5 text-gigar-red/50" />
                            "{c.testimonial}"
                            {c.testimonial_author && (
                              <footer className="mt-1 not-italic text-xs text-gigar-navy/60">— {c.testimonial_author}</footer>
                            )}
                          </blockquote>
                        )}

                        {/* Read-more hint — visual cue that the card is clickable */}
                        <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gigar-red opacity-0 transition group-hover:opacity-100">
                          Read full story <FiChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gigar-mist py-16">
        <div className="container-page">
          <AnimatedSection className="rounded-3xl bg-gradient-to-r from-gigar-navy to-gigar-red p-8 text-center text-white sm:p-12">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Want to be our next success story?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Join 200+ Ethiopian businesses that trust Gigar Trading for their equipment, installation and lifetime support.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary !bg-white !text-gigar-red hover:!bg-gigar-gold hover:!text-gigar-navy">
                Become a customer <FiArrowRight />
              </Link>
              <Link to="/services" className="btn-ghost">
                Explore our services
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

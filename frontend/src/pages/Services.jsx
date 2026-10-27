import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUsers, FiCheckCircle, FiArrowRight, FiPhone, FiChevronRight } from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import SmartImage from '../components/SmartImage'
import Loader from '../components/Loader'
import { publicApi } from '../api/client'

// The 5 categories shown in the left sidebar — matches the user's screenshot:
// Building Elevators, Building Lifts, Paint Booths, Facility Equipments,
// Vehicle Test Equipments. Each has a number badge (no emoji, per user request).
// The cover image, tagline and description are pulled live from the /public/products
// API; the client count + units installed come from /public/customers/stats.
const SIDEBAR_CATEGORIES = [
  'building-elevators',
  'building-lifts',
  'paint-booths',
  'facility-equipment',
  'vehicle-test-equipment',
]

export default function Services() {
  const [products, setProducts]       = useState([])
  const [custStats, setCustStats]     = useState({})
  const [loading, setLoading]         = useState(true)
  const [activeId, setActiveId]       = useState('building-elevators')

  useEffect(() => {
    Promise.all([publicApi.products(), publicApi.customerStats()])
      .then(([p, cs]) => {
        setProducts(p.data.products || [])
        setCustStats(cs.data.stats || {})
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Filter products to only the 5 sidebar categories that have a long_description
  const sidebarProducts = products.filter((p) =>
    SIDEBAR_CATEGORIES.includes(p.id) && p.long_description,
  )

  const active = products.find((p) => p.id === activeId) || sidebarProducts[0]
  const cs = active ? (custStats[active.id] || { clients: 0, units: 0 }) : { clients: 0, units: 0 }

  if (loading) return <div className="flex justify-center py-32"><Loader fullscreen label="Loading services…" /></div>

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gigar-navy py-16 text-white lg:py-20">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1600&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-gigar-navy via-gigar-navy/85 to-gigar-red/70" />
        </div>
        <div className="container-page">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20">
              Our Services
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Supplying &amp; Installing Equipments
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
              Building elevators, lifts, paint booths, facility equipment and vehicle test equipment — imported, supplied and professionally installed by Gigar Trading across Ethiopia since 1985.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main layout: left sidebar + right detail panel */}
      <section className="py-10 lg:py-16">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* LEFT — sticky sidebar with the 5 categories */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-gigar-navy/10 bg-white p-3 shadow-gigar-soft">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gigar-navy/50">
                  Equipment categories
                </div>
                <ul className="space-y-1">
                  {sidebarProducts.map((p, i) => {
                    const stat = custStats[p.id] || { clients: 0, units: 0 }
                    const isActive = active?.id === p.id
                    return (
                      <li key={p.id}>
                        <button
                          onClick={() => setActiveId(p.id)}
                          className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                            isActive ? 'bg-gigar-red text-white shadow-gigar-glow' : 'hover:bg-gigar-navy/5 text-gigar-navy'
                          }`}
                        >
                          {/* Number badge (circular, no emoji) */}
                          <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-extrabold transition ${
                            isActive ? 'bg-white text-gigar-red' : 'bg-gigar-navy/10 text-gigar-navy group-hover:bg-gigar-red group-hover:text-white'
                          }`}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className={`truncate text-sm font-bold ${isActive ? 'text-white' : 'text-gigar-navy'}`}>
                              {p.title}
                            </div>
                            <div className={`mt-0.5 truncate text-[11px] ${isActive ? 'text-white/80' : 'text-gigar-navy/60'}`}>
                              <span className="inline-flex items-center gap-0.5">
                                <FiUsers className="h-3 w-3" />
                                <strong>{stat.clients}+</strong> clients
                              </span>
                              <span className="mx-1.5 opacity-50">·</span>
                              <strong>{(stat.units || 0).toLocaleString()}</strong> installed
                            </div>
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-3 border-t border-gigar-navy/10 p-3">
                  <a href="tel:+251115518267" className="flex items-center justify-center gap-2 rounded-xl bg-gigar-red px-3 py-2.5 text-xs font-bold text-white transition hover:bg-gigar-redDark">
                    <FiPhone className="h-3.5 w-3.5" /> Talk to our team
                  </a>
                </div>
              </div>
            </aside>

            {/* RIGHT — active category detail panel */}
            <div>
              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Active category name (top of right panel) */}
                    <div className="mb-4">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gigar-red">
                        Equipment category
                      </span>
                      <h2 className="mt-1 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
                        {active.title}
                      </h2>
                      <p className="mt-1 text-sm font-semibold text-gigar-navy/60">{active.tagline}</p>
                    </div>

                    {/* Cover image */}
                    {active.cover_image && (
                      <div className="relative h-72 overflow-hidden rounded-2xl shadow-gigar-glow sm:h-96">
                        <SmartImage
                          src={active.cover_image}
                          alt={active.title}
                          fallbackSeed={active.id}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/70 via-transparent to-transparent" />
                      </div>
                    )}

                    {/* Stats row — Clients + Quantity Installed */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-gigar-red/10 p-5 text-gigar-red">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                          <FiUsers className="h-4 w-4" /> Clients
                        </div>
                        <div className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
                          {cs.clients}+
                        </div>
                        <div className="mt-1 text-xs text-gigar-navy/70">
                          organizations trust Gigar for {active.title.toLowerCase()}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-gigar-gold/15 p-5 text-gigar-navy">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                          <FiCheckCircle className="h-4 w-4" /> Quantity Installed
                        </div>
                        <div className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
                          {(cs.units || 0).toLocaleString()}+
                        </div>
                        <div className="mt-1 text-xs text-gigar-navy/70">
                          units installed across all projects
                        </div>
                      </div>
                    </div>

                    {/* Long description */}
                    {active.long_description && (
                      <div className="mt-8 rounded-2xl border border-gigar-navy/10 bg-white p-6 shadow-gigar-soft sm:p-8">
                        <h3 className="font-display text-lg font-bold text-gigar-navy">
                          About {active.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-gigar-navy/80">
                          {active.long_description}
                        </p>

                        {/* Features list */}
                        {active.features && active.features.length > 0 && (
                          <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {active.features.map((f) => (
                              <div key={f} className="flex items-start gap-2.5 rounded-xl border border-gigar-navy/10 bg-gigar-mist p-3">
                                <FiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gigar-red" />
                                <span className="text-sm font-medium text-gigar-navy/85">{f}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* CTA row */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link to="/contact" className="btn-primary">
                        Get a quote <FiArrowRight />
                      </Link>
                      <Link to="/customers" className="btn-outline">
                        See {active.title.toLowerCase()} customers <FiChevronRight />
                      </Link>
                      <a href="tel:+251115518267" className="btn-outline">
                        <FiPhone /> +251 115 51 82 67
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Maintenance + Consultancy mini-cards (still the other two service lines) */}
              <div className="mt-12 border-t border-gigar-navy/10 pt-10">
                <h3 className="font-display text-xl font-bold text-gigar-navy">
                  Two more service lines
                </h3>
                <p className="mt-1 text-sm text-gigar-navy/70">
                  Beyond equipment supply and installation, Gigar Trading also offers:
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gigar-navy/10 bg-white p-5 shadow-gigar-soft">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gigar-red text-sm font-extrabold text-white">02</span>
                      <h4 className="font-display text-base font-bold text-gigar-navy">Maintenance Service</h4>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gigar-navy/75">
                      Annual Maintenance Contracts (AMC) and 24/7 emergency call-out support for every installation. Preventive maintenance, safety inspections and genuine OEM spare parts.
                    </p>
                    <Link to="/contact" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gigar-red hover:gap-2 transition-all">
                      Learn more <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="rounded-2xl border border-gigar-navy/10 bg-white p-5 shadow-gigar-soft">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gigar-red text-sm font-extrabold text-white">03</span>
                      <h4 className="font-display text-base font-bold text-gigar-navy">Technical Consultancy</h4>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gigar-navy/75">
                      Workshop layout, equipment sizing, elevator traffic analysis, project cost estimation and Ethiopian regulatory compliance review — engineering the right solution from day one.
                    </p>
                    <Link to="/contact" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gigar-red hover:gap-2 transition-all">
                      Learn more <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gigar-mist py-16">
        <div className="container-page">
          <AnimatedSection className="rounded-3xl bg-gradient-to-r from-gigar-navy to-gigar-red p-8 text-center text-white sm:p-12">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Ready to start your next project?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Our team handles everything from initial consultation to lifetime maintenance — get in touch today.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn-primary !bg-white !text-gigar-red hover:!bg-gigar-gold hover:!text-gigar-navy">
                Contact us <FiArrowRight />
              </a>
              <a href="tel:+251115518267" className="btn-ghost">
                <FiPhone /> +251 115 51 82 67
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

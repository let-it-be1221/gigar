import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiUsers, FiCheckCircle, FiArrowRight, FiPhone, FiChevronRight,
} from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import SmartImage from '../components/SmartImage'
import Loader from '../components/Loader'
import { publicApi } from '../api/client'

// The 5 product categories shown as a vertical list on the LEFT margin of the
// page — but ONLY when 'Supplying & Installing Equipments' is the active line.
const SIDEBAR_CATEGORIES = [
  'building-elevators',
  'building-lifts',
  'paint-booths',
  'facility-equipment',
  'vehicle-test-equipment',
]

// The 4 service lines — Vehicle Inspection Test is the 4th tab.
const SERVICE_LINES = [
  { id: 'supplying-and-installing', short: 'Supplying & Installing',  full: 'Supplying & Installing Equipments' },
  { id: 'maintenance-service',      short: 'Maintenance',             full: 'Maintenance Service' },
  { id: 'technical-consultancy',    short: 'Technical Consultancy',   full: 'Technical Consultancy' },
  { id: 'vehicle-inspection-test',  short: 'Vehicle Inspection Test', full: 'Vehicle Inspection Test' },
]

// Static content for Maintenance Service + Technical Consultancy + Vehicle Inspection
const MAINTENANCE_HIGHLIGHTS = [
  'Annual Maintenance Contracts (AMC) with fixed response times',
  '24/7 emergency breakdown call-out across Addis Ababa',
  'Genuine OEM spare parts inventory',
  'Safety inspection & certification reports',
  'On-site preventive maintenance scheduling',
  'Quarterly service reports + performance metrics',
]
const MAINTENANCE_DESC = 'Annual maintenance contracts (AMC) and 24/7 emergency call-out support for every installation. Our certified technicians perform scheduled preventive maintenance, safety inspections, parts replacement and breakdown repairs — minimizing downtime and extending equipment lifespan.'
const MAINTENANCE_IMAGE = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop'

const CONSULTANCY_HIGHLIGHTS = [
  'Workshop layout & equipment sizing consultancy',
  'Elevator load & traffic analysis for buildings',
  'Project cost estimation & ROI analysis',
  'Compliance review with Ethiopian regulations',
  'Tender specifications & RFP support',
  'On-site engineering supervision',
]
const CONSULTANCY_DESC = 'Our engineers help you plan, design and optimize your workshop or facility before you buy. We provide load calculations, equipment sizing, layout design, capacity planning and project cost analysis — ensuring you invest in the right equipment the first time.'
const CONSULTANCY_IMAGE = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop'

const VEHICLE_INSPECTION_HIGHLIGHTS = [
  'Complete VTEQ vehicle test lane operation',
  'Brake, suspension, side-slip & headlight alignment testing',
  'Government-certified inspection reports',
  'Fleet inspection contracts with bulk pricing',
  'Pre-purchase vehicle condition assessments',
  'Annual recertification for commercial vehicles',
]
const VEHICLE_INSPECTION_DESC = 'Gigar Trading operates complete VTEQ vehicle test lanes for government and private inspection centers across Ethiopia. Our certified inspectors run brake, suspension, side-slip and headlight alignment tests for commercial fleets, pre-purchase assessments and annual recertifications — issuing government-compliant inspection reports on every vehicle.'
const VEHICLE_INSPECTION_IMAGE = 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&q=80&auto=format&fit=crop'

export default function Services() {
  const [products, setProducts]   = useState([])
  const [custStats, setCustStats] = useState({})
  const [loading, setLoading]     = useState(true)
  const [activeLine, setActiveLine] = useState('supplying-and-installing')
  const [activeCat, setActiveCat]   = useState('building-elevators')
  const location = useLocation()

  useEffect(() => {
    Promise.all([publicApi.products(), publicApi.customerStats()])
      .then(([p, cs]) => {
        setProducts(p.data.products || [])
        setCustStats(cs.data.stats || {})
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Read the hash on mount + whenever it changes — when navigating from the
  // navbar Services bar (e.g. /services#maintenance-service) we switch to
  // that line automatically.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace(/^#/, '')
      if (SERVICE_LINES.some((l) => l.id === id)) {
        setActiveLine(id)
      }
    }
  }, [location.hash])

  const sidebarProducts = products.filter((p) =>
    SIDEBAR_CATEGORIES.includes(p.id) && p.long_description,
  )
  const activeProduct = products.find((p) => p.id === activeCat)
  const cs = activeProduct ? (custStats[activeProduct.id] || { clients: 0, units: 0 }) : { clients: 0, units: 0 }

  if (loading) return <div className="flex justify-center py-32"><Loader fullscreen label="Loading services…" /></div>

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gigar-navy py-16 text-white lg:py-20">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1600&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="container-page">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20">
              Our Services
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Four service lines, one trusted partner
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
              From equipment supply and installation to lifetime maintenance, engineering consultancy and vehicle inspection — Gigar Trading delivers end-to-end industrial solutions across Ethiopia.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Horizontal service-line tabs */}
      <section className="sticky top-16 z-30 border-b border-gigar-navy/10 bg-white/95 backdrop-blur lg:top-24 xl:top-28">
        <div className="container-page">
          <div className="flex gap-2 overflow-x-auto py-3 hide-scrollbar">
            {SERVICE_LINES.map((line, i) => {
              const isActive = activeLine === line.id
              return (
                <button
                  key={line.id}
                  onClick={() => setActiveLine(line.id)}
                  className={`flex flex-shrink-0 items-center gap-3 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                    isActive
                      ? 'bg-gigar-red text-white shadow-gigar-glow'
                      : 'bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-navy/10'
                  }`}
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-extrabold ${
                    isActive ? 'bg-white text-gigar-red' : 'bg-gigar-navy/10 text-gigar-navy'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="whitespace-nowrap">{line.short}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Body — depends on which service line is active */}
      {activeLine === 'supplying-and-installing' ? (
        // SUPPLYING & INSTALLING EQUIPMENTS — left vertical list of 5 product
        // categories + right content panel showing the active category.
        <section className="py-10 lg:py-16">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
              {/* LEFT — vertical list on the page's left margin */}
              <aside className="lg:sticky lg:top-44 xl:top-48 lg:self-start">
                <div className="rounded-2xl border border-gigar-navy/10 bg-white p-3 shadow-gigar-soft">
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gigar-navy/50">
                    Equipment categories
                  </div>
                  <ul className="space-y-1">
                    {sidebarProducts.map((p, i) => {
                      const stat = custStats[p.id] || { clients: 0, units: 0 }
                      const isActive = activeCat === p.id
                      return (
                        <li key={p.id}>
                          <button
                            onClick={() => setActiveCat(p.id)}
                            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                              isActive ? 'bg-gigar-red text-white shadow-gigar-glow' : 'hover:bg-gigar-navy/5 text-gigar-navy'
                            }`}
                          >
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
                  {activeProduct && (
                    <motion.div
                      key={activeProduct.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="mb-4">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gigar-red">
                          Equipment category
                        </span>
                        <h2 className="mt-1 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
                          {activeProduct.title}
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-gigar-navy/60">{activeProduct.tagline}</p>
                      </div>

                      {activeProduct.cover_image && (
                        <div className="relative h-72 overflow-hidden rounded-2xl shadow-gigar-glow sm:h-96">
                          <SmartImage
                            src={activeProduct.cover_image}
                            alt={activeProduct.title}
                            fallbackSeed={activeProduct.id}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/70 via-transparent to-transparent" />
                        </div>
                      )}

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-gigar-red/10 p-5 text-gigar-red">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                            <FiUsers className="h-4 w-4" /> Clients
                          </div>
                          <div className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
                            {cs.clients}+
                          </div>
                          <div className="mt-1 text-xs text-gigar-navy/70">
                            organizations trust Gigar for {activeProduct.title.toLowerCase()}
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

                      {activeProduct.long_description && (
                        <div className="mt-8 rounded-2xl border border-gigar-navy/10 bg-white p-6 shadow-gigar-soft sm:p-8">
                          <h3 className="font-display text-lg font-bold text-gigar-navy">
                            About {activeProduct.title}
                          </h3>
                          <p className="mt-3 text-base leading-relaxed text-gigar-navy/80">
                            {activeProduct.long_description}
                          </p>
                          {activeProduct.features && activeProduct.features.length > 0 && (
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                              {activeProduct.features.map((f) => (
                                <div key={f} className="flex items-start gap-2.5 rounded-xl border border-gigar-navy/10 bg-gigar-mist p-3">
                                  <FiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gigar-red" />
                                  <span className="text-sm font-medium text-gigar-navy/85">{f}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link to="/contact" className="btn-primary">
                          Get a quote <FiArrowRight />
                        </Link>
                        <Link to="/customers" className="btn-outline">
                          See {activeProduct.title.toLowerCase()} customers <FiChevronRight />
                        </Link>
                        <a href="tel:+251115518267" className="btn-outline">
                          <FiPhone /> +251 115 51 82 67
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // MAINTENANCE SERVICE or TECHNICAL CONSULTANCY — simple single-column layout
        <section className="py-12 lg:py-16">
          <div className="container-page">
            <motion.div
              key={activeLine}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-4xl"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gigar-red text-xl font-extrabold text-white shadow-gigar-glow">
                  {activeLine === 'maintenance-service' ? '02' : activeLine === 'technical-consultancy' ? '03' : '04'}
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gigar-red">
                    Service line
                  </span>
                  <h2 className="font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
                    {activeLine === 'maintenance-service' ? 'Maintenance Service' : activeLine === 'technical-consultancy' ? 'Technical Consultancy' : 'Vehicle Inspection Test'}
                  </h2>
                </div>
              </div>

              {/* Cover image — adds visual interest. Each service line has its own image. */}
              {activeLine === 'maintenance-service' && (
                <div className="relative mb-6 h-56 overflow-hidden rounded-2xl shadow-gigar-soft">
                  <SmartImage src={MAINTENANCE_IMAGE} alt="Maintenance service" fallbackSeed="maintenance-service" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <div className="font-display text-xl font-bold text-white drop-shadow">Certified technicians, 24/7 support</div>
                    <div className="text-xs font-semibold text-gigar-gold drop-shadow">Preventive maintenance + emergency call-out</div>
                  </div>
                </div>
              )}
              {activeLine === 'technical-consultancy' && (
                <div className="relative mb-6 h-56 overflow-hidden rounded-2xl shadow-gigar-soft">
                  <SmartImage src={CONSULTANCY_IMAGE} alt="Technical consultancy" fallbackSeed="technical-consultancy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <div className="font-display text-xl font-bold text-white drop-shadow">Engineered from day one</div>
                    <div className="text-xs font-semibold text-gigar-gold drop-shadow">Workshop layout + equipment sizing + cost analysis</div>
                  </div>
                </div>
              )}
              {activeLine === 'vehicle-inspection-test' && (
                <div className="relative mb-6 h-56 overflow-hidden rounded-2xl shadow-gigar-soft">
                  <SmartImage src={VEHICLE_INSPECTION_IMAGE} alt="Vehicle inspection test" fallbackSeed="vehicle-inspection" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <div className="font-display text-xl font-bold text-white drop-shadow">VTEQ test lanes, certified reports</div>
                    <div className="text-xs font-semibold text-gigar-gold drop-shadow">Brake · Suspension · Side-slip · Headlight alignment</div>
                  </div>
                </div>
              )}

              <p className="text-base leading-relaxed text-gigar-navy/80">
                {activeLine === 'maintenance-service' ? MAINTENANCE_DESC : activeLine === 'technical-consultancy' ? CONSULTANCY_DESC : VEHICLE_INSPECTION_DESC}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {(activeLine === 'maintenance-service' ? MAINTENANCE_HIGHLIGHTS : activeLine === 'technical-consultancy' ? CONSULTANCY_HIGHLIGHTS : VEHICLE_INSPECTION_HIGHLIGHTS).map((h) => (
                  <div key={h} className="flex items-start gap-2.5 rounded-xl border border-gigar-navy/10 bg-gigar-mist p-4">
                    <FiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gigar-red" />
                    <span className="text-sm font-medium text-gigar-navy/85">{h}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Get a quote <FiArrowRight />
                </Link>
                <a href="tel:+251115518267" className="btn-outline">
                  <FiPhone /> +251 115 51 82 67
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

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

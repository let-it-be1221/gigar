import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCheckCircle, FiArrowRight, FiPhone, FiUsers,
} from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import Loader from '../components/Loader'
import { publicApi } from '../api/client'

// Map service-line ids to the product categories that belong to each.
// Used to render the per-category mini-stats under each service-line entry.
const LINE_CATEGORIES = {
  'supplying-and-installing': [
    { id: 'building-elevators',       label: 'Building Elevators' },
    { id: 'building-lifts',           label: 'Building Lifts' },
    { id: 'paint-booths',             label: 'Paint Booths' },
    { id: 'facility-equipment',       label: 'Facility Equipments' },
    { id: 'vehicle-test-equipment',  label: 'Vehicle Test Equipments' },
  ],
}

const FALLBACK_SERVICES = [
  {
    id: 'supplying-and-installing', line: 'Supplying & Installing Equipments',
    title: 'Equipment Supply & Installation', tagline: 'Importing & commissioning world-class equipment',
    description: 'Gigar Trading imports and professionally installs a complete portfolio of industrial equipment — BendPak car lifts, building elevators & escalators, OMIA paint booths, VTEQ vehicle test lanes, Fujitsu air conditioners and LGS duty washing machines. Every project includes site survey, supply, installation, commissioning and operator training.',
    highlights: [
      'Authorized distributor of BendPak, Fujitsu, OMIA, VTEQ and Electrolux',
      'Full turnkey installation by certified technicians',
      '5-year structural warranty on major equipment',
      'Operator training included with every install',
    ],
  },
  {
    id: 'maintenance-service', line: 'Maintenance Service',
    title: 'Preventive & Emergency Maintenance', tagline: 'Keeping your equipment productive for decades',
    description: 'Annual maintenance contracts (AMC) and 24/7 emergency call-out support for every installation. Our certified technicians perform scheduled preventive maintenance, safety inspections, parts replacement and breakdown repairs — minimizing downtime and extending equipment lifespan.',
    highlights: [
      'Annual Maintenance Contracts (AMC) with fixed response times',
      '24/7 emergency breakdown call-out across Addis Ababa',
      'Genuine OEM spare parts inventory',
      'Safety inspection & certification reports',
    ],
  },
  {
    id: 'technical-consultancy', line: 'Technical Consultancy',
    title: 'Workshop & Facility Design Consultancy', tagline: 'Engineering the right solution from day one',
    description: 'Our engineers help you plan, design and optimize your workshop or facility before you buy. We provide load calculations, equipment sizing, layout design, capacity planning and project cost analysis — ensuring you invest in the right equipment the first time.',
    highlights: [
      'Workshop layout & equipment sizing consultancy',
      'Elevator load & traffic analysis for buildings',
      'Project cost estimation & ROI analysis',
      'Compliance review with Ethiopian regulations',
    ],
  },
]

export default function Services() {
  const [services, setServices] = useState([])
  const [custStats, setCustStats] = useState({})
  const [loading, setLoading]     = useState(true)
  const [activeId, setActiveId]   = useState('')
  const sectionRefs               = useRef({})

  useEffect(() => {
    publicApi.services()
      .then(({ data }) => setServices(data.services?.length ? data.services : FALLBACK_SERVICES))
      .catch(() => setServices(FALLBACK_SERVICES))
      .finally(() => setLoading(false))

    publicApi.customerStats()
      .then(({ data }) => setCustStats(data.stats || {}))
      .catch(() => setCustStats({}))
  }, [])

  // Scrollspy: observe each section, set the active id when it crosses 30% viewport
  useEffect(() => {
    if (services.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry closest to the top that is intersecting
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          // Sort by top position, pick the first one
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          const id = visible[0].target.getAttribute('data-section-id')
          if (id) setActiveId(id)
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.1, 0.3] },
    )

    services.forEach((s) => {
      const el = sectionRefs.current[s.id]
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [services])

  const scrollTo = (id) => {
    const el = sectionRefs.current[id]
    if (el) {
      const offset = 100 // account for sticky navbar
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (loading) {
    return <div className="flex justify-center py-32"><Loader fullscreen label="Loading services…" /></div>
  }

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gigar-navy py-20 text-white lg:py-28">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1600&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-gigar-navy via-gigar-navy/85 to-gigar-red/70" />
        </div>
        <div className="container-page">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20">
              Our Services
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Three service lines, one trusted partner
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              From equipment supply and installation to lifetime maintenance and engineering consultancy — Gigar Trading delivers end-to-end industrial solutions across Ethiopia.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Two-column layout: left sticky sidebar + right scrolling content */}
      <section className="py-12 lg:py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* LEFT — sticky services sidebar with scrollspy */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-gigar-navy/10 bg-white p-3 shadow-gigar-soft">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gigar-navy/50">
                  Service lines
                </div>
                <ul className="space-y-1">
                  {services.map((s, i) => {
                    const isActive = activeId === s.id
                    const cats = LINE_CATEGORIES[s.id] || []
                    return (
                      <li key={s.id}>
                        <button
                          onClick={() => scrollTo(s.id)}
                          className={`group w-full rounded-xl px-3 py-3 text-left transition ${
                            isActive ? 'bg-gigar-red text-white shadow-gigar-glow' : 'hover:bg-gigar-navy/5 text-gigar-navy'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              isActive ? 'bg-white text-gigar-red' : 'bg-gigar-navy/10 text-gigar-navy'
                            }`}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className={`truncate text-sm font-bold ${isActive ? 'text-white' : 'text-gigar-navy'}`}>
                                {s.line}
                              </div>
                              <div className={`truncate text-[11px] ${isActive ? 'text-white/80' : 'text-gigar-navy/60'}`}>
                                {s.tagline}
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* For Supplying & Installing, show the 5 product categories
                            inline with their client counts + units installed */}
                        {cats.length > 0 && (
                          <ul className="ml-3 mt-1 space-y-0.5 border-l border-gigar-navy/10 pl-3">
                            {cats.map((c) => {
                              const cs = custStats[c.id] || { clients: 0, units: 0 }
                              return (
                                <li key={c.id} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-gigar-navy/70 hover:bg-gigar-navy/5">
                                  <Link to="/products" className="hover:text-gigar-red">{c.label}</Link>
                                  <span className="flex items-center gap-1.5 text-[10px]">
                                    <span className="inline-flex items-center gap-0.5 text-gigar-red">
                                      <FiUsers className="h-3 w-3" />
                                      <strong>{cs.clients}+</strong>
                                    </span>
                                    <span className="text-gigar-navy/60">
                                      <strong>{(cs.units || 0).toLocaleString()}</strong> installed
                                    </span>
                                  </span>
                                </li>
                              )
                            })}
                          </ul>
                        )}
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

            {/* RIGHT — scrolling service content panels */}
            <div className="space-y-16">
              {services.map((s, i) => (
                <motion.section
                  key={s.id}
                  data-section-id={s.id}
                  ref={(el) => { sectionRefs.current[s.id] = el }}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="scroll-mt-32"
                >
                  {/* Service number chip */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl font-display text-xl font-extrabold transition ${
                      activeId === s.id ? 'bg-gigar-red text-white shadow-gigar-glow' : 'bg-gigar-navy/5 text-gigar-navy'
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gigar-red">{s.line}</span>
                      <h2 className="font-display text-2xl font-extrabold text-gigar-navy sm:text-3xl">{s.title}</h2>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="rounded-2xl border border-gigar-navy/10 bg-white p-6 shadow-gigar-soft sm:p-8">
                    <p className="text-sm font-semibold text-gigar-red/80">{s.tagline}</p>
                    <p className="mt-3 text-base leading-relaxed text-gigar-navy/80">{s.description}</p>

                    {s.highlights && s.highlights.length > 0 && (
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {s.highlights.map((h) => (
                          <div key={h} className="flex items-start gap-2.5 rounded-xl border border-gigar-navy/10 bg-gigar-mist p-3">
                            <FiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gigar-red" />
                            <span className="text-sm font-medium text-gigar-navy/85">{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* For Supplying & Installing, list the 5 categories with images + stats */}
                    {LINE_CATEGORIES[s.id] && (
                      <div className="mt-8 border-t border-gigar-navy/10 pt-6">
                        <h3 className="font-display text-lg font-bold text-gigar-navy">Equipment we supply &amp; install</h3>
                        <p className="mt-1 text-sm text-gigar-navy/70">Each category below is backed by real client installations across Ethiopia — hover any card to see the per-category client count and units installed.</p>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          {LINE_CATEGORIES[s.id].map((c) => {
                            const cs = custStats[c.id] || { clients: 0, units: 0 }
                            return (
                              <Link
                                key={c.id}
                                to="/products"
                                className="group flex items-center justify-between rounded-xl border border-gigar-navy/10 bg-white p-4 transition hover:border-gigar-red/30 hover:shadow-gigar-soft"
                              >
                                <div>
                                  <div className="font-display text-base font-bold text-gigar-navy group-hover:text-gigar-red">{c.label}</div>
                                  <div className="mt-1 text-xs text-gigar-navy/60">
                                    <span className="inline-flex items-center gap-1 text-gigar-red">
                                      <FiUsers className="h-3 w-3" />
                                      <strong>{cs.clients}+</strong> clients
                                    </span>
                                    <span className="mx-1.5 text-gigar-navy/30">·</span>
                                    <span><strong>{(cs.units || 0).toLocaleString()}</strong> installed</span>
                                  </div>
                                </div>
                                <FiArrowRight className="h-5 w-5 text-gigar-red/40 transition group-hover:translate-x-1 group-hover:text-gigar-red" />
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* CTA row */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link to="/contact" className="btn-primary">
                        Get a quote <FiArrowRight />
                      </Link>
                      <a href="tel:+251115518267" className="btn-outline">
                        <FiPhone /> +251 115 51 82 67
                      </a>
                    </div>
                  </div>
                </motion.section>
              ))}
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

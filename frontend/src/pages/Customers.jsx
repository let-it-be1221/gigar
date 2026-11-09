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

// ----- 6 sector tabs + "All Sectors" (per user request) -----
// Each sector has sub-segments with an image, name, and description.
// The sub-segments use the SAME card design as the customer story
// cards (image header + body with name + description).
const SECTOR_TABS = [
  {
    id: 'all',
    short: 'All Sectors',
    title: 'All Sectors',
    icon: '🌐',
    segments: [],
  },
  {
    id: 'institutional-public',
    short: 'Institutional & Public',
    title: 'Institutional & Public Sector',
    icon: '🏛️',
    segments: [
      {
        name: 'Governmental Organizations',
        items: 'Federal ministries, regional bureaus, municipal authorities, public infrastructure agencies, and public utility enterprises.',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Defense & Security Forces',
        items: 'National defense forces, federal and regional police, correctional facilities, and emergency management agencies.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Public Educational Institutions',
        items: 'State universities, vocational training colleges (TVETs), and public research institutes.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'State-Owned Enterprises (SOEs)',
        items: 'National transport/aviation corporations, public telecom operators, state commercial banks, and industrial park development corporations.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'international-ngo',
    short: 'International & NGO',
    title: 'International & Non-Governmental Sector',
    icon: '🌍',
    segments: [
      {
        name: 'Diplomatic Communities',
        items: 'Foreign embassies, consulates, bilateral trade missions, and diplomatic staff residences.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'International Organizations',
        items: 'United Nations (UN) agencies, African Union (AU), regional economic blocs (e.g., IGAD, COMESA), and international financial institutions (World Bank, IMF, AfDB).',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Non-Governmental Organizations (NGOs)',
        items: 'International NGOs (INGOs), local civil society organizations (CSOs), humanitarian aid foundations, and charitable trusts.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'commercial-private',
    short: 'Commercial & Private',
    title: 'Commercial & Private Business Sector',
    icon: '🏢',
    segments: [
      {
        name: 'Real Estate Developers & Property Management',
        items: 'Residential apartment complexes, commercial office towers, gated communities, and shopping malls.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Hospitality & Leisure Industry',
        items: 'Star-rated hotels, resorts, lodges, banquet venues, commercial restaurants, and recreation centers.',
        image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Healthcare & Medical Facilities',
        items: 'Private hospitals, specialized clinics, diagnostic labs, rehabilitation centers, and pharmaceutical manufacturers.',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Automotive & Fleet Operators',
        items: 'Vehicle dealerships, commercial garage networks, logistics/freight companies, public transport operators, car rental agencies, and fleet managers.',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Financial Institutions',
        items: 'Private commercial banks, insurance companies, microfinance institutions, and fintech headquarters.',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Retail & Supermarket Chains',
        items: 'Department stores, hypermarkets, wholesale cash-and-carry centers, and dry-cleaning services.',
        image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'industrial-infrastructure',
    short: 'Industrial & Infrastructure',
    title: 'Industrial & Infrastructure Sector',
    icon: '🏭',
    segments: [
      {
        name: 'Manufacturing & Industrial Plants',
        items: 'Agro-processing factories, textile and garment mills, chemical plants, metal processing facilities, and bottling plants.',
        image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Construction & Engineering Contractors',
        items: 'General EPC (Engineering, Procurement, and Construction) contractors, MEP (Mechanical, Electrical, and Plumbing) subcontractors, civil engineering firms, and architectural consultancies.',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Mining & Energy Projects',
        items: 'Mining operations, cement plants, solar and thermal energy projects, and power generation sub-stations.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Logistics & Freight Services',
        items: 'Dry ports, warehousing complexes, cold-chain storage facilities, and freight forwarding hubs.',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'individual-consumer',
    short: 'Individual & Consumer',
    title: 'Individual & Consumer Sector',
    icon: '🏠',
    segments: [
      {
        name: 'High-Net-Worth Individuals (HNWIs)',
        items: 'Luxury homeowners buying private villas, residential lifts, home stair lifts, or high-end standby power generators.',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'General Household Consumers',
        items: 'Individual retail customers purchasing small residential appliances, basic maintenance parts, or car wash services.',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'channel-partners',
    short: 'Channel Partners',
    title: 'Channel Partners & Intermediaries',
    icon: '🤝',
    segments: [
      {
        name: 'Distributors & Resellers',
        items: 'Equipment dealers, regional stockists, and retail spare-parts traders.',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&auto=format&fit=crop',
      },
      {
        name: 'Consultants & System Integrators',
        items: 'Architectural design firms, MEP engineering consultants, and technical procurement agencies buying on behalf of end-users.',
        image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&fit=crop',
      },
    ],
  },
]

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [stats, setStats]         = useState({})
  const [loading, setLoading]     = useState(true)
  const [total, setTotal]         = useState(0)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    publicApi.customerStats()
      .then(({ data }) => setStats(data.stats || {}))
      .catch(() => setStats({}))
  }, [])

  useEffect(() => {
    setLoading(true)
    publicApi.customers({ per_page: 24 })
      .then(({ data }) => {
        setCustomers(data.data || [])
        setTotal(data.total || 0)
      })
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false))
  }, [])

  const totals = Object.values(stats).reduce(
    (acc, s) => ({ clients: acc.clients + s.clients, units: acc.units + s.units }),
    { clients: 0, units: 0 },
  )

  const activeSector = SECTOR_TABS.find((t) => t.id === activeTab) || SECTOR_TABS[0]

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gigar-navy py-20 text-white lg:py-28">
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src="https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=80&auto=format&fit=crop"
            alt="" className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
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
              Government agencies, international organizations, commercial businesses, industrial
              contractors and individual consumers — Gigar Trading serves 6 sectors across Ethiopia.
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

      {/* Sector tabs — "All Sectors" + 6 named sectors */}
      <section className="sticky top-16 z-30 border-b border-gigar-navy/10 bg-white/95 py-3 backdrop-blur lg:top-24 xl:top-28">
        <div className="container-page">
          <div className="flex gap-2 overflow-x-auto py-1 hide-scrollbar">
            {SECTOR_TABS.map((tab, i) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition ${
                    isActive
                      ? 'bg-gigar-red text-white shadow-gigar-glow'
                      : 'bg-gigar-navy/5 text-gigar-navy hover:bg-gigar-navy/10'
                  }`}
                >
                  {tab.id === 'all' ? (
                    <span className="text-base">🌐</span>
                  ) : (
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white text-gigar-red' : 'bg-gigar-navy/10 text-gigar-navy'
                    }`}>
                      {String(i).padStart(2, '0')}
                    </span>
                  )}
                  <span className="whitespace-nowrap">{tab.short}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content area */}
      <section className="py-12 lg:py-16">
        <div className="container-page">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              {/* Sector header (only for non-"all" tabs) */}
              {activeTab !== 'all' && activeSector.segments.length > 0 && (
                <div className="mb-8 flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gigar-red text-3xl shadow-gigar-glow">
                    {activeSector.icon}
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gigar-red">
                      Customer sector
                    </span>
                    <h2 className="font-display text-2xl font-extrabold text-gigar-navy sm:text-3xl">
                      {activeSector.title}
                    </h2>
                  </div>
                </div>
              )}

              {/* Sub-segment cards with images (shown for sector tabs, not "all") */}
              {activeTab !== 'all' && activeSector.segments.length > 0 && (
                <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {activeSector.segments.map((seg, i) => (
                    <motion.div
                      key={seg.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      whileHover={{ y: -6 }}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-gigar-soft transition-all hover:border-gigar-red/30 hover:shadow-gigar-glow"
                    >
                      {/* Image header */}
                      <div className="relative h-40 overflow-hidden">
                        <SmartImage
                          src={seg.image}
                          alt={seg.name}
                          fallbackSeed={seg.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/80 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4">
                          <h3 className="font-display text-base font-bold text-white drop-shadow-md">{seg.name}</h3>
                        </div>
                      </div>
                      {/* Body */}
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-sm leading-relaxed text-gigar-navy/75">{seg.items}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Customer story cards (shown for ALL tabs) */}
              {/* The existing customer story design — cover image, logo, sector chip, project, testimonial */}
              {loading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[0,1,2,3,4,5].map((i) => <div key={i} className="h-96 rounded-2xl shimmer" />)}
                </div>
              ) : customers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <FiInbox className="h-16 w-16 text-gigar-navy/30" />
                  <h3 className="mt-4 font-display text-xl font-bold text-gigar-navy">No customer stories yet</h3>
                  <p className="mt-2 text-gigar-navy/60">Customer stories will appear here once the admin adds them.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-gigar-navy">
                      {activeTab === 'all' ? 'All customer stories' : `${activeSector.short} — featured stories`}
                    </h3>
                    <p className="text-sm text-gigar-navy/60">{customers.length} stories</p>
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
                          <Link to={`/customers/${c.slug}`} className="absolute inset-0 z-10" aria-label={`View ${c.name} story`} />
                          <div className="relative h-48 overflow-hidden">
                            <SmartImage
                              src={c.cover_image}
                              alt={c.name}
                              fallbackSeed={c.slug || c.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/85 via-gigar-navy/30 to-transparent" />
                            <div className="absolute left-4 top-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white/95 shadow-gigar-soft backdrop-blur">
                              <SmartImage src={c.logo_url} alt={c.name} fallbackSeed={`${c.slug || c.name}-logo`} className="h-full w-full object-contain p-1" />
                            </div>
                            {c.sector && (
                              <span className="absolute right-4 top-4 rounded-full bg-gigar-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                                {c.sector}
                              </span>
                            )}
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
                            {c.testimonial && (
                              <blockquote className="mt-4 border-l-2 border-gigar-red/40 pl-3 italic text-sm text-gigar-navy/75">
                                <FiMessageSquare className="mb-1 h-3.5 w-3.5 text-gigar-red/50" />
                                "{c.testimonial}"
                                {c.testimonial_author && (
                                  <footer className="mt-1 not-italic text-xs text-gigar-navy/60">— {c.testimonial_author}</footer>
                                )}
                              </blockquote>
                            )}
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
            </motion.div>
          </AnimatePresence>
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

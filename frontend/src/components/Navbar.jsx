import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiMenu, FiX, FiLogOut, FiShield, FiChevronDown, FiChevronRight,
  FiUsers, FiCheckCircle,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { publicApi } from '../api/client'
import SmartImage from './SmartImage'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services', isMega: true },
  { label: 'Products', to: '/products' },
  { label: 'Customers', to: '/customers' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

// The 5 product categories shown inside the Supplying & Installing mega-menu.
const MEGA_CATEGORIES = [
  {
    id: 'building-elevators',
    label: 'Building Elevators',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80&auto=format&fit=crop',
    blurb: 'Traction, hydraulic & MRL elevator systems for buildings of any height.',
  },
  {
    id: 'building-lifts',
    label: 'Building Lifts & Stair Lifts',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80&auto=format&fit=crop',
    blurb: 'Stair lifts and accessibility lifts for any staircase geometry.',
  },
  {
    id: 'paint-booths',
    label: 'Paint Booths',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop',
    blurb: 'OMIA downdraft booths with temperature and humidity control.',
  },
  {
    id: 'facility-equipment',
    label: 'Facility Equipments',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&q=80&auto=format&fit=crop',
    blurb: 'VRF air-conditioning, industrial washing machines, generators.',
  },
  {
    id: 'vehicle-test-equipment',
    label: 'Vehicle Test Equipments',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&q=80&auto=format&fit=crop',
    blurb: 'VTEQ brake, suspension, side-slip and headlight test lanes.',
  },
]

// The 3 service lines.
const SERVICE_LINES = [
  { id: 'supplying-and-installing', label: 'Supplying & Installing Equipments', desc: 'Import, supply & professional installation', icon: '🔧' },
  { id: 'maintenance-service',     label: 'Maintenance Service',                desc: 'AMC contracts & 24/7 emergency support',    icon: '🛠️' },
  { id: 'technical-consultancy',    label: 'Technical Consultancy',            desc: 'Workshop design & equipment sizing',       icon: '📐' },
]

function ServicesMegaMenu({ onClose }) {
  const [activeLine, setActiveLine] = useState('supplying-and-installing')
  const [activeCat, setActiveCat]   = useState(MEGA_CATEGORIES[0])
  const [stats, setStats]           = useState({})

  useEffect(() => {
    publicApi.customerStats()
      .then(({ data }) => setStats(data.stats || {}))
      .catch(() => setStats({}))
  }, [])

  // Total clients + total units across all 5 categories (for header strip)
  const totals = MEGA_CATEGORIES.reduce(
    (acc, c) => {
      const s = stats[c.id] || { clients: 0, units: 0 }
      return { clients: acc.clients + s.clients, units: acc.units + s.units }
    },
    { clients: 0, units: 0 },
  )

  const isSupply = activeLine === 'supplying-and-installing'
  const catStats = stats[activeCat.id] || { clients: 0, units: 0 }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      className="absolute left-1/2 top-full z-50 mt-2 w-[min(1100px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-2xl"
    >
      {/* Header strip — horizontal list of the 3 service lines */}
      <div className="border-b border-gigar-navy/10 bg-gigar-mist px-4 py-3">
        <div className="grid grid-cols-3 gap-2">
          {SERVICE_LINES.map((s) => (
            <button
              key={s.id}
              onMouseEnter={() => setActiveLine(s.id)}
              onClick={() => setActiveLine(s.id)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                activeLine === s.id ? 'bg-gigar-red text-white shadow-gigar-glow' : 'bg-white text-gigar-navy hover:bg-gigar-navy/5'
              }`}
            >
              <span className="text-xl">{s.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-bold uppercase tracking-wider">{s.label}</div>
                <div className={`truncate text-[10px] ${activeLine === s.id ? 'text-white/80' : 'text-gigar-navy/60'}`}>{s.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Body — only show the categories sidebar when Supplying & Installing is selected */}
      {isSupply ? (
        <div className="grid grid-cols-12 gap-0">
          {/* Left sidebar — vertical list of categories */}
          <div className="col-span-5 border-r border-gigar-navy/10 p-3 lg:col-span-4">
            <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gigar-navy/50">
              Equipment we supply &amp; install
            </div>
            <ul className="space-y-1">
              {MEGA_CATEGORIES.map((c) => {
                const s = stats[c.id] || { clients: 0, units: 0 }
                return (
                  <li key={c.id}>
                    <button
                      onMouseEnter={() => setActiveCat(c)}
                      onClick={() => setActiveCat(c)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                        activeCat.id === c.id ? 'bg-gigar-red/10 ring-1 ring-gigar-red/20' : 'hover:bg-gigar-navy/5'
                      }`}
                    >
                      <SmartImage
                        src={c.image}
                        alt={c.label}
                        fallbackSeed={c.id}
                        className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className={`truncate text-sm font-bold ${activeCat.id === c.id ? 'text-gigar-red' : 'text-gigar-navy'}`}>
                          {c.label}
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-gigar-navy/70">
                          <span className="inline-flex items-center gap-1">
                            <FiUsers className="h-3 w-3 text-gigar-red" />
                            <strong>{s.clients}+</strong> clients
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <FiCheckCircle className="h-3 w-3 text-gigar-gold" />
                            <strong>{(s.units || 0).toLocaleString()}</strong> installed
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right — preview card of the active category */}
          <div className="col-span-7 p-5 lg:col-span-8">
            <div className="relative h-40 overflow-hidden rounded-xl">
              <SmartImage
                src={activeCat.image}
                alt={activeCat.label}
                fallbackSeed={activeCat.id}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/85 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-display text-lg font-bold text-white">{activeCat.label}</h3>
                <p className="text-xs text-white/85">{activeCat.blurb}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gigar-red/10 p-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-gigar-red">Clients</div>
                <div className="font-display text-2xl font-extrabold text-gigar-red">{catStats.clients}+</div>
                <div className="text-[11px] text-gigar-navy/70">organizations trust Gigar</div>
              </div>
              <div className="rounded-xl bg-gigar-gold/15 p-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-gigar-navy">Units installed</div>
                <div className="font-display text-2xl font-extrabold text-gigar-navy">{(catStats.units || 0).toLocaleString()}</div>
                <div className="text-[11px] text-gigar-navy/70">across all projects</div>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-gigar-navy/75">
              We import world-class {activeCat.label.toLowerCase()} from authorized distributors like BendPak, OMIA, VTEQ, Fujitsu and Schindler — and our certified technicians handle site survey, installation, commissioning and operator training.
            </p>

            <div className="mt-4 flex items-center justify-between">
              <Link to={`/products`} className="text-sm font-semibold text-gigar-red hover:underline">
                View all {activeCat.label.toLowerCase()} →
              </Link>
              <Link to="/customers" className="text-xs font-semibold text-gigar-navy/60 hover:text-gigar-red">
                See customer stories →
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // Maintenance or Consultancy selected — show a single informative panel
        <div className="p-5">
          {(() => {
            const line = SERVICE_LINES.find((l) => l.id === activeLine)
            return (
              <div>
                <h3 className="font-display text-lg font-bold text-gigar-navy">{line.label}</h3>
                <p className="mt-1 text-sm text-gigar-navy/70">{line.desc}</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {activeLine === 'maintenance-service' && [
                    'Annual Maintenance Contracts (AMC) with fixed response times',
                    '24/7 emergency breakdown call-out across Addis Ababa',
                    'Genuine OEM spare parts inventory',
                    'Safety inspection & certification reports',
                    'On-site preventive maintenance scheduling',
                    'Quarterly service reports + performance metrics',
                  ].map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gigar-navy/80">
                      <FiCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gigar-red" /> {h}
                    </li>
                  ))}
                  {activeLine === 'technical-consultancy' && [
                    'Workshop layout & equipment sizing consultancy',
                    'Elevator load & traffic analysis for buildings',
                    'Project cost estimation & ROI analysis',
                    'Compliance review with Ethiopian regulations',
                    'Tender specifications & RFP support',
                    'On-site engineering supervision',
                  ].map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gigar-navy/80">
                      <FiCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gigar-red" /> {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Link to={`/services#${activeLine}`} className="text-sm font-semibold text-gigar-red hover:underline">
                    Learn more about {line.label} →
                  </Link>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { user, isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <>
      {/* Top utility strip — hidden on mobile */}
      <div className="hidden bg-gigar-navy text-white/80 lg:block">
        <div className="container-page flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href="mailto:info@gigartrading.com" className="hover:text-gigar-gold">✉ info@gigartrading.com</a>
            <a href="tel:+251115518267" className="hover:text-gigar-gold">☎ +251 115 51 82 67</a>
            <span className="hidden items-center gap-1.5 xl:flex">📍 Ledeta St, Addis Ababa, Ethiopia</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Mon – Fri: 8:00 AM – 6:00 PM</span>
            <a href="#" className="hover:text-gigar-gold">Follow us →</a>
          </div>
        </div>
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/95 shadow-gigar-soft backdrop-blur-md' : 'bg-white/95'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.img
              src="/logo.png" alt="Gigar Trading logo"
              className="h-10 w-auto rounded-md shadow-gigar-soft lg:h-12"
              initial={{ rotate: -8, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ rotate: -2, scale: 1.04 }}
            />
            <div className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-base font-extrabold tracking-tight text-gigar-navy lg:text-lg">GIGAR</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gigar-red">Trading & Technical Center</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) =>
              item.isMega ? (
                <li
                  key={item.to}
                  className="static group relative"
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        isActive ? 'text-gigar-red' : 'text-gigar-navy hover:text-gigar-red'
                      }`
                    }
                  >
                    {item.label}
                    <FiChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </NavLink>
                  {/* Mega-menu shown on hover */}
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <ServicesMegaMenu onClose={() => setOpen(false)} />
                  </div>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        isActive ? 'text-gigar-red' : 'text-gigar-navy hover:text-gigar-red'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gigar-red"
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          {/* CTA + Admin login */}
          <div className="hidden items-center gap-3 lg:flex">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <Link to="/admin" className="btn-primary !px-4 !py-2">
                  <FiShield className="h-4 w-4" /> Admin
                </Link>
                <button onClick={logout} className="btn-ghost !px-4 !py-2 !text-gigar-navy !border-gigar-navy/20">
                  <FiLogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-outline !px-4 !py-2">
                <FiShield className="h-4 w-4" /> Login
              </Link>
            )}
            <a href="tel:+251115518267" className="btn-primary !px-5 !py-2">Get a Quote</a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gigar-navy text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-gigar-navy/10 bg-white lg:hidden"
            >
              <ul className="container-page py-4">
                {NAV.map((item, i) => (
                  <motion.li key={item.to} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-3 text-base font-semibold ${
                          isActive ? 'bg-gigar-red/10 text-gigar-red' : 'text-gigar-navy hover:bg-gigar-navy/5'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                    {item.isMega && (
                      <ul className="ml-3 border-l border-gigar-navy/10 pl-3">
                        {SERVICE_LINES.map((line) => (
                          <li key={line.id}>
                            <Link to={`/services#${line.id}`} className="block rounded-lg px-3 py-2 text-sm text-gigar-navy/70 hover:text-gigar-red">
                              {line.label}
                            </Link>
                            {line.id === 'supplying-and-installing' && (
                              <ul className="ml-3 border-l border-gigar-navy/5 pl-3">
                                {MEGA_CATEGORIES.map((c) => (
                                  <li key={c.id}>
                                    <Link to="/products" className="block rounded-lg px-3 py-1.5 text-xs text-gigar-navy/60 hover:text-gigar-red">
                                      {c.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
                <li className="mt-4 flex flex-col gap-2">
                  {isAdmin ? (
                    <>
                      <Link to="/admin" className="btn-primary w-full">Admin Dashboard</Link>
                      <button onClick={() => { logout(); navigate('/') }} className="btn-outline w-full">Logout</button>
                    </>
                  ) : (
                    <Link to="/login" className="btn-outline w-full">Login</Link>
                  )}
                  <a href="tel:+251115518267" className="btn-primary w-full">Get a Quote</a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiMenu, FiX, FiLogOut, FiShield, FiChevronDown,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

// The 3 service lines shown in the click-toggled horizontal bar.
const SERVICE_LINES = [
  { id: 'supplying-and-installing', label: 'Supplying & Installing Equipments', short: 'Supplying & Installing' },
  { id: 'maintenance-service',     label: 'Maintenance Service',                short: 'Maintenance Service' },
  { id: 'technical-consultancy',    label: 'Technical Consultancy',              short: 'Technical Consultancy' },
]

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', isServices: true },  // special — toggles the bar
  { label: 'Products', to: '/products' },
  { label: 'Customers', to: '/customers' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)  // mobile drawer
  const [servicesOpen, setServicesOpen] = useState(false) // Services bar
  const { user, isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the Services bar + mobile drawer whenever the route changes
  useEffect(() => {
    setServicesOpen(false)
    setOpen(false)
  }, [location.pathname])

  // Click a service line → navigate to /services with hash for that line
  const goService = (line) => {
    setServicesOpen(false)
    navigate(`/services#${line.id}`)
  }

  return (
    <>
      {/* Top utility strip — hidden on mobile */}
      <div className="hidden bg-gigar-navy text-white/80 lg:block">
        <div className="container-page flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href="mailto:info@gigartrading.com" className="hover:text-gigar-gold">info@gigartrading.com</a>
            <a href="tel:+251115518267" className="hover:text-gigar-gold">+251 115 51 82 67</a>
            <span className="hidden items-center gap-1.5 xl:flex">Ledeta St, Addis Ababa, Ethiopia</span>
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
          {/* Logo — text only, no square icon */}
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col leading-none"
            >
              <span className="font-display text-xl font-extrabold tracking-tight text-gigar-navy lg:text-2xl">
                GIGAR
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gigar-red sm:text-xs">
                Trading & Technical Center
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) =>
              item.isServices ? (
                // Special Services item — toggles the horizontal bar (no hover menu)
                <li key="services">
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      servicesOpen || location.pathname.startsWith('/services')
                        ? 'text-gigar-red'
                        : 'text-gigar-navy hover:text-gigar-red'
                    }`}
                  >
                    Services
                    <FiChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
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

        {/* Click-toggled Services bar — horizontal, right below the navbar */}
        <AnimatePresence>
          {servicesOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden border-t border-gigar-navy/10 bg-white"
            >
              <div className="container-page py-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gigar-navy/50">
                  Our service lines
                </p>
                <div className="flex flex-wrap items-stretch gap-3">
                  {SERVICE_LINES.map((line, i) => (
                    <button
                      key={line.id}
                      onClick={() => goService(line)}
                      className="group flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-gigar-navy/10 bg-gigar-mist px-5 py-4 text-left transition hover:border-gigar-red/40 hover:bg-white hover:shadow-gigar-soft sm:flex-1"
                    >
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gigar-red text-sm font-extrabold text-white">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold text-gigar-navy group-hover:text-gigar-red">
                          {line.label}
                        </div>
                        <div className="truncate text-[11px] text-gigar-navy/60">
                          View details →
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                {NAV.map((item, i) =>
                  item.isServices ? (
                    <motion.li key="services" initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                      <button
                        onClick={() => setServicesOpen((v) => !v)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-gigar-navy hover:bg-gigar-navy/5"
                      >
                        Services
                        <FiChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {servicesOpen && (
                        <ul className="ml-3 border-l border-gigar-navy/10 pl-3">
                          {SERVICE_LINES.map((line) => (
                            <li key={line.id}>
                              <button
                                onClick={() => goService(line)}
                                className="block rounded-lg px-3 py-2 text-sm text-gigar-navy/70 hover:text-gigar-red"
                              >
                                {line.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  ) : (
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
                    </motion.li>
                  ),
                )}
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

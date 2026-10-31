import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiMenu, FiX, FiLogOut, FiShield,
  FiHome, FiInfo, FiGrid, FiBox, FiUsers, FiFileText, FiMail,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { label: 'Home',      to: '/',          icon: FiHome },
  { label: 'About',     to: '/about',     icon: FiInfo },
  { label: 'Services',  to: '/services',  icon: FiGrid },
  { label: 'Products',  to: '/products',  icon: FiBox },
  { label: 'Customers', to: '/customers', icon: FiUsers },
  { label: 'Blog',      to: '/blog',      icon: FiFileText },
  { label: 'Contact',   to: '/contact',   icon: FiMail },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)  // mobile drawer
  const { user, isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile drawer whenever the route changes
  useEffect(() => { setOpen(false) }, [location.pathname])

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
          scrolled ? 'bg-gigar-red/95 shadow-gigar-soft backdrop-blur-md' : 'bg-gigar-red/95'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between lg:h-24 xl:h-28">
          {/* Logo — image + text lockup */}
          <Link to="/" className="flex items-center gap-3">
            <motion.img
              src="/logo.png"
              alt="Gigar Trading logo"
              className="h-10 w-auto lg:h-12"
              initial={{ rotate: -8, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ rotate: -2, scale: 1.04 }}
            />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col leading-none"
            >
              <span className="font-display text-xl font-extrabold tracking-tight text-white lg:text-2xl">
                GIGAR
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 sm:text-xs">
                Trading & Technical Center
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav — icons stacked ABOVE text (column layout).
              flex-1 + justify-evenly spreads the items across the
              available width so they don't bunch up on wide screens. */}
          <ul className="hidden flex-1 items-center justify-center justify-evenly gap-1 lg:flex lg:px-4 xl:px-8">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive ? 'text-gigar-redHover' : 'text-white hover:text-gigar-redHover'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className="h-7 w-7" strokeWidth={2.75} />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gigar-redHover"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA + Admin login — buttons adapted for the beige-grey navbar background */}
          <div className="hidden items-center gap-3 lg:flex">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <Link to="/admin" className="inline-flex items-center justify-center gap-2 rounded-full bg-gigar-navy px-4 py-2 text-sm font-semibold text-white shadow-gigar-soft transition hover:-translate-y-0.5 hover:bg-gigar-navyDark">
                  <FiShield className="h-4 w-4" /> Admin
                </Link>
                <button onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/15">
                  <FiLogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/15">
                <FiShield className="h-4 w-4" /> Login
              </Link>
            )}
            <a href="tel:+251115518267" className="inline-flex items-center justify-center gap-2 rounded-full bg-gigar-navy px-5 py-2 text-sm font-semibold text-white shadow-gigar-soft transition hover:-translate-y-0.5 hover:bg-gigar-navyDark">
              Get a Quote
            </a>
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

        {/* Mobile drawer — all items are plain links, no expandable sections */}
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
                        `flex items-center gap-3 rounded-lg px-3 py-3 text-base font-semibold ${
                          isActive ? 'bg-gigar-redHover/10 text-gigar-redHover' : 'text-gigar-navy hover:bg-gigar-navy/5 hover:text-gigar-redHover'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </NavLink>
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

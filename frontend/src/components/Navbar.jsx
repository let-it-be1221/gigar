import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiLogOut, FiShield, FiChevronDown } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { publicApi } from '../api/client'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuHeight, setMenuHeight] = useState(0)
  const { user, isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Top utility strip — hidden on mobile */}
      <div className="hidden bg-gigar-navy text-white/80 lg:block">
        <div className="container-page flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href="mailto:info@gigartrading.com" className="flex items-center gap-1.5 hover:text-gigar-gold">
              <span>✉</span> info@gigartrading.com
            </a>
            <a href="tel:+251115518267" className="flex items-center gap-1.5 hover:text-gigar-gold">
              <span>☎</span> +251 115 51 82 67
            </a>
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
          scrolled ? 'bg-white/95 shadow-gigar-soft backdrop-blur-md' : 'bg-white/0 lg:bg-white/0'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.img
              src="/logo.png"
              alt="Gigar Trading logo"
              className="h-10 w-auto rounded-md shadow-gigar-soft lg:h-12"
              initial={{ rotate: -8, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ rotate: -2, scale: 1.04 }}
            />
            <div className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-base font-extrabold tracking-tight text-gigar-navy lg:text-lg">
                GIGAR
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gigar-red">
                Trading & Technical Center
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
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
            ))}
          </ul>

          {/* CTA + Admin */}
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
                <FiShield className="h-4 w-4" /> Admin Login
              </Link>
            )}
            <a href="tel:+251115518267" className="btn-primary !px-5 !py-2">
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
                  <motion.li
                    key={item.to}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
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
                ))}
                <li className="mt-4 flex flex-col gap-2">
                  {isAdmin ? (
                    <>
                      <Link to="/admin" className="btn-primary w-full">Admin Dashboard</Link>
                      <button onClick={() => { logout(); navigate('/') }} className="btn-outline w-full">Logout</button>
                    </>
                  ) : (
                    <Link to="/login" className="btn-outline w-full">Admin Login</Link>
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

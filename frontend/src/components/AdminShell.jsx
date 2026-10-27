import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiLayout, FiFileText, FiPlus, FiImage, FiUsers, FiLogOut, FiExternalLink,
  FiChevronLeft,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { to: '/admin',            label: 'Dashboard',  icon: FiLayout, end: true },
  { to: '/admin/posts',      label: 'All Posts',  icon: FiFileText },
  { to: '/admin/posts/new',  label: 'New Post',   icon: FiPlus },
  { to: '/admin/carousel',   label: 'Carousel',   icon: FiImage },
  { to: '/admin/customers',  label: 'Customers',  icon: FiUsers },
]

export default function AdminShell({ title = 'Admin', subtitle, action, children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gigar-mist">
      {/* Top strip */}
      <div className="bg-gigar-navy text-white">
        <div className="container-page flex h-14 items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2 font-display font-extrabold">
            <img src="/logo.png" alt="" className="h-8 w-8" />
            <span>Gigar <span className="text-gigar-gold">Admin</span></span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-white/70 sm:block">Hi, {user?.name?.split(' ')[0]}</span>
            <Link to="/" className="flex items-center gap-1 text-xs font-semibold text-gigar-gold hover:underline">
              View site <FiExternalLink className="h-3 w-3" />
            </Link>
            <button onClick={() => { logout(); navigate('/') }} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-gigar-red">
              <FiLogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-6 py-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <nav className="sticky top-6 space-y-1 rounded-2xl bg-white p-3 shadow-gigar-soft">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                    isActive ? 'bg-gigar-red text-white shadow-gigar-glow' : 'text-gigar-navy hover:bg-gigar-navy/5'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
            <div className="my-3 border-t border-gigar-navy/10" />
            <button onClick={() => { logout(); navigate('/') }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gigar-navy/70 hover:bg-gigar-red hover:text-white transition">
              <FiLogOut className="h-4 w-4" /> Logout
            </button>
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden">
          <nav className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    isActive ? 'bg-gigar-red text-white' : 'bg-white text-gigar-navy shadow-sm'
                  }`
                }
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Main */}
        <main>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex flex-wrap items-end justify-between gap-3"
          >
            <div>
              <Link to="/admin" className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-gigar-navy/60 hover:text-gigar-red">
                <FiChevronLeft /> Dashboard
              </Link>
              <h1 className="font-display text-3xl font-extrabold text-gigar-navy">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-gigar-navy/70">{subtitle}</p>}
            </div>
            {action}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

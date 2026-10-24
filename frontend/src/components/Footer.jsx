import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiMapPin, FiPhone, FiMail, FiClock, FiArrowUp,
  FiFacebook, FiTwitter, FiLinkedin, FiYoutube, FiSend,
} from 'react-icons/fi'

const SERVICE_LINKS = [
  'GPS & Speed Limit Devices',
  'BendPak Car Lifts',
  'Garage Equipment',
  'Elevators & Escalators',
  'OMIA Paint Booths',
  'Heavy Equipment',
]

const COMPANY_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Blog & News', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative overflow-hidden bg-gigar-navy text-white">
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-gigar-red/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-gigar-red/20 blur-3xl" />

      {/* Top CTA strip */}
      <div className="relative border-b border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-6 py-10 lg:flex-row">
          <div>
            <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
              Ready to upgrade your workshop or facility?
            </h3>
            <p className="mt-2 max-w-xl text-sm text-white/70">
              Talk to our team about garage equipment, lifts, elevators and industrial machinery —
              we design, supply and install across Ethiopia.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+251115518267" className="btn-primary">Call +251 115 51 82 67</a>
            <Link to="/contact" className="btn-ghost">Get a Quote</Link>
          </div>
        </div>
      </div>

      <div className="container-page relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <motion.img
            src="/logo.png" alt="Gigar Trading logo"
            className="h-16 w-auto rounded-md"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Gigar Trading & Technical Center has been Ethiopia's trusted supplier of garage
            equipment, lifts and industrial machinery since 1985 E.C. — importing world-class brands
            with full local installation and after-sales support.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[FiFacebook, FiTwitter, FiLinkedin, FiYoutube].map((Icon, i) => (
              <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-gigar-red hover:scale-110">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-gigar-gold">Our Services</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {SERVICE_LINKS.map((s) => (
              <li key={s}>
                <Link to="/services" className="inline-flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                  <span className="text-gigar-red">›</span> {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-gigar-gold">Company</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {COMPANY_LINKS.map((c) => (
              <li key={c.to}>
                <Link to={c.to} className="hover:text-white hover:translate-x-1 transition-all">{c.label}</Link>
              </li>
            ))}
          </ul>
          <h4 className="mb-3 mt-6 text-sm font-bold uppercase tracking-[0.18em] text-gigar-gold">Newsletter</h4>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email" placeholder="Your email"
              className="flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:border-gigar-red focus:outline-none"
            />
            <button type="submit" className="rounded-full bg-gigar-red p-2.5 hover:bg-gigar-redDark transition-colors">
              <FiSend className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-gigar-gold">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 h-4 w-4 text-gigar-red" />
              <span>Ledeta St, Addis Ababa, Ethiopia</span>
            </li>
            <li className="flex items-start gap-3">
              <FiPhone className="mt-0.5 h-4 w-4 text-gigar-red" />
              <a href="tel:+251115518267" className="hover:text-white">+251 115 51 82 67</a>
            </li>
            <li className="flex items-start gap-3">
              <FiMail className="mt-0.5 h-4 w-4 text-gigar-red" />
              <a href="mailto:info@gigartrading.com" className="hover:text-white">info@gigartrading.com</a>
            </li>
            <li className="flex items-start gap-3">
              <FiClock className="mt-0.5 h-4 w-4 text-gigar-red" />
              <span>Mon – Fri: 8:00 AM – 6:00 PM<br/>Saturday: 8:00 AM – 12:00 PM · Sunday: Closed</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Gigar Trading & Technical Center. All rights reserved.</p>
          <p>Built with React + Laravel + MySQL · Crafted with passion in Addis Ababa.</p>
          <button
            onClick={scrollTop}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-gigar-red hover:scale-110"
            aria-label="Back to top"
          >
            <FiArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FiArrowRight, FiCheckCircle, FiAward, FiTruck,
  FiShield, FiHeadphones, FiZap,
} from 'react-icons/fi'
import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import BlogCard from '../components/BlogCard'
import AnimatedSection from '../components/AnimatedSection'
import Loader from '../components/Loader'
import { publicApi } from '../api/client'

const WHY_US = [
  { icon: FiAward,      title: '39+ Years of Trust', text: 'Serving Ethiopian industry since 1985 E.C. with consistent, certified quality.' },
  { icon: FiShield,     title: 'Authorized Distributor', text: 'Official partner of BendPak, Fujitsu, OMIA, VTEQ and Electrolux.' },
  { icon: FiTruck,      title: 'Full Installation', text: 'From site survey to commissioning — our team handles the entire project.' },
  { icon: FiHeadphones, title: '24/7 After-Sales', text: 'Maintenance contracts and emergency call-out support across the country.' },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Consultation',    text: 'Tell us about your workshop or facility — our engineers will recommend the right equipment.' },
  { step: '02', title: 'Site Survey',     text: 'We visit your location, take measurements and prepare a detailed proposal.' },
  { step: '03', title: 'Supply & Install', text: 'Equipment is imported, delivered and professionally installed by certified technicians.' },
  { step: '04', title: 'After-Sales',     text: 'Training, warranty support and annual maintenance keep your equipment running for decades.' },
]

const BRAND_LOGOS = ['BendPak', 'Fujitsu', 'OMIA', 'VTEQ', 'Electrolux', 'LGS', 'Schindler', 'Otis']

export default function Home() {
  const [services, setServices]       = useState([])
  const [featured, setFeatured]       = useState([])
  const [loading, setLoading]         = useState(true)

  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    Promise.all([publicApi.services(), publicApi.featuredPosts()])
      .then(([s, f]) => {
        setServices(s.data.services || [])
        setFeatured(f.data || [])
      })
      .catch(() => {
        // Fallback services if backend is not running
        setServices([
          { icon: 'lift', title: 'BendPak Car Lifts', tagline: 'Premium vehicle lifts', description: 'Two-post and four-post lifts for workshops and garages.' },
          { icon: 'speed', title: 'GPS & Speed Limit Devices', tagline: 'Fleet safety compliance', description: 'GPS-based speed-limiting devices for commercial vehicles.' },
          { icon: 'elevator', title: 'Elevators & Escalators', tagline: 'Vertical transport', description: 'Building elevators, escalators and stair lifts.' },
          { icon: 'spray', title: 'OMIA Paint Booths', tagline: 'Professional paint booths', description: 'Dust-free, temperature-controlled spray environments.' },
          { icon: 'ac', title: 'Fujitsu Air Conditioners', tagline: 'Cooling solutions', description: 'Split, cassette and VRF AC systems for any space.' },
          { icon: 'truck', title: 'Heavy Equipment', tagline: 'Industrial machinery', description: 'Excavators, loaders, generators and material-handling equipment.' },
        ])
        setFeatured([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {/* Reading progress bar */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed left-0 top-0 z-50 h-1 bg-gigar-red"
      />

      {/* HERO */}
      <Hero />

      {/* BRANDS MARQUEE */}
      <section className="border-y border-gigar-navy/10 bg-gigar-mist py-8">
        <div className="container-page">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.25em] text-gigar-navy/50">
            Official authorized distributor of world-class brands
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {BRAND_LOGOS.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08, color: '#c8102e' }}
                className="flex items-center justify-center rounded-xl bg-white px-3 py-4 text-center font-display text-lg font-bold text-gigar-navy shadow-sm"
              >
                {b}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section id="services" className="relative py-20 lg:py-28">
        <div className="container-page">
          <AnimatedSection className="mx-auto mb-14 max-w-3xl text-center">
            <span className="section-eyebrow">
              <FiZap className="h-3.5 w-3.5" /> Our Services
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
              Everything your workshop & facility needs — under one roof
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gigar-navy/70">
              From imported premium equipment to professional installation and lifetime after-sales
              support, Gigar Trading delivers end-to-end industrial solutions across Ethiopia.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="flex justify-center py-16"><Loader label="Loading services…" /></div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <ServiceCard key={s.id || s.title} service={s} index={i} />
              ))}
            </div>
          )}

          <AnimatedSection className="mt-12 text-center">
            <Link to="/services" className="btn-primary">
              See all services <FiArrowRight />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative overflow-hidden bg-gigar-navy py-20 text-white lg:py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gigar-red/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gigar-gold/10 blur-3xl" />

        <div className="container-page relative">
          <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20">
              Why Gigar
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              The trusted industrial partner for Ethiopian businesses
            </h2>
            <p className="mt-4 text-white/70">
              For nearly four decades, organizations across Ethiopia have relied on Gigar Trading
              for premium equipment, expert installation and unwavering after-sales support.
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-gigar-red/40 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gigar-red/20 text-gigar-red transition-all group-hover:bg-gigar-red group-hover:text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / HOW WE WORK */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
            <span className="section-eyebrow">How we work</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
              A clear path from enquiry to operational equipment
            </h2>
            <p className="mt-4 text-gigar-navy/70">
              Our four-step process keeps every project transparent, predictable and on schedule —
              so your equipment is installed right the first time.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-0 top-12 hidden h-0.5 w-full bg-gigar-navy/10 lg:block">
              <motion.div
                className="h-full bg-gradient-to-r from-gigar-red to-gigar-gold"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
            </div>

            <div className="grid gap-8 lg:grid-cols-4">
              {PROCESS_STEPS.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gigar-red font-display text-2xl font-extrabold text-white shadow-gigar-glow">
                    {s.step}
                  </div>
                  <h3 className="mt-5 text-center font-display text-lg font-bold text-gigar-navy">{s.title}</h3>
                  <p className="mt-2 text-center text-sm leading-relaxed text-gigar-navy/70">{s.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BLOG */}
      <section className="bg-gigar-mist py-20 lg:py-28">
        <div className="container-page">
          <AnimatedSection className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="section-eyebrow">Latest from the blog</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
                News, projects & technical insights
              </h2>
              <p className="mt-4 text-gigar-navy/70">
                Read the latest product launches, installation walkthroughs and technical guides
                from our team in Addis Ababa.
              </p>
            </div>
            <Link to="/blog" className="btn-outline whitespace-nowrap">
              All posts <FiArrowRight />
            </Link>
          </AnimatedSection>

          {loading ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {[0, 1].map((i) => (
                <div key={i} className="h-72 rounded-2xl shimmer" />
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {featured.slice(0, 2).map((p, i) => (
                <BlogCard key={p.id} post={p} index={i} />
              ))}
              {featured.slice(2, 4).length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
                  {featured.slice(2, 4).map((p, i) => (
                    <BlogCard key={p.id} post={p} index={i} compact />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gigar-navy/60">
              No blog posts yet — please check back soon.{' '}
              <Link to="/blog" className="font-semibold text-gigar-red hover:underline">Browse all posts →</Link>
            </p>
          )}
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="relative overflow-hidden bg-gigar-red py-16 text-white">
        <div className="container-page relative">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { v: '1985', l: 'Year established' },
              { v: '39+',  l: 'Years of experience' },
              { v: '12',   l: 'Global brand partners' },
              { v: '500+', l: 'Projects delivered' },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">{s.v}</div>
                <div className="mt-2 text-sm font-medium uppercase tracking-widest text-white/80">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <AnimatedSection className="relative overflow-hidden rounded-3xl bg-gigar-navy px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gigar-red/30 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                Let's build your next project together
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/70">
                Tell us about your workshop, building or industrial project — our team will design
                a complete equipment supply and installation package tailored to your needs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">Get a Free Quote <FiArrowRight /></Link>
                <a href="tel:+251115518267" className="btn-ghost">Call +251 115 51 82 67</a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/70">
                {['Free consultation', 'Site survey included', '5-year warranty', 'Nationwide delivery'].map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5">
                    <FiCheckCircle className="h-4 w-4 text-gigar-gold" /> {f}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

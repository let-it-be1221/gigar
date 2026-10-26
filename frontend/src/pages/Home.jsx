import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FiArrowRight, FiCheckCircle, FiAward, FiTruck,
  FiShield, FiHeadphones, FiZap,
} from 'react-icons/fi'
import HeroCarousel from '../components/HeroCarousel'
import BlogCard from '../components/BlogCard'
import AnimatedSection from '../components/AnimatedSection'
import Loader from '../components/Loader'
import SmartImage from '../components/SmartImage'
import { publicApi } from '../api/client'

const WHY_US = [
  { icon: FiAward, title: '39+ Years of Trust', text: 'Serving Ethiopian industry since 1985 E.C. with consistent, certified quality.' },
  { icon: FiShield, title: 'Authorized Distributor', text: 'Official partner of BendPak, Fujitsu, OMIA, VTEQ and Electrolux.' },
  { icon: FiTruck, title: 'Full Installation', text: 'From site survey to commissioning — our team handles the entire project.' },
  { icon: FiHeadphones, title: '24/7 After-Sales', text: 'Maintenance contracts and emergency call-out support across the country.' },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Consultation', text: 'Tell us about your workshop or facility — our engineers will recommend the right equipment.' },
  { step: '02', title: 'Site Survey', text: 'We visit your location, take measurements and prepare a detailed proposal.' },
  { step: '03', title: 'Supply & Install', text: 'Equipment is imported, delivered and professionally installed by certified technicians.' },
  { step: '04', title: 'After-Sales', text: 'Training, warranty support and annual maintenance keep your equipment running for decades.' },
]

// Sample brand logos — each entry has a sample image URL the admin can later
// replace with the real brand logos. Using picsum.photos seed URLs which are
// 100% reliable. To swap a logo: edit the `image` field below to point to your
// own /public/uploads/<brand>.png or any other URL.
const BRAND_LOGOS = [
  { name: 'BendPak', image: 'https://picsum.photos/seed/bendpak/240/120' },
  { name: 'Fujitsu', image: 'https://picsum.photos/seed/fujitsu/240/120' },
  { name: 'OMIA', image: 'https://picsum.photos/seed/omia/240/120' },
  { name: 'VTEQ', image: 'https://picsum.photos/seed/vteq/240/120' },
  { name: 'Electrolux', image: 'https://picsum.photos/seed/electrolux/240/120' },
  { name: 'LGS', image: 'https://picsum.photos/seed/lgs/240/120' },
  { name: 'Schindler', image: 'https://picsum.photos/seed/schindler/240/120' },
  { name: 'Otis', image: 'https://picsum.photos/seed/otis/240/120' },
]

// Sample service line cover images — admin can swap by editing this map.
const SERVICE_IMAGES = {
  'supplying-and-installing': 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80&auto=format&fit=crop',
  'maintenance-service': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80&auto=format&fit=crop',
  'technical-consultancy': 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80&auto=format&fit=crop',
}

const SERVICE_ICONS = {
  'supplying-and-installing': '🔧',
  'maintenance-service': '🛠️',
  'technical-consultancy': '📐',
}

// Sample product images — these match the products in the API catalog.
// Each entry: { icon, image }. The `icon` is used as an emoji overlay; the
// `image` is the displayed photo. Admin can swap each by editing this map.
const PRODUCT_IMAGES = {
  'building-elevators': { image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80&auto=format&fit=crop' },
  'building-lifts': { image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop' },
  'paint-booths': { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop' },
  'vehicle-test-equipment': { image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80&auto=format&fit=crop' },
  'facility-equipment': { image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80&auto=format&fit=crop' },
  'car-lifts': { image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop' },
  'gps-speed-limit': { image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80&auto=format&fit=crop' },
  'heavy-equipment': { image: 'https://picsum.photos/seed/heavy-equipment/800/600' },
}

export default function Home() {
  const [services, setServices] = useState([])
  const [products, setProducts] = useState([])
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    Promise.all([
      publicApi.services(),
      publicApi.products(),
      publicApi.featuredPosts(),
    ])
      .then(([s, p, f]) => {
        setServices(s.data.services || [])
        setProducts(p.data.products || [])
        setFeatured(f.data || [])
      })
      .catch(() => {
        setServices([])
        setProducts([])
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

      {/* HERO CAROUSEL */}
      <HeroCarousel />

      {/* BRANDS MARQUEE — sample logo images the admin can later swap */}
      <section className="border-y border-gigar-navy/10 bg-gigar-mist py-8">
        <div className="container-page">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.25em] text-gigar-navy/50">
            Official authorized distributor of world-class brands
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {BRAND_LOGOS.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-white px-3 py-4 shadow-sm ring-1 ring-gigar-navy/5 transition hover:shadow-gigar-soft hover:ring-gigar-red/20"
              >
                <SmartImage
                  src={b.image}
                  alt={`${b.name} logo`}
                  fallbackSeed={b.name.toLowerCase()}
                  className="h-12 w-full max-w-[120px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <span className="mt-2 text-xs font-bold uppercase tracking-wider text-gigar-navy/60 transition group-hover:text-gigar-red">
                  {b.name}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-center text-[10px] text-gigar-navy/40">
            Sample brand logos — the admin can swap these for the real logos later in <code className="rounded bg-gigar-navy/5 px-1">Home.jsx → BRAND_LOGOS</code>.
          </p>
        </div>
      </section>

      {/* SERVICE LINES — the 3 core services */}
      <section id="services" className="relative py-20 lg:py-28">
        <div className="container-page">
          <AnimatedSection className="mx-auto mb-14 max-w-3xl text-center">
            <span className="section-eyebrow">
              <FiZap className="h-3.5 w-3.5" /> Our Services
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
              Three ways we power your operation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gigar-navy/70">
              From equipment supply and installation to lifetime maintenance and engineering consultancy — Gigar Trading is your full-service industrial partner.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[0, 1, 2].map((i) => <div key={i} className="h-96 rounded-2xl shimmer" />)}
            </div>
          ) : services.length === 0 ? null : (
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((s, i) => {
                const img = SERVICE_IMAGES[s.id] || `https://picsum.photos/seed/${s.id}/800/600`
                const emoji = SERVICE_ICONS[s.id] || '⚙️'
                return (
                  <motion.div
                    key={s.id || s.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-gigar-soft transition-all hover:border-gigar-red/30 hover:shadow-gigar-glow"
                  >
                    {/* Cover image */}
                    <div className="relative h-44 overflow-hidden">
                      <SmartImage
                        src={img}
                        alt={s.title}
                        fallbackSeed={s.id}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/90 via-gigar-navy/40 to-transparent" />
                      {/* Emoji badge */}
                      <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-2xl shadow-gigar-soft backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        {emoji}
                      </div>
                      {/* Service line label */}
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gigar-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          {s.line || s.title}
                        </span>
                        <h3 className="mt-2 font-display text-xl font-bold text-white drop-shadow-md">{s.title}</h3>
                        <p className="mt-0.5 text-xs font-semibold text-gigar-gold drop-shadow">{s.tagline}</p>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-sm leading-relaxed text-gigar-navy/75">{s.description}</p>
                      {s.highlights && s.highlights.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {s.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2 text-sm text-gigar-navy/80">
                              <FiCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gigar-red" /> {h}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link to={`/services#${s.id || ''}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gigar-red hover:gap-2.5 transition-all">
                        Learn more <FiArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          <AnimatedSection className="mt-12 text-center">
            <Link to="/services" className="btn-primary">
              See all services <FiArrowRight />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FEATURED PRODUCTS — image cards with hover zoom + overlay */}
      <section className="bg-gigar-mist py-20 lg:py-28">
        <div className="container-page">
          <AnimatedSection className="mx-auto mb-14 max-w-3xl text-center">
            <span className="section-eyebrow">Our Products</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
              Equipment we supply, install & maintain
            </h2>
            <p className="mt-4 text-gigar-navy/70">
              Building elevators, lifts, paint booths, vehicle test equipment, facility equipment and more — backed by authorized distributor partnerships.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => <div key={i} className="h-80 rounded-2xl shimmer" />)}
            </div>
          ) : products.length === 0 ? null : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 8).map((p, i) => {
                const imgMeta = PRODUCT_IMAGES[p.id] || { emoji: '⚙️', image: `https://picsum.photos/seed/${p.id}/600/450` }
                return (
                  <motion.div
                    key={p.id || p.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    whileHover={{ y: -8 }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-gigar-soft transition-all hover:border-gigar-red/30 hover:shadow-gigar-glow"
                  >
                    {/* Image with hover zoom + overlay */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SmartImage
                        src={imgMeta.image}
                        alt={p.title}
                        fallbackSeed={p.id}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Dark gradient overlay for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/80 via-gigar-navy/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                      {/* Floating emoji badge */}
                      <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-gigar-soft backdrop-blur transition-transform duration-300 group-hover:scale-110">
                        {imgMeta.emoji}
                      </div>
                      {/* Title overlay on image (appears on hover) */}
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h3 className="font-display text-base font-bold text-white drop-shadow-md line-clamp-2">{p.title}</h3>
                        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-gigar-gold drop-shadow">{p.tagline}</p>
                      </div>
                    </div>
                    {/* Description */}
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-xs leading-relaxed text-gigar-navy/70 line-clamp-3">{p.description}</p>
                      {p.features && p.features.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.features.slice(0, 2).map((f) => (
                            <span key={f} className="rounded-md bg-gigar-red/8 px-2 py-0.5 text-[10px] font-semibold text-gigar-red">
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                      <Link to="/products" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gigar-red transition-all hover:gap-2">
                        View details <FiArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          <AnimatedSection className="mt-12 text-center">
            <Link to="/products" className="btn-primary">
              View all products <FiArrowRight />
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
              { v: '39+', l: 'Years of experience' },
              { v: '12', l: 'Global brand partners' },
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

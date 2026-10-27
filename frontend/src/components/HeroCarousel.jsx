import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowRight, FiArrowLeft, FiChevronRight, FiZap } from 'react-icons/fi'
import { publicApi } from '../api/client'
import SmartImage from './SmartImage'

const AUTOPLAY_MS = 6000

// Fallback slides if the API is unreachable.
// All URLs below have been verified to return HTTP 200 (or use SmartImage
// which auto-falls back to picsum.photos on any 404).
const FALLBACK_SLIDES = [
  {
    id: 1, badge: 'Vertical Transport', category: 'Elevators',
    title: 'Building Elevators & Escalators',
    subtitle: 'Traction, hydraulic & MRL elevator systems installed and serviced across Ethiopia.',
    image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80&auto=format&fit=crop',
    cta_text: 'Explore elevators', cta_link: '/products',
  },
  {
    id: 2, badge: 'Authorized Distributor', category: 'Lifts',
    title: 'BendPak Car Lifts',
    subtitle: 'Premium two-post & four-post vehicle lifts for professional workshops.',
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80&auto=format&fit=crop',
    cta_text: 'Explore lifts', cta_link: '/products',
  },
  {
    id: 3, badge: 'Workshop Solutions', category: 'Paint Booths',
    title: 'OMIA Paint Booths',
    subtitle: 'Dust-free, temperature-controlled spray booths for professional paintwork.',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&auto=format&fit=crop',
    cta_text: 'Explore paint booths', cta_link: '/products',
  },
  {
    id: 4, badge: 'Inspection Technology', category: 'Vehicle Test Equipment',
    title: 'VTEQ Vehicle Test Equipment',
    subtitle: 'Brake, suspension, side-slip & headlight alignment test lanes for inspection centers.',
    image_url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1920&q=80&auto=format&fit=crop',
    cta_text: 'Explore test equipment', cta_link: '/products',
  },
  {
    id: 5, badge: 'Facility Solutions', category: 'Facility Equipment',
    title: 'Facility Equipment & Air Conditioning',
    subtitle: 'Fujitsu VRF systems, washing machines and complete facility cooling solutions.',
    image_url: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1920&q=80&auto=format&fit=crop',
    cta_text: 'Explore facility equipment', cta_link: '/products',
  },
]

const STATS = [
  { v: '39+',  label: 'Years in business' },
  { v: '500+', label: 'Workshops equipped' },
  { v: '12',   label: 'Global brand partners' },
  { v: '24/7', label: 'After-sales support' },
]

export default function HeroCarousel() {
  const [slides, setSlides]     = useState(FALLBACK_SLIDES)
  const [index, setIndex]       = useState(0)
  const [paused, setPaused]     = useState(false)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    publicApi.carousel()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) setSlides(data)
      })
      .catch(() => setSlides(FALLBACK_SLIDES))
  }, [])

  const total = slides.length

  const goNext = useCallback(() => {
    setDirection(1)
    setIndex((i) => (i + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goTo = (i) => {
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }

  useEffect(() => {
    if (paused || total <= 1) return
    const t = setInterval(goNext, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, total, goNext])

  const current = slides[index] || FALLBACK_SLIDES[0]

  return (
    <section
      className="relative isolate overflow-hidden bg-gigar-navy text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-[78vh] min-h-[600px] w-full">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.id}
            custom={direction}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SmartImage
              src={current.image_url}
              alt={current.title}
              fallbackSeed={`gigar-carousel-${current.id}`}
              className="h-full w-full object-cover"
              loading="eager"
            />
            {/* Lighter overlay: only a left-to-right gradient for text legibility on the
                left side; the right side of the carousel image shows through clearly. */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Floating accent shapes — kept subtle */}
        <motion.div
          className="pointer-events-none absolute right-10 top-24 h-64 w-64 rounded-full bg-gigar-red/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
      </div>

      {/* Content overlay */}
      <div className="container-page absolute inset-0 flex flex-col justify-center">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {current.badge && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20 backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gigar-gold" />
                  {current.badge}
                </span>
              )}
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {current.title}
              </h1>
              {current.subtitle && (
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
                  {current.subtitle}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-4">
                {current.cta_link && (
                  <Link to={current.cta_link} className="btn-primary">
                    {current.cta_text || 'Learn more'} <FiArrowRight />
                  </Link>
                )}
                <Link to="/products" className="btn-ghost">
                  View products <FiChevronRight />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 hidden grid-cols-2 gap-4 sm:grid sm:grid-cols-4 lg:max-w-2xl"
          >
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <div className="font-display text-2xl font-extrabold text-gigar-gold">{s.v}</div>
                <div className="text-xs font-medium text-white/70">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Navigation arrows */}
      {total > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur ring-1 ring-white/20 transition hover:bg-gigar-red hover:scale-110 sm:left-6"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur ring-1 ring-white/20 transition hover:bg-gigar-red hover:scale-110 sm:right-6"
          >
            <FiArrowRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots / progress bar */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id || i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative h-1.5 overflow-hidden rounded-full bg-white/30 transition-all"
              style={{ width: i === index ? '40px' : '14px' }}
            >
              {i === index && !paused && (
                <motion.span
                  key={`progress-${index}`}
                  className="absolute inset-0 bg-gigar-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
              )}
              {i === index && paused && <span className="absolute inset-0 bg-gigar-gold" />}
            </button>
          ))}
        </div>
      )}

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-2 text-sm font-semibold text-white/70 sm:flex">
        <FiZap className="h-4 w-4 text-gigar-gold" />
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </section>
  )
}

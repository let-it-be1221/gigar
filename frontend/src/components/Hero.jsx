import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gigar-navy text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1486006920555-c77dcf2a718e?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        {/* Animated grid */}
        <div className="absolute inset-0 bg-section-grid bg-grid-md opacity-30" />
      </div>

      {/* Floating accent shapes */}
      <motion.div
        className="pointer-events-none absolute right-10 top-24 h-64 w-64 rounded-full bg-gigar-red/30 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="pointer-events-none absolute left-10 bottom-10 h-48 w-48 rounded-full bg-gigar-gold/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />

      <div className="container-page relative py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20 backdrop-blur"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gigar-gold" />
              Trusted since 1985 E.C. — Ethiopia
            </motion.span>

            <motion.h1
              className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Power your industry with{' '}
              <span className="relative inline-block text-gigar-red">
                premium equipment
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 rounded-full bg-gigar-red"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                />
              </span>
              .
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              From <strong className="text-white">BendPak car lifts</strong> and{' '}
              <strong className="text-white">building elevators</strong> to{' '}
              <strong className="text-white">GPS speed-limit devices</strong>,{' '}
              <strong className="text-white">OMIA paint booths</strong> and{' '}
              <strong className="text-white">heavy machinery</strong> — Gigar Trading designs,
              supplies and installs the equipment that keeps Ethiopian industry moving.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <a href="#services" className="btn-primary">
                Explore Services <FiArrowRight />
              </a>
              <a href="/blog" className="btn-ghost">
                Latest News
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              {[
                { v: '39+', label: 'Years in business' },
                { v: '500+', label: 'Workshops equipped' },
                { v: '12', label: 'Global brand partners' },
                { v: '24/7', label: 'After-sales support' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                >
                  <div className="font-display text-2xl font-extrabold text-gigar-gold">{s.v}</div>
                  <div className="text-xs font-medium text-white/70">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side — featured card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.div
              className="relative rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="chip !bg-gigar-gold/20 !text-gigar-gold">Featured</span>
                <span className="text-xs font-medium text-white/60">Now installing</span>
              </div>
              <div className="relative h-48 overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1486006920555-c77dcf2a718e?w=800&q=80&auto=format&fit=crop"
                  alt="BendPak car lift"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/80 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <div className="text-sm font-bold">BendPak 2-Post Lift</div>
                  <div className="text-xs text-white/70">7,000kg capacity · 5-year warranty</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-white/80">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                  In-stock · Addis Ababa
                </div>
                <a href="/services" className="font-semibold text-gigar-gold hover:underline">
                  View details →
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="mt-12 flex justify-center lg:justify-start"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  )
}

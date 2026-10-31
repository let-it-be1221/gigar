import { motion } from 'framer-motion'
import {
  FiCheckCircle, FiInfo, FiZap, FiActivity, FiTrendingUp, FiAlertCircle,
} from 'react-icons/fi'
import AnimatedSection from './AnimatedSection'
import SmartImage from './SmartImage'

/**
 * Two-column "Key Specifications & Technical Briefing" card — built as an
 * original design following the concept the user shared (NOT copied):
 *  - Left card: technical / diagram-style content with a "How it works /
 *    Key Advantages / Best Used For" breakdown using checkmark bullets.
 *  - Right card: a hero photo with a graphic overlay (SPEED badge) followed
 *    by a structured data list (Residential / Commercial / Freight ranges)
 *    plus an "Impact" callout in a contrasting color.
 *
 * The design uses Gigar's own brand palette (beige-grey + warm dark + gold)
 * and our own Unsplash images, NOT the user's attached PNG.
 */
export default function TechnicalSpecs() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl">
      {/* Header — icon + title + subtitle, similar to a "briefing" header */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gigar-red text-white shadow-gigar-glow">
          <FiInfo className="h-7 w-7" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-extrabold text-gigar-navy sm:text-3xl">
            Key Specifications &amp; Technical Briefing
          </h2>
          <p className="mt-1 text-sm text-gigar-navy/70">
            A two-page technical brief on the elevator systems Gigar Trading supplies — drive technology, load capacity and speed.
          </p>
        </div>
      </div>

      {/* Two-column card grid (stacks on mobile) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ----- LEFT CARD: Drive & Machine Technology ----- */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border-2 border-gigar-navy/15 bg-white shadow-gigar-soft"
        >
          {/* Card header */}
          <div className="border-b border-gigar-navy/10 bg-gigar-mist px-6 py-4">
            <h3 className="font-display text-xl font-bold text-gigar-navy">Drive &amp; Machine Technology</h3>
            <p className="mt-0.5 text-sm font-semibold text-gigar-red">Traction or Hydraulic</p>
          </div>

          {/* Top visual — a building photo with a small data overlay strip */}
          <div className="relative h-56 overflow-hidden">
            <SmartImage
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80&auto=format&fit=crop"
              alt="Modern building exterior with elevator shaft visible"
              fallbackSeed="tech-building"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/85 via-transparent to-transparent" />
            {/* Numbered callout badges along the left edge (like the original's numbered steps) */}
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              {[
                { n: '1', icon: <FiZap className="h-3 w-3" /> },
                { n: '2', icon: <FiActivity className="h-3 w-3" /> },
                { n: '3', icon: <FiTrendingUp className="h-3 w-3" /> },
                { n: '4', icon: <FiCheckCircle className="h-3 w-3" /> },
              ].map((c) => (
                <div key={c.n} className="flex h-7 w-7 items-center justify-center gap-1 rounded-full bg-gigar-red text-white shadow-gigar-glow">
                  <span className="flex items-center justify-center">{c.icon}</span>
                </div>
              ))}
            </div>
            {/* Footer "tags" row at the bottom of the image area */}
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 px-4 pb-3 text-[10px] font-bold uppercase tracking-wider text-white/90">
              <span className="rounded-md bg-gigar-red/90 px-2 py-0.5">Safe</span>
              <span className="rounded-md bg-gigar-gold/90 px-2 py-0.5 text-gigar-navy">Energy Efficient</span>
              <span className="rounded-md bg-gigar-navy/80 px-2 py-0.5">Compact</span>
            </div>
          </div>

          {/* Body content */}
          <div className="p-6">
            <h4 className="font-display text-base font-bold text-gigar-navy">
              <span className="text-gigar-red">1.</span> Traction: Gearless vs. Geared
            </h4>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-gigar-red">
              <FiInfo className="h-4 w-4" />
              <span>Gearless (PMSM — Permanent Magnet Synchronous Motor)</span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-gigar-navy/80">
              <strong className="text-gigar-navy">How it works:</strong> A gearless traction drive uses a
              permanent-magnet synchronous motor directly coupled to the drive sheave — eliminating the
              gearbox entirely. The motor rotates the sheave, which moves steel ropes connected to the
              cabin on one side and a counterweight on the other. Without a gearbox, friction losses drop
              and ride smoothness improves dramatically.
            </p>

            <ul className="mt-4 space-y-2">
              {[
                'Highest energy efficiency — regenerative drives feed power back into the building',
                'Superior ride quality — virtually vibration-free at any speed',
                'Compact machine-room-less (MRL) design saves valuable floor space',
              ].map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-gigar-navy/85">
                  <FiCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gigar-red" />
                  {h}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm leading-relaxed text-gigar-navy/80">
              <strong className="text-gigar-navy">Best used for:</strong> mid- to high-rise residential
              and high-traffic commercial buildings where ride quality and energy efficiency matter most.
            </p>
          </div>
        </motion.article>

        {/* ----- RIGHT CARD: Load Capacity & Speed ----- */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border-2 border-gigar-navy/15 bg-white shadow-gigar-soft"
        >
          {/* Card header */}
          <div className="border-b border-gigar-navy/10 bg-gigar-mist px-6 py-4">
            <h3 className="font-display text-xl font-bold text-gigar-navy">Load Capacity &amp; Speed</h3>
            <p className="mt-0.5 text-sm font-semibold text-gigar-red">Sizing the elevator to the building</p>
          </div>

          {/* Hero photo with SPEED gauge overlay (matches the concept screenshot) */}
          <div className="relative h-56 overflow-hidden">
            <SmartImage
              src="https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=800&q=80&auto=format&fit=crop"
              alt="Passengers inside an elevator car"
              fallbackSeed="tech-elevator-people"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/80 to-transparent" />
            {/* SPEED gauge graphic — bottom-right corner */}
            <div className="absolute bottom-3 right-3 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gigar-red/95 text-white shadow-gigar-glow ring-4 ring-white/40">
              <div className="text-[10px] font-bold uppercase tracking-wider">SPEED</div>
              <div className="font-display text-base font-extrabold leading-none">m/s</div>
              <div className="mt-1 h-1.5 w-12 overflow-hidden rounded-full bg-white/30">
                <div className="h-full w-2/3 rounded-full bg-gigar-gold" />
              </div>
            </div>
          </div>

          {/* Structured data list */}
          <div className="p-6">
            <h4 className="font-display text-base font-bold text-gigar-navy">
              <span className="text-gigar-red">1.</span> Load Capacity (Rated Payload)
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-gigar-navy/80">
              <strong className="text-gigar-navy">How it works:</strong> Capacity is sized to the
              building's expected peak passenger flow, calculated at approximately 75 kg per person.
            </p>

            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2 text-sm text-gigar-navy/85">
                <FiCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gigar-red" />
                <span><strong className="text-gigar-navy">Residential:</strong> 450–1,000 kg (6–13 persons)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gigar-navy/85">
                <FiCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gigar-red" />
                <span><strong className="text-gigar-navy">Commercial / Public:</strong> 1,000–1,600+ kg (13–21 persons)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gigar-navy/85">
                <FiCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gigar-red" />
                <span><strong className="text-gigar-navy">Freight elevators:</strong> 2,000–5,000+ kg</span>
              </li>
            </ul>

            {/* Impact callout in a contrasting color (red text on tinted bg) */}
            <div className="mt-4 rounded-xl bg-gigar-redHover/10 p-3">
              <div className="flex items-start gap-2">
                <FiAlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gigar-redHover" />
                <p className="text-sm leading-relaxed text-gigar-navy/85">
                  <strong className="text-gigar-redHover">Impact:</strong> Oversizing wastes energy and
                  floor space; undersizing creates passenger bottlenecks during peak hours. A correctly
                  sized elevator balances comfort, efficiency and cost over the building's full lifecycle.
                </p>
              </div>
            </div>

            <h4 className="mt-5 font-display text-base font-bold text-gigar-navy">
              <span className="text-gigar-red">2.</span> Elevator Speed (m/s)
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-gigar-navy/80">
              <strong className="text-gigar-navy">How it works:</strong> Speed is measured in meters per
              second and directly affects travel time between floors — a critical factor for tall
              buildings where passenger wait time can compound across the day.
            </p>
          </div>
        </motion.article>
      </div>
    </AnimatedSection>
  )
}

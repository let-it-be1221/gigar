import { motion } from 'framer-motion'
import { FiZap, FiCheckCircle, FiTrendingUp, FiUsers, FiPackage } from 'react-icons/fi'
import SmartImage from './SmartImage'
import AnimatedSection from './AnimatedSection'

/**
 * SpecsCard — a "Key Specifications & technical briefing" section inspired
 * by a reference image the user shared, but with our own Unsplash images
 * (no copying of the reference). Two-column layout:
 *
 *   Left  — "Drive & Machine Technology" with motor image + advantages list
 *   Right — "Load Capacity & Speed" with elevator interior photo + capacity table
 *
 * The card focuses on Building Elevators (Gigar Trading's flagship
 * elevator product) but the same structure could be reused for other
 * equipment categories later.
 */

const DRIVE_ADVANTAGES = [
  {
    title: 'Highest energy efficiency',
    text: 'PMSM gearless motors consume up to 40% less energy than geared traction, with regenerative drives that feed braking energy back into the building grid.',
  },
  {
    title: 'Superior ride quality',
    text: 'Gearless direct drive delivers smooth start/stop with no mechanical jerk — passengers feel only a gentle acceleration from 0 to rated speed.',
  },
  {
    title: 'Compact machine-room-less design',
    text: 'MRL elevators integrate the motor into the hoistway itself, freeing up valuable floor space on the top floor that would otherwise be the machine room.',
  },
  {
    title: 'Whisper-quiet operation',
    text: 'PMSM motors run at 50-55 dB at 1m — quieter than a normal conversation — ideal for residential and hospital buildings.',
  },
]

const CAPACITY_ROWS = [
  { type: 'Residential',   kg: '450 – 1,000 kg',   people: '6 – 13',   speed: '1.0 – 1.75 m/s', color: 'bg-gigar-red/10 text-gigar-red' },
  { type: 'Commercial',    kg: '1,000 – 1,600 kg', people: '13 – 21',   speed: '1.6 – 2.5 m/s',  color: 'bg-gigar-navy/10 text-gigar-navy' },
  { type: 'Freight / Service', kg: '2,000 – 5,000+ kg', people: 'Heavy cargo', speed: '0.5 – 1.0 m/s', color: 'bg-gigar-gold/15 text-gigar-navy' },
]

export default function SpecsCard() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <AnimatedSection className="mx-auto mb-14 max-w-3xl text-center">
          <span className="section-eyebrow">
            <FiZap className="h-3.5 w-3.5" /> Key Specifications
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
            Building Elevators — technical briefing
          </h2>
          <p className="mt-4 text-gigar-navy/70">
            Drive technology, load capacity and rated speed for our traction, hydraulic and MRL elevator systems —
            the engineering details that decide which elevator fits your building.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT — Drive & Machine Technology */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-gigar-soft"
          >
            {/* Header strip */}
            <div className="flex items-center gap-3 bg-gigar-navy px-6 py-4 text-white">
              <FiZap className="h-5 w-5 text-gigar-gold" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gigar-gold">Drive &amp; Machine Technology</div>
                <h3 className="font-display text-lg font-bold">Gearless PMSM traction vs. hydraulic</h3>
              </div>
            </div>

            {/* Motor image with caption */}
            <div className="relative h-56 overflow-hidden">
              <SmartImage
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80&auto=format&fit=crop"
                alt="Elevator machine room with gearless PMSM motor"
                fallbackSeed="elevator-motor"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <div className="text-xs font-bold uppercase tracking-wider text-gigar-gold">Gearless PMSM motor</div>
                <div className="text-sm font-medium text-white/90">Permanent-magnet synchronous motor + traction sheave + counterweight</div>
              </div>
            </div>

            {/* Advantages list */}
            <div className="p-6">
              <p className="text-sm leading-relaxed text-gigar-navy/75">
                Gigar Trading installs three families of elevator drive systems. For mid- and high-rise buildings,
                gearless PMSM traction is the modern standard — offering the highest energy efficiency, smoothest
                ride quality and the most compact machine footprint.
              </p>
              <ul className="mt-5 space-y-4">
                {DRIVE_ADVANTAGES.map((a) => (
                  <li key={a.title} className="flex items-start gap-3">
                    <FiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gigar-red" />
                    <div>
                      <div className="text-sm font-bold text-gigar-navy">{a.title}</div>
                      <div className="mt-1 text-sm leading-relaxed text-gigar-navy/70">{a.text}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl bg-gigar-mist p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gigar-navy/50">Best for</div>
                <div className="mt-1 text-sm font-semibold text-gigar-navy">
                  Mid- to high-rise residential and high-traffic commercial buildings
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Load Capacity & Speed */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-gigar-navy/10 bg-white shadow-gigar-soft"
          >
            {/* Header strip */}
            <div className="flex items-center gap-3 bg-gigar-navy px-6 py-4 text-white">
              <FiTrendingUp className="h-5 w-5 text-gigar-gold" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gigar-gold">Load Capacity &amp; Speed</div>
                <h3 className="font-display text-lg font-bold">Sizing your elevator right</h3>
              </div>
            </div>

            {/* Elevator interior image */}
            <div className="relative h-56 overflow-hidden">
              <SmartImage
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop"
                alt="Passengers in a modern elevator cabin"
                fallbackSeed="elevator-interior"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gigar-navy/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gigar-gold">Capacity standard</div>
                  <div className="text-sm font-medium text-white/90">≈ 75 kg per passenger</div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
                  <FiTrendingUp className="h-4 w-4 text-gigar-gold" />
                  <span className="text-xs font-bold text-white">m/s</span>
                </div>
              </div>
            </div>

            {/* Capacity table */}
            <div className="p-6">
              <p className="text-sm leading-relaxed text-gigar-navy/75">
                Capacity is calculated at <strong>75 kg per passenger</strong>. Rated speed (in metres per second)
                determines how quickly passengers move between floors — every 0.5 m/s of additional speed saves
                about 1.5 seconds per stop in a 10-floor building.
              </p>

              <div className="mt-5 overflow-hidden rounded-xl border border-gigar-navy/10">
                <div className="grid grid-cols-4 bg-gigar-navy text-[10px] font-bold uppercase tracking-wider text-white">
                  <div className="px-3 py-2.5">Building type</div>
                  <div className="px-3 py-2.5">Capacity</div>
                  <div className="px-3 py-2.5">Passengers</div>
                  <div className="px-3 py-2.5">Speed</div>
                </div>
                {CAPACITY_ROWS.map((row, i) => (
                  <div
                    key={row.type}
                    className={`grid grid-cols-4 items-center text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gigar-mist'}`}
                  >
                    <div className="px-3 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-bold ${row.color}`}>
                        {row.type === 'Freight / Service' ? <FiPackage className="h-3 w-3" /> : <FiUsers className="h-3 w-3" />}
                        {row.type}
                      </span>
                    </div>
                    <div className="px-3 py-3 font-semibold text-gigar-navy">{row.kg}</div>
                    <div className="px-3 py-3 text-gigar-navy/70">{row.people}</div>
                    <div className="px-3 py-3 font-semibold text-gigar-red">{row.speed}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-gigar-mist p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gigar-navy/50">Need help choosing?</div>
                <div className="mt-1 text-sm font-semibold text-gigar-navy">
                  Our engineers provide free traffic analysis + load sizing for any building.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

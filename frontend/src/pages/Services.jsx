import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiArrowRight, FiPhone, FiCheckCircle, FiTool,
  FiShield, FiCompass, FiZap,
} from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import Loader from '../components/Loader'
import { publicApi } from '../api/client'

const ICONS = {
  toolbox: <FiTool className="h-8 w-8" />,
  wrench:  <FiShield className="h-8 w-8" />,
  compass: <FiCompass className="h-8 w-8" />,
}

const FALLBACK_SERVICES = [
  {
    id: 'supplying-and-installing', icon: 'toolbox', line: 'Supplying & Installing Equipments',
    title: 'Equipment Supply & Installation', tagline: 'Importing & commissioning world-class equipment',
    description: 'Gigar Trading imports and professionally installs a complete portfolio of industrial equipment — BendPak car lifts, building elevators & escalators, OMIA paint booths, VTEQ vehicle test lanes, Fujitsu air conditioners and LGS duty washing machines. Every project includes site survey, supply, installation, commissioning and operator training.',
    highlights: [
      'Authorized distributor of BendPak, Fujitsu, OMIA, VTEQ and Electrolux',
      'Full turnkey installation by certified technicians',
      '5-year structural warranty on major equipment',
      'Operator training included with every install',
    ],
  },
  {
    id: 'maintenance-service', icon: 'wrench', line: 'Maintenance Service',
    title: 'Preventive & Emergency Maintenance', tagline: 'Keeping your equipment productive for decades',
    description: 'Annual maintenance contracts (AMC) and 24/7 emergency call-out support for every installation. Our certified technicians perform scheduled preventive maintenance, safety inspections, parts replacement and breakdown repairs — minimizing downtime and extending equipment lifespan.',
    highlights: [
      'Annual Maintenance Contracts (AMC) with fixed response times',
      '24/7 emergency breakdown call-out across Addis Ababa',
      'Genuine OEM spare parts inventory',
      'Safety inspection & certification reports',
    ],
  },
  {
    id: 'technical-consultancy', icon: 'compass', line: 'Technical Consultancy',
    title: 'Workshop & Facility Design Consultancy', tagline: 'Engineering the right solution from day one',
    description: 'Our engineers help you plan, design and optimize your workshop or facility before you buy. We provide load calculations, equipment sizing, layout design, capacity planning and project cost analysis — ensuring you invest in the right equipment the first time.',
    highlights: [
      'Workshop layout & equipment sizing consultancy',
      'Elevator load & traffic analysis for buildings',
      'Project cost estimation & ROI analysis',
      'Compliance review with Ethiopian regulations',
    ],
  },
]

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    publicApi.services()
      .then(({ data }) => setServices(data.services?.length ? data.services : FALLBACK_SERVICES))
      .catch(() => setServices(FALLBACK_SERVICES))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <section className="relative isolate overflow-hidden bg-gigar-navy py-20 text-white lg:py-28">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1600&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-gigar-navy via-gigar-navy/85 to-gigar-red/70" />
        </div>
        <div className="container-page relative">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold ring-1 ring-white/20">
              Our Services
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Three service lines, one trusted partner
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              From equipment supply and installation to lifetime maintenance and engineering consultancy — Gigar Trading delivers end-to-end industrial solutions across Ethiopia.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service lines */}
      {loading ? (
        <div className="flex justify-center py-32"><Loader fullscreen label="Loading services…" /></div>
      ) : (
        <div className="py-20 lg:py-24">
          <div className="container-page space-y-24">
            {services.map((s, i) => (
              <motion.section
                key={s.id || s.title}
                id={s.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="scroll-mt-32 grid items-center gap-10 lg:grid-cols-12"
              >
                {/* Icon column */}
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gigar-navy to-gigar-red p-12 text-white shadow-gigar-glow">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gigar-gold/20 blur-3xl" />
                    <div className="relative">
                      <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                        {ICONS[s.icon] || <FiZap className="h-8 w-8" />}
                      </div>
                      <div className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gigar-gold">
                        Service line {String(i + 1).padStart(2, '0')}
                      </div>
                      <h2 className="mt-2 font-display text-3xl font-extrabold">{s.line}</h2>
                      <p className="mt-2 text-white/80">{s.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Text column */}
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="section-eyebrow">{s.line}</span>
                  <h3 className="mt-4 font-display text-3xl font-extrabold text-gigar-navy sm:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-gigar-navy/80">{s.description}</p>

                  {s.highlights && s.highlights.length > 0 && (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {s.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2.5 rounded-xl border border-gigar-navy/10 bg-gigar-mist p-3">
                          <FiCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gigar-red" />
                          <span className="text-sm font-medium text-gigar-navy/80">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="/contact" className="btn-primary">
                      Get a quote <FiArrowRight />
                    </a>
                    <a href="tel:+251115518267" className="btn-outline">
                      <FiPhone /> +251 115 51 82 67
                    </a>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="bg-gigar-mist py-16">
        <div className="container-page">
          <AnimatedSection className="rounded-3xl bg-gradient-to-r from-gigar-navy to-gigar-red p-8 text-center text-white sm:p-12">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Ready to start your next project?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Our team handles everything from initial consultation to lifetime maintenance — get in touch today.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn-primary !bg-white !text-gigar-red hover:!bg-gigar-gold hover:!text-gigar-navy">
                Contact us <FiArrowRight />
              </a>
              <a href="tel:+251115518267" className="btn-ghost">
                <FiPhone /> +251 115 51 82 67
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

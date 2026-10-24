import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiPhone } from 'react-icons/fi'
import ServiceCard from '../components/ServiceCard'
import AnimatedSection from '../components/AnimatedSection'
import Loader from '../components/Loader'
import { publicApi } from '../api/client'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading]  = useState(true)

  useEffect(() => {
    publicApi.services()
      .then((res) => setServices(res.data.services || []))
      .catch(() => setServices([]))
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
              Industrial equipment, supplied & installed by experts
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              A complete portfolio of products and services for Ethiopian workshops, commercial
              buildings and industrial facilities — backed by certified installation and
              after-sales support.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-page">
          {loading ? (
            <div className="flex justify-center py-16"><Loader label="Loading services…" /></div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <ServiceCard key={s.id || s.title} service={s} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gigar-mist py-16">
        <div className="container-page">
          <AnimatedSection className="rounded-3xl bg-white p-8 text-center shadow-gigar-soft sm:p-12">
            <h2 className="font-display text-2xl font-extrabold text-gigar-navy sm:text-3xl">
              Need a service that isn't listed?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gigar-navy/70">
              Our team handles custom equipment sourcing, special orders and full workshop fit-outs.
              Reach out and we'll find the right solution for your project.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn-primary">
                Contact us <FiArrowRight />
              </a>
              <a href="tel:+251115518267" className="btn-outline">
                <FiPhone /> +251 115 51 82 67
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

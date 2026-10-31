import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiMapPin, FiCalendar, FiChevronRight, FiArrowLeft, FiCheckCircle,
  FiUsers, FiInbox, FiMessageSquare,
} from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import SmartImage from '../components/SmartImage'
import Loader from '../components/Loader'
import { publicApi } from '../api/client'

export default function CustomerDetail() {
  const { slug } = useParams()
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    publicApi.customerBySlug(slug)
      .then(({ data }) => setCustomer(data))
      .catch(() => setError('Customer not found or no longer available.'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader fullscreen label="Loading customer story…" />
      </div>
    )
  }

  if (error || !customer) {
    return (
      <div className="container-page py-32 text-center">
        <FiInbox className="mx-auto h-16 w-16 text-gigar-navy/30" />
        <h2 className="mt-4 font-display text-3xl font-extrabold text-gigar-navy">
          {error || 'Customer not found'}
        </h2>
        <Link to="/customers" className="mt-6 inline-block btn-primary">
          <FiArrowLeft /> Back to all customers
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-gigar-mist py-6">
        <div className="container-page flex items-center gap-2 text-sm text-gigar-navy/70">
          <Link to="/" className="hover:text-gigar-red">Home</Link>
          <FiChevronRight className="h-3.5 w-3.5" />
          <Link to="/customers" className="hover:text-gigar-red">Customers</Link>
          <FiChevronRight className="h-3.5 w-3.5" />
          <span className="line-clamp-1 font-medium text-gigar-navy">{customer.name}</span>
        </div>
      </section>

      {/* Customer header — name + sector + location + year + units */}
      <section className="relative isolate overflow-hidden bg-gigar-navy py-16 text-white lg:py-20">
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src={customer.cover_image}
            alt={customer.name}
            fallbackSeed={customer.slug || customer.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="container-page relative">
          <AnimatedSection>
            <div className="flex flex-wrap items-start gap-6">
              {/* Customer logo card */}
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white/95 p-2 shadow-gigar-soft">
                <SmartImage
                  src={customer.logo_url}
                  alt={customer.name}
                  fallbackSeed={`${customer.slug || customer.name}-logo`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                {customer.sector && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gigar-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gigar-navy">
                    {customer.sector}
                  </span>
                )}
                <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                  {customer.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80">
                  {customer.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <FiMapPin className="h-4 w-4" /> {customer.location}
                    </span>
                  )}
                  {customer.year && (
                    <span className="inline-flex items-center gap-1.5">
                      <FiCalendar className="h-4 w-4" /> {customer.year}
                    </span>
                  )}
                  {customer.units_installed > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gigar-red/30 px-3 py-1 font-semibold">
                      <FiCheckCircle className="h-4 w-4" /> {customer.units_installed.toLocaleString()} units installed
                    </span>
                  )}
                </div>
                {customer.project_name && (
                  <p className="mt-3 max-w-3xl text-base text-white/85">
                    <span className="font-bold text-gigar-gold">Project: </span>
                    {customer.project_name}
                  </p>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Body — story description + key stats + testimonial */}
      <section className="py-16 lg:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          {/* Story / description (left, 2/3 width on desktop) */}
          <article className="lg:col-span-2">
            <AnimatedSection>
              <span className="section-eyebrow">Customer story</span>
              <h2 className="mt-3 font-display text-2xl font-extrabold text-gigar-navy sm:text-3xl">
                About the project
              </h2>
              {customer.description ? (
                <div
                  className="markdown-body mt-5"
                  dangerouslySetInnerHTML={{ __html: customer.description }}
                />
              ) : (
                <p className="mt-5 text-base text-gigar-navy/70">
                  Details for this customer story are coming soon.
                </p>
              )}

              {customer.equipment_category && (
                <div className="mt-8 rounded-2xl border border-gigar-navy/10 bg-gigar-mist p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-gigar-navy/60">
                    Equipment supplied &amp; installed
                  </div>
                  <div className="mt-1 font-display text-lg font-bold capitalize text-gigar-navy">
                    {customer.equipment_category.replace(/-/g, ' ')}
                  </div>
                  <Link
                    to="/products"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gigar-red hover:gap-2 transition-all"
                  >
                    View this product line <FiChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </AnimatedSection>
          </article>

          {/* Sidebar (right, 1/3 width) — stats + testimonial */}
          <aside className="space-y-6">
            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="card-soft p-6"
            >
              <h3 className="font-display text-lg font-bold text-gigar-navy">By the numbers</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-4 rounded-xl bg-gigar-red/10 p-4">
                  <FiUsers className="h-8 w-8 text-gigar-red" />
                  <div>
                    <div className="font-display text-2xl font-extrabold text-gigar-red">1</div>
                    <div className="text-xs text-gigar-navy/70">Project completed with this customer</div>
                  </div>
                </div>
                {customer.units_installed > 0 && (
                  <div className="flex items-center gap-4 rounded-xl bg-gigar-gold/15 p-4">
                    <FiCheckCircle className="h-8 w-8 text-gigar-navy" />
                    <div>
                      <div className="font-display text-2xl font-extrabold text-gigar-navy">
                        {customer.units_installed.toLocaleString()}
                      </div>
                      <div className="text-xs text-gigar-navy/70">Units installed</div>
                    </div>
                  </div>
                )}
                {customer.year && (
                  <div className="flex items-center gap-4 rounded-xl bg-gigar-mist p-4">
                    <FiCalendar className="h-8 w-8 text-gigar-navy" />
                    <div>
                      <div className="font-display text-2xl font-extrabold text-gigar-navy">{customer.year}</div>
                      <div className="text-xs text-gigar-navy/70">Project completion year</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Testimonial card */}
            {customer.testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="card-soft p-6"
              >
                <FiMessageSquare className="h-6 w-6 text-gigar-red/60" />
                <blockquote className="mt-3 italic text-sm leading-relaxed text-gigar-navy/85">
                  "{customer.testimonial}"
                </blockquote>
                {customer.testimonial_author && (
                  <footer className="mt-3 text-xs text-gigar-navy/60">
                    — <strong className="text-gigar-navy">{customer.testimonial_author}</strong>
                  </footer>
                )}
              </motion.div>
            )}

            {/* CTA */}
            <div className="card-soft p-6 text-center">
              <h3 className="font-display text-base font-bold text-gigar-navy">
                Want a project like this?
              </h3>
              <p className="mt-1 text-xs text-gigar-navy/70">
                Tell us about your facility and our engineers will design a similar package.
              </p>
              <Link to="/contact" className="mt-4 btn-primary w-full">
                Get a quote
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Bottom back-link */}
      <section className="bg-gigar-mist py-12">
        <div className="container-page text-center">
          <Link to="/customers" className="btn-outline">
            <FiArrowLeft /> All customers
          </Link>
        </div>
      </section>
    </>
  )
}

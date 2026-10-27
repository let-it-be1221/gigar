import { motion } from 'framer-motion'

/**
 * Reusable scroll-triggered animation wrapper.
 * Children fade + slide up when they enter the viewport.
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  y = 24,
  once = true,
  as = 'div',
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

import { motion } from 'framer-motion'

export default function Loader({ label = 'Loading…', fullscreen = false }) {
  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-16 w-16">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-gigar-red/15"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-gigar-red border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-extrabold text-gigar-red">GT</span>
        </div>
      </div>
      <p className="text-sm font-medium text-gigar-navy/70">{label}</p>
    </div>
  )

  if (!fullscreen) return spinner

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      {spinner}
    </div>
  )
}

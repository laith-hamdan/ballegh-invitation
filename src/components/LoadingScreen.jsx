import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const total = 4600
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / total, 1)
      setProgress(p * 100)
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setDone(true)
        setTimeout(onComplete, 700)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-magic-midnight overflow-hidden"
        >
          {/* nebula */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(107, 70, 193, 0.3) 0%, transparent 50%),' +
                'radial-gradient(circle at 30% 70%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
            }}
          />

          {/* swirling rune */}
          <div className="relative flex items-center justify-center mb-12">
            <motion.div
              className="absolute w-60 h-60 rounded-full border border-magic-gold/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{
                boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), inset 0 0 40px rgba(212, 175, 55, 0.2)',
              }}
            />
            <motion.div
              className="absolute w-72 h-72 rounded-full border border-magic-purple/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-96 h-96 rounded-full border border-magic-gold/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* center: circular profile photo with glow */}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-48 h-48 flex items-center justify-center"
            >
              {/* soft aura behind the photo */}
              <div
                className="absolute -inset-6 rounded-full blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle, rgba(245, 215, 110, 0.85) 0%, rgba(159, 122, 234, 0.5) 50%, transparent 80%)',
                }}
              />
              {/* gradient ring frame */}
              <div className="ring-breathe relative rounded-full p-[3px] bg-gradient-to-br from-magic-gold via-magic-purple to-magic-gold">
                <div className="rounded-full p-[2px] bg-magic-midnight">
                  <div className="relative w-44 h-44 rounded-full overflow-hidden">
                    <img
                      src="/profile.png"
                      alt="ليث حمدان"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* orbiting sparks — parent is just a rotation anchor (no visible dot) */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-0 h-0"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.5,
                }}
              >
                <div
                  style={{
                    transform: `translateX(${136 + i * 14}px)`,
                    boxShadow: '0 0 12px #f5d76e, 0 0 24px #d4af37',
                  }}
                  className="w-2 h-2 rounded-full bg-magic-goldlight"
                />
              </motion.div>
            ))}
          </div>

          {/* progress bar — no text */}
          <div className="relative z-10 mt-24 sm:mt-32 w-64 sm:w-80">
            <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #d4af37, #f5d76e, #9f7aea)',
                  boxShadow: '0 0 12px rgba(212, 175, 55, 0.8)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const volume = 0.35

  // The music is controlled ONLY by this button — no autoplay.
  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.muted = false
      a.volume = volume
      try {
        await a.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }

  return (
    <>
      {/* audio element — drop your own /public/theme.mp3 to enable music */}
      <audio
        ref={audioRef}
        src="/theme.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* floating control — fixed position, play/pause only */}
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى السحرية'}
        className="fixed bottom-5 left-5 z-[90] w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.18), rgba(107, 70, 193, 0.18))',
          border: '1px solid rgba(212, 175, 55, 0.55)',
          boxShadow: '0 0 18px rgba(212, 175, 55, 0.35), inset 0 1px 0 rgba(212, 175, 55, 0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ border: '1px solid #f5d76e' }}
          />
        )}
        <span className="text-xl" aria-hidden>
          {playing ? '🎶' : '🔇'}
        </span>
      </motion.button>

      {/* hint — shown until the music is started */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            className="fixed bottom-20 left-5 z-[90] glass-card rounded-xl px-3 py-2 text-[11px] font-cairo text-magic-parchment/85"
          >
            🪄 اضغط لتشغيل الموسيقى السحرية
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { useMemo } from 'react'
import { motion } from 'framer-motion'

const CODE_SNIPPETS = [
  'const magic = true;',
  'function cast() {',
  'await defend();',
  'if (passed) celebrate();',
  '<Wizard />',
  'try { graduate(); }',
  'export default Laith;',
  '// expecto patronum',
  '{ thesis: "done" }',
  'while(awake) code();',
  'return success;',
  'npm run defend',
]

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function MagicalBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: seededRandom(i + 1) * 100,
      y: seededRandom(i + 100) * 100,
      size: seededRandom(i + 200) * 2 + 0.5,
      delay: seededRandom(i + 300) * 5,
      duration: seededRandom(i + 400) * 3 + 2,
    }))
  }, [])

  const particles = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: seededRandom(i + 500) * 100,
      y: seededRandom(i + 600) * 100,
      size: seededRandom(i + 700) * 4 + 2,
      color: seededRandom(i + 800) > 0.6 ? '#9f7aea' : '#f5d76e',
      delay: seededRandom(i + 900) * 8,
      duration: seededRandom(i + 1000) * 12 + 10,
      drift: seededRandom(i + 1100) * 60 - 30,
    }))
  }, [])

  const codeSnippets = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: seededRandom(i + 1200) * 100,
      y: seededRandom(i + 1300) * 100,
      text: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
      delay: seededRandom(i + 1400) * 6,
      duration: seededRandom(i + 1500) * 8 + 8,
    }))
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* deep gradient sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107, 70, 193, 0.18) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212, 175, 55, 0.10) 0%, transparent 60%),' +
            'radial-gradient(ellipse 100% 80% at 30% 50%, rgba(10, 10, 70, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* fog layers */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{ x: [0, 60, 0], y: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 50% 30% at 20% 30%, rgba(159, 122, 234, 0.10) 0%, transparent 50%),' +
            'radial-gradient(ellipse 40% 25% at 80% 70%, rgba(212, 175, 55, 0.06) 0%, transparent 50%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(10, 10, 70, 0.5) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 35% at 30% 80%, rgba(107, 70, 193, 0.08) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />

      {/* stars */}
      {stars.map((s) => (
        <motion.div
          key={`s-${s.id}`}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: `0 0 ${s.size * 2}px white`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* floating embers / magic particles */}
      {particles.map((p) => (
        <motion.div
          key={`p-${p.id}`}
          className="ember"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color}80`,
          }}
          animate={{
            y: [0, -120, -240],
            x: [0, p.drift, p.drift * 1.5],
            opacity: [0, 0.9, 0],
            scale: [0.6, 1, 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* subtle code symbols */}
      {codeSnippets.map((c) => (
        <motion.span
          key={`c-${c.id}`}
          className="code-symbol"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -30, -60] }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            delay: c.delay,
            ease: 'easeInOut',
          }}
        >
          {c.text}
        </motion.span>
      ))}

      {/* candle glow at top */}
      <div
        className="absolute top-0 left-0 right-0 h-60 flicker pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 30% 100% at 50% 0%, rgba(245, 215, 110, 0.18) 0%, transparent 70%)',
        }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 50%, rgba(5, 5, 20, 0.6) 100%)',
        }}
      />
    </div>
  )
}

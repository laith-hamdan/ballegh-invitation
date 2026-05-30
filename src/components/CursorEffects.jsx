import { useEffect, useRef, useState } from 'react'

export default function CursorEffects() {
  const glowRef = useRef(null)
  const [enabled, setEnabled] = useState(true)
  const sparksRef = useRef([])
  const containerRef = useRef(null)

  useEffect(() => {
    // disable on touch devices
    if (window.matchMedia('(hover: none)').matches) {
      setEnabled(false)
      return
    }

    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }

    const click = (e) => {
      // emit sparks at the click position
      const count = 10
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
        const dist = 30 + Math.random() * 60
        const dx = Math.cos(angle) * dist
        const dy = Math.sin(angle) * dist
        const spark = document.createElement('div')
        spark.className = 'wand-spark'
        spark.style.left = `${e.clientX}px`
        spark.style.top = `${e.clientY}px`
        spark.style.transition = 'transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 800ms ease-out'
        document.body.appendChild(spark)
        // next tick
        requestAnimationFrame(() => {
          spark.style.transform = `translate(${dx}px, ${dy}px) scale(0)`
          spark.style.opacity = '0'
        })
        setTimeout(() => {
          spark.remove()
        }, 900)
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('click', click)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('click', click)
    }
  }, [])

  if (!enabled) return null
  return <div ref={glowRef} className="cursor-glow" aria-hidden />
}

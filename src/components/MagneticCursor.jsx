import { useEffect, useRef } from 'react'

export function MagneticCursor() {
  const ringRef = useRef()
  const dotRef  = useRef()
  const pos     = useRef({ x: -200, y: -200 })
  const mouse   = useRef({ x: -200, y: -200 })
  const rafId   = useRef()

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }

      const hoverable = e.target.closest('a, button, input, textarea, [role="button"]')
      ringRef.current?.classList.toggle('cursor-ring--hover', !!hoverable)
    }

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
    </>
  )
}

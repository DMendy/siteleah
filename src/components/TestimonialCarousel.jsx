import { useCallback, useEffect, useRef, useState } from 'react'

const images = [
  '/temoignage-equipe-suivi-01.png',
  '/temoignage-equipe-suivi-02.png',
  '/temoignage-collaboration-client.png',
  '/temoignage-coordination-client.png',
]

const INTERVAL = 4500

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
  const wrapRef  = useRef(null)
  const cardRefs = useRef([])
  const total    = images.length

  // Sync container height to the active card
  const syncHeight = useCallback(() => {
    const card = cardRefs.current[index]
    const wrap = wrapRef.current
    if (card && wrap) wrap.style.height = `${card.offsetHeight}px`
  }, [index])

  useEffect(() => {
    syncHeight()
    window.addEventListener('resize', syncHeight)
    return () => window.removeEventListener('resize', syncHeight)
  }, [syncHeight])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(
      () => setIndex((p) => (p + 1) % total),
      INTERVAL,
    )
  }, [total])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const prev = () => { setIndex((p) => (p - 1 + total) % total); startTimer() }
  const next = () => { setIndex((p) => (p + 1) % total);         startTimer() }

  return (
    <section className="temoignage-carousel-section" aria-label="Témoignages clients">
      <div className="temoignage-carousel-header">
        <p className="eyebrow">Ils en parlent</p>
        <h3>Les retours de mes collaborations.</h3>
      </div>

      <div
        ref={wrapRef}
        className="temoignage-carousel-track-wrap"
        onMouseEnter={() => clearInterval(timerRef.current)}
        onMouseLeave={startTimer}
      >
        {images.map((src, i) => (
          <div
            key={src}
            ref={(el) => { cardRefs.current[i] = el }}
            className={`temoignage-carousel-slide${i === index ? ' active' : ''}`}
          >
            <div className="temoignage-carousel-card">
              <img
                src={src}
                alt={`Témoignage ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
                onLoad={syncHeight}
              />
            </div>
          </div>
        ))}

        <button
          className="temoignage-arrow temoignage-arrow-prev"
          type="button"
          aria-label="Témoignage précédent"
          onClick={prev}
        >←</button>
        <button
          className="temoignage-arrow temoignage-arrow-next"
          type="button"
          aria-label="Témoignage suivant"
          onClick={next}
        >→</button>
      </div>

      <div className="temoignage-dots" role="tablist">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Témoignage ${i + 1}`}
            className={`temoignage-dot${i === index ? ' active' : ''}`}
            onClick={() => { setIndex(i); startTimer() }}
          />
        ))}
      </div>
    </section>
  )
}

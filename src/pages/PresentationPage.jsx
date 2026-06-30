import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useReducedMotion } from 'motion/react'
import { cardHover, heroTitle, revealContainer, revealItem } from '../animations'
import { SplitHeading } from '../components/SplitHeading'

gsap.registerPlugin(ScrollTrigger)

const journey = [
  "Je prends en charge l'administratif, l'organisation et le suivi opérationnel dans un cadre fiable.",
  'Je structure tes priorités business pour te libérer du temps et de la charge mentale.',
  "Je t'accompagne vers une activité plus claire, plus fluide et mieux maîtrisée.",
]

const storyPanels = [
  {
    kicker: 'Avant',
    title: 'Je repère les infos dispersées.',
    text: 'Je rassemble tes messages, factures, demandes clients, relances et priorités dans un centre clair.',
    label: 'Inbox dispersée',
  },
  {
    kicker: 'Tri',
    title: 'Je remets chaque sujet à sa place.',
    text: "Je clarifie les urgences et je transforme le bruit opérationnel en liste d'actions lisible.",
    label: 'Plan propre',
  },
  {
    kicker: 'Suivi',
    title: 'Je garde chaque dossier en mouvement.',
    text: 'Je suis les relances, les documents et les prochaines étapes avec précision pour éviter les oublis.',
    label: 'Dossiers suivis',
  },
  {
    kicker: 'Après',
    title: 'Je te redonne de la hauteur.',
    text: "Je transforme l'administratif en système fiable pour qu'il ne pilote plus ta journée.",
    label: 'Vision claire',
  },
]

function PresentationPage({ navigate }) {
  const storySectionRef = useRef(null)
  const storyViewportRef = useRef(null)
  const storyTrackRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const section = storySectionRef.current
    const viewport = storyViewportRef.current
    const track = storyTrackRef.current
    if (!section || !viewport || !track) return undefined

    const media = gsap.matchMedia()

    media.add('(min-width: 941px)', () => {
      const ctx = gsap.context(() => {
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
            start: 'top 118px',
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        })

        gsap.fromTo(
          '.story-panel',
          { y: 46, opacity: 0.45 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.18,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
              end: 'top 20%',
              scrub: true,
            },
          },
        )
      }, section)

      // Délai suffisant pour que le layout flex soit stable
      const timer = setTimeout(() => ScrollTrigger.refresh(true), 200)

      return () => {
        clearTimeout(timer)
        ctx.revert()
      }
    })

    return () => media.revert()
  }, [prefersReducedMotion])

  return (
    <>
    <motion.section
      className="page hero-page"
      variants={revealContainer}
      initial="hidden"
      animate="show"
    >
      {/* ── Hero split ── */}
      <motion.div className="hero-split" variants={revealContainer} style={{ willChange: 'auto' }}>
        <motion.div className="hero-copy-block" variants={revealContainer}>
          <motion.p className="eyebrow" variants={revealItem}>
            Assistante business · administratif · organisation
          </motion.p>
          <motion.h1 className="hero-title hero-logo-title" variants={heroTitle}>
            <img src="/logo-lea-jha.png" alt="Lea Jha" />
          </motion.h1>
          <motion.p className="hero-copy" variants={revealItem}>
            J&apos;accompagne les entrepreneurs et dirigeants dans leur gestion
            administrative, leur organisation business et leur suivi opérationnel
            avec précision, calme et méthode.
          </motion.p>
          <motion.div className="hero-actions" variants={revealItem}>
            <motion.button
              className="button button-primary"
              type="button"
              onClick={() => navigate('services')}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            >
              Découvrir mes services
            </motion.button>
            <motion.button
              className="button button-secondary"
              type="button"
              onClick={() => navigate('candidature')}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            >
              Me confier ton organisation
            </motion.button>
          </motion.div>

          <motion.div className="hero-proof-row" variants={revealContainer}>
            <motion.div variants={revealItem}>
              <strong>Admin</strong>
              <span>Suivi fiable et rigoureux</span>
            </motion.div>
            <motion.div variants={revealItem}>
              <strong>Business</strong>
              <span>Priorités structurées</span>
            </motion.div>
            <motion.div variants={revealItem}>
              <strong>Ops</strong>
              <span>Exécution fluide au quotidien</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="hero-photo-col" variants={revealItem}>
          {/* Photo pleine hauteur */}
          <div className="hero-photo-inner">
            <motion.img
              src="/lea-portrait-bureau.jpg"
              alt="Leah JHA à son bureau"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="hero-photo-vignette" aria-hidden="true" />

          {/* Carte-signature entrée en scène */}
          <motion.div
            className="hero-signature"
            initial={{ opacity: 0, y: 32, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ delay: 0.72, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              className="hero-sig-logo"
              src="/logo-lea-jha.png"
              alt=""
              aria-hidden="true"
            />
            <div className="hero-sig-info">
              <strong>Leah JHA</strong>
              <span>Assistante Business</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Journey ── */}
      <motion.div
        className="journey-list"
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {journey.map((item) => (
          <motion.article
            className="journey-card"
            key={item}
            variants={revealItem}
            whileHover={cardHover}
          >
            <span aria-hidden="true" />
            <p>{item}</p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>

    {/* ── Story horizontal — hors du flex + overflow:hidden pour que GSAP pin fonctionne ── */}
    <section className="story-horizontal" ref={storySectionRef}>
      <div className="story-intro">
        <p className="eyebrow">Mon processus</p>
        <SplitHeading>Du chaos administratif au bureau qui respire.</SplitHeading>
      </div>

      <div className="story-viewport" ref={storyViewportRef}>
        <div className="story-track" ref={storyTrackRef}>
          {storyPanels.map((panel, index) => (
            <article className="story-panel" key={panel.title}>
              <div className={`story-image-frame story-image-${index + 1}`}>
                <span>{panel.label}</span>
                <div className="story-image-lines" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="story-copy">
                <span>{panel.kicker}</span>
                <h3>{panel.title}</h3>
                <p>{panel.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ── Qui suis-je ? ── */}
    <div className="about-page">
      <motion.section
        className="about-section"
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div className="about-content" variants={revealItem}>
          <p className="eyebrow">Qui suis-je ?</p>
          <SplitHeading baseDelay={0.04}>Construire une activité qui me ressemble.</SplitHeading>
        </motion.div>

        <div className="about-grid">
          <motion.div className="about-text" variants={revealContainer}>
            <motion.p variants={revealItem}>
              Depuis mes débuts comme hôtesse d'accueil, jusqu'à ma spécialisation en
              secrétariat médical — j'ai accompagné des clients dans des secteurs très
              différents. Cette diversité a été un déclic : j'ai compris que mes compétences
              pouvaient s'adapter à n'importe quelle activité, et que c'était précisément là
              ma valeur.
            </motion.p>
            <motion.p variants={revealItem}>
              Aujourd'hui j'accompagne entrepreneurs, prestataires, libéraux et artisans
              dans leur gestion administrative, leur organisation et leur relation client —
              avec la même implication que si leur entreprise était la mienne.
            </motion.p>
            <motion.p variants={revealItem} className="about-conviction">
              Une bonne collaboration ne se résume pas à gérer des tâches. C'est devenir
              un soutien de confiance pour que chaque entrepreneur avance avec sérénité.
            </motion.p>
          </motion.div>

          <motion.div className="about-mission" variants={revealItem}>
            <p className="eyebrow">Ma mission</p>
            <p>
              Accompagner les entrepreneurs et indépendants dans leur quotidien en prenant
              en charge leurs tâches administratives et leur support client, avec rigueur,
              discrétion et engagement.
            </p>
            <div className="about-values">
              {['Rigueur', 'Discrétion', 'Engagement', 'Adaptabilité'].map((v) => (
                <span key={v} className="about-value">{v}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>

    </>
  )
}

export default PresentationPage

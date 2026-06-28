import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { cardHover, heroTitle, revealContainer, revealItem } from '../animations'

gsap.registerPlugin(ScrollTrigger)

const journey = [
  'Je prends en charge l administratif, l organisation et le suivi operationnel dans un cadre fiable.',
  'Je structure tes priorites business pour te liberer du temps et de la charge mentale.',
  'Je t accompagne vers une activite plus claire, plus fluide et mieux maitrisee.',
]

const operations = [
  {
    eyebrow: '01',
    title: 'Admin propre',
    text: 'Je garde tes documents, relances, informations et dossiers lisibles, ranges et faciles a retrouver.',
  },
  {
    eyebrow: '02',
    title: 'Business suivi',
    text: 'Je centralise les demandes, les priorites et les prochaines actions pour eviter les pertes de temps.',
  },
  {
    eyebrow: '03',
    title: 'Execution fluide',
    text: 'Je fais avancer ton quotidien avec des routines simples, un suivi clair et moins de charge mentale.',
  },
]

const storyPanels = [
  {
    kicker: 'Avant',
    title: 'Je repere les infos dispersees.',
    text: 'Je rassemble tes messages, factures, demandes clients, relances et priorites dans un centre clair.',
    label: 'Inbox dispersee',
  },
  {
    kicker: 'Tri',
    title: 'Je remets chaque sujet a sa place.',
    text: 'Je clarifie les urgences et je transforme le bruit operationnel en liste d actions lisible.',
    label: 'Plan propre',
  },
  {
    kicker: 'Suivi',
    title: 'Je garde chaque dossier en mouvement.',
    text: 'Je suis les relances, les documents et les prochaines etapes avec precision pour eviter les oublis.',
    label: 'Dossiers suivis',
  },
  {
    kicker: 'Apres',
    title: 'Je te redonne de la hauteur.',
    text: 'Je transforme l administratif en systeme fiable pour qu il ne pilote plus ta journee.',
    label: 'Vision claire',
  },
]

function PresentationPage({ navigate }) {
  const sectionRef = useRef(null)
  const operationsRef = useRef(null)
  const storySectionRef = useRef(null)
  const storyViewportRef = useRef(null)
  const storyTrackRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const { scrollYProgress: operationsProgress } = useScroll({
    target: operationsRef,
    offset: ['start 75%', 'end 25%'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 72])
  const auraScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.18])
  const signatureY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -44])
  const plannerRotate = useTransform(operationsProgress, [0, 0.5, 1], [-7, 0, 6])
  const plannerScale = useTransform(operationsProgress, [0, 0.45, 1], [0.92, 1.05, 0.98])
  const plannerY = useTransform(operationsProgress, [0, 1], [prefersReducedMotion ? 0 : 28, prefersReducedMotion ? 0 : -34])
  const pageSpread = useTransform(operationsProgress, [0.1, 0.52, 1], [0, 22, 48])
  const pageSpreadSoft = useTransform(pageSpread, (value) => value * 0.56)
  const cardOneY = useTransform(operationsProgress, [0, 0.24, 1], [prefersReducedMotion ? 0 : 48, 0, prefersReducedMotion ? 0 : -18])
  const cardTwoY = useTransform(operationsProgress, [0.16, 0.5, 1], [prefersReducedMotion ? 0 : 58, 0, prefersReducedMotion ? 0 : -10])
  const cardThreeY = useTransform(operationsProgress, [0.34, 0.76, 1], [prefersReducedMotion ? 0 : 66, 0, prefersReducedMotion ? 0 : 8])
  const cardOneOpacity = useTransform(operationsProgress, [0, 0.2], [0.34, 1])
  const cardTwoOpacity = useTransform(operationsProgress, [0.18, 0.42], [0.34, 1])
  const cardThreeOpacity = useTransform(operationsProgress, [0.36, 0.66], [0.34, 1])
  const operationCardStyles = [
    { y: cardOneY, opacity: cardOneOpacity },
    { y: cardTwoY, opacity: cardTwoOpacity },
    { y: cardThreeY, opacity: cardThreeOpacity },
  ]

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

      return () => ctx.revert()
    })

    return () => media.revert()
  }, [prefersReducedMotion])

  return (
    <motion.section
      ref={sectionRef}
      className="page hero-page"
      variants={revealContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="hero-aura hero-aura-one"
        aria-hidden="true"
        style={{ scale: auraScale }}
      />
      <motion.div
        className="hero-aura hero-aura-two"
        aria-hidden="true"
        style={{ scale: auraScale }}
      />

      <motion.div className="hero-copy-block" variants={revealContainer}>
        <motion.p className="eyebrow" variants={revealItem}>
          Assistante business • administratif • organisation
        </motion.p>
        <motion.h1 className="hero-title hero-logo-title" variants={heroTitle}>
          <img src="/logo-lea-jha.png" alt="Lea Jha" />
        </motion.h1>
        <motion.p className="hero-copy" variants={revealItem}>
          J accompagne les entrepreneurs et dirigeants dans leur gestion
          administrative, leur organisation business et leur suivi operationnel
          avec precision, calme et methode.
        </motion.p>
        <motion.div className="hero-actions" variants={revealItem}>
          <motion.button
            className="button button-primary"
            type="button"
            onClick={() => navigate('services')}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Decouvrir mes services
          </motion.button>
          <motion.button
            className="button button-secondary"
            type="button"
            onClick={() => navigate('contact')}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Me confier ton organisation
          </motion.button>
        </motion.div>

        <motion.div className="hero-proof-row" variants={revealContainer}>
          <motion.div variants={revealItem}>
            <strong>Admin</strong>
            <span>suivi fiable et rigoureux</span>
          </motion.div>
          <motion.div variants={revealItem}>
            <strong>Business</strong>
            <span>priorites structurees</span>
          </motion.div>
          <motion.div variants={revealItem}>
            <strong>Ops</strong>
            <span>execution fluide au quotidien</span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="portrait-stage"
        aria-label="Resume du parcours"
        variants={revealItem}
        style={{ y: portraitY }}
      >
        <motion.div className="portrait-orbit" aria-hidden="true" />
        <motion.div
          className="portrait-panel"
          whileHover={{ rotate: -1, scale: 1.015 }}
        >
          <img
            className="portrait-photo"
            src="/lea-portrait-bureau.jpg"
            alt="Lea Jha a son bureau"
          />
          <div className="portrait-content">
            <div className="portrait-meta">
              <span>Experte assistanat business</span>
              <span>Administratif • operations • suivi</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="hero-signature-card"
          style={{ y: signatureY }}
          initial={{ opacity: 0, x: 28, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ delay: 0.74, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>Ma methode</span>
          <strong>ordre avant charge mentale</strong>
        </motion.div>
        <motion.div
          className="hero-floating-note"
          initial={{ opacity: 0, x: -26, rotate: -4 }}
          animate={{ opacity: 1, x: 0, rotate: 2 }}
          transition={{ delay: 0.92, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <strong>24h</strong>
          <span>suivi reactif et structure</span>
        </motion.div>
      </motion.div>

      <motion.div className="journey-list" variants={revealContainer}>
        {journey.map((item) => (
          <motion.article
            className="journey-card"
            key={item}
            variants={revealItem}
            whileHover={cardHover}
          >
            <span></span>
            <p>{item}</p>
          </motion.article>
        ))}
      </motion.div>

      <section className="story-horizontal" ref={storySectionRef}>
        <div className="story-intro">
          <p className="eyebrow">Mini storytelling</p>
          <h2>Du chaos administratif au bureau qui respire.</h2>
        </div>

        <div className="story-viewport" ref={storyViewportRef}>
          <div className="story-track" ref={storyTrackRef}>
            {storyPanels.map((panel, index) => (
              <article className="story-panel" key={panel.title}>
                <div className={`story-image-frame story-image-${index + 1}`}>
                  <span>{panel.label}</span>
                  <div className="story-image-lines">
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

      <motion.section
        className="operations-showcase"
        ref={operationsRef}
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <motion.div className="operations-heading" variants={revealItem}>
          <p className="eyebrow">Systeme operationnel</p>
          <h2>Un centre de controle pour sortir l administratif de ta tete.</h2>
          <p>
            Cet objet central represente mon bureau : chaque scroll ouvre une
            couche de suivi, de priorisation et d execution.
          </p>
        </motion.div>

        <div className="operations-scroll-grid">
          <div className="operations-cards">
            {operations.map((operation, index) => (
              <motion.article
                className="operation-card"
                key={operation.title}
                variants={revealItem}
                style={operationCardStyles[index]}
                whileHover={cardHover}
              >
                <span>{operation.eyebrow}</span>
                <h3>{operation.title}</h3>
                <p>{operation.text}</p>
              </motion.article>
            ))}
          </div>

          <div className="planner-sticky" aria-label="Dossier business anime">
            <motion.div
              className="business-planner"
              style={{ rotate: plannerRotate, scale: plannerScale, y: plannerY }}
            >
              <div className="planner-shadow" />
              <motion.div
                className="planner-sheet planner-sheet-back"
                style={{ y: pageSpread }}
              />
              <motion.div
                className="planner-sheet planner-sheet-mid"
                style={{ y: pageSpreadSoft }}
              />
              <div className="planner-cover">
                <div className="planner-clip" />
                <span>Mon bureau</span>
                <strong>Business Desk</strong>
                <div className="planner-lines">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="planner-task planner-task-one">relances</div>
              <div className="planner-task planner-task-two">dossiers</div>
              <div className="planner-task planner-task-three">priorites</div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.section>
  )
}

export default PresentationPage

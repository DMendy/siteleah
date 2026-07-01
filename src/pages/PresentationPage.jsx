import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useReducedMotion } from 'motion/react'
import { cardHover, heroTitle, revealContainer, revealItem } from '../animations'
import { SplitHeading } from '../components/SplitHeading'
import { LogoMonogram } from '../components/LogoMonogram'

gsap.registerPlugin(ScrollTrigger)

const journey = [
  "Je prends en charge l'administratif, l'organisation et le suivi opérationnel dans un cadre fiable.",
  'Je structure tes priorités business pour te libérer du temps et de la charge mentale.',
  "Je t'accompagne vers une activité plus claire, plus fluide et mieux maîtrisée.",
]

const storyPanels = [
  {
    kicker: '01',
    title: 'Derrière chaque entreprise bien organisée…',
    text: "…il y a souvent une personne qui veille à ce que tout fonctionne. C'est ce rôle que j'ai choisi d'endosser.",
    label: 'Le rôle',
    img: '/lea-diplome.jpg',
    imgAlt: 'Diplôme Secrétaire Médicale — Leah JHA',
  },
  {
    kicker: '02',
    title: 'Une carrière construite sur le terrain.',
    text: "J'ai commencé comme hôtesse d'accueil, pour ensuite me spécialiser comme secrétaire médicale. Au fil de mes expériences, j'ai eu l'occasion d'intervenir auprès de clients issus de secteurs très variés.",
    label: 'Le parcours',
    img: '/lea-portrait-travail.jpg',
    imgAlt: 'Leah JHA au travail',
  },
  {
    kicker: '03',
    title: 'Un véritable déclic.',
    text: "Cette diversité m'a fait réaliser que je pouvais mettre mes compétences au service d'entrepreneurs avec ma propre structure — en proposant un accompagnement professionnel, humain et personnalisé.",
    label: 'Le déclic',
    img: '/lea-travail-bureau.jpg',
    imgAlt: 'Leah JHA au bureau',
  },
  {
    kicker: '04',
    title: 'Une collaboration qui va plus loin que les tâches.',
    text: "Pour moi, une bonne collaboration ne se résume pas à gérer des tâches. C'est devenir un véritable soutien pour que chaque entrepreneur gagne du temps, avance avec sérénité et se consacre pleinement à son activité.",
    label: 'La conviction',
    img: '/lea-portrait-bureau.jpg',
    imgAlt: 'Leah JHA',
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
            <LogoMonogram className="hero-logo-svg" />
          </motion.h1>
          <motion.p className="hero-copy" variants={revealItem}>
            J&apos;accompagne les entrepreneurs et dirigeants dans leur <span className="key">gestion
            administrative</span>, leur <span className="key">organisation business</span> et leur <span className="key">suivi opérationnel</span>
            avec <span className="key">précision, calme et méthode</span>.
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
            <LogoMonogram className="hero-sig-logo" ariaHidden />
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
                {panel.img ? (
                  <>
                    <img
                      src={panel.img}
                      alt={panel.imgAlt}
                      loading="lazy"
                      className="story-image-photo"
                    />
                    <div className="story-image-label-wrap">
                      <span className="story-image-label">{panel.label}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="story-image-label">{panel.label}</span>
                    <div className="story-image-lines" aria-hidden="true">
                      <i /><i /><i /><i />
                    </div>
                  </>
                )}
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
            <motion.p variants={revealItem} className="about-hook">
              Derrière chaque entreprise bien organisée, il y a souvent
              une personne qui veille à ce que tout fonctionne.
              C&apos;est ce rôle que j&apos;ai choisi d&apos;endosser.
            </motion.p>
            <motion.p variants={revealItem}>
              J&apos;ai commencé ma carrière en tant qu&apos;<span className="key">hôtesse d&apos;accueil</span>,
              pour ensuite me spécialiser comme <span className="key">secrétaire médicale</span>.
              Au fil de mes expériences dans l&apos;assistanat, j&apos;ai eu l&apos;occasion
              d&apos;intervenir auprès de clients issus de <span className="key">secteurs d&apos;activité très variés</span>.
            </motion.p>
            <motion.p variants={revealItem}>
              Cette diversité a été un véritable déclic : j&apos;ai réalisé que je pouvais
              mettre mes compétences au service d&apos;entrepreneurs avec <span className="key">ma propre structure</span>,
              en proposant un accompagnement <span className="key">professionnel, humain et personnalisé</span>.
            </motion.p>
            <motion.p variants={revealItem} className="about-conviction">
              Pour moi, une bonne collaboration ne se résume pas à gérer des tâches.
              C&apos;est devenir un <span className="key">véritable soutien</span> pour que chaque entrepreneur
              gagne du temps, avance avec <span className="key">sérénité</span> et se consacre pleinement
              au développement de son activité.
            </motion.p>
          </motion.div>

          <motion.div className="about-mission" variants={revealItem}>
            <p className="eyebrow">Ma mission</p>
            <p>
              Accompagner les <span className="key">entrepreneurs, indépendants et petites entreprises</span> dans
              leur quotidien — gestion administrative, support client, organisation — avec
              <span className="key"> rigueur, discrétion et engagement</span>.
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

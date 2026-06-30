import { motion } from 'motion/react'
import { cardHover, revealContainer, revealItem } from '../animations'
import { SplitHeading } from '../components/SplitHeading'
import { TestimonialCarousel } from '../components/TestimonialCarousel'

const stats = [
  { value: '30+', label: 'dossiers clients organisés', sub: 'CRM structuré de zéro' },
  { value: '5',      label: 'outils pris en main',        sub: 'sans formation préalable' },
  { value: 'A → Z', label: 'un seul process',             sub: 'infiniment adaptable' },
  { value: '100 %', label: 'relances suivies',             sub: 'aucun oubli, aucun retard' },
]

const evidence = [
  {
    src: '/resultat-tickets-semaine.png',
    alt: 'Suivi de tickets traités sur une semaine',
    label: 'Suivi hebdomadaire',
    desc: 'Volume traité chaque semaine — aucune demande ne passe entre les mailles.',
    crop: 'tickets',
  },
  {
    src: '/resultat-satisfaction-positive.png',
    alt: 'Indicateur de satisfaction et remarques positives',
    label: 'Satisfaction mesurée',
    desc: 'Les retours positifs sont documentés et suivis pour maintenir le niveau.',
  },
  {
    src: '/resultat-qualite-redactionnelle.png',
    alt: 'Évaluation de la qualité rédactionnelle des réponses',
    label: 'Qualité rédactionnelle',
    desc: 'Chaque réponse client est soignée — ton image de marque est préservée.',
  },
  {
    src: '/resultat-relation-client.png',
    alt: 'Évaluation de la qualité de relation client',
    label: 'Relation client',
    desc: 'Suivi de la qualité de la relation client sur la durée de la mission.',
  },
]

const changes = [
  {
    before: 'Des demandes dispersées entre mails, messages et notes.',
    after: "Un canal unique, centralisé — rien ne se perd.",
  },
  {
    before: 'Des relances oubliées, des dossiers sans suite.',
    after: 'Je suis chaque relance avec méthode jusqu\'à la résolution.',
  },
  {
    before: 'Une semaine qui démarre sans priorités claires.',
    after: 'Tes actions de la semaine sont visibles avant le lundi matin.',
  },
  {
    before: 'Une énergie mentale dépensée sur des tâches opérationnelles.',
    after: 'Tu récupères ta bande passante pour les décisions importantes.',
  },
]

function ResultsPage({ navigate }) {
  return (
    <motion.section
      className="page proof-page"
      variants={revealContainer}
      initial="hidden"
      animate="show"
    >
      {/* ── Hero ── */}
      <motion.div className="proof-hero" variants={revealContainer}>
        <motion.p className="eyebrow" variants={revealItem}>Résultats concrets</motion.p>
        <SplitHeading baseDelay={0.08}>
          Je rends les résultats visibles — pas juste les tâches faites.
        </SplitHeading>
        <motion.p className="proof-hero-sub" variants={revealItem}>
          Chaque mission laisse une trace mesurable. Voici ce que ça donne
          concrètement quand j&apos;interviens dans ton organisation.
        </motion.p>
      </motion.div>

      {/* ── Stats ── */}
      <motion.div className="proof-stats" variants={revealContainer}>
        {stats.map((s) => (
          <motion.div key={s.value} className="proof-stat" variants={revealItem}>
            <span className="proof-stat-value">{s.value}</span>
            <strong className="proof-stat-label">{s.label}</strong>
            <span className="proof-stat-sub">{s.sub}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Evidence ── */}
      <motion.div className="proof-evidence" variants={revealContainer}>
        <motion.div className="proof-evidence-heading" variants={revealItem}>
          <p className="eyebrow">Preuves concrètes</p>
          <h3>Mes standards se mesurent sur le terrain.</h3>
          <p>
            Je suis chaque indicateur avec la même exigence : volume traité,
            satisfaction, qualité rédactionnelle et relation client.
          </p>
        </motion.div>
        <div className="proof-ev-grid">
          {evidence.map((item, i) => (
            <motion.figure
              className="proof-ev-card"
              key={item.src}
              variants={revealItem}
              whileHover={{ y: -6 }}
            >
              <div className={`proof-ev-photo${item.crop ? ` proof-ev-photo--${item.crop}` : ''}`}>
                <span className="proof-ev-badge">{String(i + 1).padStart(2, '0')}</span>
                <img src={item.src} alt={item.alt} loading="lazy" />
              </div>
              <figcaption>
                <strong>{item.label}</strong>
                <span>{item.desc}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>

      {/* ── Avant / Après ── */}
      <motion.div className="proof-changes" variants={revealContainer}>
        <motion.div className="proof-changes-heading" variants={revealItem}>
          <p className="eyebrow">Avant · Après</p>
          <h3>Ce que je transforme concrètement.</h3>
        </motion.div>
        <div className="proof-changes-list">
          {changes.map((c, i) => (
            <motion.div key={i} className="proof-change-row" variants={revealItem}>
              <div className="proof-change-before">
                <span className="proof-change-tag proof-change-tag--before">Avant</span>
                <p>{c.before}</p>
              </div>
              <div className="proof-change-arrow" aria-hidden="true">→</div>
              <div className="proof-change-after">
                <span className="proof-change-tag proof-change-tag--after">Après</span>
                <p>{c.after}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Testimonials ── */}
      <TestimonialCarousel />

      {/* ── CTA ── */}
      <motion.div className="page-cta" variants={revealItem}>
        <p>Prêt·e à récupérer ton temps et ta sérénité ?</p>
        <motion.button
          className="button button-primary"
          type="button"
          onClick={() => navigate('candidature')}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
        >
          Je veux déléguer avec méthode
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default ResultsPage

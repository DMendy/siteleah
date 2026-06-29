import { motion } from 'motion/react'
import { cardHover, revealContainer, revealItem } from '../animations'
import { SplitHeading } from '../components/SplitHeading'

const changes = [
  "Je rassemble tes demandes pour qu'elles ne se perdent plus entre plusieurs canaux.",
  'Je pose et je suis les relances importantes.',
  'Je rends tes priorités visibles avant que la semaine commence.',
  "Je protège ton énergie pour les décisions importantes.",
]

const evidence = [
  {
    src: '/resultat-tickets-semaine.png',
    alt: 'Exemple de suivi de tickets traités sur une semaine',
    label: 'Suivi hebdomadaire',
    crop: 'tickets',
  },
  {
    src: '/resultat-satisfaction-positive.png',
    alt: 'Indicateur de satisfaction et remarques positives',
    label: 'Satisfaction mesurée',
  },
  {
    src: '/resultat-qualite-redactionnelle.png',
    alt: 'Évaluation de la qualité rédactionnelle des réponses',
    label: 'Qualité rédactionnelle',
  },
  {
    src: '/resultat-relation-client.png',
    alt: 'Évaluation de la qualité de relation client',
    label: 'Relation client',
  },
]

const testimonials = [
  {
    image: '/temoignage-equipe-suivi-01.png',
    label: "Suivi d'équipe",
  },
  {
    image: '/temoignage-equipe-suivi-02.png',
    label: "Coordination d'équipe",
  },
  {
    image: '/temoignage-collaboration-client.png',
    label: 'Retour de collaboration',
  },
  {
    image: '/temoignage-coordination-client.png',
    label: 'Retour de coordination',
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
      <motion.div className="section-heading" variants={revealContainer}>
        <motion.p className="eyebrow" variants={revealItem}>
          Résultats concrets
        </motion.p>
        <SplitHeading baseDelay={0.08}>Je rends les résultats visibles en faisant de l'organisation un vrai levier business.</SplitHeading>
      </motion.div>

      <motion.section className="evidence-section" variants={revealContainer}>
        <motion.div className="evidence-heading" variants={revealItem}>
          <p className="eyebrow">Preuves concrètes</p>
          <h3>Mes standards se mesurent sur le terrain.</h3>
          <p>
            Je suis chaque indicateur avec la même exigence : volume traité,
            satisfaction, qualité rédactionnelle et relation client.
          </p>
        </motion.div>
        <div className="evidence-grid">
          {evidence.map((item) => (
            <motion.figure
              className="evidence-card"
              key={item.src}
              variants={revealItem}
              whileHover={{ y: -5 }}
            >
              <div className={`evidence-image${item.crop ? ` evidence-image-${item.crop}` : ''}`}>
                <img src={item.src} alt={item.alt} loading="lazy" />
              </div>
              <figcaption>{item.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.section>

      <motion.section className="premium-panel change-panel" variants={revealItem}>
        <div>
          <p className="eyebrow">Concrètement</p>
          <h3>Ce que je change quand je reprends ton back-office.</h3>
        </div>
        <ul>
          {changes.map((change) => (
            <li key={change}>{change}</li>
          ))}
        </ul>
      </motion.section>

      <motion.section className="testimonials-section" variants={revealContainer}>
        <motion.div className="testimonials-heading" variants={revealItem}>
          <p className="eyebrow">Témoignages</p>
          <h3>Les retours reçus au fil de mes collaborations.</h3>
        </motion.div>
        <div className="evidence-grid">
          {testimonials.map((testimonial) => (
            <motion.figure
              className="evidence-card"
              key={testimonial.image}
              variants={revealItem}
              whileHover={cardHover}
            >
              <div className="evidence-image testimonial-img">
                <img src={testimonial.image} alt={testimonial.label} loading="lazy" />
              </div>
              <figcaption>{testimonial.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.section>

      <motion.button
        className="button button-primary"
        type="button"
        onClick={() => navigate('candidature')}
        variants={revealItem}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
        style={{ marginTop: 'clamp(32px, 5vw, 56px)' }}
      >
        Je veux déléguer avec méthode
      </motion.button>
    </motion.section>
  )
}

export default ResultsPage

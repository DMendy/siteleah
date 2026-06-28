import { motion } from 'motion/react'
import { revealContainer, revealItem } from '../animations'

const testimonials = [
  {
    image: '/temoignage-equipe-suivi-01.png',
    label: 'Suivi d equipe',
  },
  {
    image: '/temoignage-equipe-suivi-02.png',
    label: 'Coordination d equipe',
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

const changes = [
  'Je rassemble tes demandes pour qu elles ne se perdent plus entre plusieurs canaux.',
  'Je pose et je suis les relances importantes.',
  'Je rends tes priorites visibles avant que la semaine commence.',
  'Je protege ton energie pour les decisions importantes.',
]

const evidence = [
  {
    src: '/resultat-tickets-semaine.png',
    alt: 'Exemple de suivi de tickets traites sur une semaine',
    label: 'Suivi hebdomadaire',
    crop: 'tickets',
  },
  {
    src: '/resultat-satisfaction-positive.png',
    alt: 'Indicateur de satisfaction et remarques positives',
    label: 'Satisfaction mesuree',
  },
  {
    src: '/resultat-qualite-redactionnelle.png',
    alt: 'Evaluation de la qualite redactionnelle des reponses',
    label: 'Qualite redactionnelle',
  },
  {
    src: '/resultat-relation-client.png',
    alt: 'Evaluation de la qualite de relation client',
    label: 'Relation client',
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
          Social proof
        </motion.p>
        <motion.h2 variants={revealItem}>
          Je rends les resultats visibles en faisant de l organisation un vrai levier business.
        </motion.h2>
      </motion.div>

      <motion.section className="raw-testimonials" variants={revealContainer}>
        <motion.div className="raw-testimonials-heading" variants={revealItem}>
          <p className="eyebrow">Temoignages</p>
          <h3>Les retours recus au fil de mes collaborations.</h3>
        </motion.div>
        <div className="raw-testimonial-grid">
          {testimonials.map((testimonial) => (
            <motion.figure
              className="raw-testimonial-card"
              key={testimonial.image}
              variants={revealItem}
              whileHover={{ y: -5 }}
            >
              <img src={testimonial.image} alt={testimonial.label} loading="lazy" />
              <figcaption>{testimonial.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.section>

      <motion.section className="evidence-section" variants={revealContainer}>
        <motion.div className="evidence-heading" variants={revealItem}>
          <p className="eyebrow">Preuves concretes</p>
          <h3>Mes standards se mesurent sur le terrain.</h3>
          <p>
            Je suis chaque indicateur avec la meme exigence : volume traite,
            satisfaction, qualite redactionnelle et relation client.
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
          <p className="eyebrow">Concretement</p>
          <h3>Ce que je change quand je reprends ton back-office.</h3>
        </div>
        <ul>
          {changes.map((change) => (
            <li key={change}>{change}</li>
          ))}
        </ul>
      </motion.section>

      <motion.button
        className="button button-primary"
        type="button"
        onClick={() => navigate('contact')}
        variants={revealItem}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
      >
        Je veux deleguer avec methode
      </motion.button>
    </motion.section>
  )
}

export default ResultsPage

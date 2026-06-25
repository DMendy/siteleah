import { motion } from 'motion/react'
import { cardHover, revealContainer, revealItem } from '../animations'

const proofs = [
  { value: '24h', label: 'suivi reactif pour garder les demandes sous controle' },
  { value: '4', label: 'piliers couverts : admin, business, organisation et operations' },
  { value: '1', label: 'interlocutrice fiable pour centraliser les priorites' },
  { value: '0', label: 'flou inutile dans les dossiers, relances et prochaines actions' },
]

const testimonials = [
  'Une organisation plus claire, des priorites mieux posees et beaucoup moins de charge mentale.',
  'Un vrai soutien pour avancer sans laisser l administratif ralentir le business.',
  'Une methode calme, fiable et precise pour remettre de l ordre dans le quotidien.',
]

const changes = [
  'Les demandes ne restent plus perdues entre plusieurs canaux.',
  'Les relances importantes sont posees, suivies et assumees.',
  'Les priorites sont visibles avant que la semaine commence.',
  'Le dirigeant garde son energie pour les decisions importantes.',
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
          Des resultats visibles quand l organisation devient un vrai levier business.
        </motion.h2>
      </motion.div>

      <motion.div className="proof-grid" variants={revealContainer}>
        {proofs.map((proof) => (
          <motion.article
            className="proof-card"
            key={proof.label}
            variants={revealItem}
            whileHover={cardHover}
          >
            <motion.strong
              initial={{ scale: 0.86 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {proof.value}
            </motion.strong>
            <p>{proof.label}</p>
          </motion.article>
        ))}
      </motion.div>

      <motion.section className="premium-panel change-panel" variants={revealItem}>
        <div>
          <p className="eyebrow">Concretement</p>
          <h3>Ce qui change quand le back-office tient debout.</h3>
        </div>
        <ul>
          {changes.map((change) => (
            <li key={change}>{change}</li>
          ))}
        </ul>
      </motion.section>

      <motion.div className="testimonial-grid" variants={revealContainer}>
        {testimonials.map((testimonial) => (
          <motion.blockquote
            key={testimonial}
            variants={revealItem}
            whileHover={{ y: -6, rotate: -0.5 }}
          >
            {testimonial}
          </motion.blockquote>
        ))}
      </motion.div>

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

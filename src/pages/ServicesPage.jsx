import { motion } from 'motion/react'
import { cardHover, revealContainer, revealItem } from '../animations'

const services = [
  {
    title: 'Gestion administrative',
    text: 'Suivi des dossiers, organisation des documents, relances, preparation et mise au propre des informations importantes.',
  },
  {
    title: 'Assistanat business',
    text: 'Aide a la priorisation, coordination des actions, suivi des demandes et soutien dans les decisions du quotidien.',
  },
  {
    title: 'Organisation operationnelle',
    text: 'Mise en place de process simples, tableaux de suivi, routines de travail et outils pour gagner en fluidite.',
  },
  {
    title: 'Support dirigeant',
    text: 'Un appui fiable pour garder une vision claire, deleguer ce qui prend du temps et rester concentre sur la croissance.',
  },
]

const delegation = [
  'Dossiers ranges et informations centralisees',
  'Relances suivies sans charge mentale',
  'Priorites business clarifiees chaque semaine',
  'Process simples pour deleguer sans friction',
]

function ServicesPage({ navigate }) {
  return (
    <motion.section
      className="page split-page"
      variants={revealContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div className="section-heading" variants={revealContainer}>
        <motion.p className="eyebrow" variants={revealItem}>
          Services
        </motion.p>
        <motion.h2 variants={revealItem}>
          Une expertise business et administrative pour remettre de l ordre dans ton activite.
        </motion.h2>
        <motion.p variants={revealItem}>
          Le but : alleger ta charge mentale, fiabiliser ton organisation et te
          permettre d avancer avec des priorites nettes, des dossiers propres et
          un suivi clair.
        </motion.p>
      </motion.div>

      <motion.div className="service-grid" variants={revealContainer}>
        {services.map((service) => (
          <motion.article
            className="service-card"
            key={service.title}
            variants={revealItem}
            whileHover={cardHover}
          >
            <div className="card-dot"></div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </motion.article>
        ))}
      </motion.div>

      <motion.aside className="premium-panel services-panel" variants={revealItem}>
        <p className="eyebrow">Ce que tu recuperes</p>
        <h3>Un back-office clair, calme et fiable.</h3>
        <ul>
          {delegation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.aside>

      <motion.div className="page-cta" variants={revealItem}>
        <p>Ideal pour un entrepreneur ou dirigeant qui veut deleguer avec confiance.</p>
        <motion.button
          className="button button-primary"
          type="button"
          onClick={() => navigate('contact')}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          Remplir le formulaire
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default ServicesPage

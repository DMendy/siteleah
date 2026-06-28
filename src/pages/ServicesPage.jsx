import { motion } from 'motion/react'
import { cardHover, revealContainer, revealItem } from '../animations'
import { SplitHeading } from '../components/SplitHeading'

const services = [
  {
    title: 'Gestion administrative',
    text: "Je suis tes dossiers, j'organise tes documents et je mets au propre les informations importantes.",
  },
  {
    title: 'Assistanat business',
    text: "Je t'aide à prioriser, je coordonne les actions et je suis les demandes qui rythment ton quotidien.",
  },
  {
    title: 'Organisation opérationnelle',
    text: "Je mets en place des process simples, des tableaux de suivi et des routines pour gagner en fluidité.",
  },
  {
    title: 'Support dirigeant',
    text: "Je deviens ton appui fiable pour déléguer ce qui prend du temps et garder ton énergie pour la croissance.",
  },
]

const delegation = [
  'Je range tes dossiers et je centralise les informations',
  'Je suis tes relances sans ajouter de charge mentale',
  'Je clarifie tes priorités business chaque semaine',
  'Je crée des process simples pour déléguer sans friction',
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
        <SplitHeading baseDelay={0.08}>Je mets mon expertise business et administrative au service de ton activité.</SplitHeading>
        <motion.p variants={revealItem}>
          Mon objectif : alléger ta charge mentale, fiabiliser ton organisation
          et te permettre d&apos;avancer avec des priorités nettes, des dossiers
          propres et un suivi clair.
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
            <div className="card-dot" aria-hidden="true" />
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </motion.article>
        ))}
      </motion.div>

      <motion.aside className="premium-panel services-panel" variants={revealItem}>
        <div className="services-portrait">
          <img
            src="/lea-travail-bureau.jpg"
            alt="Lea Jha organise le suivi d'un dossier"
            loading="lazy"
          />
        </div>
        <div>
          <p className="eyebrow">Ce que je mets en place</p>
          <h3>Un back-office clair, calme et fiable.</h3>
        </div>
        <ul>
          {delegation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.aside>

      <motion.div className="page-cta" variants={revealItem}>
        <p>Je travaille aux côtés des entrepreneurs et dirigeants qui veulent déléguer avec confiance.</p>
        <motion.button
          className="button button-primary"
          type="button"
          onClick={() => navigate('candidature')}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
        >
          Me parler de ton besoin
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default ServicesPage

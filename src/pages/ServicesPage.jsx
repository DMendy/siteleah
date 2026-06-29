import { motion } from 'motion/react'
import { revealContainer, revealItem } from '../animations'
import { SplitHeading } from '../components/SplitHeading'

const process = [
  {
    num: '01',
    title: 'Écoute',
    text: "Je prends le temps de comprendre ton activité, tes outils, ta façon de fonctionner et ce qui te prend vraiment du temps.",
  },
  {
    num: '02',
    title: 'Cartographie',
    text: "Je repère ce qui peut être délégué, ce qui mérite un système et ce qui t'échappe sans que tu t'en rendes compte.",
  },
  {
    num: '03',
    title: 'Déploiement',
    text: "Je mets en place les routines, les suivis et les process adaptés à ton secteur, tes clients et ta réalité terrain.",
  },
  {
    num: '04',
    title: 'Suivi continu',
    text: "Je reste disponible, j'ajuste au fil du temps et je maintiens ton organisation fluide sans que tu aies à t'en préoccuper.",
  },
]

const sectors = [
  'Consultant',
  'Coach de vie',
  'E-commerce',
  'Thérapeute',
  'Agence créative',
  'Juriste',
  'Restaurateur',
  'Artisan',
  'Photographe',
  'Architecte',
  'Formateur',
  'Agent immobilier',
  'Développeur freelance',
  'Community manager',
  'Médecin',
  'Kinésithérapeute',
]

const what = [
  { label: 'Admin', items: ['Dossiers clients', 'Factures & relances', 'Boîte mail', 'Documents légaux'] },
  { label: 'Business', items: ['Priorités hebdo', 'Suivi projets', 'CRM & contacts', 'Comptes-rendus'] },
  { label: 'Ops', items: ['Routines & process', 'Outils & automatisations', 'Coordination prestataires', 'Reporting'] },
]

function ServicesPage({ navigate }) {
  return (
    <motion.section
      className="page services-page"
      variants={revealContainer}
      initial="hidden"
      animate="show"
    >
      {/* ── Hero ── */}
      <motion.div className="srv-hero" variants={revealContainer}>
        <motion.p className="eyebrow" variants={revealItem}>Services</motion.p>
        <SplitHeading baseDelay={0.06}>Un seul process. Infiniment adaptable.</SplitHeading>
        <motion.p className="srv-hero-sub" variants={revealItem}>
          Peu importe ton secteur ou tes outils — j'adapte ma méthode à ta réalité,
          pas l'inverse. Le résultat est toujours le même : une organisation qui tourne
          sans que tu aies à la porter.
        </motion.p>
      </motion.div>

      {/* ── Process steps ── */}
      <motion.div className="srv-process" variants={revealContainer}>
        {process.map((step) => (
          <motion.article
            key={step.num}
            className="srv-step"
            variants={revealItem}
          >
            <span className="srv-step-num">{step.num}</span>
            <h3 className="srv-step-title">{step.title}</h3>
            <p className="srv-step-text">{step.text}</p>
          </motion.article>
        ))}
      </motion.div>

      {/* ── Sectors marquee ── */}
      <motion.div className="srv-sectors-wrap" variants={revealItem}>
        <p className="eyebrow srv-sectors-label">Compatible avec ton secteur</p>
        <div className="srv-sectors-marquee">
          <div className="srv-sectors-track">
            {[...sectors, ...sectors].map((s, i) => (
              <span key={i} className="srv-sector-pill">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── What I handle ── */}
      <motion.div className="srv-what" variants={revealContainer}>
        <motion.div className="srv-what-heading" variants={revealItem}>
          <p className="eyebrow">Ce que je prends en charge</p>
          <h3>Tout ce qui tourne en arrière-plan de ton activité.</h3>
        </motion.div>
        <div className="srv-what-grid">
          {what.map((col) => (
            <motion.div key={col.label} className="srv-what-col" variants={revealItem}>
              <p className="srv-what-label">{col.label}</p>
              <ul>
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Case study placeholder ── */}
      <motion.div className="srv-case" variants={revealItem}>
        <div className="srv-case-badge">
          <span className="srv-case-dot" />
          Étude de cas · en cours de rédaction
        </div>
        <div className="srv-case-content">
          <div className="srv-case-left">
            <p className="eyebrow">Exemple client</p>
            <h3>Le même process, appliqué à un vrai secteur.</h3>
            <p>
              Leah accompagne actuellement un client dont elle va documenter
              le suivi complet — de l'audit initial jusqu'aux résultats mesurés.
              Cette section sera mise à jour dès que l'étude de cas est prête.
            </p>
            <div className="srv-case-steps">
              {['Audit initial', 'Mise en place', 'Résultats mesurés'].map((s, i) => (
                <div key={s} className="srv-case-step">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <p>{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="srv-case-right">
            <img
              src="/lea-travail-bureau.jpg"
              alt="Lea Jha au travail"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      {/* ── CTA ── */}
      <motion.div className="page-cta" variants={revealItem}>
        <p>Peu importe ton domaine — si tu as besoin d'ordre, je peux t'aider.</p>
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

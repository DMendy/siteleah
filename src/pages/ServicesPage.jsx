import { motion } from 'motion/react'
import { revealContainer, revealItem } from '../animations'
import { SplitHeading } from '../components/SplitHeading'

const azSteps = [
  {
    num: '01',
    title: 'Premier contact',
    text: "Formulaire du site, LinkedIn, mail ou Instagram — tu choisis le canal qui te convient.",
  },
  {
    num: '02',
    title: 'Échange & découverte',
    text: "Un appel ou une Visio pour comprendre ton fonctionnement, tes besoins et tes priorités. Pas de solution toute faite — je pars de ta réalité.",
  },
  {
    num: '03',
    title: 'Proposition sur mesure',
    text: "Je te propose un accompagnement adapté : SAV, planning, prise d'appels, gestion mails... Le contrat est défini ensemble selon tes besoins réels.",
  },
  {
    num: '04',
    title: 'Début de collaboration',
    text: "Je prends en charge les missions avec méthode et confidentialité. Je m'adapte à tes outils — si je dois me former, ce sera fait avec plaisir.",
  },
  {
    num: '05',
    title: 'Suivi régulier',
    text: "Disponible à tout moment sur la plateforme qui te convient. Je suis les missions, j'ajuste en continu et reste réactive.",
  },
  {
    num: '06',
    title: 'Collaboration durable',
    text: "Mon objectif : devenir un partenaire de confiance sur lequel tu peux compter au quotidien, sur le long terme.",
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
  {
    label: 'Administratif',
    items: ['Gestion de mails', 'Relances clients', 'Factures & documents', 'Dossiers & archivage', 'Documents légaux'],
  },
  {
    label: 'Relation client',
    items: ["SAV externalisé", "Prise d'appels", 'Suivi client', 'CRM & contacts', 'Chat & messagerie'],
  },
  {
    label: 'Organisation',
    items: ['Planning & agenda', 'Réunions & voyages', 'Coordination équipe', 'Comptes-rendus', 'Reporting'],
  },
]

const caseWalkthrough = [
  {
    num: '01',
    tool: 'CRM',
    title: "J'ai structuré 2 000 dossiers clients.",
    text: "Aucun outil en place à mon arrivée. J'ai créé la structure, importé les contacts, classé les statuts et mis en place les relances automatiques.",
    adapt: "Applicable à : CRM médical, e-commerce, agence, immobilier — même méthode, outil adapté.",
    src: '/leah-client-crm.jpg',
    alt: 'CRM organisé avec 2 000 dossiers traités',
  },
  {
    num: '02',
    tool: 'Agenda',
    title: "J'ai synchronisé les plannings de toute l'équipe.",
    text: "Conflits, doublons, réunions sans ordre du jour — j'ai remis de l'ordre dans les agendas partagés et posé un système de validation des RDV.",
    adapt: "Applicable à : cabinet médical, studio, équipe terrain, prestataire solo — tout ce qui a un calendrier.",
    src: '/leah-client-agenda.jpg',
    alt: 'Planning équipe synchronisé et structuré',
  },
  {
    num: '03',
    tool: 'Communication',
    title: "J'ai coordonné les échanges internes.",
    text: "Canaux désorganisés, messages perdus, responsabilités floues. J'ai structuré les espaces de travail, centralisé les demandes et réduit les aller-retours inutiles.",
    adapt: "Applicable à : Slack, Notion, WhatsApp pro, email — je m'adapte à l'outil en place ou j'en propose un.",
    src: '/leah-client-teams.jpg',
    alt: 'Coordination équipe et communication interne',
  },
  {
    num: '04',
    tool: 'Email',
    title: "J'ai repris le contrôle de la boîte mail.",
    text: "Boîte saturée, mails sans réponse, relances oubliées. J'ai trié, filtré, répondu et mis en place un suivi quotidien des demandes entrantes.",
    adapt: "Applicable à : quel que soit le volume ou le secteur — une boîte structurée change tout.",
    src: '/leah-client-email.jpg',
    alt: 'Gestion de boîte email et suivi quotidien',
  },
  {
    num: '05',
    tool: 'Onboarding',
    title: "J'ai géré l'intégration de nouveaux collaborateurs.",
    text: "Accès aux outils, supports de formation, suivi des premières semaines — j'ai construit le parcours d'intégration de A à Z.",
    adapt: "Applicable à : PME, indépendant qui recrute, cabinet qui grandit — tout démarrage mérite un process.",
    src: '/leah-client-formations.jpg',
    alt: 'Onboarding et formations internes',
  },
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

      {/* ── Process A à Z ── */}
      <motion.div className="srv-az" variants={revealContainer}>
        <motion.div className="srv-az-heading" variants={revealItem}>
          <p className="eyebrow">Accompagnement de A à Z</p>
          <h3>De ton premier message à une collaboration qui dure.</h3>
        </motion.div>
        <div className="srv-az-grid">
          {azSteps.map((step) => (
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
        </div>
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

      {/* ── Ce que je prends en charge ── */}
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

      {/* ── Étude de cas ── */}
      <motion.div className="srv-case-section" variants={revealContainer}>
        <motion.div className="srv-case-header" variants={revealItem}>
          <span className="srv-case-dot" aria-hidden="true" />
          <div>
            <p className="eyebrow">Étude de cas · Mission relation client</p>
            <h3>Le même process, appliqué à une vraie équipe.</h3>
            <p className="srv-case-intro">
              5 chantiers menés de front sur une mission réelle. À chaque fois : un outil
              différent, un contexte différent — et le même résultat.
            </p>
          </div>
        </motion.div>

        <div className="srv-case-walkthrough">
          {caseWalkthrough.map((step, i) => (
            <motion.article
              key={step.num}
              className={`srv-cw-item${i % 2 !== 0 ? ' srv-cw-item--reverse' : ''}`}
              variants={revealItem}
            >
              <div className="srv-cw-photo">
                <img src={step.src} alt={step.alt} loading="lazy" />
                <span className="srv-cw-tool-badge">{step.tool}</span>
              </div>
              <div className="srv-cw-body">
                <span className="srv-cw-num">{step.num}</span>
                <h4 className="srv-cw-title">{step.title}</h4>
                <p className="srv-cw-text">{step.text}</p>
                <p className="srv-cw-adapt">
                  <span aria-hidden="true">→</span> {step.adapt}
                </p>
              </div>
            </motion.article>
          ))}
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

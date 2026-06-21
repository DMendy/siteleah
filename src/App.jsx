import heroLayer from './assets/hero.png'
import './App.css'

const services = [
  {
    title: 'Image & présence',
    text: 'Une direction claire pour harmoniser les visuels, le discours et les points de contact.',
  },
  {
    title: 'Création de contenu',
    text: 'Des formats courts, élégants et réguliers pour nourrir Instagram et convertir les visites.',
  },
  {
    title: 'Accompagnement',
    text: 'Un cadre simple pour poser les objectifs, structurer les offres et avancer sans dispersion.',
  },
]

const gallery = [
  'Portrait',
  'Lifestyle',
  'Backstage',
  'Routine',
  'Offre',
  'Contact',
]

const steps = [
  'On clarifie le besoin et le style recherché.',
  'On prépare les contenus, les visuels et les messages.',
  'On lance une présence cohérente, prête à être partagée.',
]

function App() {
  return (
    <main>
      <header className="site-header" aria-label="Navigation principale">
        <a className="brand" href="#top" aria-label="Accueil Léa Jha">
          Léa Jha
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#univers">Univers</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-media" aria-hidden="true">
          <div className="portrait portrait-main">
            <span>LJ</span>
          </div>
          <div className="portrait portrait-side"></div>
          <img src={heroLayer} alt="" className="hero-layer" />
        </div>
        <div className="hero-content">
          <p className="eyebrow">Personal branding • contenu • image</p>
          <h1>Léa Jha</h1>
          <p className="hero-copy">
            Une présence digitale sensible, claire et mémorable pour transformer
            une audience Instagram en vrais contacts.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Demander un projet
            </a>
            <a
              className="button button-secondary"
              href="https://www.instagram.com/lea.jha/"
              target="_blank"
              rel="noreferrer"
            >
              Voir Instagram
            </a>
          </div>
        </div>
      </section>

      <section className="intro-band" aria-label="Positionnement">
        <p>
          Un site vitrine pensé comme une extension de son compte Instagram :
          immédiat, esthétique, mobile-first et orienté prise de contact.
        </p>
      </section>

      <section className="section-grid" id="services">
        <div className="section-heading">
          <p className="eyebrow">Ce que le site met en avant</p>
          <h2>Une offre lisible en quelques secondes</h2>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lookbook" id="univers">
        <div className="section-heading">
          <p className="eyebrow">Univers visuel</p>
          <h2>Une galerie prête à recevoir ses meilleurs contenus</h2>
        </div>
        <div className="gallery-grid" aria-label="Aperçu éditorial">
          {gallery.map((item, index) => (
            <div className={`gallery-tile tile-${index + 1}`} key={item}>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="process-section">
        <div className="section-heading">
          <p className="eyebrow">Méthode</p>
          <h2>Simple, propre, efficace</h2>
        </div>
        <ol className="steps">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Parlons du projet</h2>
          <p>
            Le bouton peut pointer vers Instagram, WhatsApp, Calendly ou un
            formulaire selon ce que la cliente préfère.
          </p>
        </div>
        <a
          className="button button-primary"
          href="https://www.instagram.com/lea.jha/"
          target="_blank"
          rel="noreferrer"
        >
          Contacter Léa
        </a>
      </section>
    </main>
  )
}

export default App

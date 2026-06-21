import { useMemo, useState } from 'react'
import './App.css'

const email = 'leah.jhayan.contact@gmail.com'

const pages = [
  { id: 'presentation', label: 'Presentation' },
  { id: 'services', label: 'Services' },
  { id: 'preuves', label: 'Resultats' },
  { id: 'contact', label: 'Candidature' },
]

const journey = [
  'Creation et developpement de JHA Cosmetic autour d une communaute engagee.',
  'Construction d une image douce, rassurante et coherente sur Instagram.',
  'Accompagnement de femmes qui veulent structurer leur activite avec clarte.',
]

const services = [
  {
    title: 'Clarifier ton positionnement',
    text: 'Comprendre ce que tu proposes, a qui tu t adresses et comment le rendre lisible.',
  },
  {
    title: 'Structurer ton offre',
    text: 'Transformer tes idees en parcours, services, prix et messages faciles a presenter.',
  },
  {
    title: 'Construire ton image',
    text: 'Aligner ton Instagram, tes visuels, ton ton et ton experience client.',
  },
  {
    title: 'Passer a l action',
    text: 'Avancer avec un cadre, des priorites et des etapes concretes semaine apres semaine.',
  },
]

const proofs = [
  { value: '+70%', label: 'jusqu a -70% sur les operations de destockage' },
  { value: '24h', label: 'reponse rapide annoncee sur les contenus de service' },
  { value: '5', label: 'rubriques Instagram deja structurees en stories a la une' },
  { value: '1', label: 'marque personnelle transformee en univers identifiable' },
]

const testimonials = [
  'Merci pour chaque message, chaque commande, chaque mot d encouragement.',
  'Une nouvelle ere, une nouvelle energie. Ce logo prend aujourd hui une nouvelle dimension.',
  'Une identite qui reflete la douceur, la feminite et l elegance orientale.',
]

function App() {
  const [activePage, setActivePage] = useState('presentation')
  const [form, setForm] = useState({
    name: '',
    email: '',
    project: '',
    goal: '',
  })

  const mailHref = useMemo(() => {
    const subject = encodeURIComponent(`Demande d'accompagnement - ${form.name || 'nouvelle demande'}`)
    const body = encodeURIComponent(
      `Bonjour Lea,\n\nJe souhaite avoir des informations sur ton accompagnement.\n\nNom : ${form.name}\nEmail : ${form.email}\nProjet : ${form.project}\nObjectif : ${form.goal}\n\nMerci,`,
    )

    return `mailto:${email}?subject=${subject}&body=${body}`
  }, [form])

  const updateForm = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  return (
    <main>
      <header className="site-header">
        <button
          className="brand"
          type="button"
          onClick={() => setActivePage('presentation')}
          aria-label="Accueil Lea Jha"
        >
          Lea Jha
        </button>
        <nav aria-label="Navigation principale">
          {pages.map((page) => (
            <button
              className={activePage === page.id ? 'nav-link active' : 'nav-link'}
              type="button"
              key={page.id}
              onClick={() => setActivePage(page.id)}
            >
              {page.label}
            </button>
          ))}
        </nav>
      </header>

      {activePage === 'presentation' && <PresentationPage setActivePage={setActivePage} />}
      {activePage === 'services' && <ServicesPage setActivePage={setActivePage} />}
      {activePage === 'preuves' && <ProofPage setActivePage={setActivePage} />}
      {activePage === 'contact' && (
        <ContactPage
          form={form}
          mailHref={mailHref}
          updateForm={updateForm}
        />
      )}
    </main>
  )
}

function PresentationPage({ setActivePage }) {
  return (
    <section className="page hero-page">
      <div className="hero-copy-block">
        <p className="eyebrow">Accompagnement • image • organisation</p>
        <h1>Lea Jha</h1>
        <p className="hero-copy">
          Elle aide les femmes entrepreneures a poser une presence claire,
          elegante et structuree, a partir de leur histoire, leur foi, leur
          rythme et leurs objectifs.
        </p>
        <div className="hero-actions">
          <button className="button button-primary" type="button" onClick={() => setActivePage('services')}>
            Voir ses services
          </button>
          <button className="button button-secondary" type="button" onClick={() => setActivePage('contact')}>
            Etre accompagnee
          </button>
        </div>
      </div>

      <div className="portrait-panel" aria-label="Resume du parcours">
        <div className="portrait-mark">LJ</div>
        <p>
          Fondatrice de JHA Cosmetic, Lea a construit une identite douce,
          feminine et reconnaissable avant de transformer son experience en
          accompagnement.
        </p>
      </div>

      <div className="journey-list">
        {journey.map((item) => (
          <article className="journey-card" key={item}>
            <span></span>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ServicesPage({ setActivePage }) {
  return (
    <section className="page split-page">
      <div className="section-heading">
        <p className="eyebrow">Services</p>
        <h2>Un accompagnement pour transformer une idee en presence solide.</h2>
        <p>
          Le but : ne plus avancer dans le flou. Lea aide a clarifier le projet,
          organiser les priorites et creer une image coherente.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="card-dot"></div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>

      <div className="page-cta">
        <p>Ideal pour une entrepreneure qui lance ou restructure son activite.</p>
        <button className="button button-primary" type="button" onClick={() => setActivePage('contact')}>
          Remplir le formulaire
        </button>
      </div>
    </section>
  )
}

function ProofPage({ setActivePage }) {
  return (
    <section className="page proof-page">
      <div className="section-heading">
        <p className="eyebrow">Social proof</p>
        <h2>Des resultats visibles dans sa propre construction de marque.</h2>
      </div>

      <div className="proof-grid">
        {proofs.map((proof) => (
          <article className="proof-card" key={proof.label}>
            <strong>{proof.value}</strong>
            <p>{proof.label}</p>
          </article>
        ))}
      </div>

      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial}>{testimonial}</blockquote>
        ))}
      </div>

      <button className="button button-primary" type="button" onClick={() => setActivePage('contact')}>
        Je veux le meme cadre
      </button>
    </section>
  )
}

function ContactPage({ form, mailHref, updateForm }) {
  return (
    <section className="page contact-page">
      <div className="section-heading">
        <p className="eyebrow">Mini formulaire</p>
        <h2>Envoie une demande directement dans sa boite mail.</h2>
        <p>
          Le bouton ouvre ton application mail avec un message deja prepare pour
          Lea. Il restera juste a verifier puis envoyer.
        </p>
      </div>

      <form className="contact-form">
        <label>
          Ton nom
          <input
            name="name"
            value={form.name}
            onChange={updateForm}
            placeholder="Ex : Sarah"
          />
        </label>
        <label>
          Ton email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateForm}
            placeholder="ton@email.com"
          />
        </label>
        <label>
          Ton projet
          <textarea
            name="project"
            value={form.project}
            onChange={updateForm}
            placeholder="Explique rapidement ton activite ou ton idee."
          />
        </label>
        <label>
          Ton objectif
          <textarea
            name="goal"
            value={form.goal}
            onChange={updateForm}
            placeholder="Ce que tu veux clarifier, structurer ou developper."
          />
        </label>
        <a className="button button-primary" href={mailHref}>
          Envoyer la demande
        </a>
      </form>
    </section>
  )
}

export default App

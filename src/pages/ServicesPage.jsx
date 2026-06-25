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

function ServicesPage({ navigate }) {
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
        <button className="button button-primary" type="button" onClick={() => navigate('contact')}>
          Remplir le formulaire
        </button>
      </div>
    </section>
  )
}

export default ServicesPage

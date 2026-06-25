const journey = [
  'Creation et developpement de JHA Cosmetic autour d une communaute engagee.',
  'Construction d une image douce, rassurante et coherente sur Instagram.',
  'Accompagnement de femmes qui veulent structurer leur activite avec clarte.',
]

function PresentationPage({ navigate }) {
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
          <button className="button button-primary" type="button" onClick={() => navigate('services')}>
            Voir ses services
          </button>
          <button className="button button-secondary" type="button" onClick={() => navigate('contact')}>
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

export default PresentationPage

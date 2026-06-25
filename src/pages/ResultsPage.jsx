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

function ResultsPage({ navigate }) {
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

      <button className="button button-primary" type="button" onClick={() => navigate('contact')}>
        Je veux le meme cadre
      </button>
    </section>
  )
}

export default ResultsPage

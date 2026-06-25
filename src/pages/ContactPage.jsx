import { useMemo, useState } from 'react'

const email = 'leah.jhayan.contact@gmail.com'

function ContactPage() {
  const [status, setStatus] = useState({ type: null, message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    project: '',
    goal: '',
  })

  const mailHref = useMemo(() => {
    const subject = encodeURIComponent(
      `Demande d'accompagnement - ${form.name || 'nouvelle demande'}`,
    )
    const body = encodeURIComponent(
      `Bonjour Lea,\n\nJe souhaite avoir des informations sur ton accompagnement.\n\nNom : ${form.name}\nEmail : ${form.email}\nProjet : ${form.project}\nObjectif : ${form.goal}\n\nMerci,`,
    )

    return `mailto:${email}?subject=${subject}&body=${body}`
  }, [form])

  const updateForm = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: 'info', message: 'Preparation du mail en cours...' })

    window.setTimeout(() => {
      window.location.href = mailHref
      setStatus({
        type: 'success',
        message: 'Ton mail est pret. Verifie-le dans ton application mail puis envoie-le a Lea.',
      })
      setIsSubmitting(false)
    }, 350)
  }

  return (
    <section className="page contact-page">
      <div className="section-heading">
        <p className="eyebrow">Mini formulaire</p>
        <h2>Envoie une demande directement dans sa boite mail.</h2>
        <p>
          Complete les informations ci-dessous. Ton application mail s ouvrira
          avec un message deja prepare pour Lea.
        </p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nom
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={updateForm}
            placeholder="Ton prenom et ton nom"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={updateForm}
            placeholder="hello@tonbusiness.com"
          />
        </label>
        <label htmlFor="project">
          Ton projet
          <textarea
            id="project"
            name="project"
            rows="4"
            required
            value={form.project}
            onChange={updateForm}
            placeholder="Parle de ton activite, ton idee ou ton blocage du moment."
          />
        </label>
        <label htmlFor="goal">
          Ton objectif
          <textarea
            id="goal"
            name="goal"
            rows="4"
            required
            value={form.goal}
            onChange={updateForm}
            placeholder="Ce que tu veux clarifier, structurer ou developper avec Lea."
          />
        </label>
        <button
          className="button button-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Preparation...' : 'Envoyer'}
        </button>
        {status.message && (
          <p className={`form-status ${status.type || ''}`}>{status.message}</p>
        )}
      </form>
    </section>
  )
}

export default ContactPage

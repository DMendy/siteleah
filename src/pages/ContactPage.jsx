import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { revealContainer, revealItem } from '../animations'

const email = 'leah.jhayan.contact@gmail.com'

const requestIdeas = [
  'Mettre de l ordre dans ton administratif',
  'Suivre tes relances et demandes clients',
  'Clarifier tes priorites business',
  'Construire un cadre de delegation simple',
]

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
      `Bonjour Lea,\n\nJe souhaite avoir des informations sur ton accompagnement en assistanat business et administratif.\n\nNom : ${form.name}\nEmail : ${form.email}\nProjet / activite : ${form.project}\nBesoin prioritaire : ${form.goal}\n\nMerci,`,
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
        message: 'Ton mail est pret. Verifie-le dans ton application mail puis envoie-le-moi.',
      })
      setIsSubmitting(false)
    }, 350)
  }

  return (
    <motion.section
      className="page contact-page"
      variants={revealContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div className="section-heading" variants={revealContainer}>
        <motion.p className="eyebrow" variants={revealItem}>
          Demande d accompagnement
        </motion.p>
        <motion.h2 variants={revealItem}>
          Presente-moi ton besoin administratif ou business.
        </motion.h2>
        <motion.p variants={revealItem}>
          Complete les informations ci-dessous. Ton application mail s ouvrira
          avec une demande claire pour parler organisation, delegation et suivi.
        </motion.p>
        <motion.aside className="premium-panel contact-helper" variants={revealItem}>
          <p className="eyebrow">Tu peux demander</p>
          <ul>
            {requestIdeas.map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </ul>
        </motion.aside>
      </motion.div>

      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        variants={revealContainer}
      >
        <motion.label htmlFor="name" variants={revealItem}>
          Nom
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={updateForm}
            placeholder="Ton prenom et ton nom"
          />
        </motion.label>
        <motion.label htmlFor="email" variants={revealItem}>
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
        </motion.label>
        <motion.label htmlFor="project" variants={revealItem}>
          Ton activite
          <textarea
            id="project"
            name="project"
            rows="4"
            required
            value={form.project}
            onChange={updateForm}
            placeholder="Parle de ton activite, ton organisation actuelle ou ce que tu veux deleguer."
          />
        </motion.label>
        <motion.label htmlFor="goal" variants={revealItem}>
          Ton besoin prioritaire
          <textarea
            id="goal"
            name="goal"
            rows="4"
            required
            value={form.goal}
            onChange={updateForm}
            placeholder="Administratif, relances, suivi client, coordination, process, priorites..."
          />
        </motion.label>
        <motion.button
          className="button button-primary"
          type="submit"
          disabled={isSubmitting}
          variants={revealItem}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? 'Preparation...' : 'Envoyer'}
        </motion.button>
        {status.message && (
          <motion.p
            className={`form-status ${status.type || ''}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {status.message}
          </motion.p>
        )}
      </motion.form>
    </motion.section>
  )
}

export default ContactPage

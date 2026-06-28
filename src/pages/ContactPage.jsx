import { useState } from 'react'
import { motion } from 'motion/react'
import { revealContainer, revealItem } from '../animations'
import { SplitHeading } from '../components/SplitHeading'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''
const FALLBACK_EMAIL = 'leah.jhayan.contact@gmail.com'

const requestIdeas = [
  "Mettre de l'ordre dans ton administratif",
  'Suivre tes relances et demandes clients',
  'Clarifier tes priorités business',
  'Construire un cadre de délégation simple',
]

const emptyForm = { name: '', email: '', project: '', goal: '' }

function ContactPage() {
  const [status,      setStatus]      = useState({ type: null, message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form,        setForm]        = useState(emptyForm)
  const [sent,        setSent]        = useState(false)

  const updateForm = (e) => {
    const { name, value } = e.target
    setForm((c) => ({ ...c, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: '' })

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Demande d'accompagnement - ${form.name}`)
      const body    = encodeURIComponent(
        `Bonjour Lea,\n\nNom : ${form.name}\nEmail : ${form.email}\nActivité : ${form.project}\nBesoin : ${form.goal}\n\nMerci,`
      )
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`
      setStatus({ type: 'success', message: 'Ton mail est prêt dans ton application mail.' })
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSent(true)
        setForm(emptyForm)
      } else {
        setStatus({ type: 'error', message: 'Une erreur est survenue. Réessaie ou écris-moi directement.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Problème réseau. Réessaie ou écris-moi directement.' })
    } finally {
      setIsSubmitting(false)
    }
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
          Demande d&apos;accompagnement
        </motion.p>
        <SplitHeading baseDelay={0.1}>
          Présente-moi ton besoin administratif ou business.
        </SplitHeading>
        <motion.p variants={revealItem}>
          Complète les informations ci-dessous et ton message m&apos;arrivera directement.
          Je reviens vers toi sous 24h.
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

      {sent ? (
        <motion.div
          className="contact-form contact-success"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow" style={{ color: 'var(--sage)' }}>Message envoyé</p>
          <h3>Merci, je reviens vers toi très bientôt.</h3>
          <p>Je prends le temps de lire chaque demande et je te réponds sous 24h.</p>
        </motion.div>
      ) : (
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
              placeholder="Ton prénom et ton nom"
              autoComplete="name"
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
              autoComplete="email"
            />
          </motion.label>

          <motion.label htmlFor="project" variants={revealItem}>
            Ton activité
            <textarea
              id="project"
              name="project"
              rows="4"
              required
              value={form.project}
              onChange={updateForm}
              placeholder="Parle de ton activité, ton organisation actuelle ou ce que tu veux déléguer."
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
              placeholder="Administratif, relances, suivi client, coordination, process, priorités…"
            />
          </motion.label>

          <motion.button
            className="button button-primary"
            type="submit"
            disabled={isSubmitting}
            variants={revealItem}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          >
            {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
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
      )}
    </motion.section>
  )
}

export default ContactPage

import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LogoMonogram } from './components/LogoMonogram'
import ContactPage from './pages/ContactPage'
import PresentationPage from './pages/PresentationPage'
import ResultsPage from './pages/ResultsPage'
import ServicesPage from './pages/ServicesPage'
import './App.css'

const SceneLazy = lazy(() =>
  import('./components/Scene').then((m) => ({ default: m.Scene }))
)

const pages = [
  { id: 'presentation', path: '/',            label: 'Présentation' },
  { id: 'services',     path: '/services',    label: 'Services'     },
  { id: 'resultats',    path: '/resultats',   label: 'Résultats'    },
  { id: 'candidature',  path: '/candidature', label: 'Candidature'  },
]

/* Emil: transform + opacity only; asymmetric enter(deliberate)/exit(snappy) */
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.14 },
  },
}

const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.18 } },
  show:   { opacity: 1, transition: { duration: 0.22 } },
}

const overlayNavVariants = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
}

const overlayLinkVariants = {
  hidden: { opacity: 0, y: 36, transition: { duration: 0.18 } },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const activeId = pages.find((p) => p.path === location.pathname)?.id ?? 'presentation'

  const navigateTo = (pageId) => {
    const page = pages.find((p) => p.id === pageId)
    if (page) {
      ScrollTrigger.killAll()
      window.scrollTo(0, 0)
      navigate(page.path)
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Magnetic buttons ── */
  useEffect(() => {
    const STRENGTH = 0.38
    const RANGE    = 88

    const onMove = (e) => {
      document.querySelectorAll('.button').forEach((btn) => {
        const r  = btn.getBoundingClientRect()
        const cx = r.left + r.width  / 2
        const cy = r.top  + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const d  = Math.hypot(dx, dy)

        if (d < RANGE) {
          const t = 1 - d / RANGE
          gsap.to(btn, { x: dx * STRENGTH * t, y: dy * STRENGTH * t, duration: 0.28, ease: 'power2.out', overwrite: 'auto' })
        } else {
          gsap.to(btn, { x: 0, y: 0, duration: 0.38, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' })
        }
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <SceneLazy />
      </Suspense>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              className="mobile-overlay-nav"
              aria-label="Navigation mobile"
              variants={overlayNavVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {pages.map((page) => (
                <motion.button
                  key={page.id}
                  className={`mobile-nav-link${activeId === page.id ? ' active' : ''}`}
                  type="button"
                  variants={overlayLinkVariants}
                  onClick={() => navigateTo(page.id)}
                >
                  {page.label}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <header className="site-header">
          <button
            className="brand"
            type="button"
            onClick={() => navigateTo('presentation')}
            aria-label="Accueil Lea Jha"
          >
            <LogoMonogram className="brand-logo" ariaHidden />
          </button>

          <button
            className="burger-btn"
            type="button"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="burger-bar" />
            <span className="burger-bar" />
            <span className="burger-bar" />
          </button>
        </header>

        <motion.nav
          className="circle-nav"
          aria-label="Navigation principale"
          initial={{ opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {pages.map((page) => (
            <motion.button
              className={activeId === page.id ? 'nav-link active' : 'nav-link'}
              type="button"
              key={page.id}
              onClick={() => navigateTo(page.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              {page.label}
            </motion.button>
          ))}
        </motion.nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Routes location={location}>
              <Route path="/"            element={<PresentationPage navigate={navigateTo} />} />
              <Route path="/services"    element={<ServicesPage     navigate={navigateTo} />} />
              <Route path="/resultats"   element={<ResultsPage      navigate={navigateTo} />} />
              <Route path="/candidature" element={<ContactPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        <footer className="site-footer">
          <div className="footer-brand">
            <LogoMonogram className="footer-logo" />
            <p>J&apos;accompagne les entrepreneurs qui veulent avancer avec une organisation claire et fiable.</p>
          </div>

          <nav className="footer-nav" aria-label="Navigation secondaire">
            {pages.map((page) => (
              <button
                className={activeId === page.id ? 'footer-link active' : 'footer-link'}
                type="button"
                key={page.id}
                onClick={() => navigateTo(page.id)}
              >
                {page.label}
              </button>
            ))}
          </nav>

          <div className="footer-contact">
            <span>Contact</span>
            <a href="mailto:leah.jhayan.contact@gmail.com">leah.jhayan.contact@gmail.com</a>
          </div>
        </footer>
      </main>
    </>
  )
}

export default App

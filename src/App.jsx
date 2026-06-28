import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import ContactPage from './pages/ContactPage'
import PresentationPage from './pages/PresentationPage'
import ResultsPage from './pages/ResultsPage'
import ServicesPage from './pages/ServicesPage'
import './App.css'

const pages = [
  { id: 'presentation', label: 'Presentation' },
  { id: 'services', label: 'Services' },
  { id: 'results', label: 'Resultats' },
  { id: 'contact', label: 'Candidature' },
]

const pageVariants = {
  initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(8px)',
    transition: { duration: 0.22, ease: 'easeInOut' },
  },
}

function App() {
  const [activePage, setActivePage] = useState('presentation')

  const navigateTo = (pageId) => {
    setActivePage(pageId)
  }

  const pageComponents = {
    presentation: <PresentationPage navigate={navigateTo} />,
    services: <ServicesPage navigate={navigateTo} />,
    results: <ResultsPage navigate={navigateTo} />,
    contact: <ContactPage />,
  }

  return (
    <main>
      <header className="site-header">
        <button
          className="brand"
          type="button"
          onClick={() => navigateTo('presentation')}
          aria-label="Accueil Lea Jha"
        >
          <img className="brand-logo" src="/logo-lea-jha.png" alt="" />
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
            className={activePage === page.id ? 'nav-link active' : 'nav-link'}
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
          key={activePage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {pageComponents[activePage]}
        </motion.div>
      </AnimatePresence>

      <footer className="site-footer">
        <div className="footer-brand">
          <img className="footer-logo" src="/logo-lea-jha.png" alt="Lea Jha" />
          <p>J accompagne les entrepreneurs qui veulent avancer avec une organisation claire et fiable.</p>
        </div>

        <nav className="footer-nav" aria-label="Navigation secondaire">
          {pages.map((page) => (
            <button
              className={activePage === page.id ? 'footer-link active' : 'footer-link'}
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
  )
}

export default App

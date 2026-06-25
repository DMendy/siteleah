import { useState } from 'react'
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

function App() {
  const [activePage, setActivePage] = useState('presentation')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigateTo = (pageId) => {
    setActivePage(pageId)
    setIsMenuOpen(false)
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
          Lea Jha
        </button>

        <div className="menu-wrap">
          <button
            className={isMenuOpen ? 'burger-button open' : 'burger-button'}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={isMenuOpen ? 'site-nav open' : 'site-nav'}
            id="main-menu"
            aria-label="Navigation principale"
          >
            {pages.map((page) => (
            <button
              className={activePage === page.id ? 'nav-link active' : 'nav-link'}
              type="button"
              key={page.id}
              onClick={() => navigateTo(page.id)}
            >
              {page.label}
            </button>
            ))}
          </nav>
        </div>
      </header>

      {pageComponents[activePage]}
    </main>
  )
}

export default App

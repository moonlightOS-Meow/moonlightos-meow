import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import './App.css'

function useDevice() {
  const [d, setD] = useState(() => {
    if (typeof window === 'undefined') return 'desktop'
    const w = window.innerWidth
    return (w < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) ? 'mobile' : 'desktop'
  })
  return d
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
]

function Home() {
  const { t } = useTranslation()
  const device = useDevice()
  const isMobile = device === 'mobile'

  const features = [
    { icon: '✨', key: 'kde' },
    { icon: '🏃', key: 'rolling' },
    { icon: '🔧', key: 'noHand' },
    { icon: '🐱', key: 'lucifer' },
  ]

  return (
    <div className="page">
      <div className="scanline"></div>
      
      <header className="hero">
        <motion.div 
          className="moon"
          animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌙
        </motion.div>
        <h1 className="title">{t('title')}</h1>
        <p className="subtitle">{t('subtitle')}</p>
        <p className="tagline">{t('tagline')}</p>
      </header>

      <main>
        <section className="features">
          {features.map((f, i) => (
            <motion.div 
              key={f.key}
              className="feature"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <span className="icon">{f.icon}</span>
              <h3>{t(`features.${f.key}`)}</h3>
              <p>{t(`features.${f.key}Desc`)}</p>
            </motion.div>
          ))}
        </section>

        <section className="cta">
          <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/releases" className="btn">
            {t('download')}
          </a>
          <a href="https://github.com/moonlightOS-Meow/moonlightos-meow" className="btn btn-secondary">
            {t('viewGithub')}
          </a>
        </section>

        <section className="info">
          <div className="info-box">
            <h3>{t('requirements')}</h3>
            <ul>
              <li>{t('reqItems.cpu')}</li>
              <li>{t('reqItems.ram')}</li>
              <li>{t('reqItems.storage')}</li>
              <li>{t('reqItems.suffering')}</li>
            </ul>
          </div>
          <div className="info-box">
            <h3>{t('building')}</h3>
            <pre>{t('buildCode')}</pre>
          </div>
        </section>
      </main>

      <footer>
        <p>{t('footer')}</p>
        <p className="small">{t('footerSub')}</p>
      </footer>
    </div>
  )
}

function Download() {
  const { t } = useTranslation()

  return (
    <div className="page">
      <div className="scanline"></div>
      <header className="hero">
        <h1 className="title">Download</h1>
        <p className="subtitle">Get moonlightOS v7.0</p>
      </header>
      <main>
        <div className="download-section">
          <p>ISO downloads coming soon...</p>
          <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/releases" className="btn">
            {t('viewGithub')}
          </a>
        </div>
      </main>
      <footer>
        <p>{t('footer')}</p>
      </footer>
    </div>
  )
}

function LanguageSelector() {
  const { i18n } = useTranslation()

  return (
    <div className="lang-selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${i18n.language === lang.code ? 'active' : ''}`}
          onClick={() => i18n.changeLanguage(lang.code)}
          title={lang.name}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  )
}

function Navigation() {
  const { t } = useTranslation()

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">moonlightOS</Link>
      <div className="nav-links">
        <Link to="/">{t('download')}</Link>
        <Link to="/download">Download</Link>
        <LanguageSelector />
      </div>
    </nav>
  )
}

function App() {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </div>
  )
}

export default App
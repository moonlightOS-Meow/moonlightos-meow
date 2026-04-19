import { Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'

function useDevice() {
  return 'desktop'
}

function Home() {
  const device = useDevice()
  const isMobile = device === 'mobile'

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
        <h1 className="title">moonlightOS</h1>
        <p className="subtitle">v7.0 — "The Return"</p>
        <p className="tagline">Arch-based KDE Plasma. Rolling release. NO HANDHOLDING.</p>
      </header>

      <main>
        <section className="features">
          <motion.div 
            className="feature"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="icon">✨</span>
            <h3>KDE Plasma</h3>
            <p>Rice is life. Deal with it.</p>
          </motion.div>
          <motion.div 
            className="feature"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="icon">🏃</span>
            <h3>Rolling Release</h3>
            <p>Always broken, always updated.</p>
          </motion.div>
          <motion.div 
            className="feature"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="icon">🔧</span>
            <h3>NO HANDHOLDING</h3>
            <p>Figure it out yourself.</p>
          </motion.div>
          <motion.div 
            className="feature"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="icon">🐱</span>
            <h3>Lucifer</h3>
            <p>Disapproves silently.</p>
          </motion.div>
        </section>

        <section className="cta">
          <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/releases" className="btn">
            Download ISO
          </a>
          <a href="https://github.com/moonlightOS-Meow/moonlightos-meow" className="btn btn-secondary">
            View on GitHub
          </a>
        </section>

        <section className="info">
          <div className="info-box">
            <h3>Requirements</h3>
            <ul>
              <li>x86_64 CPU</li>
              <li>4GB RAM (8GB recommended)</li>
              <li>20GB storage</li>
              <li>A tolerance for suffering</li>
            </ul>
          </div>
          <div className="info-box">
            <h3>Building</h3>
            <pre>{`sudo pacman -S archiso
git clone https://github.com/moonlightOS-Meow/moonlightos-meow
cd moonlightos-meow
sudo mkarchiso -v -w /tmp/iso -o ./out releng`}</pre>
          </div>
        </section>
      </main>

      <footer>
        <p>moonlightOS v7.0 — "The Return"</p>
        <p className="small">We went back to Arch. We regret everything. 🌈💀</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/" className="nav-logo">moonlightOS</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/download">Download</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
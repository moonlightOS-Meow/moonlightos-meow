import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './App.css'

function App() {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 100)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container">
      <div className="scanline"></div>
      
      <header className="hero">
        <motion.div 
          className="moon"
          animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌙
        </motion.div>
        <motion.h1 
          className={`title ${glitch ? 'glitch' : ''}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          moonlightOS
        </motion.h1>
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          v7.0 — "The Return"
        </motion.p>
        <motion.p 
          className="tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Arch-based KDE Plasma. Rolling release. NO HANDHOLDING.
        </motion.p>
      </header>

      <main>
        <motion.section 
          className="features"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {[
            { icon: '✨', title: 'KDE Plasma', desc: 'Rice is life. Deal with it.' },
            { icon: '🏃', title: 'Rolling Release', desc: 'Always broken, always updated.' },
            { icon: '🔧', title: 'NO HANDHOLDING', desc: 'Figure it out yourself.' },
            { icon: '🐱', title: 'Lucifer', desc: 'Disapproves silently.' },
          ].map((feature, i) => (
            <motion.div 
              key={i}
              className="feature"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          className="cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.a 
            href="https://github.com/moonlightOS-Meow/moonlightos-meow/releases" 
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download ISO
          </motion.a>
          <motion.a 
            href="https://github.com/moonlightOS-Meow/moonlightos-meow" 
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View on GitHub
          </motion.a>
        </motion.section>

        <motion.section 
          className="info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
        >
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
            <pre>
{`sudo pacman -S archiso
git clone https://github.com/moonlightOS-Meow/moonlightos-meow
cd moonlightos-meow
sudo mkarchiso -v -w /tmp/iso -o ./out releng`}
            </pre>
          </div>
        </motion.section>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p>moonlightOS v7.0 — "The Return"</p>
        <p className="small">We went back to Arch. We regret everything. 🌈💀</p>
      </motion.footer>
    </div>
  )
}

export default App
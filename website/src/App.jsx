import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [introPhase, setIntroPhase] = useState(0)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const timeline = []
    
    // Phase 1: Logo appears from left off-screen, speeds to center
    timeline.push(setTimeout(() => setIntroPhase(1), 100))
    
    // Phase 2: Logo bounces/jumps down
    timeline.push(setTimeout(() => setIntroPhase(2), 800))
    
    // Phase 3: Logo settles and glows
    timeline.push(setTimeout(() => setIntroPhase(3), 1400))
    
    // Phase 4: Fade out intro to reveal website
    timeline.push(setTimeout(() => {
      setIntroPhase(4)
      setTimeout(() => setShowIntro(false), 600)
    }, 2500))
    
    return () => timeline.forEach(t => clearTimeout(t))
  }, [])

  useEffect(() => {
    if (!showIntro) {
      const interval = setInterval(() => {
        setGlitch(true)
        setTimeout(() => setGlitch(false), 100)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [showIntro])

  const logoVariants = {
    hidden: { x: '-150%', scale: 0.5, opacity: 0 },
    center: { 
      x: 0, 
      scale: 1.2, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }
    },
    bounce: {
      y: [0, -80, 0],
      scale: [1.2, 1.3, 1.1, 1.15],
      transition: { duration: 0.5, times: [0, 0.3, 0.6, 1] }
    },
    glow: {
      scale: [1.15, 1.2, 1.15],
      filter: ['drop-shadow(0 0 20px #9b5de5)', 'drop-shadow(0 0 40px #9b5de5)', 'drop-shadow(0 0 20px #9b5de5)'],
      transition: { duration: 0.4, repeat: Infinity }
    },
    exit: {
      y: 100,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 }
    }
  }

  return (
    <>
      {showIntro && (
        <motion.div 
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0a0a0f',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: introPhase >= 4 ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Speed lines effect */}
          {introPhase >= 1 && introPhase < 3 && (
            <div className="speed-lines">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="speed-line"
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ 
                    x: [null, 400], 
                    opacity: [0, 1, 0] 
                  }}
                  transition={{ 
                    duration: 0.4, 
                    delay: i * 0.05,
                    ease: 'easeOut'
                  }}
                  style={{
                    top: `${20 + i * 10}%`,
                    height: 2 + Math.random() * 3,
                  }}
                />
              ))}
            </div>
          )}

          {/* Main logo */}
          <motion.div
            style={{
              fontSize: 'clamp(4rem, 15vw, 10rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #fff 0%, #9b5de5 30%, #f472b6 60%, #00f0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-3px',
              cursor: 'default',
              userSelect: 'none',
            }}
            initial="hidden"
            animate={
              introPhase === 1 ? 'center' :
              introPhase === 2 ? 'bounce' :
              introPhase === 3 ? 'glow' :
              'exit'
            }
            variants={logoVariants}
          >
            moonlightOS
          </motion.div>

          {/* Subtitle during intro */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '20%',
              fontSize: 'clamp(1rem, 4vw, 2rem)',
              color: '#9b5de5',
              fontWeight: 600,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: introPhase >= 2 ? 1 : 0, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            v7.0 — "The Return"
          </motion.div>
        </motion.div>
      )}

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
    </>
  )
}

export default App
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './App.css'

function useDevice() {
  const [d, setD] = useState(null)
  const initialized = useRef(false)
  
  useEffect(() => {
    const check = () => {
      if (initialized.current) return
      const w = window.innerWidth
      if (w < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) setD('mobile')
      else setD('desktop')
      initialized.current = true
    }
    check()
    window.addEventListener('resize', check)
    window.addEventListener('load', check)
    return () => {
      window.removeEventListener('resize', check)
      window.removeEventListener('load', check)
    }
  }, [])
  
  return d || 'desktop'
}

function App() {
  const device = useDevice()
  const [showIntro, setShowIntro] = useState(true)
  const [introPhase, setIntroPhase] = useState(0)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const timeline = []
    const isMobile = device === 'mobile'
    const baseDelay = isMobile ? 1.5 : 1
    
    // Phase 1: Logo enters from left
    timeline.push(setTimeout(() => setIntroPhase(1), 100))
    
    // Phase 2: Bounce/jump
    timeline.push(setTimeout(() => setIntroPhase(2), 100 + baseDelay * 500))
    
    // Phase 3: Glow
    timeline.push(setTimeout(() => setIntroPhase(3), 100 + baseDelay * 1000))
    
    // Phase 4: Jump DOWN to reveal (not just fade)
    timeline.push(setTimeout(() => {
      setIntroPhase(4)
    }, 100 + baseDelay * 1800))
    
    // Phase 5: Show website
    timeline.push(setTimeout(() => setShowIntro(false), 100 + baseDelay * 2200))
    
    return () => timeline.forEach(t => clearTimeout(t))
  }, [device])

  useEffect(() => {
    if (!showIntro) {
      const interval = setInterval(() => {
        setGlitch(true)
        setTimeout(() => setGlitch(false), 100)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [showIntro])

  const isMobile = device === 'mobile'

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
            padding: isMobile ? '20px' : '0',
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: introPhase >= 5 ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          {introPhase >= 1 && introPhase < 4 && (
            <div className="speed-lines">
              {[...Array(isMobile ? 4 : 8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="speed-line"
                  initial={{ x: isMobile ? -100 : -200, opacity: 0 }}
                  animate={{ 
                    x: [null, isMobile ? 150 : 350], 
                    opacity: [0, 1, 0] 
                  }}
                  transition={{ 
                    duration: isMobile ? 0.4 : 0.6, 
                    delay: i * (isMobile ? 0.1 : 0.06),
                    ease: 'easeOut'
                  }}
                  style={{
                    top: `${20 + i * (isMobile ? 18 : 10)}%`,
                    height: 1 + Math.random() * 2,
                    width: isMobile ? 80 : 150,
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            style={{
              fontSize: isMobile ? 'clamp(2rem, 12vw, 3.5rem)' : 'clamp(3rem, 18vw, 8rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #fff 0%, #9b5de5 30%, #f472b6 60%, #00f0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: isMobile ? '-1px' : '-2px',
              cursor: 'default',
              userSelect: 'none',
              textAlign: 'center',
              position: 'relative',
              zIndex: 10,
            }}
            initial={{ x: '-120%', scale: 0.4, opacity: 0 }}
            animate={
              introPhase === 1 
                ? { x: 0, scale: isMobile ? 0.9 : 1.1, opacity: 1, transition: { duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] } }
                : introPhase === 2
                ? { 
                    y: [0, -isMobile ? 30 : 60, 0], 
                    scale: [isMobile ? 0.9 : 1.1, isMobile ? 1 : 1.2, isMobile ? 0.9 : 1.1, isMobile ? 0.95 : 1.15], 
                    transition: { duration: 0.5, times: [0, 0.3, 0.6, 1] }
                  }
                : introPhase === 3
                ? { 
                    scale: [isMobile ? 0.95 : 1.15, isMobile ? 1 : 1.2, isMobile ? 0.95 : 1.15],
                    filter: ['drop-shadow(0 0 10px #9b5de5)', 'drop-shadow(0 0 25px #9b5de5)', 'drop-shadow(0 0 10px #9b5de5)'],
                    transition: { duration: 0.4, repeat: Infinity }
                  }
                : introPhase >= 4
                ? { 
                    y: isMobile ? 200 : 400, 
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.5, ease: 'easeIn' }
                  }
                : {}
            }
          >
            moonlightOS
          </motion.div>

          <motion.div
            style={{
              position: 'absolute',
              bottom: isMobile ? '12%' : '18%',
              fontSize: isMobile ? 'clamp(0.7rem, 3vw, 1rem)' : 'clamp(0.9rem, 3vw, 1.5rem)',
              color: '#9b5de5',
              fontWeight: 600,
              zIndex: 10,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: introPhase >= 2 ? [0, 1, 1, 0] : 0, 
              y: 0,
              transition: { duration: 0.3 }
            }}
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
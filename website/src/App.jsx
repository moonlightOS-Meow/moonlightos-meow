import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 100)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container">
      <div className="scanline"></div>
      
      <header className="hero">
        <div className="moon">🌙</div>
        <h1 className={`title ${glitch ? 'glitch' : ''}`}>moonlightOS</h1>
        <p className="subtitle">v7.0 — "The Return"</p>
        <p className="tagline">Arch-based KDE Plasma. Rolling release. NO HANDHOLDING.</p>
      </header>

      <main>
        <section className="features">
          <div className="feature">
            <span className="icon">✨</span>
            <h3>KDE Plasma</h3>
            <p>Rice is life. Deal with it.</p>
          </div>
          <div className="feature">
            <span className="icon">🏃</span>
            <h3>Rolling Release</h3>
            <p>Always broken, always updated.</p>
          </div>
          <div className="feature">
            <span className="icon">🔧</span>
            <h3>NO HANDHOLDING</h3>
            <p>Figure it out yourself.</p>
          </div>
          <div className="feature">
            <span className="icon">🐱</span>
            <h3>Lucifer</h3>
            <p>Disapproves silently.</p>
          </div>
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
            <pre>
{`sudo pacman -S archiso
git clone https://github.com/moonlightOS-Meow/moonlightos-meow
cd moonlightos-meow
sudo mkarchiso -v -w /tmp/iso -o ./out releng`}
            </pre>
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

export default App
import { useState, useEffect, useRef } from 'react'
import './App.css'
import lucyferHead from './assets/lucyfer-head.png'

const LORE = [
  { name: 'AshOS v1', desc: 'Kubuntu remaster. Born from a tablet fire.', status: 'DEAD', cls: 'dead' },
  { name: 'Phoenix v1.0 → v2.0', desc: 'Born after rm -rf disaster. GRUB said "FUCK CALAMARES".', status: 'ARCHIVED', cls: 'dead' },
  { name: 'NoVa V3', desc: '730+ commits. 0 bootable ISOs. S3RL bait legacy.', status: 'DEAD', cls: 'dead' },
  { name: 'Meow v4.0', desc: 'Fedora/Nobara era. Kickstart + lorax. Gone but not forgotten.', status: 'RIP', cls: 'dead' },
  { name: "Meow v5.0 \"Lucyfer's Revenge\"", desc: 'Arch-based. Openbox. Villain arc fully activated.', status: 'ALIVE', cls: 'alive' },
  { name: 'Meow Windows Edition', desc: 'NTLite debloat. GlazeWM. Makka Pakka. Temporary setback.', status: 'ACTIVE', cls: 'active' },
  { name: 'Meow v6.0 ← you are here', desc: 'Debian 13 Trixie. Minimal. No desktop. Lucyfer\'s Resurrection.', status: 'YOU ARE HERE', cls: 'resurrection' },
]

const FEATURES = [
  { icon: '✓', text: 'Arch was getting boring' },
  { icon: '✓', text: 'Fedora/Nobara gave us PTSD (v4.0 era)' },
  { icon: '✓', text: 'Windows Edition exists and that\'s already cursed enough' },
  { icon: '✓', text: 'Debian 13 Trixie is stable and doesn\'t fight back' },
  { icon: '✓', text: 'live-build is actually not terrible' },
  { icon: '✓', text: 'Lucyfer said "mrrp" which we interpreted as approval' },
]

function useDevice() {
  const [device, setDevice] = useState('desktop')
  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth
      setDevice(w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop')
    }
    detect()
    window.addEventListener('resize', detect)
    return () => window.removeEventListener('resize', detect)
  }, [])
  return device
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return progress
}

export default function App() {
  const device = useDevice()
  const progress = useScrollProgress()
  const [activeSection, setActiveSection] = useState('hero')
  const [showNotif, setShowNotif] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setShowNotif(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handler = () => {
      setScrollY(window.scrollY)
      const sections = ['hero', 'about', 'features', 'lore', 'download', 'docs']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom > 120) { setActiveSection(id); break }
        }
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      {/* bg layers */}
      <div className="grid-bg" />
      <div className="orbs">
        <div className="orb" style={{ width: 700, height: 700, left: '-15%', top: '-20%', background: 'radial-gradient(circle, rgba(192,132,252,0.07), transparent 70%)' }} />
        <div className="orb" style={{ width: 500, height: 500, right: '-10%', top: '20%', background: 'radial-gradient(circle, rgba(244,114,182,0.05), transparent 70%)' }} />
        <div className="orb" style={{ width: 600, height: 600, left: '10%', bottom: '10%', background: 'radial-gradient(circle, rgba(34,211,238,0.04), transparent 70%)' }} />
      </div>

      {/* scroll bar */}
      <div className="scroll-bar" style={{ transform: `scaleX(${progress / 100})` }} />

      {/* device notification */}
      {showNotif && (
        <div className="device-notif">
          {device === 'mobile' ? '📱' : device === 'tablet' ? '📱' : '🖥️'} {device.toUpperCase()} MODE
        </div>
      )}

      {/* navbar */}
      <nav className="navbar">
        <div className="nav-inner">
          <a className="logo" onClick={() => scrollTo('hero')}>
            <img src={lucyferHead} alt="Lucyfer" className="logo-img" />
            <span className="logo-text">moonlightOS <span>Meow</span></span>
          </a>
          <ul className="nav-links">
            {['about','features','lore','download','docs'].map(s => (
              <li key={s}><a onClick={() => scrollTo(s)} className={activeSection === s ? 'active' : ''}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>
            ))}
            <li><a href="https://github.com/moonlightOS-Meow/moonlightos-meow" target="_blank" rel="noreferrer" className="github-link">GitHub</a></li>
          </ul>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section id="hero" className="hero">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-eyebrow">
                {[
                  { text: 'Debian 13', color: '#0078d4' },
                  { text: 'Minimal', color: '#c084fc' },
                  { text: 'Named by Lucyfer', color: '#f472b6' },
                  { text: 'v6.0', color: '#22c55e' },
                ].map(b => (
                  <span key={b.text} className="badge" style={{ border: `1px solid ${b.color}`, color: b.color, background: `${b.color}12` }}>{b.text}</span>
                ))}
              </div>
              <h1 className="hero-title">Lucyfer's<br/>Resurrection</h1>
              <p className="hero-subtitle">"He came back. He always comes back."</p>
              <p className="hero-desc">
                moonlightOS Meow v6.0 — Debian 13 Trixie based minimal live ISO.
                No desktop environment. No bloat. No mercy.
                Just a clean system and the tools you need.
              </p>
              <div className="hero-buttons">
                <button onClick={() => scrollTo('download')} className="btn btn-primary">↓ Download ISO</button>
                <a href="https://github.com/moonlightOS-Meow/moonlightos-meow" target="_blank" rel="noreferrer" className="btn btn-secondary">View on GitHub</a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-ring" style={{ width: 320, height: 320 }} />
              <div className="hero-ring" style={{ width: 420, height: 420, animationDuration: '30s', animationDirection: 'reverse' }} />
              <img
                src={lucyferHead}
                alt="Lucyfer - Head of QA"
                className="hero-cat"
                style={{ transform: `translateY(${scrollY * 0.05}px)` }}
              />
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about">
          <div className="section-label"><span>// about</span></div>
          <h2>What is this?</h2>
          <div className="about-grid">
            {[
              { icon: '⚠️', title: 'The Complaint', desc: 'Lucyfer (he/him) has filed complaint #8001. The distro exists anyway. NoVa V3 is still dead. This is its spiritual successor.' },
              { icon: '🖥️', title: 'Minimal Base', desc: 'Debian 13 Trixie. No desktop environment. No bloat. No mercy. Just a clean system with the tools you need.' },
              { icon: '🎨', title: 'Rice It Yourself', desc: 'Pick your own desktop. Rice it yourself. You know what you\'re doing. If you don\'t — maybe start with the Windows Edition.' },
              { icon: '⚡', title: 'Philosophy', desc: 'Minimal. Chaos. Lucyfer approved (reluctantly). Built by Ash. Named by Lucyfer. Powered by chaos.' },
            ].map(c => (
              <div className="about-card" key={c.title}>
                <h3>{c.icon} {c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features">
          <div className="section-label"><span>// why debian</span></div>
          <h2>Why Debian?</h2>
          <div className="features-list">
            {FEATURES.map((f, i) => (
              <div className="feature-item" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h4>{f.text}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* ── LORE ── */}
        <section id="lore">
          <div className="section-label"><span>// version lore</span></div>
          <h2>Version Lore</h2>
          <div className="lore-timeline">
            {LORE.map((item, i) => (
              <div className={`lore-item ${item.cls}`} key={i}>
                <div className="lore-dot" />
                <div className="lore-name">
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13 }}>{item.name}</span>
                  <span className="lore-status">{item.status}</span>
                </div>
                <p className="lore-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DOWNLOAD ── */}
        <section id="download">
          <div className="section-label"><span>// download</span></div>
          <h2>Get the ISO</h2>
          <div className="download-grid">
            <div className="download-card">
              <h3>GitHub Actions</h3>
              <p>Recommended. Trigger the Build workflow from the Actions tab. ISO available as artifact for 7 days. Choose your compression and extra packages.</p>
              <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/actions" target="_blank" rel="noreferrer" className="btn btn-secondary">Build ISO</a>
            </div>
            <div className="download-card">
              <h3>Local Build</h3>
              <p>Debian/Ubuntu only. Requires <code>live-build</code>. Clone the repo, checkout <code>meow-debian</code>, run <code>sudo lb build</code> in the live-build directory.</p>
              <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/tree/meow-debian" target="_blank" rel="noreferrer" className="btn btn-secondary">Clone Repo</a>
            </div>
            <div className="download-card">
              <h3>Releases</h3>
              <p>Stable releases on GitHub when they exist. Check the releases page. ISO builds are uploaded after successful Actions runs.</p>
              <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/releases" target="_blank" rel="noreferrer" className="btn btn-secondary">View Releases</a>
            </div>
          </div>
        </section>

        {/* ── DOCS ── */}
        <section id="docs">
          <div className="section-label"><span>// documentation</span></div>
          <h2>Documentation</h2>
          <div className="docs-grid">
            {[
              { title: 'README', desc: 'Full project documentation and philosophy' },
              { title: 'CHANGELOG', desc: 'History of suffering and questionable decisions' },
              { title: 'CONTRIBUTING', desc: 'Don\'t. Please. Just run.' },
              { title: 'LICENSE', desc: 'WTFPL v3 Remastered — do whatever you want' },
            ].map(d => (
              <div className="doc-card" key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div className="footer-title">moonlightOS Meow</div>
          <div className="footer-sub">
            Named by Lucyfer (he/him). Powered by chaos. Based on Debian 13 Trixie.<br/>
            "I ALWAYS COME BACK" — Ash, 2026 · NoVa V3 stays dead. · Linux will always return. 🌙
          </div>
          <div className="footer-links">
            <a href="https://github.com/moonlightOS-Meow/moonlightos-meow" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/releases" target="_blank" rel="noreferrer">Releases</a>
            <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/tree/meow-ntlite" target="_blank" rel="noreferrer">Windows Edition</a>
          </div>
        </div>
      </footer>
    </>
  )
}

import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState('hero')
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Update active section
      const sections = ['hero', 'about', 'features', 'lore', 'download', 'docs']
      for (let section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
          }
        }
      }
    }

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app" ref={containerRef}>
      {/* Background Effects */}
      <div className="background-glow" style={{
        background: `radial-gradient(ellipse at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 0%, rgba(157, 0, 255, 0.1) 0%, transparent 70%)`
      }}></div>
      <div className="background-grid"></div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src="/lucyfer.jpg" alt="Lucyfer" className="logo-img" />
            <span>moonlightOS Meow</span>
          </div>
          <ul className="nav-links">
            <li><a onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
            <li><a onClick={() => scrollToSection('features')} className={activeSection === 'features' ? 'active' : ''}>Features</a></li>
            <li><a onClick={() => scrollToSection('download')} className={activeSection === 'download' ? 'active' : ''}>Download</a></li>
            <li><a onClick={() => scrollToSection('docs')} className={activeSection === 'docs' ? 'active' : ''}>Docs</a></li>
            <li><a href="https://github.com/moonlightOS-Meow/moonlightos-meow" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <h1 className="hero-title">Lucyfer's Resurrection</h1>
          <p className="hero-subtitle">"He came back. He always comes back."</p>
          <p className="hero-description">moonlightOS Meow v6.0 • Debian 13 Trixie • Minimal • Chaos • No Mercy</p>
          <div className="hero-buttons">
            <button onClick={() => scrollToSection('download')} className="btn btn-primary">Download ISO</button>
            <a href="https://github.com/moonlightOS-Meow/moonlightos-meow" className="btn btn-secondary">View on GitHub</a>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/lucyfer.jpg" alt="Lucyfer" className="hero-image" style={{
            transform: `translateY(${scrollY * 0.3}px)`
          }} />
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2>What is this?</h2>
          <div className="about-grid">
            <div className="about-card">
              <h3>⚠️ The Complaint</h3>
              <p>Lucyfer (he/him) has filed complaint #8001. The distro exists anyway. NoVa V3 is still dead. This is its spiritual successor.</p>
            </div>
            <div className="about-card">
              <h3>🖥️ Minimal Base</h3>
              <p>Debian 13 Trixie. No desktop environment. No bloat. No mercy. Just a clean system with the tools you need and nothing you don't.</p>
            </div>
            <div className="about-card">
              <h3>🎨 Rice It Yourself</h3>
              <p>Pick your own desktop. Rice it yourself. You know what you're doing. If you don't — maybe start with the Windows Edition.</p>
            </div>
            <div className="about-card">
              <h3>⚡ Philosophy</h3>
              <p>Minimal. Chaos. Lucyfer approved (reluctantly). Built by Ash. Named by Lucyfer. Powered by chaos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2>Why Debian?</h2>
          <div className="features-list">
            {[
              "Arch was getting boring",
              "Fedora/Nobara gave us PTSD (v4.0 era)",
              "Windows Edition exists and that's already cursed enough",
              "Debian 13 Trixie is stable and doesn't fight back",
              "live-build is actually not terrible",
              "Lucyfer said 'mrrp' which we interpreted as approval"
            ].map((feature, idx) => (
              <div key={idx} className="feature-item">
                <span className="feature-icon">✓</span>
                <h4>{feature}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lore Section */}
      <section className="lore" id="lore">
        <div className="container">
          <h2>Version Lore</h2>
          <div className="lore-timeline">
            {[
              { name: 'AshOS v1', desc: 'Kubuntu remaster, born from chaos', status: '💀 DEAD', class: 'dead' },
              { name: 'Phoenix v1-v2', desc: 'rm -rf survivor, GRUB trauma', status: '💀 ARCHIVED', class: 'dead' },
              { name: 'NoVa V3', desc: '730+ commits, 0 ISOs, legend', status: '💀 DEAD', class: 'dead' },
              { name: 'Meow v4.0', desc: 'Fedora era, kickstart hell', status: '💀 RIP', class: 'dead' },
              { name: 'Meow v5.0', desc: 'Arch, Openbox, villain arc', status: '✅ ALIVE', class: 'alive' },
              { name: 'Windows Edition', desc: 'NTLite, Makka Pakka, spite', status: '🪟 ACTIVE', class: 'active' },
              { name: 'Meow v6.0', desc: 'Debian, minimal, resurrection', status: '☠️ YOU ARE HERE', class: 'resurrection' }
            ].map((item, idx) => (
              <div key={idx} className={`lore-item ${item.class}`}>
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
                <span className="status">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="download" id="download">
        <div className="container">
          <h2>Download</h2>
          <div className="download-grid">
            <div className="download-card">
              <h3>GitHub Actions</h3>
              <p>Recommended. Trigger the Build workflow from the Actions tab. ISO available as artifact for 7 days.</p>
              <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/actions" className="btn btn-secondary">Build ISO</a>
            </div>
            <div className="download-card">
              <h3>Local Build</h3>
              <p>Debian/Ubuntu only. Requires live-build. Clone the repo and run <code>sudo lb build</code> in live-build/</p>
              <a href="https://github.com/moonlightOS-Meow/moonlightos-meow" className="btn btn-secondary">Clone Repo</a>
            </div>
            <div className="download-card">
              <h3>Releases</h3>
              <p>Stable releases available on GitHub. Check the releases page for latest ISO builds.</p>
              <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/releases" className="btn btn-secondary">View Releases</a>
            </div>
          </div>
        </div>
      </section>

      {/* Docs Section */}
      <section className="docs" id="docs">
        <div className="container">
          <h2>Documentation</h2>
          <div className="docs-grid">
            {[
              { title: 'README', desc: 'Full project documentation and philosophy' },
              { title: 'CHANGELOG', desc: 'Version history and updates' },
              { title: 'CONTRIBUTING', desc: 'How to contribute to the project' },
              { title: 'LICENSE', desc: 'WTFPL v3 - Do whatever you want' }
            ].map((doc, idx) => (
              <div key={idx} className="doc-card">
                <h3>{doc.title}</h3>
                <p>{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>"I ALWAYS COME BACK" — Ash, 2026</p>
          <p>Lucyfer's Resurrection. For real this time. Maybe. 🌙🐱</p>
          <p><small>Built by Ash. Named by Lucyfer. Powered by chaos. Based on Debian 13 Trixie.</small></p>
        </div>
      </footer>
    </div>
  )
}

export default App

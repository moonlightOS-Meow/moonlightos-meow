import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// ── DATA ──────────────────────────────────────────────────────────
const LORE = [
  { name: 'AshOS v1', status: 'dead', desc: 'Kubuntu remaster. Born from a tablet fire. A legend in failure.' },
  { name: 'Phoenix v1.0 → v2.0', status: 'dead', desc: 'Born after rm -rf disaster. GRUB said "FUCK CALAMARES". RIP.' },
  { name: 'NoVa V3', status: 'dead', desc: '730+ commits. 0 bootable ISOs. S3RL bait legacy. Officially retired.' },
  { name: 'Meow v4.0', status: 'dead', desc: 'Fedora/Nobara era. Kickstart + lorax. Gone but not forgotten. 🪦' },
  { name: 'Meow v5.0 "Lucyfer\'s Revenge"', status: 'alive', desc: 'Arch-based. Openbox. Villain arc fully activated. 😈' },
  { name: 'Meow Windows Edition ← you are here', status: 'windows', desc: 'NTLite debloat. GlazeWM. Makka Pakka. Temporary setback.' },
]

const STACK = [
  { icon: '🪟', label: 'Base', value: 'Windows 11' },
  { icon: '🔧', label: 'Tool', value: 'NTLite' },
  { icon: '⬛', label: 'WM', value: 'GlazeWM' },
  { icon: '📊', label: 'Bar', value: 'Zebar' },
  { icon: '🎵', label: 'Visualizer', value: 'CAVA' },
  { icon: '🪨', label: 'Wallpaper', value: 'Makka Pakka' },
  { icon: '🕵️', label: 'Telemetry', value: 'OBLITERATED' },
  { icon: '🐱', label: 'QA', value: 'Lucyfer' },
]

const MARQUEE_TEXT = [
  'NOVA V3 DEAD', '730+ COMMITS', '0 ISOS',
  'MAKKA PAKKA', 'AKKA WAKKA', 'MIKKA MAKKA MOO',
  'NO TELEMETRY', 'NO CORTANA', 'NO DIGNITY',
  'LUCYFER DISAPPROVES', 'COMPLAINT FILED', 'BUILD PROCEEDS ANYWAY',
  'I ALWAYS COME BACK', 'LONG LIVE THE MOON', 'EVEN ON NTFS',
]

const statusColor = { dead: '#ef4444', alive: '#22c55e', windows: '#0078d4' }
const statusLabel = { dead: 'DEAD', alive: 'ALIVE', windows: 'ACTIVE' }

// ── CURSOR ────────────────────────────────────────────────────────
function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const trailRef = useRef({ x: -100, y: -100 })
  const posRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const move = e => { posRef.current = { x: e.clientX, y: e.clientY }; setPos({ x: e.clientX, y: e.clientY }) }
    window.addEventListener('mousemove', move)
    const raf = setInterval(() => {
      trailRef.current.x += (posRef.current.x - trailRef.current.x) * 0.12
      trailRef.current.y += (posRef.current.y - trailRef.current.y) * 0.12
      setTrail({ x: trailRef.current.x, y: trailRef.current.y })
    }, 16)
    return () => { window.removeEventListener('mousemove', move); clearInterval(raf) }
  }, [])

  return <>
    <div style={{ position: 'fixed', left: pos.x - 5, top: pos.y - 5, width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'screen', transition: 'transform 0.1s' }} />
    <div style={{ position: 'fixed', left: trail.x - 18, top: trail.y - 18, width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--accent)', pointerEvents: 'none', zIndex: 9998, mixBlendMode: 'screen', opacity: 0.5 }} />
  </>
}

// ── STARS ─────────────────────────────────────────────────────────
function Stars() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5, dur: 2 + Math.random() * 4,
    delay: Math.random() * 4
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {stars.map(s => (
        <motion.div key={s.id}
          style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: '50%', background: 'white' }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ── BSOD ──────────────────────────────────────────────────────────
function BSOD({ onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: '#0078d4', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'none', padding: 40 }}>
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ textAlign: 'center', color: 'white', fontFamily: "'Share Tech Mono', monospace", maxWidth: 540 }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>:(</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: '0.05em', marginBottom: 16 }}>Your PC ran into a problem</div>
        <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.8 }}>
          moonlightOS tried to install Arch Linux on your Windows installation.<br/>
          Lucyfer intervened. NoVa V3 is still dead.<br/><br/>
          If you call Ash, he will say "I ALWAYS COME BACK."
        </div>
        <div style={{ marginTop: 32, fontSize: 11, opacity: 0.45 }}>
          STOP CODE: LUCYFER_FORMAL_COMPLAINT<br/>
          NOVA_V3_STILL_DEAD (0x00000730, 0x00000000)<br/><br/>
          (click to dismiss, if Windows lets you)
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── MARQUEE ───────────────────────────────────────────────────────
function Marquee() {
  const doubled = [...MARQUEE_TEXT, ...MARQUEE_TEXT]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '12px 0', background: 'var(--surface)', margin: '64px 0' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: '0.1em', color: 'var(--muted)' }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ color: i % 3 === 0 ? 'var(--accent)' : 'var(--muted)' }}>{t}</span>
        ))}
      </motion.div>
    </div>
  )
}

// ── SPEC CARD ─────────────────────────────────────────────────────
function SpecCard({ icon, label, value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -4, borderColor: 'rgba(192,132,252,0.4)' }}
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 20, cursor: 'none', transition: 'border-color 0.2s' }}>
      <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700 }}>{value}</div>
    </motion.div>
  )
}

// ── LORE ITEM ─────────────────────────────────────────────────────
function LoreItem({ name, status, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      style={{ position: 'relative', paddingLeft: 32, marginBottom: 28 }}>
      <div style={{ position: 'absolute', left: -24, top: 5, width: 10, height: 10, borderRadius: '50%', background: status === 'alive' || status === 'windows' ? statusColor[status] : 'var(--bg)', border: `2px solid ${statusColor[status]}` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13 }}>{name}</span>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: statusColor[status], padding: '2px 8px', border: `1px solid ${statusColor[status]}`, borderRadius: 3, opacity: 0.8 }}>{statusLabel[status]}</span>
      </div>
      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{desc}</div>
    </motion.div>
  )
}

// ── SECTION LABEL ─────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>// {children}</span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}

// ── APP ───────────────────────────────────────────────────────────
export default function App() {
  const [bsod, setBsod] = useState(false)
  const [complaint, setComplaint] = useState(0)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])

  useEffect(() => {
    setComplaint(Math.floor(Math.random() * 9000 + 1000))

    // konami code
    let keys = []
    const konami = [38,38,40,40,37,39,37,39,66,65]
    const handler = e => {
      keys = [...keys.slice(-9), e.keyCode]
      if (keys.join() === konami.join()) setBsod(true)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <Cursor />
      <Stars />

      {/* grid bg */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundImage: 'linear-gradient(rgba(192,132,252,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(192,132,252,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      {/* progress bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'var(--accent)', transformOrigin: '0%', scaleX: scrollYProgress, zIndex: 1000 }} />

      {/* BSOD */}
      <AnimatePresence>
        {bsod && <BSOD onClose={() => setBsod(false)} />}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        {/* HERO */}
        <motion.section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 80, paddingBottom: 40, y: heroY }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              { text: 'Windows 11', color: 'var(--win)' },
              { text: 'NTLite', color: 'var(--accent)' },
              { text: 'Named by Lucyfer', color: 'var(--accent2)' },
              { text: '🪨 Makka Pakka Approved', color: 'var(--stone)' },
            ].map(b => (
              <span key={b.text} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, padding: '4px 10px', borderRadius: 4, border: `1px solid ${b.color}`, color: b.color, background: `${b.color}12`, letterSpacing: '0.05em' }}>{b.text}</span>
            ))}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 12vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
            <span style={{ color: 'var(--accent)' }}>moon</span><span>lightOS</span>
            <br /><span style={{ color: 'var(--accent2)' }}>Meow</span>
            <br /><span style={{ color: 'var(--win)', fontSize: '0.42em', letterSpacing: '0.05em' }}>Windows Edition</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ marginTop: 24, fontSize: 18, color: 'var(--muted)', fontStyle: 'italic' }}>
            <span style={{ color: 'var(--accent3)', fontStyle: 'normal' }}>"If you can't beat them, debloat them."</span>
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ marginTop: 16, fontSize: 15, color: 'var(--muted)', maxWidth: 540, lineHeight: 1.7 }}>
            A debloated Windows 11 built with NTLite. No telemetry. No Cortana. No dignity.
            Just GlazeWM, Zebar, CAVA, and a Makka Pakka wallpaper watching over your soul.
            Because sometimes Calamares cries and the RTX 5080 needs drivers.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/tree/meow-ntlite" target="_blank"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, padding: '12px 24px', borderRadius: 6, background: 'var(--accent)', border: '1px solid var(--accent)', color: '#0a0a0f', fontWeight: 700, textDecoration: 'none', cursor: 'none', letterSpacing: '0.05em' }}>
              → View on GitHub
            </a>
            <a href="https://github.com/moonlightOS-Meow/moonlightos-meow/actions" target="_blank"
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, padding: '12px 24px', borderRadius: 6, background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', textDecoration: 'none', cursor: 'none', letterSpacing: '0.05em' }}>
              ⚙ Build Pipeline
            </a>
            <button onClick={() => setBsod(true)}
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, padding: '8px 16px', borderRadius: 6, background: 'transparent', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--danger)', cursor: 'none', letterSpacing: '0.05em' }}>
              trigger bsod
            </button>
          </motion.div>
        </motion.section>

        <Marquee />

        {/* STACK */}
        <section style={{ marginBottom: 80 }}>
          <SectionLabel>stack</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {STACK.map((s, i) => <SpecCard key={s.label} {...s} index={i} />)}
          </div>
        </section>

        {/* LORE */}
        <section style={{ marginBottom: 80 }}>
          <SectionLabel>version lore</SectionLabel>
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 1, background: 'var(--border)' }} />
            {LORE.map((item, i) => <LoreItem key={item.name} {...item} index={i} />)}
          </div>
        </section>

        {/* LUCYFER */}
        <section style={{ marginBottom: 80 }}>
          <SectionLabel>quality assurance</SectionLabel>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: 24, top: 24, fontSize: 64, opacity: 0.06 }}>🐱</div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>FORMAL COMPLAINTS FILED BY LUCYFER</div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: 'var(--accent2)', lineHeight: 1, margin: '8px 0' }}>
              {complaint}
            </motion.div>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 8, maxWidth: 500, lineHeight: 1.7 }}>
              Lucyfer (Head of QA) has formally lodged her disapproval of this Windows build.
              Her complaints have been noted, logged, and ignored.
              The build proceeded anyway. She knocked it off the table.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['🐱 Head of QA since birth', `Complaint #${complaint}`, 'Approval: DENIED'].map(t => (
                <span key={t} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, padding: '4px 10px', borderRadius: 4, border: '1px solid var(--accent2)', color: 'var(--accent2)', background: 'rgba(244,114,182,0.06)' }}>{t}</span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 0 60px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: 8 }}>
            <span style={{ color: 'var(--accent)' }}>moon</span>lightOS
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', lineHeight: 1.8 }}>
            Named by Lucyfer. Powered by chaos. Running on NTFS and telemetry.<br/>
            "I ALWAYS COME BACK" — Ash, 2026 &nbsp;|&nbsp; NoVa V3 stays dead. 🌙
          </div>
        </footer>
      </div>
    </>
  )
}

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const LORE = [
  { name: 'AshOS v1', status: 'dead', desc: 'Kubuntu remaster. Born from a tablet fire. A legend in failure.' },
  { name: 'Phoenix v1.0 → v2.0', status: 'dead', desc: 'Born after rm -rf disaster. GRUB said "FUCK CALAMARES". RIP.' },
  { name: 'NoVa V3', status: 'dead', desc: '730+ commits. 0 bootable ISOs. S3RL bait legacy. Officially retired.' },
  { name: 'Meow v4.0', status: 'dead', desc: 'Fedora/Nobara era. Kickstart + lorax. Gone but not forgotten. 🪦' },
  { name: "Meow v5.0 \"Lucyfer's Revenge\"", status: 'alive', desc: 'Arch-based. Openbox. Villain arc fully activated. 😈' },
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
  { icon: '🐱', label: 'QA', value: 'Lucyfer (he/him)' },
]

const MARQUEE_TEXT = [
  'NOVA V3 DEAD','730+ COMMITS','0 ISOS',
  'MAKKA PAKKA','AKKA WAKKA','MIKKA MAKKA MOO',
  'NO TELEMETRY','NO CORTANA','NO DIGNITY',
  'LUCYFER DISAPPROVES','COMPLAINT FILED','BUILD PROCEEDS ANYWAY',
  'I ALWAYS COME BACK','LONG LIVE THE MOON','EVEN ON NTFS',
]

const statusColor = { dead: '#ef4444', alive: '#22c55e', windows: '#0078d4' }
const statusLabel = { dead: 'DEAD', alive: 'ALIVE', windows: 'ACTIVE' }

function useDevice() {
  const [device, setDevice] = useState({ isMobile: false, isTablet: false, isDesktop: true, width: 1280 })
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setDevice({ isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, width: w })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return device
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const trailRef = useRef({ x: -100, y: -100 })
  const posRef = useRef({ x: -100, y: -100 })
  const { isDesktop } = useDevice()
  useEffect(() => {
    if (!isDesktop) return
    const move = e => { posRef.current = { x: e.clientX, y: e.clientY }; setPos({ x: e.clientX, y: e.clientY }) }
    window.addEventListener('mousemove', move)
    const raf = setInterval(() => {
      trailRef.current.x += (posRef.current.x - trailRef.current.x) * 0.12
      trailRef.current.y += (posRef.current.y - trailRef.current.y) * 0.12
      setTrail({ x: trailRef.current.x, y: trailRef.current.y })
    }, 16)
    return () => { window.removeEventListener('mousemove', move); clearInterval(raf) }
  }, [isDesktop])
  if (!isDesktop) return null
  return <>
    <div style={{ position: 'fixed', left: pos.x-5, top: pos.y-5, width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'screen', transition: 'transform 0.1s' }} />
    <div style={{ position: 'fixed', left: trail.x-18, top: trail.y-18, width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--accent)', pointerEvents: 'none', zIndex: 9998, mixBlendMode: 'screen', opacity: 0.5 }} />
  </>
}

function Stars() {
  const { isMobile } = useDevice()
  const count = isMobile ? 50 : 120
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100,
    size: Math.random()*2.5+0.5, dur: 2+Math.random()*4, delay: Math.random()*4
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {stars.map(s => (
        <motion.div key={s.id}
          style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: '50%', background: 'white' }}
          animate={{ opacity: [0.1,1,0.1], scale: [1,1.5,1] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// Floating orbs for that superhero cosmic energy
function Orbs() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {[
        { size: 600, x: '-10%', y: '-20%', color: 'rgba(192,132,252,0.06)', dur: 20 },
        { size: 400, x: '70%', y: '30%', color: 'rgba(244,114,182,0.05)', dur: 25 },
        { size: 500, x: '20%', y: '60%', color: 'rgba(56,189,248,0.04)', dur: 30 },
        { size: 300, x: '80%', y: '70%', color: 'rgba(192,132,252,0.05)', dur: 18 },
      ].map((orb, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', left: orb.x, top: orb.y, width: orb.size, height: orb.size, borderRadius: '50%', background: `radial-gradient(circle, ${orb.color}, transparent 70%)`, filter: 'blur(40px)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 3 }}
        />
      ))}
    </div>
  )
}

function BSOD({ onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: '#0078d4', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'default', padding: 40 }}>
      <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} style={{ textAlign: 'center', color: 'white', fontFamily: "'Share Tech Mono', monospace", maxWidth: 540 }}>
        <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 0.5, delay: 0.3 }} style={{ fontSize: 80, marginBottom: 24 }}>:(</motion.div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: '0.05em', marginBottom: 16 }}>Your PC ran into a problem</div>
        <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.8 }}>
          moonlightOS tried to install Arch Linux on your Windows installation.<br/>
          Lucyfer intervened (he was NOT happy). NoVa V3 is still dead.<br/><br/>
          If you call Ash, he will say "I ALWAYS COME BACK."
        </div>
        <div style={{ marginTop: 32, fontSize: 11, opacity: 0.45 }}>
          STOP CODE: LUCYFER_FORMAL_COMPLAINT<br/>
          NOVA_V3_STILL_DEAD (0x00000730, 0x00000000)<br/><br/>
          (tap/click to dismiss, if Windows lets you)
        </div>
      </motion.div>
    </motion.div>
  )
}

function Marquee() {
  const doubled = [...MARQUEE_TEXT, ...MARQUEE_TEXT]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '14px 0', background: 'linear-gradient(90deg, var(--surface), rgba(17,17,24,0.8), var(--surface))', margin: '56px 0', position: 'relative' }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 40, whiteSpace: 'nowrap', fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted)' }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ color: i % 3 === 0 ? 'var(--accent)' : i % 3 === 1 ? 'var(--muted)' : 'rgba(56,189,248,0.6)' }}>{t}</span>
        ))}
      </motion.div>
    </div>
  )
}

function SpecCard({ icon, label, value, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 200 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ background: hovered ? 'linear-gradient(135deg, rgba(192,132,252,0.08), rgba(17,17,24,1))' : 'var(--surface)', border: `1px solid ${hovered ? 'rgba(192,132,252,0.4)' : 'var(--border)'}`, borderRadius: 10, padding: 18, transition: 'all 0.25s', transform: hovered ? 'translateY(-4px)' : 'none', boxShadow: hovered ? '0 12px 40px rgba(192,132,252,0.12)' : 'none', position: 'relative', overflow: 'hidden' }}>
      {hovered && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(192,132,252,0.06), transparent 70%)', pointerEvents: 'none' }} />}
      <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: hovered ? 'var(--accent)' : 'var(--text)', transition: 'color 0.25s' }}>{value}</div>
    </motion.div>
  )
}

function LoreItem({ name, status, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 180 }}
      style={{ position: 'relative', paddingLeft: 28, marginBottom: 24 }}>
      <motion.div
        animate={status === 'alive' || status === 'windows' ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', left: -20, top: 5, width: 8, height: 8, borderRadius: '50%', background: status === 'alive' || status === 'windows' ? statusColor[status] : 'var(--bg)', border: `2px solid ${statusColor[status]}` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12 }}>{name}</span>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: statusColor[status], padding: '2px 7px', border: `1px solid ${statusColor[status]}`, borderRadius: 3, background: `${statusColor[status]}12` }}>{statusLabel[status]}</span>
      </div>
      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{desc}</div>
    </motion.div>
  )
}

function SectionLabel({ children }) {
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap', textShadow: '0 0 20px rgba(192,132,252,0.5)' }}>// {children}</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
    </motion.div>
  )
}

export default function App() {
  const [bsod, setBsod] = useState(false)
  const [complaint, setComplaint] = useState(0)
  const { isMobile, isTablet, isDesktop } = useDevice()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, isDesktop ? -60 : 0])

  const titleSize = isMobile ? 'clamp(48px, 16vw, 72px)' : isTablet ? 'clamp(64px, 10vw, 96px)' : 'clamp(72px, 10vw, 110px)'
  const padding = isMobile ? '0 16px' : isTablet ? '0 24px' : '0 32px'
  const maxWidth = isDesktop ? 900 : '100%'
  const gridCols = isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'

  useEffect(() => {
    setComplaint(Math.floor(Math.random() * 9000 + 1000))
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
      <Orbs />

      {/* grid */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundImage: 'linear-gradient(rgba(192,132,252,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(192,132,252,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      {/* scroll progress */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3))', transformOrigin: '0%', scaleX: scrollYProgress, zIndex: 1000, boxShadow: '0 0 10px var(--accent)' }} />

      <AnimatePresence>{bsod && <BSOD onClose={() => setBsod(false)} />}</AnimatePresence>

      <div style={{ position: 'relative', zIndex: 10, maxWidth, margin: '0 auto', padding }}>

        {/* HERO */}
        <motion.section style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: isMobile ? 60 : 80, paddingBottom: 40, y: heroY }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {[
              { text: 'Windows 11', color: 'var(--win)' },
              { text: 'NTLite', color: 'var(--accent)' },
              { text: 'Named by Lucyfer', color: 'var(--accent2)' },
              { text: '🪨 Makka Pakka', color: 'var(--stone)' },
            ].map(b => (
              <motion.span key={b.text} whileHover={{ scale: 1.05 }}
                style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? 10 : 11, padding: '4px 10px', borderRadius: 4, border: `1px solid ${b.color}`, color: b.color, background: `${b.color}12`, letterSpacing: '0.04em', cursor: 'default' }}>{b.text}</motion.span>
            ))}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: titleSize, lineHeight: 0.9, letterSpacing: '-0.02em' }}>
            <span style={{ color: 'var(--accent)', textShadow: '0 0 40px rgba(192,132,252,0.4)' }}>moon</span><span style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>lightOS</span>
            <br /><span style={{ color: 'var(--accent2)', textShadow: '0 0 40px rgba(244,114,182,0.4)' }}>Meow</span>
            <br /><span style={{ color: 'var(--win)', fontSize: isMobile ? '0.38em' : '0.42em', letterSpacing: '0.05em', textShadow: '0 0 30px rgba(0,120,212,0.4)' }}>Windows Edition</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ marginTop: 20, fontSize: isMobile ? 15 : 18, color: 'var(--muted)', fontStyle: 'italic' }}>
            <span style={{ color: 'var(--accent3)', fontStyle: 'normal' }}>"If you can't beat them, debloat them."</span>
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ marginTop: 14, fontSize: isMobile ? 13 : 15, color: 'var(--muted)', maxWidth: 540, lineHeight: 1.7 }}>
            A debloated Windows 11 built with NTLite. No telemetry. No Cortana. No dignity.
            Just GlazeWM, Zebar, CAVA, and a Makka Pakka wallpaper watching over your soul.
            Because sometimes Calamares cries and the RTX 5080 needs drivers.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <motion.a href="https://github.com/moonlightOS-Meow/moonlightos-meow/tree/meow-ntlite" target="_blank"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(192,132,252,0.4)' }}
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? 12 : 13, padding: isMobile ? '10px 18px' : '12px 24px', borderRadius: 6, background: 'linear-gradient(135deg, var(--accent), rgba(192,132,252,0.8))', border: '1px solid var(--accent)', color: '#0a0a0f', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.05em' }}>
              → View on GitHub
            </motion.a>
            <motion.a href="https://github.com/moonlightOS-Meow/moonlightos-meow/actions" target="_blank"
              whileHover={{ scale: 1.04, borderColor: 'var(--accent3)', color: 'var(--accent3)' }}
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? 12 : 13, padding: isMobile ? '10px 18px' : '12px 24px', borderRadius: 6, background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'all 0.2s' }}>
              ⚙ Build Pipeline
            </motion.a>
            <motion.button onClick={() => setBsod(true)}
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(239,68,68,0.3)' }}
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? 10 : 11, padding: isMobile ? '8px 14px' : '8px 16px', borderRadius: 6, background: 'transparent', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--danger)', cursor: 'pointer', letterSpacing: '0.05em' }}>
              trigger bsod
            </motion.button>
          </motion.div>

          {/* scroll hint */}
          {!isMobile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
              style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 8 }}>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--accent), transparent)', margin: '0 auto' }} />
            </motion.div>
          )}
        </motion.section>

        <Marquee />

        {/* STACK */}
        <section style={{ marginBottom: 72 }}>
          <SectionLabel>stack</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: 12 }}>
            {STACK.map((s, i) => <SpecCard key={s.label} {...s} index={i} />)}
          </div>
        </section>

        {/* LORE */}
        <section style={{ marginBottom: 72 }}>
          <SectionLabel>version lore</SectionLabel>
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
            {LORE.map((item, i) => <LoreItem key={item.name} {...item} index={i} />)}
          </div>
        </section>

        {/* LUCYFER */}
        <section style={{ marginBottom: 72 }}>
          <SectionLabel>quality assurance</SectionLabel>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg, var(--surface), rgba(244,114,182,0.04))', border: '1px solid rgba(244,114,182,0.2)', borderRadius: 12, padding: isMobile ? 20 : 32, position: 'relative', overflow: 'hidden', boxShadow: '0 0 40px rgba(244,114,182,0.06)' }}>
            <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}
              style={{ position: 'absolute', right: 16, top: 16, fontSize: isMobile ? 40 : 64, opacity: 0.08 }}>🐱</motion.div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>FORMAL COMPLAINTS FILED BY LUCYFER (HE/HIM)</div>
            <motion.div
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 56 : 72, color: 'var(--accent2)', lineHeight: 1, margin: '8px 0', textShadow: '0 0 30px rgba(244,114,182,0.4)' }}>
              {complaint}
            </motion.div>
            <p style={{ color: 'var(--muted)', fontSize: isMobile ? 13 : 14, marginTop: 8, maxWidth: 500, lineHeight: 1.7 }}>
              Lucyfer (Head of QA, he/him) has formally lodged his disapproval of this Windows build.
              His complaints have been noted, logged, and ignored. He knocked it off the table.
              He is not happy. He never is. He is, however, a very handsome boy.
            </p>
            <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['🐱 Head of QA since birth', `Complaint #${complaint}`, 'he/him', 'Approval: DENIED'].map(t => (
                <motion.span key={t} whileHover={{ scale: 1.05 }}
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, padding: '4px 10px', borderRadius: 4, border: '1px solid var(--accent2)', color: 'var(--accent2)', background: 'rgba(244,114,182,0.06)', cursor: 'default' }}>{t}</motion.span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: isMobile ? '32px 0 48px' : '40px 0 60px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 28 : 36, letterSpacing: '0.05em', marginBottom: 10 }}>
            <span style={{ color: 'var(--accent)', textShadow: '0 0 20px rgba(192,132,252,0.4)' }}>moon</span>
            <span>lightOS</span>
          </motion.div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? 10 : 11, color: 'var(--muted)', letterSpacing: '0.08em', lineHeight: 2 }}>
            Named by Lucyfer (he/him). Powered by chaos. Running on NTFS and telemetry.<br/>
            "I ALWAYS COME BACK" — Ash, 2026 &nbsp;|&nbsp; NoVa V3 stays dead. 🌙
          </div>
        </footer>
      </div>
    </>
  )
}

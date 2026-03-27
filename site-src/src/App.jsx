import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'

// ── DATA ──────────────────────────────────────────────────────────
const RELEASE = {
  version: 'V1.0',
  url: 'https://github.com/moonlightOS-Meow/moonlightos-meow/releases/tag/v1.0',
  mega: 'https://mega.nz/file/jMck3ILD#GJUlrIGMJ7DsLz1nvke-X5uzR8LTG1LOptp5qukJqkQ',
  filename: 'moonlightOS Meow - WINDOWS EDITION V1.0.iso',
  checksum: 'D0FAA5AC6E1DB1E5F751A1F920579490663AFB10097915623D2159C44D69C500',
  includes: ['Home + Pro editions', 'NTLite debloat', 'GlazeWM baked in', 'Zebar baked in', 'CAVA baked in', 'Makka Pakka wallpaper 🪨', 'UEFI + BIOS boot'],
}

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
  'NOVA V3 DEAD','730+ COMMITS','0 ISOS','MAKKA PAKKA','AKKA WAKKA','MIKKA MAKKA MOO',
  'NO TELEMETRY','NO CORTANA','NO DIGNITY','LUCYFER DISAPPROVES','COMPLAINT FILED',
  'BUILD PROCEEDS ANYWAY','I ALWAYS COME BACK','LONG LIVE THE MOON','EVEN ON NTFS',
  'V1.0 OUT NOW','DADDY GATES ISO','HOME + PRO EDITIONS','NAMED BY A CAT',
]

const STATS = [
  { value: '139', label: 'Components Removed' },
  { value: '4084', label: 'Files Deleted' },
  { value: '∞', label: "Lucyfer's Complaints" },
  { value: '730+', label: 'NoVa V3 Commits (0 ISOs)' },
]

const statusColor = { dead: '#ef4444', alive: '#22c55e', windows: '#0078d4' }
const statusLabel = { dead: 'DEAD', alive: 'ALIVE', windows: 'ACTIVE' }

// ── HOOKS ─────────────────────────────────────────────────────────
function useDevice() {
  const [d, setD] = useState({ isMobile: false, isTablet: false, isDesktop: true, width: 1280 })
  useEffect(() => {
    const u = () => { const w = window.innerWidth; setD({ isMobile: w<640, isTablet: w>=640&&w<1024, isDesktop: w>=1024, width: w }) }
    u(); window.addEventListener('resize', u); return () => window.removeEventListener('resize', u)
  }, [])
  return d
}

// ── CURSOR ────────────────────────────────────────────────────────
function Cursor() {
  const pos = useRef({ x: -100, y: -100 })
  const trail = useRef({ x: -100, y: -100 })
  const [p, setP] = useState({ x: -100, y: -100 })
  const [t, setT] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const { isDesktop } = useDevice()

  useEffect(() => {
    if (!isDesktop) return
    const mv = e => { pos.current = { x: e.clientX, y: e.clientY }; setP({ x: e.clientX, y: e.clientY }) }
    const md = () => setClicking(true)
    const mu = () => setClicking(false)
    window.addEventListener('mousemove', mv)
    window.addEventListener('mousedown', md)
    window.addEventListener('mouseup', mu)
    const raf = setInterval(() => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.1
      trail.current.y += (pos.current.y - trail.current.y) * 0.1
      setT({ x: trail.current.x, y: trail.current.y })
    }, 16)
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mousedown', md); window.removeEventListener('mouseup', mu); clearInterval(raf) }
  }, [isDesktop])

  if (!isDesktop) return null
  return <>
    <div style={{ position: 'fixed', left: p.x-6, top: p.y-6, width: 12, height: 12, borderRadius: '50%', background: 'var(--accent)', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'screen', transform: clicking ? 'scale(0.5)' : 'scale(1)', transition: 'transform 0.1s', boxShadow: '0 0 10px var(--accent)' }} />
    <div style={{ position: 'fixed', left: t.x-20, top: t.y-20, width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(192,132,252,0.5)', pointerEvents: 'none', zIndex: 9998, mixBlendMode: 'screen' }} />
    <div style={{ position: 'fixed', left: t.x-35, top: t.y-35, width: 70, height: 70, borderRadius: '50%', border: '1px solid rgba(192,132,252,0.15)', pointerEvents: 'none', zIndex: 9997 }} />
  </>
}

// ── STARS ─────────────────────────────────────────────────────────
function Stars() {
  const { isMobile } = useDevice()
  const stars = useRef(Array.from({ length: isMobile ? 60 : 150 }, (_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100,
    size: Math.random()*2.5+0.3, dur: 2+Math.random()*5, delay: Math.random()*5,
    color: ['white','#c084fc','#f472b6','#38bdf8'][Math.floor(Math.random()*4)]
  }))).current
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {stars.map(s => (
        <motion.div key={s.id}
          style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: '50%', background: s.color, boxShadow: `0 0 ${s.size*2}px ${s.color}` }}
          animate={{ opacity: [0.1,1,0.1], scale: [1,1.8,1] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ── ORBS ─────────────────────────────────────────────────────────
function Orbs() {
  const orbs = [
    { size: 800, x: '-20%', y: '-30%', color: 'rgba(192,132,252,0.08)', dur: 20 },
    { size: 600, x: '60%', y: '10%', color: 'rgba(244,114,182,0.06)', dur: 28 },
    { size: 700, x: '10%', y: '50%', color: 'rgba(56,189,248,0.05)', dur: 35 },
    { size: 500, x: '70%', y: '60%', color: 'rgba(167,139,250,0.07)', dur: 22 },
    { size: 400, x: '35%', y: '75%', color: 'rgba(0,120,212,0.05)', dur: 18 },
  ]
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {orbs.map((o, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', left: o.x, top: o.y, width: o.size, height: o.size, borderRadius: '50%', background: `radial-gradient(circle, ${o.color}, transparent 70%)`, filter: 'blur(60px)' }}
          animate={{ scale: [1,1.2,1], x: [0,40,0], y: [0,-30,0] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: i*4 }}
        />
      ))}
    </div>
  )
}

// ── GRID ─────────────────────────────────────────────────────────
function Grid() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundImage: 'linear-gradient(rgba(192,132,252,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(192,132,252,0.03) 1px, transparent 1px)',
      backgroundSize: '80px 80px' }} />
  )
}

// ── BSOD ─────────────────────────────────────────────────────────
function BSOD({ onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: '#0078d4', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'default', padding: 40 }}>
      <motion.div initial={{ scale: 0.7, y: 40 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200 }}
        style={{ textAlign: 'center', color: 'white', fontFamily: "'Share Tech Mono', monospace", maxWidth: 560 }}>
        <motion.div animate={{ rotate: [0,-8,8,-4,4,0] }} transition={{ duration: 0.6, delay: 0.3 }} style={{ fontSize: 90, marginBottom: 28 }}>:(</motion.div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, letterSpacing: '0.05em', marginBottom: 20 }}>Your PC ran into a problem</div>
        <div style={{ fontSize: 14, opacity: 0.88, lineHeight: 2 }}>
          moonlightOS tried to install Arch Linux on your Windows installation.<br/>
          Lucyfer (he/him) intervened. He was NOT happy.<br/>
          NoVa V3 is still dead. It will always be dead.<br/><br/>
          If you call Ash, he will say <em>"I ALWAYS COME BACK."</em>
        </div>
        <div style={{ marginTop: 36, fontSize: 11, opacity: 0.4, lineHeight: 1.8 }}>
          STOP CODE: LUCYFER_FORMAL_COMPLAINT<br/>
          NOVA_V3_STILL_DEAD (0x00000730, 0x00000000, 0x00000000, 0x00000000)<br/><br/>
          For more information about this error visit: moonlightos-meow.github.io/moonlightos-meow<br/>
          (click/tap to dismiss — if Windows lets you)
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── MARQUEE ───────────────────────────────────────────────────────
function Marquee() {
  const doubled = [...MARQUEE_TEXT, ...MARQUEE_TEXT]
  return (
    <div style={{ overflow: 'hidden', padding: '16px 0', background: 'linear-gradient(90deg, var(--bg), var(--surface), var(--bg))', borderTop: '1px solid rgba(192,132,252,0.15)', borderBottom: '1px solid rgba(192,132,252,0.15)', margin: '64px 0', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(90deg, var(--bg), transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(270deg, var(--bg), transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', fontFamily: "'Share Tech Mono', monospace", fontSize: 11, letterSpacing: '0.15em' }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ color: i%4===0 ? 'var(--accent)' : i%4===1 ? 'var(--muted)' : i%4===2 ? 'rgba(56,189,248,0.7)' : 'var(--accent2)' }}>{t}</span>
        ))}
      </motion.div>
    </div>
  )
}

// ── SECTION LABEL ─────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em', textTransform: 'uppercase', whiteSpace: 'nowrap', textShadow: '0 0 20px rgba(192,132,252,0.8)' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(192,132,252,0.6), transparent)' }} />
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)', flexShrink: 0 }} />
    </motion.div>
  )
}

// ── STAT CARD ─────────────────────────────────────────────────────
function StatCard({ value, label, index }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
      style={{ textAlign: 'center', padding: '24px 16px', background: 'linear-gradient(135deg, var(--surface2), var(--surface))', border: '1px solid rgba(192,132,252,0.15)', borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(192,132,252,0.06), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: 'var(--accent)', textShadow: '0 0 20px rgba(192,132,252,0.5)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', marginTop: 8, textTransform: 'uppercase' }}>{label}</div>
    </motion.div>
  )
}

// ── SPEC CARD ─────────────────────────────────────────────────────
function SpecCard({ icon, label, value, index }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 180 }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      style={{ background: hov ? 'linear-gradient(135deg, rgba(192,132,252,0.12), var(--surface))' : 'var(--surface)', border: `1px solid ${hov ? 'rgba(192,132,252,0.5)' : 'var(--border)'}`, borderRadius: 12, padding: 20, transition: 'all 0.3s', transform: hov ? 'translateY(-6px)' : 'none', boxShadow: hov ? '0 20px 60px rgba(192,132,252,0.15), 0 0 0 1px rgba(192,132,252,0.1)' : 'none', position: 'relative', overflow: 'hidden' }}>
      {hov && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(192,132,252,0.08), transparent 70%)', pointerEvents: 'none' }} />}
      <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 8, color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: hov ? 'var(--accent)' : 'var(--text)', transition: 'color 0.3s' }}>{value}</div>
    </motion.div>
  )
}

// ── LORE ITEM ─────────────────────────────────────────────────────
function LoreItem({ name, status, desc, index }) {
  return (
    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 180 }}
      style={{ position: 'relative', paddingLeft: 32, marginBottom: 28 }}>
      <motion.div
        animate={status !== 'dead' ? { scale: [1,1.5,1], opacity: [1,0.5,1], boxShadow: [`0 0 6px ${statusColor[status]}`, `0 0 16px ${statusColor[status]}`, `0 0 6px ${statusColor[status]}`] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', left: -22, top: 6, width: 8, height: 8, borderRadius: '50%', background: status !== 'dead' ? statusColor[status] : 'var(--bg)', border: `2px solid ${statusColor[status]}` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 13, color: status === 'windows' ? 'var(--win)' : status === 'alive' ? 'var(--green)' : 'var(--text)' }}>{name}</span>
        <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 8, color: statusColor[status], padding: '3px 8px', border: `1px solid ${statusColor[status]}`, borderRadius: 4, background: `${statusColor[status]}15`, letterSpacing: '0.1em' }}>{statusLabel[status]}</span>
      </div>
      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{desc}</div>
    </motion.div>
  )
}

// ── DOWNLOAD SECTION ──────────────────────────────────────────────
function DownloadSection({ isMobile }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(RELEASE.checksum); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <section style={{ marginBottom: 96 }}>
      <SectionLabel>Download V1.0</SectionLabel>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ background: 'linear-gradient(135deg, rgba(192,132,252,0.06), rgba(13,13,26,0.98), rgba(0,120,212,0.04))', border: '1px solid rgba(192,132,252,0.25)', borderRadius: 20, padding: isMobile ? 24 : 48, position: 'relative', overflow: 'hidden', boxShadow: '0 0 80px rgba(192,132,252,0.07), inset 0 1px 0 rgba(255,255,255,0.05)', marginBottom: 16 }}>
        
        {/* corner decorations */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 60, height: 60, borderTop: '2px solid rgba(192,132,252,0.4)', borderLeft: '2px solid rgba(192,132,252,0.4)', borderRadius: '20px 0 0 0', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, borderTop: '2px solid rgba(244,114,182,0.3)', borderRight: '2px solid rgba(244,114,182,0.3)', borderRadius: '0 20px 0 0', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 60, height: 60, borderBottom: '2px solid rgba(56,189,248,0.2)', borderLeft: '2px solid rgba(56,189,248,0.2)', borderRadius: '0 0 0 20px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 60, height: 60, borderBottom: '2px solid rgba(192,132,252,0.2)', borderRight: '2px solid rgba(192,132,252,0.2)', borderRadius: '0 0 20px 0', pointerEvents: 'none' }} />

        {/* glow */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,252,0.08), transparent 70%)', pointerEvents: 'none' }} />

        {/* version pill */}
        <motion.div animate={{ scale: [1,1.03,1] }} transition={{ duration: 2.5, repeat: Infinity }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.35)', borderRadius: 24, padding: '8px 18px', marginBottom: 24 }}>
          <motion.div animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.2, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 10px var(--green)' }} />
          <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.15em' }}>LATEST RELEASE — {RELEASE.version}</span>
        </motion.div>

        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 36 : 56, lineHeight: 1, marginBottom: 10 }}>
          <span style={{ textShadow: '0 0 40px rgba(192,132,252,0.5)' }}>moonlightOS Meow</span><br/>
          <span style={{ color: 'var(--win)', textShadow: '0 0 30px rgba(0,120,212,0.6)', fontSize: isMobile ? '0.75em' : '0.8em' }}>Windows Edition</span>
        </h2>

        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: 'var(--muted)', marginBottom: 28, letterSpacing: '0.05em' }}>
          Windows 11 25H2 · Home + Pro · Debloated · "from the latest ISO by Daddy Gates"
        </p>

        {/* includes tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {RELEASE.includes.map(inc => (
            <span key={inc} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, padding: '5px 12px', borderRadius: 6, border: '1px solid rgba(192,132,252,0.2)', color: 'rgba(192,132,252,0.8)', background: 'rgba(192,132,252,0.05)' }}>✓ {inc}</span>
          ))}
        </div>

        {/* buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          <motion.a href={RELEASE.url} target="_blank"
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(192,132,252,0.6)' }} whileTap={{ scale: 0.97 }}
            style={{ fontFamily: "'Orbitron', monospace", fontSize: isMobile ? 11 : 13, fontWeight: 700, padding: isMobile ? '12px 20px' : '16px 36px', borderRadius: 10, background: 'linear-gradient(135deg, var(--accent), #a855f7)', border: 'none', color: '#06060f', textDecoration: 'none', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 10, cursor: 'none' }}>
            ↓ GitHub Release
          </motion.a>
          <motion.a href={RELEASE.mega} target="_blank"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(244,114,182,0.4)' }} whileTap={{ scale: 0.97 }}
            style={{ fontFamily: "'Orbitron', monospace", fontSize: isMobile ? 11 : 13, fontWeight: 700, padding: isMobile ? '12px 20px' : '16px 32px', borderRadius: 10, background: 'transparent', border: '1px solid rgba(244,114,182,0.5)', color: 'var(--accent2)', textDecoration: 'none', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 10, cursor: 'none', transition: 'all 0.2s' }}>
            ↓ MEGA Mirror
          </motion.a>
        </div>

        {/* filename */}
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'var(--muted)', marginBottom: 16 }}>
          <span style={{ color: 'rgba(192,132,252,0.6)' }}>filename: </span>{RELEASE.filename}
        </div>

        {/* checksum */}
        <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(192,132,252,0.1)', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 8, color: 'var(--muted)', letterSpacing: '0.2em', marginBottom: 6 }}>SHA-256</div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? 9 : 10, color: 'var(--accent3)', wordBreak: 'break-all', lineHeight: 1.5 }}>{RELEASE.checksum}</div>
          </div>
          <motion.button onClick={copy} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ fontFamily: "'Orbitron', monospace", fontSize: 9, padding: '8px 16px', borderRadius: 6, background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(192,132,252,0.08)', border: `1px solid ${copied ? 'var(--green)' : 'rgba(192,132,252,0.3)'}`, color: copied ? 'var(--green)' : 'var(--accent)', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s', letterSpacing: '0.1em' }}>
            {copied ? '✓ COPIED' : 'COPY'}
          </motion.button>
        </div>
      </motion.div>

      {/* roadmap */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: isMobile ? 20 : 32, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent)' }} />
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>Roadmap — V1.1</div>
        {[
          { text: 'Better GlazeWM config', note: 'you fucking wish. cant make it better' },
          { text: 'Optional wallpaper pack', note: 'SIKE- ok ok im gonna make a no makka pakka iso...' },
          { text: 'More debloat options', note: 'theres no other ones without breaking the entire system' },
          { text: 'Bug fixes', note: 'ok that i can do that... MAYBE' },
          { text: 'Updated scripts', note: 'Copilot will help.' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i*0.06 }}
            style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start', paddingBottom: 14, borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
            <span style={{ color: 'var(--accent)', fontFamily: "'Share Tech Mono', monospace", fontSize: 14, marginTop: 1, flexShrink: 0 }}>→</span>
            <div>
              <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 600 }}>{item.text}</span>
              <span style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}> — {item.note}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ── APP ───────────────────────────────────────────────────────────
export default function App() {
  const [bsod, setBsod] = useState(false)
  const [complaint] = useState(() => Math.floor(Math.random() * 9000 + 1000))
  const { isMobile, isTablet, isDesktop } = useDevice()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, isDesktop ? -80 : 0])

  const titleSize = isMobile ? 'clamp(52px, 17vw, 76px)' : isTablet ? 'clamp(68px, 11vw, 100px)' : 'clamp(80px, 10vw, 120px)'
  const pad = isMobile ? '0 18px' : isTablet ? '0 28px' : '0 40px'
  const maxW = isDesktop ? 960 : '100%'
  const gridCols = isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'

  useEffect(() => {
    let keys = []
    const konami = [38,38,40,40,37,39,37,39,66,65]
    const h = e => { keys = [...keys.slice(-9), e.keyCode]; if (keys.join() === konami.join()) setBsod(true) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  return (
    <>
      <Cursor />
      <Stars />
      <Orbs />
      <Grid />

      {/* progress bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3), var(--accent))', transformOrigin: '0%', scaleX, zIndex: 1000, boxShadow: '0 0 16px var(--accent)' }} />

      {/* top nav bar */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        style={{ position: 'fixed', top: 8, left: '50%', transform: 'translateX(-50%)', zIndex: 100, background: 'rgba(13,13,26,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(192,132,252,0.15)', borderRadius: 40, padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.15em', fontWeight: 700 }}>moonlightOS</span>
        <div style={{ width: 1, height: 14, background: 'var(--border)' }} />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: 'var(--muted)' }}>MEOW · WINDOWS EDITION · V1.0</span>
        {!isMobile && <>
          <div style={{ width: 1, height: 14, background: 'var(--border)' }} />
          <motion.div animate={{ opacity: [1,0.4,1] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, color: 'var(--green)', letterSpacing: '0.1em' }}>RELEASED</span>
          </motion.div>
        </>}
      </motion.div>

      <AnimatePresence>{bsod && <BSOD onClose={() => setBsod(false)} />}</AnimatePresence>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: maxW, margin: '0 auto', padding: pad }}>

        {/* ── HERO ── */}
        <motion.section style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 100, paddingBottom: 60, y: heroY }}>

          {/* badges */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              { text: 'Windows 11', color: 'var(--win)' },
              { text: 'NTLite', color: 'var(--accent)' },
              { text: 'Named by Lucyfer', color: 'var(--accent2)' },
              { text: '🪨 Makka Pakka', color: 'var(--stone)' },
              { text: '✓ V1.0 OUT NOW', color: 'var(--green)' },
            ].map(b => (
              <motion.span key={b.text} whileHover={{ scale: 1.08, y: -2 }}
                style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? 10 : 11, padding: '5px 12px', borderRadius: 6, border: `1px solid ${b.color}`, color: b.color, background: `${b.color}10`, letterSpacing: '0.04em', cursor: 'default', boxShadow: `0 0 12px ${b.color}20` }}>{b.text}</motion.span>
            ))}
          </motion.div>

          {/* title */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: titleSize, lineHeight: 0.88, letterSpacing: '-0.01em' }}>
              <span style={{ color: 'var(--accent)', textShadow: '0 0 60px rgba(192,132,252,0.6), 0 0 120px rgba(192,132,252,0.2)' }}>moon</span>
              <span style={{ textShadow: '0 2px 20px rgba(255,255,255,0.1)' }}>lightOS</span>
              <br />
              <span style={{ color: 'var(--accent2)', textShadow: '0 0 60px rgba(244,114,182,0.6)' }}>Meow</span>
              <br />
              <span style={{ color: 'var(--win)', fontSize: isMobile ? '0.36em' : '0.4em', letterSpacing: '0.08em', textShadow: '0 0 40px rgba(0,120,212,0.6)', fontFamily: "'Orbitron', monospace", fontWeight: 700 }}>Windows Edition</span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            style={{ marginTop: 24, fontSize: isMobile ? 15 : 20, fontStyle: 'italic', color: 'var(--muted)' }}>
            <span style={{ color: 'var(--accent3)', fontStyle: 'normal', fontWeight: 600 }}>"If you can't beat them, debloat them."</span>
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ marginTop: 16, fontSize: isMobile ? 13 : 15, color: 'var(--muted)', maxWidth: 560, lineHeight: 1.8 }}>
            A debloated Windows 11. No telemetry. No Cortana. No dignity. Just GlazeWM, Zebar, CAVA,
            and Makka Pakka watching over your soul. Because sometimes Calamares cries and the RTX 5080 needs drivers.
          </motion.p>

          {/* buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <motion.a href={RELEASE.url} target="_blank"
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(192,132,252,0.6)' }} whileTap={{ scale: 0.97 }}
              style={{ fontFamily: "'Orbitron', monospace", fontSize: isMobile ? 11 : 13, fontWeight: 700, padding: isMobile ? '12px 20px' : '14px 32px', borderRadius: 10, background: 'linear-gradient(135deg, var(--accent), #a855f7, var(--accent2))', border: 'none', color: '#06060f', textDecoration: 'none', letterSpacing: '0.08em', cursor: 'none' }}>
              ↓ Download V1.0
            </motion.a>
            <motion.a href="https://github.com/moonlightOS-Meow/moonlightos-meow/actions" target="_blank"
              whileHover={{ scale: 1.05, borderColor: 'var(--accent3)', color: 'var(--accent3)', boxShadow: '0 0 30px rgba(56,189,248,0.2)' }} whileTap={{ scale: 0.97 }}
              style={{ fontFamily: "'Orbitron', monospace", fontSize: isMobile ? 11 : 13, fontWeight: 700, padding: isMobile ? '12px 20px' : '14px 28px', borderRadius: 10, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.08em', cursor: 'none', transition: 'all 0.25s' }}>
              ⚙ Pipeline
            </motion.a>
            <motion.button onClick={() => setBsod(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(239,68,68,0.35)' }} whileTap={{ scale: 0.97 }}
              style={{ fontFamily: "'Orbitron', monospace", fontSize: isMobile ? 9 : 10, fontWeight: 700, padding: isMobile ? '10px 16px' : '10px 20px', borderRadius: 10, background: 'transparent', border: '1px solid rgba(239,68,68,0.25)', color: 'var(--danger)', cursor: 'pointer', letterSpacing: '0.1em' }}>
              BSOD
            </motion.button>
          </motion.div>

          {/* scroll indicator */}
          {!isMobile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
              style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 8, color: 'var(--muted)', letterSpacing: '0.2em' }}>SCROLL</span>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
            </motion.div>
          )}
        </motion.section>

        <Marquee />

        {/* ── STATS ── */}
        <section style={{ marginBottom: 96 }}>
          <SectionLabel>By the Numbers</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 12 }}>
            {STATS.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
          </div>
        </section>

        {/* ── DOWNLOAD ── */}
        <DownloadSection isMobile={isMobile} />

        {/* ── STACK ── */}
        <section style={{ marginBottom: 96 }}>
          <SectionLabel>Stack</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: 14 }}>
            {STACK.map((s, i) => <SpecCard key={s.label} {...s} index={i} />)}
          </div>
        </section>

        {/* ── LORE ── */}
        <section style={{ marginBottom: 96 }}>
          <SectionLabel>Version Lore</SectionLabel>
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--accent), var(--accent2), transparent)' }} />
            {LORE.map((item, i) => <LoreItem key={item.name} {...item} index={i} />)}
          </div>
        </section>

        {/* ── LUCYFER ── */}
        <section style={{ marginBottom: 96 }}>
          <SectionLabel>Quality Assurance</SectionLabel>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg, var(--surface2), rgba(244,114,182,0.04), var(--surface))', border: '1px solid rgba(244,114,182,0.2)', borderRadius: 20, padding: isMobile ? 24 : 48, position: 'relative', overflow: 'hidden', boxShadow: '0 0 60px rgba(244,114,182,0.05)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--accent2), transparent)' }} />
            <motion.div animate={{ rotate: [0,8,-8,4,-4,0], scale: [1,1.15,1] }} transition={{ duration: 5, repeat: Infinity }}
              style={{ position: 'absolute', right: isMobile ? 16 : 40, top: isMobile ? 16 : 40, fontSize: isMobile ? 60 : 96, opacity: 0.07 }}>🐱</motion.div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 9, color: 'rgba(244,114,182,0.7)', letterSpacing: '0.2em', marginBottom: 8 }}>FORMAL COMPLAINTS — LUCYFER (HE/HIM)</div>
            <motion.div initial={{ scale: 0, rotate: -10 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 72 : 96, color: 'var(--accent2)', lineHeight: 1, textShadow: '0 0 40px rgba(244,114,182,0.5)', margin: '8px 0 16px' }}>
              {complaint}
            </motion.div>
            <p style={{ color: 'var(--muted)', fontSize: isMobile ? 13 : 15, maxWidth: 520, lineHeight: 1.8 }}>
              Lucyfer (Head of QA, he/him) has formally lodged his disapproval of this Windows build.
              His complaints have been noted, logged, and ignored with great efficiency.
              He knocked it off the table. He is not happy. He never is.
              He is, however, a very handsome boy and a good cat.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['🐱 Head of QA since birth', `Complaint #${complaint}`, 'he/him', 'Approval: DENIED', 'Very handsome'].map(t => (
                <motion.span key={t} whileHover={{ scale: 1.06, y: -2 }}
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, padding: '5px 12px', borderRadius: 6, border: '1px solid rgba(244,114,182,0.3)', color: 'var(--accent2)', background: 'rgba(244,114,182,0.06)', cursor: 'default' }}>{t}</motion.span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: '1px solid rgba(192,132,252,0.1)', padding: isMobile ? '40px 0 60px' : '60px 0 80px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 36 : 48, letterSpacing: '0.03em', marginBottom: 12, lineHeight: 1 }}>
              <span style={{ color: 'var(--accent)', textShadow: '0 0 30px rgba(192,132,252,0.5)' }}>moon</span>
              <span>lightOS</span>
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: isMobile ? 10 : 12, color: 'var(--muted)', letterSpacing: '0.08em', lineHeight: 2 }}>
              Named by Lucyfer (he/him). Powered by chaos. Running on NTFS and telemetry.<br/>
              "I ALWAYS COME BACK" — Ash, 2026 &nbsp;·&nbsp; NoVa V3 stays dead. &nbsp;·&nbsp; Linux will return. 🌙
            </div>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              {[
                { label: 'GitHub', url: 'https://github.com/moonlightOS-Meow/moonlightos-meow' },
                { label: 'Releases', url: RELEASE.url },
                { label: 'MEGA', url: RELEASE.mega },
              ].map(l => (
                <motion.a key={l.label} href={l.url} target="_blank" whileHover={{ color: 'var(--accent)', y: -2 }}
                  style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color 0.2s', cursor: 'none' }}>{l.label}</motion.a>
              ))}
            </div>
          </motion.div>
        </footer>
      </div>
    </>
  )
}

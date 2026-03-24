/* Navbar.tsx — moonlightOS v5 "Lucyfer's Revenge"
 * Design: Villain Arc — glassmorphism nav with pink/magenta accents
 * Device-aware: collapses to hamburger on mobile/tablet, full nav on desktop
 */
import { useState, useEffect } from "react";
import { useDevice } from "@/hooks/useDevice";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useDevice();

  const showHamburger = isMobile || isTablet;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Features", href: "#features" },
    { label: "Lucyfer", href: "#lucyfer" },
    { label: "Desktop", href: "#terminal" },
    { label: "Download", href: "#download" },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Smooth scroll with offset for fixed nav
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled || mobileOpen
          ? "rgba(4, 5, 15, 0.92)"
          : "transparent",
        backdropFilter: scrolled || mobileOpen ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(236, 72, 153, 0.15)"
          : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "0 1rem" : "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: isMobile ? "56px" : "64px",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? "1rem" : "1.2rem",
            color: "#E8EEFF",
          }}
        >
          <span style={{ fontSize: isMobile ? "1.25rem" : "1.5rem" }}>🌙</span>
          <span>
            moonlight<span style={{ color: "#ec4899" }}>OS</span>
          </span>
        </a>

        {/* Desktop nav links */}
        {!showHamburger && (
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  color: "rgba(232, 238, 255, 0.7)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ec4899")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(232, 238, 255, 0.7)")}  
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://gitlab.com/moonlightos-dev/moonlightos-nova/-/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cosmic"
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}
            >
              ⬇ Download
            </a>
          </div>
        )}

        {/* Tablet: show download button + hamburger */}
        {isTablet && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a
              href="https://gitlab.com/moonlightos-dev/moonlightos-nova/-/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cosmic"
              style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}
            >
              ⬇ Download
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "1px solid rgba(236, 72, 153, 0.3)",
                borderRadius: "0.4rem",
                color: "#E8EEFF",
                fontSize: "1.25rem",
                cursor: "pointer",
                padding: "0.25rem 0.5rem",
                lineHeight: 1,
              }}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        )}

        {/* Mobile: hamburger only */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              color: "#E8EEFF",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.25rem",
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      {/* Mobile / Tablet dropdown menu */}
      {showHamburger && mobileOpen && (
        <div
          style={{
            background: "rgba(4, 5, 15, 0.97)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(236, 72, 153, 0.15)",
            padding: isMobile ? "1rem 1.25rem 1.5rem" : "1.25rem 2rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "0.75rem" : "1rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: isMobile ? "1rem" : "1.05rem",
                color: "rgba(232, 238, 255, 0.8)",
                textDecoration: "none",
                padding: "0.6rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ec4899")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(232, 238, 255, 0.8)")}  
            >
              {link.label}
            </a>
          ))}
          {/* Show download in mobile menu too */}
          {isMobile && (
            <a
              href="https://gitlab.com/moonlightos-dev/moonlightos-nova/-/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cosmic"
              style={{ textAlign: "center", marginTop: "0.5rem" }}
            >
              ⬇ Download
            </a>
          )}
          {/* Device badge */}
          <div style={{
            marginTop: "0.5rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(236, 72, 153, 0.3)",
            letterSpacing: "0.1em",
          }}>
            {isMobile ? "📱 mobile" : "📟 tablet"} · v5 Revenge
          </div>
        </div>
      )}
    </nav>
  );
}

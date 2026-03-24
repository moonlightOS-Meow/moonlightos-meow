/* Home.tsx — moonlightOS v5 "Lucyfer's Revenge"
 * Design: "Villain Arc" — Dark Cosmic + Arch Chaos + Meme Energy
 * Sections: Hero, Arch Meme, Features, Terminal, Lucyfer Lore, Download, Footer
 */
import { useEffect, useRef, useState } from "react";
import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import { useDevice } from "@/hooks/useDevice";

// Asset URLs (CDN — tied to webdev project lifecycle)
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663437304423/XZcgPKreFQeyz7pdkQRUjB/lucyfer-revenge-hero-PvxdZgFyaMY2capQXr2c6Y.webp";
const ARCH_MEME_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663437304423/XZcgPKreFQeyz7pdkQRUjB/arch-meme-section-iQoh8FVYp6SNYywhHF8M4Q.webp";
const CAT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663437304423/XZcgPKreFQeyz7pdkQRUjB/lucyfer-villain-portrait-2VyXLFrWGZtcHxZxbKKZA3.webp";
const TERMINAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663437304423/XZcgPKreFQeyz7pdkQRUjB/openbox-desktop_580bc340.webp";
const WALLPAPER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663437304423/XZcgPKreFQeyz7pdkQRUjB/meow-wallpaper-touhou_4c0649e9.webp";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <AnimatedSection delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "rgba(236, 72, 153, 0.08)" : "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(12px)",
          border: hovered ? "1px solid rgba(236, 72, 153, 0.35)" : "1px solid rgba(255, 255, 255, 0.07)",
          borderRadius: "1rem",
          padding: "1.75rem",
          transition: "all 0.3s ease",
          boxShadow: hovered ? "0 0 30px rgba(236, 72, 153, 0.15)" : "none",
          cursor: "default",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{icon}</div>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: "1.1rem",
          color: "#E8EEFF",
          marginBottom: "0.5rem",
        }}>{title}</h3>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.9rem",
          color: "rgba(232, 238, 255, 0.55)",
          lineHeight: 1.6,
        }}>{desc}</p>
      </div>
    </AnimatedSection>
  );
}

function MemeCard({ emoji, title, desc, delay }: { emoji: string; title: string; desc: string; delay: number }) {
  return (
    <AnimatedSection delay={delay}>
      <div style={{
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(236, 72, 153, 0.2)",
        borderRadius: "0.75rem",
        padding: "1.25rem 1.5rem",
        display: "flex",
        gap: "1rem",
        alignItems: "flex-start",
      }}>
        <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{emoji}</span>
        <div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#ec4899",
            marginBottom: "0.25rem",
          }}>{title}</div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.875rem",
            color: "rgba(232, 238, 255, 0.55)",
            lineHeight: 1.5,
          }}>{desc}</div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Home() {
  const [baitCount] = useState(98);
  const { isMobile, isTablet } = useDevice();

  return (
    <div style={{ background: "#04050F", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <StarField />
      <Navbar />

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Hero background image */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.65,
          zIndex: 1,
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(4,5,15,0.2) 0%, rgba(4,5,15,0.5) 60%, rgba(4,5,15,1) 100%)",
          zIndex: 2,
        }} />

        {/* Hero content */}
        <div style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "800px",
        }}>
          <div
            className="animate-fade-in"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8rem",
              color: "rgba(236, 72, 153, 0.8)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            🐱 meow v5 · arch linux · chaos edition
          </div>

          <h1
            className="animate-slide-up"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              background: "linear-gradient(135deg, #E8EEFF 0%, #ec4899 50%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            lucyfer's
            <br />
            <span style={{
              background: "linear-gradient(135deg, #ec4899, #f43f5e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>revenge</span>
          </h1>

          <p
            className="animate-slide-up delay-200"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "rgba(232, 238, 255, 0.7)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "560px",
              margin: "0 auto 2.5rem",
            }}
          >
            Arch-based chaos distro. Minimal. Cosmic. Named by a cat.
            <br />
            <span style={{ color: "rgba(236, 72, 153, 0.6)", fontSize: "0.9em" }}>Lucyfer's villain origin story. v5 incoming. 💀</span>
          </p>

          <div
            className="animate-slide-up delay-400"
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a
              href="https://gitlab.com/moonlightos-dev/moonlightos-nova/-/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cosmic animate-glow-pulse"
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}
            >
              ⬇ Download v5
            </a>
            <a
              href="#features"
              className="btn-cosmic-outline"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              Explore Features →
            </a>
          </div>

          {/* Stats row */}
          <div
            className="animate-fade-in delay-600"
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              marginTop: "3.5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { val: "Arch", label: "Base" },
              { val: "Openbox", label: "Window Manager" },
              { val: "archinstall", label: "Installer" },
              { val: "v5", label: "Version" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#ec4899",
                }}>{stat.val}</div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(232, 238, 255, 0.4)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginTop: "0.2rem",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.4,
        }}>
          <div style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, transparent, rgba(236, 72, 153, 0.8))",
            animation: "float 2s ease-in-out infinite",
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            color: "rgba(236, 72, 153, 0.6)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>Scroll</span>
        </div>
      </section>

      {/* ── ARCH MEME SECTION ── */}
      <section
        id="arch-meme"
        style={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "4rem 1.5rem",
        }}
      >
        {/* Meme background */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${ARCH_MEME_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          zIndex: 1,
        }} />
        {/* Dark overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(4,5,15,0.7) 0%, rgba(4,5,15,0.85) 100%)",
          zIndex: 2,
        }} />

        <div style={{
          position: "relative",
          zIndex: 3,
          maxWidth: "900px",
          textAlign: "center",
        }}>
          <AnimatedSection>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#E8EEFF",
              marginBottom: "1.5rem",
            }}>
              btw, i use <span style={{ color: "#ec4899" }}>Arch</span>
            </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.1rem",
            color: "rgba(232, 238, 255, 0.65)",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}>
            v5 is ready. Arch-based. Minimal. Cosmic. Named by Lucyfer. Built by Ash.
          </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        id="features"
        style={{
          position: "relative",
          padding: "4rem 1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <AnimatedSection>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            textAlign: "center",
            color: "#E8EEFF",
            marginBottom: "0.5rem",
          }}>
            Why v5 Slaps
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            textAlign: "center",
            color: "rgba(232, 238, 255, 0.5)",
            marginBottom: "3rem",
            fontSize: "1rem",
          }}>
            Arch-based perfection. i3 window manager. Minimal footprint. Maximum chaos.
          </p>
        </AnimatedSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: "1.5rem",
        }}>
          <FeatureCard
            icon="⚡"
            title="Rolling Release"
            desc="Always bleeding edge. Arch keeps you on the latest packages. No stale software here."
            delay={0}
          />
          <FeatureCard
            icon="📱"
            title="Openbox WM"
            desc="Lightweight stacking window manager. From archcraft. No ricing needed. Just chaos."
            delay={100}
          />
          <FeatureCard
            icon="🐧"
            title="Arch Linux"
            desc="The KISS principle. Simple, elegant, powerful. Built for users who know what they want."
            delay={200}
          />
          <FeatureCard
            icon="🌙"
            title="Cosmic Theming"
            desc="Dark theme. Purple/blue/pink palette. Lucyfer-approved aesthetics throughout."
            delay={300}
          />
          <FeatureCard
            icon="🔄"
            title="mos-meow-repo"
            desc="Custom Pacman repo with meow-branding package. Official moonlightOS packages. Chaos-approved."
            delay={400}
          />
          <FeatureCard
            icon="💀"
            title="Chaos Energy"
            desc="No hand-holding. No bloat. Pure Linux. For users who embrace the void."
            delay={500}
          />
        </div>
      </section>

      {/* ── LUCYFER LORE ── */}
      <section
        id="lucyfer"
        style={{
          position: "relative",
          padding: "4rem 1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <AnimatedSection>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            textAlign: "center",
            color: "#E8EEFF",
            marginBottom: "3rem",
          }}>
            The Legend of Lucyfer
          </h2>
        </AnimatedSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
        }}>
          {/* Lucyfer image */}
          <AnimatedSection delay={0}>
            <div style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <img
                src={CAT_IMG}
                alt="Lucyfer - Cosmic Entity"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "1rem",
                  filter: "drop-shadow(0 0 30px rgba(236, 72, 153, 0.3))",
                }}
              />
            </div>
          </AnimatedSection>

          {/* Lore cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <MemeCard
              emoji="🌌"
              title="Void Born"
              desc="Lucyfer emerged from the cosmic void. Not a regular cat. A cosmic entity. Chief QA. Shadow Architect of moonlightOS."
              delay={0}
            />
            <MemeCard
              emoji="🎯"
              title="Named the Distro"
              desc="Meow v4 was named by Lucyfer. A cat. Named a Linux distro. That's the energy we're bringing to v5."
              delay={100}
            />
            <MemeCard
              emoji="💀"
              title="Revenge Arc"
              desc="v5 is Lucyfer's revenge. Arch-based chaos. More memes. More power. More cosmic energy than ever before."
              delay={200}
            />
            <MemeCard
              emoji="🔥"
              title="Chaos Weaver"
              desc="Powers: Chaos manipulation. Distro naming. Bait generation (98+ victims). Cosmic entity status confirmed."
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* ── TERMINAL PREVIEW ── */}
      <section
        id="terminal"
        style={{
          position: "relative",
          padding: "4rem 1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <AnimatedSection>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            textAlign: "center",
            color: "#E8EEFF",
            marginBottom: "0.5rem",
          }}>
            Openbox Desktop
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
            gap: "2rem",
            alignItems: "center",
          }}>
            {/* Terminal image */}
            <div style={{
              borderRadius: "1rem",
              overflow: "hidden",
              border: "1px solid rgba(236, 72, 153, 0.2)",
              boxShadow: "0 0 40px rgba(236, 72, 153, 0.1)",
            }}>
              <img
                src={TERMINAL_IMG}
                alt="Terminal Preview"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>

            {/* Description */}
            <div>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "1.5rem",
                color: "#E8EEFF",
                marginBottom: "1rem",
              }}>
                Openbox Minimalism
              </h3>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1rem",
                color: "rgba(232, 238, 255, 0.65)",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}>
                Clean desktop. Minimal aesthetic. Openbox window manager from archcraft. Anime wallpaper energy. Everything you need, nothing you don't.
              </p>
              <ul style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.95rem",
                color: "rgba(232, 238, 255, 0.65)",
                lineHeight: 2,
                listStyle: "none",
                padding: 0,
              }}>
                <li>🌜 Arch Linux rolling release</li>
                <li>📱 Openbox window manager</li>
                <li>🌙 Cosmic dark theme</li>
                <li>⚡ Lightning-fast performance</li>
                <li>📄 mos-meow-repo packages</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── WALLPAPER SHOWCASE ── */}
      <section
        id="wallpaper"
        style={{
          position: "relative",
          padding: "4rem 1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <AnimatedSection>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            textAlign: "center",
            color: "#E8EEFF",
            marginBottom: "3rem",
          }}>
            Unofficial Wallpaper (Touhou)
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div style={{
            borderRadius: "1rem",
            overflow: "hidden",
            border: "1px solid rgba(236, 72, 153, 0.2)",
            boxShadow: "0 0 40px rgba(236, 72, 153, 0.1)",
            maxHeight: "500px",
          }}>
            <img
              src={WALLPAPER_IMG}
              alt="Official moonlightOS Wallpaper"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            textAlign: "center",
            color: "rgba(232, 238, 255, 0.5)",
            marginTop: "1.5rem",
            fontSize: "0.95rem",
          }}>
            Touhou-inspired. Anime aesthetic. Stolen from Google. Included with meow-branding package. 💀
          </p>
        </AnimatedSection>
      </section>

      {/* ── DOWNLOAD ── */}
      <section
        id="download"
        style={{
          position: "relative",
          padding: "4rem 1.5rem",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <AnimatedSection>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "#E8EEFF",
            marginBottom: "1.5rem",
          }}>
            Ready to Join the Chaos?
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.1rem",
            color: "rgba(232, 238, 255, 0.65)",
            marginBottom: "2.5rem",
            lineHeight: 1.7,
          }}>
            v5 is ready. Arch-based. Minimal. Cosmic. Named by Lucyfer. Built by Ash.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://gitlab.com/moonlightos-dev/moonlightos-nova/-/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cosmic animate-glow-pulse"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              📊 Download v5
            </a>
            <a
              href="https://gitlab.com/moonlightos-dev/moonlightos-nova"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cosmic-outline"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              🔗 GitLab Repository
            </a>
          </div>
        </AnimatedSection>

        {/* Bait counter */}
        <AnimatedSection delay={200}>
          <div style={{
            marginTop: "3rem",
            padding: "1.5rem",
            background: "rgba(236, 72, 153, 0.05)",
            border: "1px solid rgba(236, 72, 153, 0.2)",
            borderRadius: "1rem",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              color: "rgba(236, 72, 153, 0.6)",
              marginBottom: "0.5rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>
              Bait Counter
            </div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "2rem",
              fontWeight: 700,
              color: "#ec4899",
            }}>
              {baitCount}+ Victims 💀
            </div>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(232, 238, 255, 0.4)",
              marginTop: "0.5rem",
            }}>
              Including Claude 2 (83 baits — LEGENDARNY)
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          position: "relative",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          padding: "3rem 1.5rem",
          textAlign: "center",
          color: "rgba(232, 238, 255, 0.4)",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.9rem",
        }}
      >
        <p style={{ marginBottom: "1rem" }}>
          moonlightOS Meow v5 "Lucyfer's Revenge" — Arch-based. Minimal. Cosmic.
        </p>
        <p style={{ marginBottom: "1.5rem" }}>
          Built by Ash. Named by Lucyfer. Powered by chaos.
        </p>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://gitlab.com/moonlightos-dev/moonlightos-nova"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ec4899", textDecoration: "none" }}
          >
            GitLab
          </a>
          <a
            href="https://github.com/moonlightOS-Meow/moonlightos-meow"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ec4899", textDecoration: "none" }}
          >
            GitHub Mirror
          </a>
        </div>
        <p style={{ marginTop: "2rem", fontSize: "0.8rem", opacity: 0.6 }}>
          © 2026 moonlightOS Project. All rights reserved. Lucyfer's Revenge incoming. 💀
        </p>
      </footer>
    </div>
  );
}

/* StarField.tsx — CSS-only star field (performance-friendly, no canvas)
 * Design: "Moonlit Nebula" — static stars with CSS twinkle animations
 * Replaces canvas version to avoid burning mobile hardware 💀
 */
import { useMemo } from "react";

interface StarData {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  duration: string;
  delay: string;
  color: string;
}

export default function StarField() {
  const stars = useMemo<StarData[]>(() => {
    // Fixed seed-like generation for SSR consistency
    const result: StarData[] = [];
    const colors = ["#E8EEFF", "#a78bfa", "#60a5fa", "#E8EEFF", "#E8EEFF"];
    for (let i = 0; i < 120; i++) {
      const x = ((i * 137.508 + 11) % 100);
      const y = ((i * 97.3 + 23) % 100);
      const size = (i % 5 === 0) ? 2 : (i % 3 === 0) ? 1.5 : 1;
      result.push({
        id: i,
        top: `${y.toFixed(2)}%`,
        left: `${x.toFixed(2)}%`,
        size,
        opacity: 0.2 + (i % 7) * 0.1,
        duration: `${3 + (i % 5)}s`,
        delay: `${(i % 40) * 0.15}s`,
        color: colors[i % colors.length],
      });
    }
    return result;
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            backgroundColor: star.color,
            opacity: star.opacity,
            animation: `twinkle ${star.duration} ease-in-out infinite`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

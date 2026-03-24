/**
 * useDevice — detects device type and orientation
 * Design: "Moonlit Nebula" — adapts layout for mobile/tablet/desktop
 *
 * Returns:
 *  - isMobile: width < 640px (phones)
 *  - isTablet: 640px–1023px (tablets, small laptops)
 *  - isDesktop: width >= 1024px
 *  - isTouch: device supports touch input
 *  - deviceType: "mobile" | "tablet" | "desktop"
 *  - width / height: current viewport dimensions
 */
import { useEffect, useState } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  deviceType: DeviceType;
  width: number;
  height: number;
}

function getDeviceInfo(): DeviceInfo {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isTouch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as unknown as { msMaxTouchPoints?: number }).msMaxTouchPoints! > 0;

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  const deviceType: DeviceType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  return { isMobile, isTablet, isDesktop, isTouch, deviceType, width, height };
}

export function useDevice(): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>(getDeviceInfo);

  useEffect(() => {
    let rafId: number;

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setDevice(getDeviceInfo());
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return device;
}

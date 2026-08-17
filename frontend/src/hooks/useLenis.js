import { useEffect } from "react";
import { initLenis, destroyLenis } from "../lib/lenis";

/**
 * Mounts Lenis smooth scrolling for the lifetime of the app.
 * Call once near the root (App.jsx).
 */
export function useLenis() {
  useEffect(() => {
    const lenis = initLenis();
    return () => destroyLenis();
  }, []);
}

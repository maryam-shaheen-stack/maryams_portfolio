import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "../../lib/lenis";

/** Runs on every route change: jumps to top for a fresh page, or — if a
 * hash is present (e.g. Nav linking "/#about" from an inner page) —
 * smooth-scrolls to that section once it's mounted. Doesn't touch the
 * homepage's own scroll-driven animations, just the initial position. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = getLenis();

    if (hash) {
      // Give the target route a tick to mount before scrolling to it.
      const id = requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) lenis.scrollTo(el, { immediate: false });
          else el.scrollIntoView({ behavior: "smooth" });
        }
      });
      return () => cancelAnimationFrame(id);
    }

    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide buttery smooth scroll. Lenis intercepts wheel/touch input and
 * applies custom easing continuously — this is what CSS `scroll-behavior:
 * smooth` can't do, since that only affects anchor-link jumps, not everyday
 * scrolling. Also upgrades in-page `<a href="#id">` anchor links (Navbar,
 * Hero CTA, Footer, treatment modal, etc.) to animate through Lenis with
 * the same easing, offset to clear the fixed navbar.
 *
 * Also handles the initial page-load case: if the URL already has a hash
 * (e.g. someone opens zafoorclinic.com/#services in a fresh tab, or a
 * bookmark/shared link), Lenis scrolls to that section once mounted —
 * previously this only worked for in-page clicks, not fresh loads.
 */
export default function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic — smooth, no overshoot
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const navOffset = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-offset") || "88",
      10
    );

    function handleAnchorClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -navOffset, duration: prefersReducedMotion ? 0 : 1.2 });
    }
    document.addEventListener("click", handleAnchorClick);

    // ---- fresh-load hash scroll fix ----
    // If the page loads with a hash already in the URL, wait for layout
    // (images, fonts, sections) to settle, then scroll to it via Lenis.
    if (window.location.hash) {
      const id = window.location.hash;
      const scrollToHash = () => {
        const target = document.querySelector(id);
        if (target) {
          lenis.scrollTo(target, { offset: -navOffset, duration: prefersReducedMotion ? 0 : 1.2 });
        }
      };
      // small delay so all sections/images have mounted and laid out
      // before Lenis calculates scroll position
      const timeoutId = setTimeout(scrollToHash, 400);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("click", handleAnchorClick);
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
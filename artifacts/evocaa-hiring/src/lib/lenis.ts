import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initLenis(): void {
  if (lenisInstance || typeof window === 'undefined') return;

  // Degrade gracefully — disable inertia scroll entirely for reduced-motion users.
  if (prefersReducedMotion()) {
    document.documentElement.classList.add('lenis-reduced-motion');
    return;
  }

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.01 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  document.documentElement.classList.add('lenis');

  function raf(time: number) {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function destroyLenis(): void {
  lenisInstance?.destroy();
  lenisInstance = null;
  document.documentElement.classList.remove('lenis');
}
import { useEffect, useRef, useCallback } from 'react';

export function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    observerRef.current?.observe(el);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all existing reveal elements
    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return { observe };
}

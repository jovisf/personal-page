import { useEffect, useRef, useState, RefObject } from 'react'

interface ScrollObserverOptions {
  threshold?: number
  rootMargin?: string
}

export function useScrollObserver<T extends HTMLElement>(
  options: ScrollObserverOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px' } = options
  const elementRef = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [elementRef, isVisible]
}

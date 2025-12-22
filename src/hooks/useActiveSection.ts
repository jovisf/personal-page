import { useState, useEffect, useRef } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const sectionRatiosRef = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionRatiosRef.current.set(entry.target.id, entry.intersectionRatio)
        } else {
          sectionRatiosRef.current.set(entry.target.id, 0)
        }
      })

      let maxRatio = 0
      let newActiveSection: string | null = null

      sectionRatiosRef.current.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio
          newActiveSection = id
        }
      })
      if (newActiveSection && maxRatio > 0.15) {
        setActiveSection((prev) => {
          return prev === newActiveSection ? prev : newActiveSection
        })
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: '-10% 0px -50% 0px',
    })

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [sectionIds])

  return activeSection
}

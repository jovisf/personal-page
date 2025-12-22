import { useState, useEffect, RefObject } from 'react'

interface MarkerStyle {
  left: number
  width: number
}

export function useMarkerPosition(
  sectionIds: string[],
  navRefs: RefObject<(HTMLButtonElement | null)[]>
) {
  const [markerStyle, setMarkerStyle] = useState<MarkerStyle>({ left: 0, width: 0 })

  useEffect(() => {
    const updateMarkerPosition = () => {
      const sectionPositions = sectionIds.map(id => {
        const element = document.getElementById(id)
        if (!element) return null
        const rect = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const visibleTop = Math.max(0, -rect.top)
        const visibleBottom = Math.min(rect.height, viewportHeight - rect.top)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)
        const visibility = rect.height > 0 ? visibleHeight / viewportHeight : 0

        return {
          id,
          visibility,
          rect
        }
      }).filter(Boolean)

      const sorted = sectionPositions
        .filter(s => s && s.visibility > 0)
        .sort((a, b) => (b?.visibility || 0) - (a?.visibility || 0))

      if (sorted.length === 0) return

      const primary = sorted[0]
      const secondary = sorted[1]

      if (!primary) return

      const primaryIndex = sectionIds.indexOf(primary.id)
      const primaryButton = navRefs.current?.[primaryIndex]

      if (!primaryButton) return

      if (!secondary || primary.visibility > 0.5) {
        const { offsetLeft, offsetWidth } = primaryButton
        setMarkerStyle({ left: offsetLeft, width: offsetWidth })
      } else {
        const secondaryIndex = sectionIds.indexOf(secondary.id)
        const secondaryButton = navRefs.current?.[secondaryIndex]

        if (!secondaryButton) {
          const { offsetLeft, offsetWidth } = primaryButton
          setMarkerStyle({ left: offsetLeft, width: offsetWidth })
          return
        }

        const totalVisibility = primary.visibility + secondary.visibility
        const primaryWeight = primary.visibility / totalVisibility
        const secondaryWeight = secondary.visibility / totalVisibility

        const primaryPos = {
          left: primaryButton.offsetLeft,
          width: primaryButton.offsetWidth
        }
        const secondaryPos = {
          left: secondaryButton.offsetLeft,
          width: secondaryButton.offsetWidth
        }

        const interpolatedLeft = primaryPos.left * primaryWeight + secondaryPos.left * secondaryWeight
        const interpolatedWidth = primaryPos.width * primaryWeight + secondaryPos.width * secondaryWeight

        setMarkerStyle({
          left: interpolatedLeft,
          width: interpolatedWidth
        })
      }
    }

    window.addEventListener('scroll', updateMarkerPosition, { passive: true })
    window.addEventListener('resize', updateMarkerPosition)
    updateMarkerPosition()

    return () => {
      window.removeEventListener('scroll', updateMarkerPosition)
      window.removeEventListener('resize', updateMarkerPosition)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds])

  return markerStyle
}

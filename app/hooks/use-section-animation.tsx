"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useInView } from "framer-motion"

// This hook enhances the useInView hook to provide better control over animations
export function useSectionAnimation(ref: React.RefObject<HTMLElement>, threshold = 0.3) {
  const isInView = useInView(ref, { amount: threshold })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setShouldAnimate(true)
      setHasAnimated(true)
    } else if (!isInView && hasAnimated) {
      // Reset animation state when section is out of view
      setShouldAnimate(false)
      setHasAnimated(false)
    }
  }, [isInView, hasAnimated])

  return shouldAnimate
}

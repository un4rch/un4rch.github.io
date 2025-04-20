"use client"
import { Briefcase, Code, User, Home } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate blur based on scroll position
  const blurAmount = Math.min((scrollY / 500) * 10, 10)

  // Navigation items
  const navItems = [
    { name: "Home", icon: <Home className="h-4 w-4" />, href: "#home" },
    { name: "About", icon: <User className="h-4 w-4" />, href: "#about" },
    { name: "Projects", icon: <Briefcase className="h-4 w-4" />, href: "#projects" },
    { name: "Contact", icon: <Code className="h-4 w-4" />, href: "#contact" },
  ]
}

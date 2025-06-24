"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Home, User, Briefcase, Code, Menu, X } from "lucide-react"
import type { JSX } from "react"

interface NavItem {
  name: string
  icon: JSX.Element
  href: string
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  })

  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({})

  // Navigation items
  const navItems: NavItem[] = [
    { name: "Home", icon: <Home className="h-4 w-4" />, href: "#home" },
    { name: "About", icon: <User className="h-4 w-4" />, href: "#about" },
    { name: "Education & Experience", icon: <Briefcase className="h-4 w-4" />, href: "#education" },
    { name: "Projects", icon: <Code className="h-4 w-4" />, href: "#projects" },
    { name: "Contact", icon: <Code className="h-4 w-4" />, href: "#contact" },
  ]

  // Update indicator position based on active section
  useEffect(() => {
    const updateIndicator = () => {
      const activeItem = itemRefs.current[activeSection]

      if (activeItem && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect()
        const activeRect = activeItem.getBoundingClientRect()

        setIndicatorStyle({
          left: activeRect.left - navRect.left,
          width: activeRect.width,
          height: activeRect.height,
          opacity: 1,
        })
      }
    }

    updateIndicator()

    // Update on resize
    window.addEventListener("resize", updateIndicator)
    return () => window.removeEventListener("resize", updateIndicator)
  }, [activeSection])

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      // Get all sections
      const sections = navItems.map((item) => {
        const id = item.href.substring(1)
        const element = document.getElementById(id)
        return { id, top: element?.offsetTop || 0, height: element?.offsetHeight || 0 }
      })

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (scrollPosition >= section.top) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  // Handle navigation click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setActiveSection(sectionId)

    // Special handling for home section
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: "smooth" })
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-auto">
      <div ref={navRef} className="nav-container relative px-2 py-1">
        {/* Indicator */}
        <div
          className="nav-indicator indicator-pulse"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            height: indicatorStyle.height,
            opacity: indicatorStyle.opacity,
          }}
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              ref={(el) => (itemRefs.current[item.href.substring(1)] = el)}
              className={`nav-item flex items-center space-x-2 ${
                activeSection === item.href.substring(1)
                  ? "text-[#FF0040] font-medium"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={(e) => handleNavClick(e, item.href.substring(1))}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-[#FF0040] transition-colors duration-300 p-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {mobileMenuOpen && (
            <div className="absolute bottom-14 left-0 w-full bg-black/90 backdrop-blur-md rounded-lg border border-[rgba(255,0,64,0.3)] p-4 shadow-lg">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 ${
                      activeSection === item.href.substring(1)
                        ? "text-[#FF0040] font-medium"
                        : "text-gray-300 hover:text-white"
                    }`}
                    onClick={(e) => handleNavClick(e, item.href.substring(1))}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                ref={(el) => (itemRefs.current[item.href.substring(1)] = el)}
                className={`nav-item p-2 ${
                  activeSection === item.href.substring(1) ? "text-[#FF0040]" : "text-gray-300 hover:text-white"
                }`}
                onClick={(e) => handleNavClick(e, item.href.substring(1))}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Download,
  ArrowUpRight,
  Briefcase,
  Code,
  User,
  Layers,
  MousePointer,
  Palette,
  PenTool,
  Grid,
  Figma,
  FileImage,
  Scissors,
  Framer,
  Globe,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Terminal, Codepen, Database
} from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "./components/navbar"
import { useSectionAnimation } from "./hooks/use-section-animation"

export default function HomePage() {
  // Set initial blur amount
  const [scrollY, setScrollY] = useState(0)
  const [initialRender, setInitialRender] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const homeRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Use our custom hook for better animation control
  const aboutShouldAnimate = useSectionAnimation(aboutRef)
  const projectsShouldAnimate = useSectionAnimation(projectsRef)
  const contactShouldAnimate = useSectionAnimation(contactRef)

  const { scrollYProgress } = useScroll()

  // Track scroll position and handle initial render
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (initialRender) {
        setInitialRender(false)
      }
    }

    // Set a small initial blur even before scrolling
    if (initialRender) {
      // Small timeout to ensure the component is mounted
      const timer = setTimeout(() => {
        setInitialRender(false)
      }, 100)
      return () => clearTimeout(timer)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [initialRender])

  // Calculate blur based on scroll position - with initial blur
  const blurAmount = initialRender ? 2 : Math.min((scrollY / 300) * 10, 10)

  // Calculate home section opacity based on scroll - fade out faster
  const homeOpacity = Math.max(1 - scrollY / 300, 0)

  // Transform values for home section - faster transition
  const homeScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const homeY = useTransform(scrollYProgress, [0, 0.15], [0, -50])

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  // Project data
  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "Finance Dashboard Redesign",
      description:
        "A complete overhaul of a financial analytics platform, improving usability and information hierarchy.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "2",
      title: "Healthcare Mobile App",
      description: "A patient-centered mobile application for managing appointments and health records.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "3",
      title: "E-commerce Redesign",
      description: "Revamped user experience for an online retailer, resulting in 35% increase in conversion rate.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "4",
      title: "SaaS Product Design",
      description: "End-to-end design for a project management tool focused on remote teams.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ])

  return (
    <div ref={containerRef} className="relative">
      {/* Background image with blur effect */}
      <div
        className="fixed inset-0 bg-black transition-all duration-300 z-0"
        style={{
          //backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundColor: "#000000",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: `blur(${blurAmount}px)`,
        }}
      >
        {/* Gradient overlay */}
        {/*<div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/30"></div>*/}
      </div>

      {/* Floating Navigation Bar */}
      <Navbar />

      {/* Hero section - fixed with fade out effect */}
      <motion.section
        ref={homeRef}
        id="home"
        className="fixed inset-0 flex flex-col justify-between z-10 px-6 py-8 pointer-events-none"
        style={{
          opacity: homeOpacity,
          scale: homeScale,
          y: homeY,
        }}
      >
        {/* Header */}
        <header className="container mx-auto flex justify-between items-center pointer-events-auto">
          <div className="flex items-center space-x-2 ml-0 md:ml-12 lg:ml-24">
            <span className="h-2 w-2 bg-green-500 rounded-full pulse-green-circle"></span>
            <span className="text-green-500 text-sm font-medium">Open to work</span>
          </div>
          <Link href="#" className="neon-red px-4 py-2 rounded-full download-btn pointer-events-auto">
            <div className="text-content">
              <span>Download CV</span>
              <Download className="h-4 w-4" />
            </div>
            <div className="icon-content">
              <Download className="h-4 w-4" />
            </div>
          </Link>
        </header>

        {/* Main content - divided in left and right containers */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center">
          <div className="container ml-0 md:ml-12 lg:ml-24 max-w-2xl pointer-events-auto">
            <div className="mb-4">
              <h2 className="text-[#FF0040] text-lg font-medium tracking-wide">UX/UI DESIGNER</h2>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-white">
              Unai Elorriaga Aramburu
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
              <Link
                href="mailto:uelorriaga001@gmail.com"
                className="contact-info-box"
                style={{ transitionDelay: "0.1s" }}
              >
                <Mail className="h-5 w-5 mr-3" />
                <span className="transition-all duration-700">uelorriaga001@gmail.com</span>
              </Link>
              <Link href="tel:+34626984327" className="contact-info-box" style={{ transitionDelay: "0.1s" }}>
                <Phone className="h-5 w-5 mr-3" />
                <span className="transition-all duration-700">+34 626 984 327</span>
              </Link>
              <Link
                href="https://linkedin.com/in/uelorriaga001"
                target="_blank"
                className="contact-info-box"
                style={{ transitionDelay: "0.1s" }}
              >
                <Linkedin className="h-5 w-5 mr-3" />
                <span className="transition-all duration-700">linkedin.com/in/uelorriaga001</span>
              </Link>
              <div className="contact-info-box" style={{ transitionDelay: "0.1s" }}>
                <MapPin className="h-5 w-5 mr-3" />
                <span className="transition-all duration-700">Bilbao, Spain</span>
              </div>
            </div>
          </div>

          <div
            className="mt-6 lg:mt-0 lg:ml-10 flex-shrink-0
                      relative w-[500px] h-[500px] overflow-visible"
          >
            {/* -- Tu retrato -- */}
            <Image
              src="/portrait.png"
              alt="Retrato de Unai"
              fill
              className="object-cover"
            />

            {/* -- Iconos flotando alrededor -- */}
            {/*<Code
              className="absolute top-0 left-1/4 -translate-y-1/2 text-red-500 w-6 h-6 animate-float delay-0"
            />
            <Terminal
              className="absolute top-1/4 right-0 translate-x-1/2 text-red-500 w-5 h-5 animate-float delay-200"
            />
            <Codepen
              className="absolute bottom-0 right-1/4 translate-y-1/2 text-red-500 w-7 h-7 animate-float delay-400"
            />
            <Database
              className="absolute bottom-1/4 left-0 -translate-x-1/2 text-red-500 w-6 h-6 animate-float delay-600"
            />*/}
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="container mx-auto flex justify-center pb-14 pointer-events-auto">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </motion.section>

      {/* Spacer to push content below the fold */}
      <div className="h-screen"></div>

      {/* About section - appears from bottom when scrolling */}
      <section id="about" ref={aboutRef} className="relative min-h-screen flex items-center z-20 px-6 py-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={aboutShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3 mb-10"
            >
              <User className="h-6 w-6 text-[#FF0040]" />
              <h2 className="text-3xl font-bold text-white">About Me</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={aboutShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                I'm a UX/UI designer with over 8 years of experience creating digital products that are both beautiful
                and functional. My approach combines user-centered design principles with a strong aesthetic sensibility
                to create experiences that delight users and achieve business goals.
              </p>
              <p className="text-gray-300 text-lg mb-12 leading-relaxed">
                I specialize in creating intuitive interfaces for complex systems, with a focus on fintech, healthcare,
                and SaaS products. My process involves deep user research, iterative prototyping, and close
                collaboration with development teams to ensure designs are implemented with fidelity and attention to
                detail.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <motion.div
                className="about-box"
                initial={{ opacity: 0, y: 40 }}
                animate={aboutShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h3 className="text-white font-semibold">Design Skills</h3>
                <ul className="text-gray-300 space-y-3 mt-4">
                  <li>
                    <Layers />
                    User Interface Design
                  </li>
                  <li>
                    <MousePointer />
                    User Experience Design
                  </li>
                  <li>
                    <Palette />
                    Interaction Design
                  </li>
                  <li>
                    <PenTool />
                    Wireframing & Prototyping
                  </li>
                  <li>
                    <Grid />
                    Design Systems
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="about-box"
                initial={{ opacity: 0, y: 40 }}
                animate={aboutShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <h3 className="text-white font-semibold">Tools</h3>
                <ul className="text-gray-300 space-y-3 mt-4">
                  <li>
                    <Figma />
                    Figma
                  </li>
                  <li>
                    <FileImage />
                    Adobe Creative Suite
                  </li>
                  <li>
                    <Scissors />
                    Sketch
                  </li>
                  <li>
                    <Framer />
                    Framer
                  </li>
                  <li>
                    <Globe />
                    Webflow
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects section - appears from bottom when scrolling */}
      <section id="projects" ref={projectsRef} className="relative min-h-screen flex items-center z-20 px-6 py-16">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={projectsShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3 mb-12"
            >
              <Briefcase className="h-6 w-6 text-[#FF0040]" />
              <h2 className="text-3xl font-bold text-white">Selected Projects</h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={projectsShouldAnimate ? "visible" : "hidden"}
            >
              {/* Project Cards */}
              {projects.map((project, index) => (
                <motion.div key={project.id} variants={itemVariants} className="project-card">
                  <Link href={`/project/${project.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <div className="text-[#FF0040] hover:text-white flex items-center space-x-1">
                        <span>View case study</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact section - appears from bottom when scrolling */}
      <section id="contact" ref={contactRef} className="relative min-h-screen flex items-center z-20 px-6 py-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contactShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3 mb-12"
            >
              <Code className="h-6 w-6 text-[#FF0040]" />
              <h2 className="text-3xl font-bold text-white">Let's Work Together</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={contactShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="contact-box"
            >
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                I'm currently available for freelance work and exciting opportunities. If you have a project that needs
                some creative direction or you're looking to add a designer to your team, let's talk!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Link
                  href="mailto:uelorriaga001@gmail.com"
                  className="contact-item p-4 rounded-lg flex items-center space-x-3"
                >
                  <div className="bg-[#ff0040] hover:neon-red p-2 rounded-full transition-all duration-300">
                    <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-white">uelorriaga001@gmail.com</div>
                  </div>
                </Link>

                <Link href="tel:+34626984327" className="contact-item p-4 rounded-lg flex items-center space-x-3">
                  <div className="bg-[#ff0040] hover:neon-red p-2 rounded-full transition-all duration-300">
                    <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Phone</div>
                    <div className="text-white">+34 626 984 327</div>
                  </div>
                </Link>
              </div>

              <Link href="#" className="neon-red px-6 py-3 rounded-full inline-flex items-center space-x-2">
                <span>Schedule a call</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 px-6 py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Unai Elorriaga Aramburu. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

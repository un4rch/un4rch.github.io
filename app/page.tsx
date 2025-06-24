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
  GraduationCap,
  Calendar,
} from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "./components/navbar"
import { useSectionAnimation } from "./hooks/use-section-animation"
import type { Variants, Transition } from "framer-motion";

export default function HomePage() {
  // Set initial blur amount
  const [scrollY, setScrollY] = useState(0)
  const [initialRender, setInitialRender] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const homeRef = useRef<HTMLElement>(null!)
  const aboutRef = useRef<HTMLElement>(null!)
  const educationRef = useRef<HTMLElement>(null!)
  const projectsRef = useRef<HTMLElement>(null!)
  const contactRef = useRef<HTMLElement>(null!)

  // Use our custom hook for better animation control
  const aboutShouldAnimate = useSectionAnimation(aboutRef)
  const educationShouldAnimate = useSectionAnimation(educationRef)
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
    
    // Initial scroll check to set correct blur on page load
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [initialRender])

  // Add a separate effect to handle navigation clicks
  useEffect(() => {
    const handleNavigationScroll = () => {
      // Force update scroll position and disable initial render state
      setScrollY(window.scrollY)
      setInitialRender(false)
    }

    // Listen for hash changes (navigation clicks)
    window.addEventListener("hashchange", handleNavigationScroll)
    
    return () => window.removeEventListener("hashchange", handleNavigationScroll)
  }, [])

  // Calculate blur based on scroll position - with initial blur and immediate response
  const blurAmount = initialRender && scrollY === 0 ? 2 : Math.min((scrollY / 300) * 10, 10)

  // Calculate home section opacity based on scroll - fade out faster
  const homeOpacity = Math.max(1 - scrollY / 300, 0)

  // Transform values for home section - faster transition
  const homeScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const homeY = useTransform(scrollYProgress, [0, 0.15], [0, -50])

  // Animation variants for staggered animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
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
      title: "Final Degree Project: Autonomous Driving Security Framework for Openpilot",
      description:
        "Research into the security of Openpilot against adversarial examples, integrating CARLA, emphasizing the need for robustness in autonomous driving models to ensure reliability and protect human lives.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "2",
      title: "Masters Internship: Prompt Injection Detection System for LLMs",
      description: "Development of a robust system for detecting prompt injection attacks in large language models, utilizing state-of-the-art algorithms.",
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
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/Unai_Elorriaga_CV.pdf'; // Replace with your actual PDF path
              link.download = 'Unai_Elorriaga_CV.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="neon-red rounded-full download-btn pointer-events-auto" 
            style={{ padding: '0.75rem 1.5rem', lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="text-content">
              <span>Download CV</span>
              <Download className="h-4 w-4" />
            </div>
            <div className="icon-content">
              <Download className="h-4 w-4" />
            </div>
          </button>
        </header>

        {/* Main content - divided in left and right containers */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center">
          <div className="container ml-0 md:ml-12 lg:ml-24 max-w-2xl pointer-events-auto">
            <div className="mb-4">
              <h2 className="text-[#FF0040] text-lg font-medium tracking-wide">DATA ANALYSIS | CIBERSECURITY | CLOUD COMPUTING</h2>
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
                I'm Unai, a Computer Science Engineer with a passion for building secure, scalable, and intelligent systems. I hold a degree in Computer Science Engineering and have developed deep expertise in artificial intelligence, cybersecurity, and cloud computing. Beyond writing clean, maintainable code, I'm fascinated by the intersection of finance and technology, and I'm driven to leverage AI to create next-generation FinTech solutions that empower users and deliver real value.
              </p>
              <p className="text-gray-300 text-lg mb-12 leading-relaxed">
                I specialize in architecting end-to-end machine learning pipelines and secure cloud infrastructures for complex financial applications. My workflow is rooted in rigorous threat modeling, data-driven experimentation, and agile collaboration with product managers, designers, and compliance teams. Whether it's designing an anomaly-detection system for fraud prevention or optimizing trading algorithms in the cloud, I blend technical rigor with a user-centric mindset to turn innovative ideas into robust, production-ready platforms.
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

      {/* Education & Experience section */}
      <section id="education" ref={educationRef} className="relative min-h-screen flex items-center z-20 px-6 py-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={educationShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3 mb-12"
            >
              <GraduationCap className="h-6 w-6 text-[#FF0040]" />
              <h2 className="text-3xl font-bold text-white">Education & Experience</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Experience Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={educationShouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
                  <Briefcase className="h-5 w-5 text-[#FF0040] mr-3" />
                  Experience
                </h3>
                
                <div className="space-y-8">
                  <div className="about-box">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">Generative AI Security Researcher</h4>
                        <p className="text-[#FF0040] font-medium">Ikerlan S.Coop.</p>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        October 2024 - July 2025
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Research on the security of generative AI models, with an emphasis on prompt injections targeting LLMs.
                    </p>
                  </div>

                  <div className="about-box">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">Autonomous Driving Security Researcher</h4>
                        <p className="text-[#FF0040] font-medium">Ikerlan S.Coop.</p>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        February 2024 - July 2024
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Research into the security of Openpilot against adversarial examples, integrating CARLA, emphasizing the need for robustness in autonomous driving models to ensure reliability and protect human lives.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Education Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={educationShouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
                  <GraduationCap className="h-5 w-5 text-[#FF0040] mr-3" />
                  Education
                </h3>
                
                <div className="space-y-8">
                  <div className="about-box">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">Master in Data Analysis, Cybersecurity, and Cloud Computing</h4>
                        <p className="text-[#FF0040] font-medium">University of Mondragon</p>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        September 2024 - June 2025
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Dual master program focusing on advanced data analysis techniques, cybersecurity measures, and cloud computing architectures.
                    </p>
                  </div>

                  <div className="about-box">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">Bachelor’s Degree in Computer Engineering with Management and Information Systems.</h4>
                        <p className="text-[#FF0040] font-medium">University of the Basque Country</p>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        September 2019 - June 2024
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      The Bachelor’s Degree in Computer Engineering with Management and Information Systems will equip you to conceive, design, develop, and deploy IT solutions tailored to organizational needs, as well as to specify, plan, lead, and manage projects within the field of Computer Engineering.
                    </p>
                  </div>

                  {/*<div className="about-box">
                    <div className="mb-3">
                      <h4 className="text-lg font-semibold text-white">Certifications</h4>
                    </div>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#FF0040] rounded-full mr-3"></div>
                        Google UX Design Professional Certificate
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#FF0040] rounded-full mr-3"></div>
                        Adobe Certified Expert (ACE)
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#FF0040] rounded-full mr-3"></div>
                        Figma Advanced Certification
                      </div>
                    </div>
                  </div>*/}
                </div>
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
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058
                         1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149
                         3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204
                         0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265
                         -.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227
                         1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163
                         c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98
                         -.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072
                         4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948
                         .072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618
                         6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.01
                         -3.668-.072-4.948-.2-4.358-2.618-6.78-6.98-6.98-1.281
                         -.058-1.689-.072-4.948-.072z" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

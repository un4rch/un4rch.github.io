// app/project/[id]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ClientProjectDetail from "./ClientProjectDetail"

// Mock project data - in a real app, this would come from a database or API
const projectsData = [
  {
    id: "1",
    title: "Finance Dashboard Redesign",
    description:
      "A complete overhaul of a financial analytics platform, improving usability and information hierarchy.",
    fullDescription: `
      The finance dashboard redesign project was initiated to address usability issues and information overload in an existing financial analytics platform. The client, a fintech company serving over 50,000 users, needed a solution that would make complex financial data more accessible and actionable.

      My approach involved extensive user research, including interviews with 25 power users and analysis of usage patterns. This research revealed that users were struggling with information hierarchy and spending too much time searching for critical data.

      The redesign focused on:
      
      • Creating a customizable dashboard with drag-and-drop widgets
      • Implementing a clear visual hierarchy using color and typography
      • Designing intuitive data visualization components
      • Streamlining workflows for common tasks
      
      The result was a 35% reduction in time spent on routine tasks and a 28% increase in user satisfaction scores. The new dashboard also enabled users to identify financial trends more quickly, leading to better decision-making.
    `,
    image: "/placeholder.svg?height=400&width=600",
    fullImage: "/placeholder.svg?height=800&width=1200",
    tags: ["UX/UI Design", "Financial Services", "Dashboard"],
    year: "2023",
    client: "FinTech Solutions Inc.",
  },
  {
    id: "2",
    title: "Healthcare Mobile App",
    description: "A patient-centered mobile application for managing appointments and health records.",
    fullDescription: `
      The healthcare mobile app was designed to empower patients to take control of their healthcare journey. The client, a regional healthcare provider with multiple facilities, wanted to improve patient engagement and reduce administrative overhead.

      I led the UX/UI design process from concept to delivery, working closely with healthcare professionals and potential users to ensure the solution met real needs. The research phase included shadowing patients during hospital visits and conducting usability tests with diverse user groups.

      Key features of the app include:
      
      • Intuitive appointment scheduling and reminders
      • Secure access to medical records and test results
      • Medication tracking and refill requests
      • Direct messaging with healthcare providers
      • Personalized health tips and resources
      
      The app launched successfully with a 4.8/5 rating on app stores and achieved a 40% adoption rate among the client's patient population within the first three months. It also reduced appointment no-shows by 25% and decreased call center volume by 30%.
    `,
    image: "/placeholder.svg?height=400&width=600",
    fullImage: "/placeholder.svg?height=800&width=1200",
    tags: ["Mobile App", "Healthcare", "UX Research"],
    year: "2022",
    client: "Regional Health Partners",
  },
  {
    id: "3",
    title: "E-commerce Redesign",
    description: "Revamped user experience for an online retailer, resulting in 35% increase in conversion rate.",
    fullDescription: `
      This e-commerce redesign project transformed an outdated online store into a modern, conversion-focused shopping experience. The client, a specialty retailer with both brick-and-mortar and online presence, was struggling with high cart abandonment rates and poor mobile performance.

      My design process began with a comprehensive audit of the existing site, competitive analysis, and user testing to identify pain points. The data revealed significant usability issues in the product discovery and checkout processes.

      The redesign focused on:
      
      • Creating a responsive, mobile-first interface
      • Streamlining the product discovery with improved filters and search
      • Simplifying the checkout process from 5 steps to 2
      • Implementing a cohesive visual design system
      • Enhancing product visualization with 360° views and zoom functionality
      
      The results exceeded expectations with a 35% increase in conversion rate, 45% reduction in cart abandonment, and 60% increase in mobile sales. The new design also improved site performance scores, contributing to better SEO rankings.
    `,
    image: "/placeholder.svg?height=400&width=600",
    fullImage: "/placeholder.svg?height=800&width=1200",
    tags: ["E-commerce", "Conversion Optimization", "Responsive Design"],
    year: "2022",
    client: "Urban Lifestyle Goods",
  },
  {
    id: "4",
    title: "SaaS Product Design",
    description: "End-to-end design for a project management tool focused on remote teams.",
    fullDescription: `
      The SaaS product design project involved creating a comprehensive project management solution specifically tailored for remote and distributed teams. The startup client had identified a gap in the market for tools that address the unique challenges of asynchronous collaboration across time zones.

      I led the design process from initial concept through to launch, working in close collaboration with the development team and potential users. The research phase included interviews with remote team managers, surveys of distributed workers, and competitive analysis of existing tools.

      Key design elements included:
      
      • Time zone-aware scheduling and visualization
      • Asynchronous communication and feedback systems
      • Customizable workflows for different team structures
      • Integrated document collaboration
      • Comprehensive analytics and reporting
      
      The product launched successfully and quickly gained traction, acquiring over 5,000 users in the first quarter. User feedback highlighted the intuitive interface and time zone features as major differentiators from competing products. The design also received recognition at two industry awards for innovation in workplace tools.
    `,
    image: "/placeholder.svg?height=400&width=600",
    fullImage: "/placeholder.svg?height=800&width=1200",
    tags: ["SaaS", "Project Management", "Remote Work"],
    year: "2021",
    client: "RemoteSync Technologies",
  },
]

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return projectsData.map((project) => ({ id: project.id }))
}

export default function ProjectDetail({
  params,
}: {
  params: { id: string }
}) {
  const project = projectsData.find((p) => p.id === params.id)

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-white mb-6">
          Project not found
        </h1>
        <Link
          href="/"
          className="flex items-center space-x-2 text-[#FF0040] hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to home</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero section with full-width image */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={project.fullImage}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Back button + client detail */}
      <div className="container mx-auto px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-[#FF0040] hover:text-white mb-12"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to home</span>
        </Link>

        {/* ClientProjectDetail handles hooks and full rendering */}
        <ClientProjectDetail project={project} />
      </div>
    </div>
  )
}

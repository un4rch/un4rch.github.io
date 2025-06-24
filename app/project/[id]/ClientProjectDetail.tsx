// app/project/[id]/ClientProjectDetail.tsx
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ClientProjectDetail({ project }: { project: any }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // any client-only logic (e.g. analytics, additional fetching)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{project.title}</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {project.tags.map((tag: string, i: number) => (
          <span key={i} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-gray-400">
        <div><h3 className="text-white font-semibold mb-1">Client</h3>{project.client}</div>
        <div><h3 className="text-white font-semibold mb-1">Year</h3>{project.year}</div>
        <div><h3 className="text-white font-semibold mb-1">Role</h3>Lead UX/UI Designer</div>
      </div>

      <div className="prose prose-lg prose-invert max-w-none text-gray-300">
        {project.fullDescription.split("\n\n").map((para: string, idx: number) => {
          if (para.trim().startsWith("•")) {
            const items = para.split("•").filter((t) => t.trim())
            return (
              <ul key={idx} className="list-disc pl-5 mb-6">
                {items.map((text, j) => <li key={j} className="mb-2">{text.trim()}</li>)}
              </ul>
            )
          }
          return <p key={idx} className="mb-6">{para}</p>
        })}
      </div>
    </div>
  )
}
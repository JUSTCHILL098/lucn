"use client"

import { CodeXml, Server, Info } from "lucide-react"

export default function Header() {
  return (
    <div className="space-y-3 pb-6">
      {/* Title */}
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <CodeXml className="h-6 w-6 text-primary animate-pulse" />
        <span className="tracking-tight">Hianime Video API</span>
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground max-w-2xl text-sm">
        Modern, fast, and reliable anime streaming embed API designed for developers.
      </p>

      {/* Meta info */}
      <div className="flex gap-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <Server size={14} />
          API Server
        </span>

        <span className="flex items-center gap-2">
          <Info size={14} />
          Version 1.0
        </span>
      </div>
    </div>
  )
}

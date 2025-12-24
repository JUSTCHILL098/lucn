import { Sparkles, Server, Info } from "lucide-react"

export default function Header() {
  return (
    <div className="space-y-3 border-b pb-6">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <Sparkles className="text-primary" />
        Hianime Video API
      </h1>

      <p className="text-muted-foreground max-w-2xl">
        Modern, fast, and reliable anime streaming embed API designed for
        developers.
      </p>

      <div className="flex gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Server size={16} /> API Server
        </span>
        <span className="flex items-center gap-2">
          <Info size={16} /> Version 1.0
        </span>
      </div>
    </div>
  )
}

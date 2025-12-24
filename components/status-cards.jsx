import {
  Eye,
  Volume2,
  Users,
  Zap,
  TriangleAlert,
} from "lucide-react"

const stats = [
  { icon: Eye, label: "Preview Ready" },
  { icon: Volume2, label: "Audio Available" },
  { icon: Users, label: "High Usage" },
  { icon: Zap, label: "Fast Performance" },
  { icon: TriangleAlert, label: "No Major Incidents" },
]

export default function StatusCards() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="border rounded-lg p-4 flex flex-col items-center gap-2"
        >
          <s.icon size={18} />
          <span className="text-sm text-muted-foreground">
            {s.label}
          </span>
        </div>
      ))}
    </section>
  )
}

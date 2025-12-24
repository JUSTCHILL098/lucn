import { Share2, Heart, Captions } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t pt-6 flex justify-between items-center text-sm text-muted-foreground">
      <span className="flex items-center gap-2">
        <Captions size={14} />
        Hianime Video API
      </span>

      <div className="flex gap-4">
        <Share2 size={16} />
        <Heart size={16} />
      </div>
    </footer>
  )
}

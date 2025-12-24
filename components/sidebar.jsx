"use client"

import {
  BookOpen,
  CodeXml,
  Play,
  Clock3,
  Settings,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const items = [
  { label: "Documentation", icon: BookOpen },
  { label: "API Usage", icon: CodeXml },
  { label: "Embed Test", icon: Play },
  { label: "Reliability", icon: Clock3 },
  { label: "Settings", icon: Settings },
]

function SidebarContent() {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted cursor-pointer"
        >
          <item.icon size={18} />
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  )
}

export default function Sidebar() {
  return (
    <>
      <aside className="hidden md:block w-64 border-r px-4 py-6">
        <SidebarContent />
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            ☰
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}

"use client"

import { Play } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function EmbedTester() {
  return (
    <section className="space-y-6 max-w-3xl">
      <h2 className="text-xl font-semibold">Embed Tester</h2>

      <div className="grid gap-4">
        <Input placeholder="Episode ID (e.g. naruto-episode-1)" />

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sub">Sub</SelectItem>
            <SelectItem value="dub">Dub</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-3">
          <Switch />
          <span className="text-sm">Autoplay</span>
        </div>

        <Button className="gap-2 w-fit">
          <Play size={16} /> Preview
        </Button>
      </div>

      <div className="border rounded-lg h-48 flex items-center justify-center text-muted-foreground">
        iframe preview placeholder
      </div>
    </section>
  )
}

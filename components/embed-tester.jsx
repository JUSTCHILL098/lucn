"use client"

import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play } from "lucide-react"

export default function EmbedTester() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Input placeholder="Episode ID" />

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sub">Sub</SelectItem>
            <SelectItem value="dub">Dub</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Switch />
          <span className="text-sm text-muted-foreground">Autoplay</span>
        </div>

        <Button className="w-full">
          <Play className="h-4 w-4 mr-2" />
          Generate Embed
        </Button>
      </div>

      {/* Preview placeholder */}
      <div className="h-48 rounded-md bg-neutral-900 flex items-center justify-center text-sm text-neutral-500">
        iframe preview will appear here
      </div>
    </div>
  )
}

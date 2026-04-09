"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Bell, Users, Palette, Archive, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NoteCardProps {
  title?: string
  body: string
}

export function NoteCard({ title, body }: NoteCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="break-inside-avoid mb-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="border border-border rounded-sm p-4 cursor-pointer transition-[border-color] hover:border-foreground/20 select-none">
        {title && (
          <p className="text-sm font-medium mb-1.5 leading-snug">{title}</p>
        )}
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {body}
        </p>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="flex items-center gap-0.5 mt-3 -mb-1 -mx-1"
            >
              <Button variant="ghost" size="icon-sm" aria-label="Reminder">
                <Bell className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Collaborator">
                <Users className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Color">
                <Palette className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Archive">
                <Archive className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="More">
                <MoreVertical className="size-3.5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

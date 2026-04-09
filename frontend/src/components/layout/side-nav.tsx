"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { PencilLine, Bell, Tag, Archive, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { icon: PencilLine, label: "Notes" },
  { icon: Bell, label: "Reminders" },
  { icon: Tag, label: "Labels" },
  { icon: Archive, label: "Archive" },
  { icon: Trash2, label: "Trash" },
]

export function SideNav() {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState("Notes")

  return (
    <TooltipProvider>
      <motion.nav
        animate={{ width: hovered ? 200 : 56 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative flex flex-col shrink-0 overflow-hidden border-r border-border bg-background pt-2 pb-4"
      >
        {navItems.map(({ icon: Icon, label }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setActive(label)}
                className={cn(
                  "flex items-center gap-3 h-10 pl-4 pr-6 mr-2 rounded-r-full text-sm font-medium transition-colors text-left",
                  "hover:bg-accent hover:text-accent-foreground",
                  active === label
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-foreground"
                )}
              >
                <Icon className="size-5 shrink-0" />
                <motion.span
                  animate={{ opacity: hovered ? 1 : 0 }}
                  transition={{ duration: 0.12 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {label}
                </motion.span>
              </button>
            </TooltipTrigger>
            {!hovered && (
              <TooltipContent side="right">{label}</TooltipContent>
            )}
          </Tooltip>
        ))}
      </motion.nav>
    </TooltipProvider>
  )
}

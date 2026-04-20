"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

interface Step {
  id: string
  title: string
  description: string
  illustration: ReactNode
}

function SourceIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full text-foreground/70" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="30" width="100" height="140" stroke="currentColor" strokeWidth="1" />
      <path d="M130 30 L130 50 L150 50" stroke="currentColor" strokeWidth="1" />
      <path d="M130 30 L150 50" stroke="currentColor" strokeWidth="1" />
      <line x1="65" y1="70" x2="135" y2="70" stroke="currentColor" strokeWidth="1" />
      <line x1="65" y1="85" x2="125" y2="85" stroke="currentColor" strokeWidth="1" />
      <line x1="65" y1="100" x2="135" y2="100" stroke="currentColor" strokeWidth="1" />
      <line x1="65" y1="115" x2="118" y2="115" stroke="currentColor" strokeWidth="1" />
      <line x1="65" y1="130" x2="130" y2="130" stroke="currentColor" strokeWidth="1" />
      <line x1="65" y1="145" x2="100" y2="145" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <rect x="99" y="141" width="2" height="8" fill="currentColor" />
    </svg>
  )
}

function HashIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full text-foreground/70" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="75" x2="75" y2="75" stroke="currentColor" strokeWidth="1" />
      <line x1="30" y1="90" x2="70" y2="90" stroke="currentColor" strokeWidth="1" />
      <line x1="30" y1="105" x2="78" y2="105" stroke="currentColor" strokeWidth="1" />
      <line x1="30" y1="120" x2="65" y2="120" stroke="currentColor" strokeWidth="1" />
      <line x1="30" y1="135" x2="72" y2="135" stroke="currentColor" strokeWidth="1" />

      <path d="M90 105 L108 105" stroke="currentColor" strokeWidth="1" />
      <path d="M104 101 L108 105 L104 109" stroke="currentColor" strokeWidth="1" />

      <rect x="115" y="70" width="55" height="70" stroke="currentColor" strokeWidth="1" />
      <text x="119" y="86" fill="currentColor" fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="1">a3f7</text>
      <text x="119" y="100" fill="currentColor" fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="1">9c21</text>
      <text x="119" y="114" fill="currentColor" fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="1">4e8b</text>
      <text x="119" y="128" fill="currentColor" fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="1">d05f</text>
    </svg>
  )
}

function ChainIllustration() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full text-foreground/70" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="80" width="40" height="40" stroke="currentColor" strokeWidth="1" />
      <rect x="80" y="80" width="40" height="40" stroke="currentColor" strokeWidth="1" />
      <rect x="138" y="80" width="40" height="40" stroke="currentColor" strokeWidth="1" />

      <line x1="62" y1="100" x2="80" y2="100" stroke="currentColor" strokeWidth="1" />
      <line x1="120" y1="100" x2="138" y2="100" stroke="currentColor" strokeWidth="1" />

      <line x1="28" y1="92" x2="56" y2="92" stroke="currentColor" strokeWidth="1" />
      <line x1="28" y1="100" x2="50" y2="100" stroke="currentColor" strokeWidth="1" />
      <line x1="28" y1="108" x2="54" y2="108" stroke="currentColor" strokeWidth="1" />

      <line x1="144" y1="92" x2="172" y2="92" stroke="currentColor" strokeWidth="1" />
      <line x1="144" y1="100" x2="166" y2="100" stroke="currentColor" strokeWidth="1" />
      <line x1="144" y1="108" x2="170" y2="108" stroke="currentColor" strokeWidth="1" />

      <path d="M88 100 L97 108 L112 92" stroke="currentColor" strokeWidth="1.5" fill="none" />

      <line x1="100" y1="130" x2="100" y2="145" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <text x="75" y="158" fill="currentColor" fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="1">block #</text>
    </svg>
  )
}

const steps: Step[] = [
  {
    id: "01",
    title: "Bring the original content",
    description: "Paste your plaintext or drop the original file. Even a single character change will produce a different hash.",
    illustration: <SourceIllustration />,
  },
  {
    id: "02",
    title: "Instant local hashing",
    description: "The content is hashed in your browser. Sunya never sees your data; we only work with the cryptographic fingerprint.",
    illustration: <HashIllustration />,
  },
  {
    id: "03",
    title: "Direct chain verification",
    description: "We query the blockchain directly for matching commits. Trust the ledger's immutable timestamp and signature.",
    illustration: <ChainIllustration />,
  },
]

export function VerifyOnboarding({ onConnect, onManual }: { onConnect: () => void, onManual: () => void }) {
  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-6 group"
          >
            <div className="relative aspect-square overflow-hidden rounded-sm bg-muted/20 border border-border/50 group-hover:border-foreground/20 transition-colors">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                {step.illustration}
              </div>
              <div className="absolute top-4 left-4 font-mono text-[10px] text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border/50">
                {step.id}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[16px] font-medium tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onConnect}
          className="h-12 px-8 rounded-sm bg-foreground text-background text-[15px] font-medium hover:opacity-90 transition-opacity"
        >
          Connect wallet to start
        </motion.button>
        <button
          onClick={onManual}
          className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          Or verify without connecting — just pick a chain →
        </button>
      </div>
    </div>
  )
}

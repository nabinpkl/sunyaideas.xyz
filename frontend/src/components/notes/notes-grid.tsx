"use client"

import { motion } from "motion/react"
import { NoteCard } from "./note-card"

const STUB_NOTES = [
  {
    id: 1,
    title: "Weekly goals",
    body: "Ship the auth flow\nReview PRs\nWrite tests for note encryption",
  },
  {
    id: 2,
    body: "Grocery list: oat milk, eggs, sourdough, olive oil, lentils",
  },
  {
    id: 3,
    title: "Zero-knowledge proof",
    body: "Look into zk-SNARKs for note metadata privacy. The key point is the verifier learns nothing beyond the validity of the statement.",
  },
  {
    id: 4,
    body: "Call dentist Friday",
  },
  {
    id: 5,
    title: "IPFS pinning",
    body: "Use web3.storage or nft.storage. Pin encrypted note CIDs per user wallet address. Consider gateway fallbacks for availability.",
  },
  {
    id: 6,
    title: "Book recommendations",
    body: "The Remains of the Day\nThink and Grow Rich\nThe Seventh Function of Language\nThe Three-Body Problem",
  },
  {
    id: 7,
    body: "Redesign the onboarding flow — too many steps before user can create their first note.",
  },
  {
    id: 8,
    title: "Encryption",
    body: "AES-256-GCM for note content. Derive key from wallet signature using HKDF. Store encrypted blob on IPFS, keep CID in index.",
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
}

const item = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18 } },
}

interface NotesGridProps {
  viewMode: "grid" | "list"
}

export function NotesGrid({ viewMode }: NotesGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={
        viewMode === "grid"
          ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3"
          : "flex flex-col gap-2 max-w-xl mx-auto"
      }
    >
      {STUB_NOTES.map((note) => (
        <motion.div key={note.id} variants={item}>
          <NoteCard title={note.title} body={note.body} />
        </motion.div>
      ))}
    </motion.div>
  )
}

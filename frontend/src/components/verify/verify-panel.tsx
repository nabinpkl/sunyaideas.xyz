"use client"

import { useRef, useState } from "react"
import { type Hex } from "viem"
import { PayloadInput, type Payload } from "../shared/payload-input"
import { findCommits, type CommitRecord } from "@/lib/query-commits"
import { VerifyResult } from "./verify-result"

type Phase =
  | { kind: "idle" }
  | { kind: "searching"; payloadHash: Hex }
  | { kind: "result"; payloadHash: Hex; matches: CommitRecord[] }
  | { kind: "error"; message: string }

export function VerifyPanel() {
  const [payload, setPayload] = useState<Payload | null>(null)
  const [phase, setPhase] = useState<Phase>({ kind: "idle" })
  const runSeq = useRef(0)

  const resetResult = () => {
    runSeq.current++
    setPhase({ kind: "idle" })
  }

  const onPayload = (p: Payload | null) => {
    setPayload(p)
    resetResult()
  }

  const runVerify = async () => {
    if (!payload) return
    const id = ++runSeq.current
    const payloadHash = payload.hash
    setPhase({ kind: "searching", payloadHash })
    try {
      const matches = await findCommits({ payloadHash })
      if (runSeq.current !== id) return

      setPhase({ kind: "result", payloadHash, matches })
    } catch (e: unknown) {
      if (runSeq.current !== id) return
      const err = e as { shortMessage?: string; message?: string }
      setPhase({
        kind: "error",
        message: err?.shortMessage ?? err?.message ?? "failed",
      })
    }
  }

  const busy = phase.kind === "searching"
  const payloadHash = payload?.hash ?? null
  const canSubmit = !!payload && !busy

  return (
    <section className="flex flex-col gap-6 py-10 max-w-2xl mx-auto">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-[22px] font-medium tracking-tight">
          Verify a commit
        </h1>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          Re-enter the plaintext or drop the file that was committed. The
          content is hashed locally and Sepolia is queried directly — no
          server, no upload. Any matching commits are returned with the
          identity that signed them.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <PayloadInput payload={payload} onPayload={onPayload} disabled={busy} />

        {payloadHash && (
          <div className="flex items-baseline gap-3 text-[11px] min-w-0">
            <span className="text-muted-foreground font-mono tracking-wide shrink-0">
              keccak256
            </span>
            <span className="font-mono text-foreground/80 truncate">
              {payloadHash}
            </span>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={runVerify}
            disabled={!canSubmit}
            className="h-9 px-4 rounded-sm bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {phase.kind === "searching" ? "Checking Sepolia…" : "Verify"}
          </button>
          {phase.kind === "error" && (
            <span className="text-[12px] text-destructive">{phase.message}</span>
          )}
        </div>

        {phase.kind === "result" && (
          <VerifyResult
            payloadHash={phase.payloadHash}
            matches={phase.matches}
          />
        )}
      </div>
    </section>
  )
}

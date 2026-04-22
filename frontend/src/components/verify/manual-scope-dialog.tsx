"use client"

import { useState } from "react"
import { isAddress, type Address } from "viem"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  chainShortName,
  supportedChains,
  type SupportedChainId,
} from "@/lib/chains"

export interface ManualScope {
  chainId: SupportedChainId
  identity: Address | null
}

interface ManualScopeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial?: ManualScope | null
  onConfirm: (scope: ManualScope) => void
}

export function ManualScopeDialog({
  open,
  onOpenChange,
  initial,
  onConfirm,
}: ManualScopeDialogProps) {
  const [chainId, setChainId] = useState<SupportedChainId>(
    initial?.chainId ?? (supportedChains[0].id as SupportedChainId),
  )
  const [address, setAddress] = useState(initial?.identity ?? "")

  const trimmed = address.trim()
  const addressError =
    trimmed.length > 0 && !isAddress(trimmed) ? "Not a valid address." : null
  const canSubmit = !addressError

  const submit = () => {
    if (!canSubmit) return
    onConfirm({
      chainId,
      identity: trimmed.length > 0 ? (trimmed as Address) : null,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify without a wallet</DialogTitle>
          <DialogDescription>
            Pick a chain to query directly over public RPC. Optionally narrow
            results to a specific committer address. No wallet is needed the
            payload is hashed locally and the chain is read, nothing is sent.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 mt-2">
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium text-foreground">
              Chain
            </label>
            <div className="flex flex-col gap-1">
              {supportedChains.map((c) => {
                const id = c.id as SupportedChainId
                const selected = chainId === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setChainId(id)}
                    className={
                      "flex items-center justify-between h-10 px-3 rounded-sm border text-[14px] text-left transition-colors " +
                      (selected
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:bg-muted/40")
                    }
                  >
                    <span>{chainShortName(id)}</span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {id}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="manual-address"
              className="text-[12px] font-medium text-foreground"
            >
              Committer address{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <input
              id="manual-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x…"
              spellCheck={false}
              autoComplete="off"
              className="h-10 px-3 rounded-sm border border-border bg-transparent font-mono text-[13px] outline-none focus-visible:border-foreground placeholder:text-muted-foreground/60"
            />
            {addressError ? (
              <span className="text-[12px] text-destructive">
                {addressError}
              </span>
            ) : (
              <span className="text-[11px] text-muted-foreground">
                Leave blank to search all committers on the chosen chain.
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-9 px-4 rounded-sm text-[13px] text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              className="h-9 px-4 rounded-sm bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

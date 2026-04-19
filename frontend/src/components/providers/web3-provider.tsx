'use client'

import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  wagmiAdapter,
  wagmiConfig,
  projectId,
  networks,
  defaultNetwork,
} from '@/lib/web3-config'
import type { State } from 'wagmi'

const queryClient = new QueryClient()

// Reown AppKit's Pulse telemetry fires at init independently of
// features.analytics (no public flag disables it). We drop those requests
// before they leave the device so the "no data leaves your device" promise
// is enforced at the code level, not by the visitor's ad blocker.
if (typeof window !== 'undefined') {
  const isTelemetry = (url: string) => url.includes('pulse.walletconnect.org')

  const origFetch = window.fetch.bind(window)
  window.fetch = (input, init) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.href
          : input.url
    if (isTelemetry(url)) {
      return Promise.resolve(new Response(null, { status: 204 }))
    }
    return origFetch(input, init)
  }

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const origBeacon = navigator.sendBeacon.bind(navigator)
    navigator.sendBeacon = (url, data) => {
      const href = typeof url === 'string' ? url : url.toString()
      if (isTelemetry(href)) return true
      return origBeacon(url, data)
    }
  }
}

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  defaultNetwork,
  enableCoinbase: false,
  features: {
    analytics: false,
    swaps: false,
    onramp: false,
    send: false,
    history: false,
    email: false,
    socials: false,
    walletFeaturesOrder: [],
  },
})


export function Web3Provider({
  children,
  initialState,
}: {
  children: React.ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

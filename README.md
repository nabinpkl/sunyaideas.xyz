# Sunya Ideas

A product lab exploring one question: can a cryptographic commitment
registry for idea-priority evidence be delivered to users honestly,
without operating any server, and without hiding what's happening
underneath?

- [**AGENTS.md**](AGENTS.md)  product thesis, scope, hard constraints
- [**smart-contract/README-AUDIT.md**](smart-contract/README-AUDIT.md)  security properties, tests, accepted trade-offs

## What this is

A user has an idea. They commit a cryptographic hash of that idea to a
public blockchain under their own key. The commit is immutable,
timestamped by the chain, and signed by the user. Later, if the idea
becomes contested  in a dispute, a patent proceeding, a priority
argument, an academic scoop  the user can reveal the original text and
prove it hashes to the commit recorded on chain at that time.

Sunya's promise is narrow and strong: **if you commit an idea on Sunya,
at least one piece of your evidence is secured in a form that cannot
be faked or backdated.** The rest of your case is your own.

## What Sunya operates

Two things, and only two:

1. A deployed smart contract (`CommitRegistry`, below)
2. Static frontend files served from a CDN

No servers, no APIs, no databases, no user accounts, no relayers, no
indexers. The user brings their own wallet, signs their own transactions,
and pays their own gas. Sunya adds nothing between the user and the
chain.

## Deployment

| Network | Address | Deploy Block | Deploy Tx | Source Commit |
| --- | --- | --- | --- | --- |
| Base mainnet | `0x3F198BfE7F5CAc7d8825e008e9122e22E143C8F7` | 44889582 | `0xc628b3cdd9469093e5a7b66084c89e1e4ab9d4cfa660cb76bb79d2b9d346f009` | `b5e13b23` |

The contract is non-upgradable. A material change means a fresh
deployment at a new address with a new EIP-712 domain  not a refactor.

## How a commit works

1. User connects a standard EVM wallet
2. User types plaintext locally
3. Client computes `keccak256(plaintext)` and builds an EIP-712
   `Commit(title, description, identity, payloadHash)` intent
4. Wallet signs; wallet submits the transaction directly to the chain
5. Contract verifies the signature (ECDSA first, ERC-1271 fallback)
6. Contract emits `Committed(identity, payloadHash, timestamp)`  the
   event log **is** the database

Plaintext never leaves the device. The contract stores nothing; all
state lives in the event log.

## How a verify works

1. User pastes plaintext + identity + block number
2. Client queries the chain via public RPC
3. Client confirms `keccak256(plaintext)` matches the `payloadHash` in
   the earliest `Committed` event for that identity at that block
4. Result displayed  anyone can run this with no trust in Sunya

## What v0 explicitly does not include

- Passkey-based identity
- Multi-key identity / key sets, rotation, revocation, recovery
- Local storage of plaintexts (encrypted or otherwise)
- Commit history view
- Rich content types (markdown, files, attachments)
- Shareable proof artifacts or verify URLs
- Gasless onboarding / paymaster / ERC-4337
- Multi-device access

These are deferred to future layers. They will be additive  the v0
contract is treated as fixed for the lifetime of v0.

## Hard constraints

- No Sunya-operated dynamic HTTP endpoints, ever
- No owner address, no `msg.sender` authorization  signatures are the
  only auth
- Contract is not upgradable
- Plaintext never leaves the user's device unless the user chooses to
  share it
- User owns their keys and submits their own transactions

Full rationale in [AGENTS.md](AGENTS.md).

## Repository layout

```
/
├── AGENTS.md              # product thesis, scope, hard constraints
├── frontend/              # Next.js 16 client (commit + verify pages)
├── smart-contract/        # Foundry project
│   ├── src/
│   │   └── CommitRegistry.sol
│   ├── test/
│   │   └── CommitRegistry.t.sol
│   └── README-AUDIT.md    # audit notes: OZ pin, property→test map, trade-offs
└── docs/                  # background reading on crypto primitives
```

## Stack

**Contract**

- Solidity `^0.8.20`
- OpenZeppelin Contracts `v5.6.1` (EIP-712, ECDSA, SignatureChecker)
- Foundry for build + test

**Frontend**

- Next.js 16+ (App Router)
- Tailwind CSS v4
- TanStack Query, Zustand
- viem for chain interaction
- shadcn/ui
- motion/react
- pnpm

## Development

**Contract**

```shell
cd smart-contract
forge build
forge test -vv
```

See [smart-contract/README-AUDIT.md](smart-contract/README-AUDIT.md)
for the mapping of tests to documented security properties.

**Frontend**

```shell
cd frontend
pnpm install
pnpm dev
```

## Not a business

The lab studies the primitive; it does not monetize it.

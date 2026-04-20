
The math is clean. The experience is a mess.

Question I was chasing: How frictionless can a decentralized tool get before it stops being decentralized?

Built [sunyaideas.xyz](https://www.sunyaideas.xyz/how-it-works) to find out.

It solves a specific kind of anxiety. You have an idea. You want to prove you had it first. You don't want to tell anyone what it is yet.

**How it works:**
* You type the idea in your browser. It hashes locally.
* Your wallet signs the hash.
* Signature lands on a public chain with a timestamp.
* If someone contests it later, you reveal the text.
* Anyone can re-hash it and confirm it matches what you committed months ago.

Courts already accept this kind of thing as evidence:
* [Huatai Yimei v. Shenzhen Daotong (2018)](https://www.gklaw.com/Insights/Using-Blockchain-in-the-Admission-of-Evidence-Chinese-Court-Leads-the-Way.htm)
* [United States v. Sterlingov (2024)](https://assetforfeiturelaw.us/wp-content/uploads/2024/03/United-States-v-Sterlingov.pdf)

No Sunya server. No database. No accounts. The plaintext never leaves your machine. If I deleted the site tomorrow, your proof still sits on chain.

That part was easy.

**Then I walked the flow as a normal person. Brutal.**

To save one idea you have to:
* Learn what a seed phrase is and why losing it ruins you
* Open an exchange, sit through KYC
* Pick a chain. Base? Mainnet? Who knows
* Buy crypto
* Stare at a Sign Message popup full of hex and click yes anyway
* Hope gas doesn't spike mid-click

We built incredible engines. We are still asking people to assemble the car in the driveway before they can drive to the store.

Making this simple is harder than making it work. The community has been grinding on this for a decade and every shortcut I found in 2026 costs something. A paymaster. An MPC server. A passkey cloud. Friction does not disappear. It just moves somewhere else.

Not bashing the tech. Building alongside it.

Wrote up every tradeoff I ran into in the article below.

#Blockchain #Solidity #UX #Web3
import React from "react"
import dollar from "@public/assets/dollar.png"
import chains from "@public/assets/chains.png"
import contract from "@public/assets/contract.png"
import vault from "@public/assets/vault.png"
import { FeatureCard } from "@components/landing/FeatureCard"

export function Features() {
  return (
    <section className="container mx-auto grid gap-y-12 py-12">
      <FeatureCard
        header="Business Funding"
        description="Invesify allows businesses the opportunity to apply for funding, the carefully vetted DAO gets to scrutinize business proposals and pitch before accepting them into the pool for them to generate funds, this breaks the barrier and lets any business no matter what scale to secure funds"
        src={dollar}
        alt={"dollar-bill"}
      />
      <FeatureCard
        header="Investment Security &amp; Variety"
        description="Investors on investify can apply to fund any business of their choice from the pool at any point in time, investors can invest money at any time and either get a percentage return or equity, in accordance to how the businesses wants it. The DAO also provides security in funds for investors inorder to limit losses"
        src={chains}
        alt={"chains"}
      />
      <FeatureCard
        header="Transparency &amp; Accountability"
        description="The carefully vetted DAO are saddled with the responsibility of making the right decision and are also reliable the financial flow is open for all investors to query. The money contributed by invevestors are not released once but would rather be broken down into bits in order to ensure all terms and conditions are followed through and also to monitor operations and minimize loss"
        src={contract}
        alt={"contract"}
      />
      <FeatureCard
        header="Open Sourced"
        description="Everything about us is open sourced, we believe in the power of decentralization. All decison made by the DAO would be backed with a thorough defence as to why such decision is made and there is no central authority."
        src={vault}
        alt={"vault"}
      />
    </section>
  )
}

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
        description="Quickfund allows businesses the opportunity to fund their project rapidly and with a global investor community. The DAO community will vote and scrutinize business proposals before accepting them into the whitelisted project pool.  The community will have a vested interest in only listing the most promising projects and leaving out scams and projects with no sustenance."
        src={dollar}
        alt={"dollar-bill"}
      />
      <FeatureCard
        header="Investment Security &amp; Variety"
        description="Investors on Quickfund will be able to choose to fund any business of their choice from the whitelisted pool at anytime. Investors will receive equity in the funded project, based on the details listed in the business proposal. The Quickfund DAO also provides security in funds, for investors in order to limit losses by having community-vetted projects."
        src={chains}
        alt={"chains"}
      />
      <FeatureCard
        header="Transparency &amp; Accountability"
        description="The Quickfund DAO has the responsibility of vetting the business proposals and ensuring the financial plan is legitimate and is capable of producing returns for the investors and the DAO overall. The money contributed by invevestors to the sucessfully funded project are not released all at once, but will be released in consistent tranches to ensure future financial viability of the project."
        src={contract}
        alt={"contract"}
      />
      <FeatureCard
        header="Open Source"
        description="Quickfund believes in the power of decentralazation and transpernancy. Our DAO infrastructure is completely open-source, allowing insight into all proceses. Every decison made by the Quickfund DAO will be have a proposal to be voted on by the community before any changes are made to the protocol."
        src={vault}
        alt={"vault"}
      />
    </section>
  )
}

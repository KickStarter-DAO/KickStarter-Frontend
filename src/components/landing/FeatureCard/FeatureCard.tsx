import { StaticImageData } from "next/image"
import React from "react"

type FeatureCardProps = {
  header: string
  description: string
  src: StaticImageData
  alt: string
}

export function FeatureCard({
  header,
  description,
  src,
  alt,
}: FeatureCardProps) {
  return (
    <div className="flex justify-between min-h-48 max-w-6xl">
      <div className="flex-1">
        <h2 className="font-bold mb-8 font-bold text-2xl text-[#000000 leading-mid]">
          {header}
        </h2>
        <p className="w-3/4 text-[#495371] leading-mid">{description}</p>
      </div>

      <div className="flex-none self-center p-4 w-32 h-32 flex justify-center">
        <img src={src.src} alt={alt} />
      </div>
    </div>
  )
}

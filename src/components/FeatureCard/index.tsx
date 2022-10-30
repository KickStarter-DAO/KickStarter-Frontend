import { StaticImageData } from "next/image";
import React from "react";

type cardProps = {
  header: string;
  description: string;
  src: StaticImageData;
  alt: string;
};

function FeatureCard({ header, description, src, alt }: cardProps) {
  return (
    <div className="flex justify-between space-x-48 items-center">
      <div>
        <h2 className="font-bold my-8 font-bold text-2xl text-[#000000 leading-mid]">{header}</h2>
        <p className="w-3/4 text-[#495371] leading-mid">{description}</p>
      </div>

      <div>
        <img src={src.src} alt={alt} />
      </div>
    </div>
  );
}

export default FeatureCard;

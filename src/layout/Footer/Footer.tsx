import Link from "next/link"
import React from "react"

export const footerLink = [
  {
    name: "Terms & Condition",
    value: "#",
  },
  {
    name: "Contact Us",
    value: "#",
  },
  {
    name: "Blog",
    value: "#",
  },
]

export function Footer() {
  return (
    <footer className="bg-[#F4F6FE]">
      <div className="container mx-auto flex justify-between py-8">
        <div>
          <p className="text-[#495371]">Copyright 2022</p>
          <p className="text-[#495371] font-bold">QuickfundDao</p>
        </div>
        <ul className="flex items-center space-x-12">
          {footerLink.map((item, idx) => {
            return (
              <li className="text-[#495371]" key={item.name}>
                <Link href={item.value}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}

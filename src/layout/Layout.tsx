import React, { ReactNode } from "react"
import { Footer } from "@layout/Footer"
import { Header } from "@layout/Header"

type LayoutProps = {
  children?: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="mb-32">{children}</main>
      <Footer />
    </>
  )
}

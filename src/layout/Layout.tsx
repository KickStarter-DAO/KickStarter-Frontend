import React, { ReactNode } from "react"
import { Footer } from "@layout/Footer"
import { Header } from "@layout/Header"

type LayoutProps = {
  children?: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

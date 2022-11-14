import React, { ReactNode } from "react"
import { Footer } from "@layout/Footer"
import { Header } from "@layout/Header"
import {Toaster} from "react-hot-toast"

type LayoutProps = {
  children?: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster/>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

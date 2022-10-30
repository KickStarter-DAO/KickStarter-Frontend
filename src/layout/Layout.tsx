import Footer from "@components/Footer/footer";
import { Header } from "@components/Header";
import React, { ReactNode } from "react";

type childrenProps = {
  children?: ReactNode;
};


function Layout({ children }: childrenProps) {
  return (
    <>
      <Header />
      <main className="mb-32">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;

import Footer from "@components/Footer/footer";
import { Header } from "@components/Header";
import React, { ReactNode } from "react";

type childrenProps = {
  children?: ReactNode;
};
type User = {
  name: string;
};

function Layout({ children }: childrenProps) {
  const [user, setUser] = React.useState<User>();
  return (
    <>
      <Header
        user={user}
        onLogin={() => setUser({ name: "Jane Doe" })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: "Jane Doe" })}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;

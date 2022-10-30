import React from "react";
import type { NextPage } from "next";
import MetaData from "@components/MetaData";
import Layout from "@layout/Layout";
import Hero from "./landing/hero";
import Features from "./landing/features";

const Home: NextPage = () => {
  return (
    <Layout>
      <MetaData />
      <Hero/>
      <Features/>
    </Layout>
  );
};

export default Home;

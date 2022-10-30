import React from "react";
import type { NextPage } from "next";
import MetaData from "@components/MetaData";
import Image from "next/image";
import styles from "@styles/Home.module.css";
import { Header } from "@components/Header";
import Landing from "./landing";
import Layout from "../../layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <MetaData />
      <Landing />
    </Layout>
  );
};

export default Home;

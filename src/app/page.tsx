"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Simulator from "./components/ComponentSimulator";
import CPUProduct from "./components/CPUProduct";

export default function Home() {
  return (
    <div>
      <Header />
      <Simulator />
      <CPUProduct />
      <Footer />
    </div>
  );
}
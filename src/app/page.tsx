"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Simulator from "./components/ComponentSimulator";

export default function Home() {
  return (
    <div>
      <Header />
      <Simulator />
      <Footer />
    </div>
  );
}
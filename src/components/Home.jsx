import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import HuntersMap from "./HuntersMap";
import HuntersList from "./HuntersList";
import About from "./About";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <HuntersMap />
        <HuntersList />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

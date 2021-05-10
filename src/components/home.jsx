import React from "react";
import "./homee.css";

export default function Home() {
  return (
    <main>
      <Hero />
      <Text />
    </main>
  );
}


function Text() {
  return (
    <article className="part1">
      <div className="header1">
            <p>
                Welcome to the happiness rankings of the world. I hope discover something that you've never seen.
            </p>
      </div>
    </article>
  );
}


function Hero(){
    return (
    <section className="hero">
    <div className="hContent">
        <h1 className="hTitle">World Happiness Rankings</h1>
    </div>
    </section>
    );
}
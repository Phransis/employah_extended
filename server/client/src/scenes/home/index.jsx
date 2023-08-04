import React from "react";
import Landing from "./Landing";
import Info from "./Info";
import Operation from "./Operation";
import FAQ from "./FAQ";
import Signup from "./Signup";
import Download from "./Download";

function Home() {
  return (
    <div className="container-fluid p-0">
      {/* <div className="bg-img"></div> */}
      <Landing />
      <Info />
      <Operation />
      <Download />
      <FAQ />
      <Signup />
    </div>
  );
}

export default Home;

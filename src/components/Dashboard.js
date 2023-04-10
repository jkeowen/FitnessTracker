import React from "react";
import Graph from "./Graph";
import HightlightsBox from "./HightlightsBox";
import InfoBox from "./InfoBox";

const Dashboard = () =>{

  return(
    <div id="dashboard" className="d-flex flex-row m-3">
      <InfoBox />
      <div className="d-flex flex-column align-items-center ml-2">
      {/* <HightlightsBox />
      <Graph /> */}
      </div>
    </div>
  )
}

export default Dashboard;
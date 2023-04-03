import React, { useState, useEffect } from "react";
import fetchAllRecords from "../AjaxHelpers/Records";


const HightlightsBox = () =>{

  const [ allRecords, setAllRecords ] = useState([]);
  useEffect(()=>{
    fetchAllRecords(setAllRecords);
  },[])

  return(
    <div id="hightlights-box" className="seagreen-bg mb-2 rounded">
      <h3></h3>
      
    </div>
  )
};

export default HightlightsBox;


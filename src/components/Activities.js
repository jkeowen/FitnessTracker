import React, {useState, useEffect} from "react";
import InfoBox from "./InfoBox";
// import CreateNew from "./CreateNew";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetchAllActivities from "../AjaxHelpers/Activities";
// import fetchAllRoutines from "../AjaxHelpers/Routines"
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faDumbbell, faMagnifyingGlass, faHeartPulse, faHandsHoldingCircle, faPersonHarassing } from "@fortawesome/free-solid-svg-icons";
// import Dropdown  from "react-bootstrap/Dropdown";
// import Button from "react-bootstrap/Button";
// import Search from "./Search";


const Activities = () => {

  const [ activities, setActivities ] = useState([]);
  const [selected, setSelected] = useState([]);
  useEffect(()=>{
    fetchAllActivities(setActivities)
    setSelected(activities)
  }, [])

  return(
    <InfoBox activities={activities} setActivities={setActivities} selected={selected} setSelected={setSelected} />
  )

}

export default Activities;
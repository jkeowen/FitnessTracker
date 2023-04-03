import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetchAllActivities from "../AjaxHelpers/Activities";
import fetchAllRoutines from "../AjaxHelpers/Routines";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDumbbell, faMagnifyingGlass, faHeartPulse, faHandsHoldingCircle, faPersonHarassing } from "@fortawesome/free-solid-svg-icons";

const InfoBox = () =>{

  library.add(faMagnifyingGlass,faDumbbell, faHandsHoldingCircle, faHeartPulse, faPersonHarassing)
  const [ allActivites, setAllActivities ] = useState([]);
  const [selected, setSelected] = useState(allActivites);

  useEffect(()=>{
    fetchAllActivities(setAllActivities);
    fetchAllRoutines(setAllRoutines);
  },[])
  console.log(allRoutines)

  return(
    <div id="info-box" >
      <div className="lavander-bg rounded">
        <div className="border border-dark rounded">
          <span onClick={()=> setSelected(allActivites)}>Activities</span>
          <span>Routines</span>
        </div>
        <form className="mb-2">
          <input placeholder="search"/>
          <FontAwesomeIcon icon={faMagnifyingGlass} /></form>
         { 
          selected.map((selection, index)=>{
            return(
              <div key={index} className="border border-dark rounded p-2 mb-2">
                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <h5 className="border-bottom border-3 border-dark text-center">{selection.name}</h5>
                    <div >Description: {selection.description}</div>
                  </div>
                  <div className="border-left border-dark d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon={selection.icon}/>
                    <p>{selection.type}</p>
                    
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default InfoBox;
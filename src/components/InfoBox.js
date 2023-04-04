import React, {useState, useEffect} from "react";
import CreateNew from "./CreateNew";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetchAllActivities from "../AjaxHelpers/Activities";
import fetchAllRoutines from "../AjaxHelpers/Routines"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDumbbell, faMagnifyingGlass, faHeartPulse, faHandsHoldingCircle, faPersonHarassing } from "@fortawesome/free-solid-svg-icons";

const InfoBox = () =>{

  library.add(faMagnifyingGlass,faDumbbell, faHandsHoldingCircle, faHeartPulse, faPersonHarassing)
  const [ activities, setActivities ] = useState([]);
  const [ routines, setRoutines] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(()=>{
    fetchAllRoutines(setRoutines);
    fetchAllActivities(setActivities);
  },[])

  useEffect(()=>{
    setSelected(routines)
  }, [routines])
  useEffect(()=>{
    setSelected(activities);
  }, [activities])

 
  return(
    <div id="info-box" >
    
      <div className="lavander-bg rounded">
        <div className="d-flex justify-content-around border border-dark rounded mb-2">
          <div onClick={()=> setSelected(activities)}>Activities</div>
          <div onClick={()=> setSelected(routines)} >Routines</div>
        </div>
        <form className="mb-2 bg-light border border-dark rounded p-1">
          <input className="no-border rounded bg-light" placeholder="search"/>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </form>
        <CreateNew  activities={activities} setActivities={setActivities} routines={routines} setRoutines={setRoutines} selected={selected} 
          setSelected={setSelected}/>
         { 
          selected.map((selection, index)=>{
            return(
              <div key={index} className=" rounded p-2 mb-2">
                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <h5 className="border-bottom border-3 border-dark text-center">{selection.name}</h5>
                    <div >Description: {selection.description}</div>
                    {
                      selected === activities ? 
                        <div>
                          <div>Equipment: {selection.equipment}</div>
                          <div>Reps: {selection.reps}</div>
                          <div>Sets: {selection.reps}</div>
                          <div>Instructions: {selection.instructions} </div>
                          
                        </div> : null
                    }
                  </div>
                  <div className="border-left border-dark d-flex flex-column justify-content-around align-items-center p-2">
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
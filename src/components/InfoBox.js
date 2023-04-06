import React, {useState, useEffect} from "react";
import { useJwt } from "react-jwt";
import CreateNew from "./CreateNew";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetchAllActivities from "../AjaxHelpers/Activities";
import fetchAllRoutines from "../AjaxHelpers/Routines"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDumbbell, faMagnifyingGlass, faHeartPulse, faHandsHoldingCircle, faPersonHarassing } from "@fortawesome/free-solid-svg-icons";
import Dropdown  from "react-bootstrap/Dropdown";
import Search from "./Search";

const InfoBox = () =>{

  library.add(faMagnifyingGlass,faDumbbell, faHandsHoldingCircle, faHeartPulse, faPersonHarassing)
  const [ activities, setActivities ] = useState([]);
  const [ routines, setRoutines] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("Search By")

  const {decoded} = useJwt(window.localStorage.getItem('token'));

  useEffect(()=>{
    const routines = fetchAllRoutines(setRoutines);
    setSelected(routines);
    fetchAllActivities(setActivities);
    setSearchTerm("Search By")
  },[])

  useEffect(()=>{
    setSelected(activities);
  }, [activities])

  useEffect(()=>{
    setSelected(routines)
  }, [routines]);

 console.log(searchTerm)
  return(
    <div id="info-box" >
    
      <div className="lavander-bg rounded">
        <div className="d-flex justify-content-around border border-dark rounded mb-2">
          <div onClick={()=> setSelected(activities)}>Activities</div>
          <div onClick={()=> setSelected(routines)} >Routines</div>
        </div>
       < Search setSearchInput = {setSearchInput} selected = {selected} searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
        <CreateNew  activities={activities} setActivities={setActivities} routines={routines} setRoutines={setRoutines} selected={selected} 
          setSelected={setSelected}/>
         { 
          selected.filter((selection) => {
            if(!searchInput) {
              return selection;
            } else if (selection[searchTerm].toLowerCase().startsWith(searchInput.toLowerCase())){
              return selection
            }            
          }).map((selection, index)=>{
            return(
              <div key={index} className=" rounded p-2 mb-2">
                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <h5 className="border-bottom border-3 border-dark text-center">{selection.name}</h5>
                    <div >Description: {selection.description}</div>
                    {
                      selection.creator_id !== 0  ? <div>created by: {selection.creator}</div>:
                      null
                    }
                    
                    {
                      selected === activities ? 
                        <div>
                          <div>Equipment: {selection.equipment}</div>
                          <div>Reps: {selection.reps}</div>
                          <div>Sets: {selection.reps}</div>
                          <div>Instructions: {selection.instructions} </div>
                          
                        </div> : 
                        <div>
                          

                          
                          {
                            selection.activities ?
                        <Dropdown>
                          <Dropdown.Toggle>
                            Activities
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                          {
                            selection.activities.map((activity, index) =>{
                              return(
                                <Dropdown.Item key={index}>{activity}</Dropdown.Item>
                              )
                            })
                          }
                          </Dropdown.Menu>
                        </Dropdown>
                        :null
                      }
                        </div>
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
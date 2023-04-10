import React, {useState, useEffect} from "react";
import CreateNew from "./CreateNew";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetchAllActivities from "../AjaxHelpers/Activities";
import fetchAllRoutines, {deleteRoutine} from "../AjaxHelpers/Routines";
import { editRoutine } from "../AjaxHelpers/Routines";
import { getCurrentUser } from "../AjaxHelpers/Users";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDumbbell, faMagnifyingGlass, faHeartPulse, faHandsHoldingCircle, faPersonHarassing } from "@fortawesome/free-solid-svg-icons";
import Dropdown  from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import Search from "./Search";

const InfoBox = () =>{

  library.add(faMagnifyingGlass,faDumbbell, faHandsHoldingCircle, faHeartPulse, faPersonHarassing)
  const [ activities, setActivities ] = useState([]);
  const [ routines, setRoutines] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("Search By");
  const [ currentEditing, setCurrentEditing ] = useState({});
  const [currentUser, setCurrentUser ] = useState({});
  const [ editNameInput, setEditNameInput ] = useState('');
  const [ editDescriptionInput, setEditDescriptionInput ] = useState('');
  const [ activeBold, setActiveBold ] = useState('');
  const [ routinesBold, setRoutinesBold ] = useState('');


  useEffect(()=>{
    const routines = fetchAllRoutines(setRoutines);
    setSelected(routines);
    fetchAllActivities(setActivities);
    setSearchTerm("Search By")
    getCurrentUser(setCurrentUser);
  },[])
  useEffect(()=>{
    setSelected(activities);
  }, [activities])

  useEffect(()=>{
    setSelected(routines)
  }, [routines]);

  useEffect(()=>{
    if(selected === routines){
      setActiveBold('')
      setRoutinesBold('font-weight-bold')
    }
    else if(selected === activities){
      setActiveBold('font-weight-bold');
      setRoutinesBold('');
    }
  }, [selected])

  const handleEdit = (event) =>{
    if(event.target.placeholder === "edit name") setEditNameInput(event.target.value);
    else if(event.target.placeholder === "edit description") setEditDescriptionInput(event.target.value);
    else  setEditCountInput(event.target.value)
  }
  const handleCancel = () =>{
    setCurrentEditing({});
    setEditNameInput('');
    setEditDescriptionInput('');
  }

  const handleSubmitEdit = (routineId) =>{
    editRoutine(routineId, editNameInput, editDescriptionInput, );
    setCurrentEditing({})
  }

  const handleEdited = (current) =>{
    setCurrentEditing(current);
    setEditNameInput(current.name);
    setEditDescriptionInput(current.description);
  }

  const deleteHandler = (id) =>{
  deleteRoutine(id, routines, setRoutines);    
  }


  return(
    <div id="info-box" className="info-box-height">
    
      <div className="lavander-bg rounded vh-50">
        <div className="d-flex justify-content-around border border-dark rounded mb-2">
          <div className={activeBold} onClick={()=> setSelected(activities)}>Activities</div>
          <div className={routinesBold} onClick={()=> setSelected(routines)} >Routines</div>
        </div>
       < Search setSearchInput = {setSearchInput} selected = {selected} searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
        {
          window.localStorage.getItem('token') ? 
          <CreateNew currentUser={currentUser} activities={activities} setActivities={setActivities} routines={routines} setRoutines={setRoutines} selected={selected} 
          setSelected={setSelected}/> : null
        }
       <div className="scroll">
         { 
          selected.filter((selected)=> selected.is_active === true).filter((selection) => {
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
                      selection.creator_id !== 0  ?
                      <div>  
                        <div>created by: {selection.creator}</div>
                      </div>:
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
                        <Dropdown autoClose="outside">
                          <Dropdown.Toggle>
                            Activities
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                          {
                            selection.activities.map((activity, index) =>{
                              return(
                                <Dropdown.Item key={index}>
                                  {Object.keys(activity)[0]} x {Object.values(activity)[0]}
                                  </Dropdown.Item>
                              )
                            })
                          }
                          </Dropdown.Menu>
                        </Dropdown>
                        :null
                      } 

                        {
                         currentUser && selection.creator_id === currentUser.id ?
                          <div>  
                       {  
                          currentEditing === selection && selection.name ? 
                            <Form  >
                              <input  placeholder="edit name" value={editNameInput} onChange={handleEdit}/>
                              <input placeholder="edit description" value={editDescriptionInput} onChange={handleEdit} />
                              <Button type="sumbit" onClick={()=>handleSubmitEdit(selection.id)} >Submit</Button>
                              <Button variant="warning" onClick={handleCancel} > Cancel</Button>
                            </Form> :
                            <Button onClick={()=>handleEdited(selection)}>Edit</Button>           
                        }
                          <Button onClick={()=>deleteHandler(selection.id)} variant="warning" >Delete</Button>

                          </div>: null
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
    </div>
  )
};

export default InfoBox;
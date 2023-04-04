import React, { useState } from "react";
import { createNewActivity } from "../AjaxHelpers/Activities";
import { createNewRoutine } from "../AjaxHelpers/Routines";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const CreateNew = ({activities, 
                    setActivities,
                    routines,
                    setRoutines,
                    selected,
                    setSelected}) =>{

  const [ show, setShow ] = useState(false);
  
  const [ nameInput, setNameInput ] = useState('');
  const [ instructionsInput, setInstructionsInput ] = useState('');
  const [ repsInput, setRepsInput ] = useState('');
  const [ setsInput, setSetsInput ] = useState('');
  const [ equipmentInput, setEquipmentInput ] = useState('');
  const [ typeInput, setTypeInput ] = useState('Select Type');
  const [typeIdInput, setTypeIdInput ] = useState('');
  const [ descriptionInput, setDescriptionInput ] = useState('');
  const [ creatorIdInput, setCreatorIdInput ] = useState('');
  const [ isPublicInput, setIsPublicInput ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleSubmit = (event) =>{
  //   event.preventDefault();
    
  // } 

  const handleAdd = () =>{
    if(selected === activities){
      if(nameInput !== '' && instructionsInput !== '' && repsInput !== '' && setsInput !== '' && equipmentInput !== ''
        && typeIdInput !== '' && descriptionInput !== ''){
      createNewActivity(nameInput, instructionsInput, repsInput, setsInput,
                  equipmentInput, typeIdInput, descriptionInput, setActivities, activities);
                  handleClose();
      }
      else setErrorMessage('Please finish filling out form')
      }
      else if(selected === routines) {
        if(creatorIdInput !== '' && nameInput !== '' && descriptionInput !== '' && typeIdInput !== '' && isPublicInput !== ''){
        createNewRoutine(creatorIdInput, nameInput, descriptionInput, typeIdInput, isPublicInput, true, setRoutines, routines)
        handleClose();
        }
        else setErrorMessage('Please finish filling out form')
      }
      
     
  }

  const handleChange = (event) =>{
    if(event.target.placeholder === 'name') setNameInput(event.target.value);
    else if(event.target.placeholder === 'instructions') setInstructionsInput(event.target.value);
    else if(event.target.placeholder === 'reps') setRepsInput(event.target.value);
    else if(event.target.placeholder === 'sets') setSetsInput(event.target.value);
    else if(event.target.placeholder === 'equipment') setEquipmentInput(event.target.value);
    else if(event.target.placeholder === 'description') setDescriptionInput(event.target.value);
    else if(event.target.placeholder === 'creatorId') setCreatorIdInput(event.target.value) 
  }
 
  const handleTypeChange = (event) =>{
    setTypeInput(event.target.name);
    if(event.target.name === 'Pumping Iron') setTypeIdInput('1');
    else if(event.target.name === 'ZipZap') setTypeIdInput('2');
    else if(event.target.name === 'Grit') setTypeIdInput('3');
    else setTypeIdInput(4)

  }

  const isPublicHandler = () =>{
    if(!isPublicInput) setIsPublicInput(true);
    else setIsPublicInput(false);
  }
 

  return(
    <div id='create-new' >
      <Button variant="primary" onClick={handleShow}>
        Create New 
      </Button>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header>
          <Modal.Title>Create New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  >
            <input placeholder="name" type="text" onChange={handleChange} />
            {
              selected === activities ?
              <div> 
                <textarea placeholder="instructions" type="text" onChange={handleChange} ></textarea>
                <input placeholder="reps" type="number" onChange={handleChange} />
                <input placeholder="sets" type="number" onChange={handleChange} />
                <input placeholder="equipment" type="text" onChange={handleChange} />
              </div> :
              <div>
                <input placeholder="creatorId" type="number" onChange={handleChange}/>
                <Form.Check 
                id="is-public"
                label='Public?'
                onChange={isPublicHandler}
                />
              </div>
            }
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {typeInput}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item value='1' name="Pumping Iron" onClick={handleTypeChange}>Pumping Iron</Dropdown.Item> 
                <Dropdown.Item value='2' name="ZipZap"  onClick={handleTypeChange}>ZipZap</Dropdown.Item> 
                <Dropdown.Item value='3' name="Grit"  onClick={handleTypeChange}>Grit</Dropdown.Item> 
                <Dropdown.Item value='4' name="Mind/Body"  onClick={handleTypeChange}>Mind/Body</Dropdown.Item>  
              </Dropdown.Menu>
            </Dropdown>
            <textarea placeholder="description" type="text" onChange={handleChange} ></textarea>
            <p className="text-danger">{errorMessage}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAdd} >Submit</Button>
          <Button variant="warning" onClick={handleClose} >Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateNew;
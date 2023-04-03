import React, { useState } from "react";
import { createNewActivity } from "../AjaxHelpers/Activities";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

const CreateNew = ({activities, setActivities}) =>{

  const [ show, setShow ] = useState(false);

  const [ nameInput, setNameInput ] = useState('');
  const [ instructionsInput, setInstructionsInput ] = useState('');
  const [ repsInput, setRepsInput ] = useState('');
  const [ setsInput, setSetsInput ] = useState('');
  const [ equipmentInput, setEquipmentInput ] = useState('');
  const [ typeInput, setTypeInput ] = useState('Select Type');
  const [typeIdInput, setTypeIdInput ] = useState('');
  const [ descriptionInput, setDescriptionInput ] = useState('');


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) =>{
    event.preventDefault();
    createNewActivity(nameInput, instructionsInput, repsInput, setsInput,
                equipmentInput, typeIdInput, descriptionInput,  setActivities, activities);
  } 

  const handleChange = (event) =>{
    if(event.target.placeholder === 'name') setNameInput(event.target.value);
    else if(event.target.placeholder === 'instructions') setInstructionsInput(event.target.value);
    else if(event.target.placeholder === 'reps') setRepsInput(event.target.value);
    else if(event.target.placeholder === 'sets') setSetsInput(event.target.value);
    else if(event.target.placeholder === 'equipment') setEquipmentInput(event.target.value);
    else if(event.target.placeholder === 'description') setDescriptionInput(event.target.value);
  }
 
  const handleTypeChange = (event) =>{
    setTypeInput(event.target.name);
    if(event.target.name === 'Pumping Iron') setTypeIdInput('1');
    else if(event.target.name === 'ZipZap') setTypeIdInput('2');
    else if(event.target.name === 'Grit') setTypeIdInput('3');
    else setTypeIdInput(4)
    console.log()

  }
 
  return(
    <div id='create-new' >
      <Button variant="primary" onClick={handleShow}>
        Create New 
      </Button>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Modal Heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} >
            <input placeholder="name" type="text" onChange={handleChange} />
            <textarea placeholder="instructions" type="text" onChange={handleChange} ></textarea>
            <input placeholder="reps" type="number" onChange={handleChange} />
            <input placeholder="sets" type="number" onChange={handleChange} />
            <input placeholder="equipment" type="text" onChange={handleChange} />
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
            <button>Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateNew;
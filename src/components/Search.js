import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Dropdown  from "react-bootstrap/Dropdown";


const Search = ({ setSearchInput, selected }) => {
  const handleChange = (event) => {
    setSearchInput(event.target.value)
  } 
  return (
    <form className="mb-2 bg-light border border-dark rounded p-1">
    <input onChange = {handleChange} className="no-border rounded bg-light" placeholder="search"/>
    <FontAwesomeIcon icon={faMagnifyingGlass} />
    {selected[0] ? <Dropdown>
      <Dropdown.Toggle>
        Activities
      </Dropdown.Toggle>
      <Dropdown.Menu>
      {
        Object.keys(selected[0]).map((key, index) =>{
          return(
            <Dropdown.Item className="text-capitalize" key={index}>{key}</Dropdown.Item>
          )
        })
      }
      </Dropdown.Menu>
    </Dropdown> : null}
    
    
    </form> 
  )
}

export default Search
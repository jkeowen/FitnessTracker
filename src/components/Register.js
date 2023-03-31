import React, { useState } from 'react';

const Register = () => {

const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [age, setAge] = useState('');
const [weight, setWeight] = useState('');
const [email, setEmail] = useState('')
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const handleChange = (event) => {
  if(event.target.placeholder === "First Name") setFirstName(event.target.value);
  else if (event.target.placeholder === "Last Name" ) setLastName(event.target.value);
  else if (event.target.placeholder === "Userame" ) setUsername(event.target.value);
  else if (event.target.placeholder === "Password" ) setPassword(event.target.value);
  else if (event.target.placeholder === "Confirm Password" ) setConfirmPassword(event.target.value);
  else if (event.target.placeholder === "Age" ) setAge(event.target.value);
  else if (event.target.placeholder === "Weight" ) setPassword(event.target.value);
  else setEmail(event.target.value)
}
console.log(firstName, lastName)

const handleSubmit = async (event) => {
  event.preventDefault()


}

  return (
      <div id='register'>
        <header>
          Register Here
        </header>
        <form onSubmit= {handleSubmit}>
        <input onClick = {handleChange} placeholder = "First Name"/>
        <input onClick = {handleChange} placeholder = "Last Name"/>
        <input onClick = {handleChange} placeholder="Username" />
        <input onClick = {handleChange} placeholder="Password" />
        <input onClick = {handleChange} placeholder = "Confirm Password"/>
        <input onClick = {handleChange} placeholder = "Age"/>
        <input onClick = {handleChange} placeholder = "Weight"/>
        <input onClick = {handleChange} placeholder = "Email Address"/>
        <button type= 'submit'>Submit</button>
        </form>
      </div>
  )
}

export default Register
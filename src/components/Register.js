import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerNewUser from '../AjaxHelpers/Users';


const Register = ({setLoginOut}) => {

const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [age, setAge] = useState('');
const [weight, setWeight] = useState('');
const [email, setEmail] = useState('')
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
// const [ passwordMessage, setPasswordMessage ] = useState('')
const [registrationErrorMessage, setRegistrationErrorMessage] = useState('');

const navigate = useNavigate();

const handleChange = (event) => {
  if(event.target.placeholder === "First Name") setFirstName(event.target.value);
  else if (event.target.placeholder === "Last Name" ) setLastName(event.target.value);
  else if (event.target.placeholder === "Username" ) setUsername(event.target.value);
  else if (event.target.placeholder === "Password" ) setPassword(event.target.value);
  else if (event.target.placeholder === "Confirm Password" ) setConfirmPassword(event.target.value);
  else if (event.target.placeholder === "Age" ) setAge(event.target.value);
  else if (event.target.placeholder === "Weight" ) setWeight(event.target.value);
  else setEmail(event.target.value)
}

const handleSubmit = (event) => {
  
  event.preventDefault();
    if(firstName === '' || lastName === "" || age === '' || username === '' || 
       password === '' || confirmPassword === '' || email === '' || weight === '') setRegistrationErrorMessage('Please finish filling out registration form')
    else if(password !== confirmPassword) setRegistrationErrorMessage('Passwords do not match')
    else if(firstName !== '' && lastName !== "" && age !== '' && username !== '' && 
    password !== '' && confirmPassword !== '' && email !== '' && weight !== ''){
      registerNewUser(firstName, lastName, username, password, age, weight, email, setLoginOut, navigate, setRegistrationErrorMessage)
    }
  }
 




  return (
      <div id='register'>
        <header>
          Register Here
        </header>
        <form onSubmit= {handleSubmit}>
        <input onChange = {handleChange} placeholder = "First Name" value={firstName}/>
        <input onChange = {handleChange} placeholder = "Last Name" value={lastName} />
        <input onChange = {handleChange} placeholder="Username" value={username} />
        <input onChange = {handleChange} placeholder="Password" value={password} />
        <input onChange = {handleChange} placeholder = "Confirm Password" value={confirmPassword} />
        <input onChange = {handleChange} placeholder = "Age" value={age} type='number' />
        <input onChange = {handleChange} placeholder = "Weight" value={weight} type='number' />
        <input onChange = {handleChange} placeholder = "Email Address" value={email} />
        <button type= 'submit' >Submit</button>
        <p className='text-danger' >{registrationErrorMessage}</p>
        </form>
      </div>
  )
}

export default Register
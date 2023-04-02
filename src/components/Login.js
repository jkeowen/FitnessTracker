import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../AjaxHelpers/Users";

const Login = () =>{

  const [ usernameInput, setUsernameInput ] = useState('');
  const [ passwordInput, setPasswordInput ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) =>{
    if(event.target.placeholder === 'username') setUsernameInput(event.target.value)
    else setPasswordInput(event.target.value);
  } 

  const handleSubmit = (event) =>{
    event.preventDefault();
    userLogin(usernameInput, passwordInput);
    if(usernameInput === '' || passwordInput === "") setErrorMessage('Missing Info')
    else if(window.localStorage.getItem('token')) navigate('/dashboard')
    else setErrorMessage('Invalid Credentials')
  }

  return(
    <div className="flex-center w-75">
      <h3>Login</h3>
      <form className="flex-center" onSubmit={handleSubmit}>
        <input placeholder="username" value={usernameInput} onChange={handleChange}/>
        <input placeholder="password" value={passwordInput} onChange={handleChange} />
        <button>Submit</button>
        <p className="text-danger">{errorMessage}</p>
        <p><Link to='/register'>Register</Link> New Account</p>
      </form>
    </div>
  )
}

export default Login;
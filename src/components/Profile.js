import React, {useState, useEffect} from 'react';
import { getCurrentUser } from '../AjaxHelpers/Users';
import { useJWT } from "react-jwt";
const Profile = () =>{

  const [ userData, setUserData ] = useState({});
  // const {decodedToken } = useJWT(window.localStorage.getItem('token'))
  useEffect(()=>{
    getCurrentUser('heavyLifter25', setUserData )
  }, [])
  // console.log(userData)
  return(
    <h1>Hello!</h1>
  )
}

export default Profile;
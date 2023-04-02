import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Redirecter = () =>{
  const navigate = useNavigate();
  useEffect(()=>{
    if(window.localStorage.getItem('token')) navigate('/dashboard')
    else navigate('/login')
  },[])

  return(
    <div></div>
  )
}

export default Redirecter;
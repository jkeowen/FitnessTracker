import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const SideNav = ({loginOut, setLoginOut}) =>{


  const navigate = useNavigate();
  useEffect(()=>{
    window.localStorage.getItem('token') ? setLoginOut('Logout') :
    setLoginOut('Login')
  },[])

  const handleLoginOut = () =>{
    if(window.localStorage.getItem('token')){
      window.localStorage.clear();
      setLoginOut('Login');
    }
    navigate('/login')
  }

  return(

    <div id="side-nav">
      
      <Navbar bg="dark" expand="md" >
      <Container className="flex flex-lg-column nav-height">
        <Navbar.Brand ><Link to="/dashboard"className="text-decoration-none" >Fitness App</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto flex flex-lg-column">
            <Link to="/dashboard" className="text-decoration-none">Dashboard</Link>
            <Link to="/profile" className="text-decoration-none" >Profile</Link>
            <Link to="/community" className="text-decoration-none" >Community</Link>
            {
            <Link to="/login" onClick={handleLoginOut} className="text-decoration-none" >{loginOut}</Link>
            } 
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    
  )
}

export default SideNav;
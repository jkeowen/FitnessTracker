import React from "react";
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const SideNav = () =>{

  return(

    <div id="side-nav">
      
      <Navbar bg="dark" expand="md" >
      <Container className="flex flex-lg-column nav-height">
        <Navbar.Brand href="#home">Fitness App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto flex flex-lg-column">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    // <div id="side-nav" className="bg-dark  px-3">
    //   <div >
    //     <div className="row grey-text">
    //       <div className="col-sm-auto">
    //         <div className="d-flex vh-100 flex-sm-column flex-nowrap bg-dark align-items-center sticky-top">
    //           <a href="/" className="d-block p-3 link-dark text-decoration-none" title="Test" data-bs-toggle="tooltip"
    //           data-bs-original-title="Icon-only">
    //             <i className="bi-boostrap fs-1"></i>
		// 					</a>
    //             <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
    //               <li className="nav-item mb-5">
    //                <h3 className="nav-link py-3 px-2 bmten text-decoration-none"  >Fitness App</h3>
    //               </li>
    //               <li>
    //                 <Link to={'/dashboard'} className="nav-link py-3 px-2 bm" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
    //                   <h3 className="grey-text" >Dashboard</h3>
		// 									<i className="bi-speedometer2 fs-1"></i>
    //                 </Link>
    //             </li>
    //               <li>
    //                 <Link to={"/profile"} className="nav-link py-3 px-2 bm" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
    //                   <h3 className="grey-text" >Profile</h3>
		// 									<i className="bi-speedometer2 fs-1"></i>
    //                 </Link>
    //             </li>
    //             <li>
    //               <Link to="/community" className="nav-link py-3 px-2 bmten" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
    //                 <h3 className="grey-text" >Community</h3>
		// 								<i className="bi-table fs-1"></i>
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/login" className="nav-link py-3 px-2 grey-text" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
    //                 Logout
		// 								<i className="bi-heart fs-1"></i>
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/settings" className="nav-link py-3 px-2 grey-text" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
    //                 Settings
		// 								<i className="bi-people fs-1"></i>
    //               </Link>
    //             </li>
		// 					</ul>
    //         </div>
    //       </div>

    //     </div>
    //   </div>
    // </div>
  )
}

export default SideNav;
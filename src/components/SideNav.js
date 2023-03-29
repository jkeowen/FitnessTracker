import React from "react";

const SideNav = () =>{

  return(
    <div id="side-nav">
      <div className="setHeight">
        <div className="row">
          <div className="col-sm-auto">
            <div className="d-flex flex-sm-column flex-nowrap bg-dark align-items-center sticky-top">
              <a href="/" className="d-block p-3 link-dark text-decoration-none" title="Test" data-bs-toggle="tooltip"
              data-bs-original-title="Icon-only">
                <i className="bi-boostrap fs-1"></i>
							</a>
                <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                  <li className="nav-item">
                    <a href="#" className="nav-link py-3 px-2" title="test2" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
											TEST1
                    <i className="bi-house fs-1"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                      TEST2
											<i className="bi-speedometer2 fs-1"></i>
                    </a>
                </li>
                <li>
                  <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
                    TEST3
										<i className="bi-table fs-1"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
                    TEST4
										<i className="bi-heart fs-1"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
                    TEST5
										<i className="bi-people fs-1"></i>
                  </a>
                </li>
								<li>
                  <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
                    TEST6
										<i className="bi-people fs-1"></i>
                  </a>
                </li>
							</ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SideNav;
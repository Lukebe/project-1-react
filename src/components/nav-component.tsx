import * as React from "react";
import { Link } from "react-router-dom";
import { LogoutComponent } from "../components/logout-component";

const NavComponent: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img className="img-adjust-position rev-logo" alt="revature" />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {(localStorage.getItem("token"))?


        (<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/home" className="unset-anchor nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/find-users" className="unset-anchor nav-link">
                Find Users
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/find-reimbursement" className="unset-anchor nav-link">
                Find Reimbursements
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/create-reimbursement" className="unset-anchor nav-link">
                Create Reimbursements
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/update-user" className="unset-anchor nav-link">
                Update A User
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/update-reimbursement" className="unset-anchor nav-link">
                Update A Reimbursement
              </Link>
            </li>
          </ul>
          
          <div className="form-inline my-2 my-lg-0">
          <Link to="/home">
          <LogoutComponent />
          </Link>
          </div>
        </div>):

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/home" className="unset-anchor nav-link">
                Home
              </Link>
            </li>
          </ul>
            <div className="form-inline my-2 my-lg-0">
              <Link to="/login" className="btn btn-outline-primary text-primary rounded-pill bg-light">Login</Link>
            </div>
        </div>
        }

      </nav>
    </div>
  );
};

export default NavComponent;

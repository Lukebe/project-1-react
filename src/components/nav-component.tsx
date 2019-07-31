import * as React from "react";
import { Link } from "react-router-dom";

const NavComponent: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-dark bg-primary display-front nav-pad">
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
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              <Link to="/home" className="unset-anchor nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/login" className="unset-anchor nav-link">
                Login
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
        </div>
      </nav>
    </div>
  );
};

export default NavComponent;

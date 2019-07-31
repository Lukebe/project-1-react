import React from "react";
import "./include/bootstrap";
import "./App.css";
import NavComponent from "./components/nav-component";
import { HashRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import { HomeComponent } from "./components/home-component";
import { LoginComponent } from "./components/login-component";
import { FindUsersComponent } from "./components/find-users-component";
import { FindReimbursement } from "./components/find-reimbursement-component";
import { CreateReimbursementComponent } from "./components/create-reimbursement";
import { UpdateUserComponent } from "./components/update-user-component";
import { UpdateReimbursementComponent } from "./components/update-reimbursement-component";

const App: React.FC = () => {
  return (
    <HashRouter>
      <div>
        <NavComponent />
        <Switch>
          <Route path="/home" component={HomeComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/find-users" component={FindUsersComponent} />
          <Route path="/find-reimbursement" component={FindReimbursement} />
          <Route path="/create-reimbursement" component={CreateReimbursementComponent} />
          <Route path="/update-user" component={UpdateUserComponent} />
          <Route path="/update-reimbursement" component={UpdateReimbursementComponent} />

          <Route component={HomeComponent} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;

import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddUser from "./components/AddUser";
import User from "./components/User";
import UsersList from "./components/UsersList";
import DocumentsList from "./components/DocumentsList";
import AddDocument from "./components/AddDocument";
import Document from "./components/Document";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-start">
        <a href="/users" className="navbar-brand">
          Dashboard
        </a>
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/users"} className="nav-link">
              Users
            </Link>
          </li>
        </div>
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/documents"} className="nav-link">
              Documents
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/users"]} component={UsersList} />
          <Route exact path="/documents" component={DocumentsList} />
          <Route exact path="/add-user" component={AddUser} />
          <Route exact path="/add-document" component={AddDocument} />
          <Route path="/users/:id" component={User} />
          <Route path="/documents/:id" component={Document} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

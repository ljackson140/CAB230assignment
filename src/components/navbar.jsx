import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles/navbar.css";

const NavBar = () => {

  let authenticated = (localStorage.getItem('token'));

  if (authenticated === 'clear' | authenticated == null){
    return(
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          Happiness
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/rankings">
                Rankings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

    )
  } else {
    return (
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          Happiness
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/rankings">
                Rankings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/factors">
                Factors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/loout">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default NavBar;

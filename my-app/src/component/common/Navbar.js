import React, { Component } from "react";
import { FaRegUserCircle, FaHome, FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav>
        <ul className="nav-list">
          <Link to="/home">
            <li>
              <FaHome />
              <p>Home</p>
            </li>
          </Link>
          <Link to="/me">
            <li>
              <FaRegUserCircle />
              <p>Profile</p>
            </li>
          </Link>
          <Link to="/projects">
            <li>
              <FaProjectDiagram />
              <p>Projects</p>
            </li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

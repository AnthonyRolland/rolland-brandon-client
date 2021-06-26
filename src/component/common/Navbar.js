import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../style/Navbar.scss';

class Navbar extends Component {
  render() {
    return (
      <nav>
        <ul className="nav-list">
          <Link to="/home">
            <li>
              <p>Home</p>
            </li>
          </Link>
          <Link to="/restaurants">
            <li>
              <p>Restaurants</p>
            </li>
          </Link>
          <Link to="/user">
            <li>
              <p>User</p>
            </li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

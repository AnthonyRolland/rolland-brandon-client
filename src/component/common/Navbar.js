import { Fragment } from 'react';
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../../style/Navbar.scss';

export default function Navbar(props) {
  return (
    <Fragment>
      <nav className='nav'>
        <ul className='nav-list link'>
          <li>
            <Link to='/home' className='link'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/restaurants' className='link'>
              Restaurant
            </Link>
          </li>
          <li>
            <Link to='/user' className='link'>
              User
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
}
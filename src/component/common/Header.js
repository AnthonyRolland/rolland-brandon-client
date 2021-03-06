import { Fragment, useState } from 'react';
import React, { Component } from "react";
import Navbar from './Navbar';
import '../../style/Header.scss';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Header(props) {
  const [navbarOpen, setNavbarOpen] = useState({ navbarOpen: false });

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <Fragment>
      <div className='header'>
        <div onClick={() => toggleNavbar()}>
          <FiMenu className='fi-menu' />
        </div>
        <div className='title-with-logo'>
          <h2>Dans le Meal</h2>
        </div>
        <span className='filler'></span>
        {navbarOpen === true && (
          <Fragment>
            <div className='sidebar-list'>
              <nav className='nav'>
                <ul>
                  <li>
                    <Link
                      onClick={() => toggleNavbar()}
                      to='/home'
                      className='link'
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => toggleNavbar()}
                      to='/restaurants'
                      className='link'
                    >
                      Restaurant
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => toggleNavbar()}
                      to='/user'
                      className='link'
                    >
                      User
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </Fragment>
        )}
        <Navbar />
      </div>
    </Fragment>
  );
}
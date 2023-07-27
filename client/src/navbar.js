import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
// import logo from '../../public/images/logo.png'; 
import GoogleSignInButton from './GoogleSignInButton';

function Navbar() {
    const menuItems = ['Home', 'Jobs', 'Past', 'About'];

  const handleGoogleSignInSuccess = (response) => {
    console.log('Google sign-in success:', response);
    // successful sign-in 
  };

  const handleGoogleSignInFailure = (error) => {
    console.log('Google sign-in error:', error);
    // sign-in error here 
  };
  
    return (
      <nav>
        <img className="logo" 
             src={process.env.PUBLIC_URL + '/images/hirexs_logo.png'} 
             alt="HireXS Logo" />
        <ul className="navbar">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>
        <GoogleSignInButton
        onSuccess={handleGoogleSignInSuccess}
        onFailure={handleGoogleSignInFailure}
      />
      </nav>
    );
  }

export default Navbar;

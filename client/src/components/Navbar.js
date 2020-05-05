import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <div class='nav-wrapper'>
        <Link to='/' className='brand-logo left'>
          InternLike
        </Link>
        <ul id='nav-mobile' className='right'>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

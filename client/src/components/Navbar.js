import React from 'react';

const NavBar = () => {
  return (
    <nav>
      <div class='nav-wrapper'>
        <a href='/' className='brand-logo left'>
          InternLike
        </a>
        <ul id='nav-mobile' className='right'>
          <li>
            <a href='/login'>Login</a>
          </li>
          <li>
            <a href='/signup'>Signup</a>
          </li>
          <li>
            <a href='/profile'>Profile</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

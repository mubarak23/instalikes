import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../App';
const NavBar = () => {
  const { state, dispatch } = useContext(userContext);
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to='/profile'>Profile</Link>
        </li>,
        <li>
          <Link to='/createpost'>Create Post</Link>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to='/signin'>Signin</Link>
        </li>,
        <li>
          <Link to='/signup'>Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div class='nav-wrapper'>
        <Link to={state ? '/' : '/signin'} className='brand-logo left'>
          InternLike
        </Link>
        <ul id='nav-mobile' className='right'>
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

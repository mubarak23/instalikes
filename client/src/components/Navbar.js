import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../App';
const NavBar = () => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to='/profile'>Profile</Link>
        </li>,
        <li>
          <Link to='/createpost'>Create Post</Link>
        </li>,
        <li>
          <button
            onClick={() => {
              localStorage.clear();
              dispatch({ type: 'CLEAR' });
              history.push('/signin');
            }}
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
          >
            Logout
          </button>
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

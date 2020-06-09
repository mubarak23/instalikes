import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../App';

const NavBar = () => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li key='1'>
          <Link to='/profile'>Profile</Link>
        </li>,
        <li key='2'>
          <Link to='/createpost'>Create Post</Link>
        </li>,
        <li key='3'>
          <Link to='/followingpost'>Following Posts</Link>
        </li>,

        <li
          key='4'
          onClick={() => {
            localStorage.clear();
            dispatch({ type: 'CLEAR' });
            history.push('/signin');
          }}
        >
          <a href='#'>Logout</a>
        </li>,
      ];
    } else {
      return [
        <li key='5'>
          <Link to='/signin'>Signin</Link>
        </li>,
        <li key='6'>
          <Link to='/signup'>Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className='nav-wrapper'>
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

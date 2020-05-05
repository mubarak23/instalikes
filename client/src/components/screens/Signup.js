import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Signup = () => {
  return (
    <dvi className='mycard'>
      <div className='card auth-card'>
        <h3>InterLike</h3>
        <input type='text' placeholder='Name' />
        <input type='text' placeholder='Eamil' />
        <input type='password' placeholder='Password' />
        <button className='btn waves-effect waves-light #64b5f6 blue darken-1'>
          Signup
        </button>
        <h5>
          <Link to='/sigin'>Have An Already Signin</Link>
        </h5>
      </div>
    </dvi>
  );
};

export default Signup;

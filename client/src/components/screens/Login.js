import React from 'react';
import '../../App.css';

const Login = () => {
  return (
    <dvi className='my-card'>
      <div className='card auth-card'>
        <h3>InterLike</h3>
        <input type='text' placeholder='Eamil' />
        <input type='password' placeholder='Password' />
        <button className='btn waves-effect waves-light #64b5f6 blue darken-1'>
          Login
        </button>
      </div>
    </dvi>
  );
};

export default Login;

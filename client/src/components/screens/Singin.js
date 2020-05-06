import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { useState } from 'react';

const Signin = () => {
  const [name, SetName] = useState('');
  const [password, SetPassword] = useState('');
  const [email, SetEmail] = useState('');
  return (
    <dvi className='mycard'>
      <div className='card auth-card'>
        <h3>InterLike</h3>
        <input type='text' placeholder='Eamil' />
        <input type='password' placeholder='Password' />
        <button className='btn waves-effect waves-light #64b5f6 blue darken-1'>
          Signin
        </button>
        <h5>
          <Link to='/signup'>Don't Have An Account SignUp</Link>
        </h5>
      </div>
    </dvi>
  );
};

export default Signin;

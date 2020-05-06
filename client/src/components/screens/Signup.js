import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Signup = () => {
  const [name, SetName] = useState('');
  const [password, SetPassword] = useState('');
  const [email, SetEmail] = useState('');

  const PostData = () => {
    fetch('/api/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <dvi className='mycard'>
      <div className='card auth-card'>
        <h3>InterLike</h3>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => SetName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Eamil'
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />
        <button
          onClick={() => PostData()}
          className='btn waves-effect waves-light #64b5f6 blue darken-1'
        >
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

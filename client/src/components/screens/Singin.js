import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../App.css';
import { useState } from 'react';
import M from 'materialize-css';

const Signin = () => {
  const history = useHistory();
  const [password, SetPassword] = useState('');
  const [email, SetEmail] = useState('');

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: 'invalid email', classes: '#c62828 red darken-3' });
      return;
    }
    fetch('/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          M.toast({ html: data.message, classes: '#43a047 green darken-1' });
          history.push('/home');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <dvi className='mycard'>
      <div className='card auth-card'>
        <h3>InterLike</h3>
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

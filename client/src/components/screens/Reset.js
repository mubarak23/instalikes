import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import M from 'materialize-css';
import '../../App.css';

const Reset = () => {
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
    fetch('/reset-password', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          M.toast({
            html: data.message,
            classes: '#43a047 green darken-1',
          });
          history.push('/signin');
        }
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

        <button
          onClick={() => PostData()}
          className='btn waves-effect waves-light #64b5f6 blue darken-1'
        >
          Reset Password
        </button>
      </div>
    </dvi>
  );
};

export default Reset;

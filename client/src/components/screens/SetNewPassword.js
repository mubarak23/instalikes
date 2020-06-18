import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import M from 'materialize-css';
import '../../App.css';

const SetNewPassword = () => {
  const history = useHistory();
  const [password, SetPassword] = useState('');
  const { email } = useParams();
  const NewPassword = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: 'invalid email', classes: '#c62828 red darken-3' });
      return;
    }
    fetch('/check_account', {
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
        <h3>InterLike -- New Password</h3>
        <input
          type='password'
          placeholder='Set New Pasword'
          value={email}
          onChange={(e) => SetPassword(e.target.value)}
        />
        <button
          onClick={() => NewPassword()}
          className='btn waves-effect waves-light #64b5f6 blue darken-1'
        >
          Set New Password
        </button>
      </div>
    </dvi>
  );
};

export default SetNewPassword;

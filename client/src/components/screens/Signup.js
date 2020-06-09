import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import '../../App.css';

const Signup = () => {
  const history = useHistory();
  const [name, SetName] = useState('');
  const [password, SetPassword] = useState('');
  const [email, SetEmail] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    if (url) {
      uploadField();
    }
  }, [url]);
  const uploadPic = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'internlike');
    data.append('cloud_name', 'techarewa-com');
    fetch('	https://api.cloudinary.com/v1_1/techarewa-com/image/upload/', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
      })
      .then((err) => {
        console.log(err);
      });
  };

  const uploadField = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: 'invalid email', classes: '#c62828 red darken-3' });
      return;
    }
    fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          M.toast({ html: data.message, classes: '#43a047 green darken-1' });
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadField();
    }
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
        <div className='file-field input-field'>
          <div className='btn #64b5f6 blue darken-1'>
            <span>Uplaod Profile</span>
            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>

        <button
          onClick={() => PostData()}
          className='btn waves-effect waves-light #64b5f6 blue darken-1'
        >
          Signup
        </button>
        <h5>
          <Link to='/signin'>Have An Already Signin</Link>
        </h5>
      </div>
    </dvi>
  );
};

export default Signup;

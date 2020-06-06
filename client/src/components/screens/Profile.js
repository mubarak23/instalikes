import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../App';
import { useHistory } from 'react-router-dom';
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(userContext);
  const [image, setImage] = useState('');
  const history = useHistory();
  const [url, setUrl] = useState();
  useEffect(() => {
    fetch('/mypost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.mypost);
      });
  }, []);

  useEffect(() => {
    if (image) {
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
          console.log(data);

          fetch('/updatepic', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                'user',
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: 'UPDATEPIC', payload: result.pic });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .then((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const Uploadphoto = (file) => {
    setImage(file);
  };

  const delete_account = () => {
    fetch('/delete_account', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        localStorage.clear();
        dispatch({ type: 'CLEAR' });
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='home-card'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <div>
          <img
            style={{ width: '160px', height: '160px', borderRadius: '80px' }}
            src={
              state
                ? state.pic
                : 'https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            }
          />
        </div>
        <div>
          <h4>{state ? state.name : 'Loading'}</h4>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '108%',
            }}
          >
            <h5>{mypics.length} Posts</h5>
            <h5>{state ? state.followers.length : '0'} Followers</h5>
            <h5>{state ? state.following.length : '0'} Following</h5>
          </div>
        </div>
      </div>
      <div
        style={{
          margin: '18px auto',
          borderBottom: '1px solid grey',
        }}
      >
        {!state ? (
          <div className='file-field input-field'>
            <div className='btn #64b5f6 blue darken-1'>
              <span>Update Profile</span>
              <input
                type='file'
                onChange={(e) => Uploadphoto(e.target.files[0])}
              />
            </div>
            <div className='file-path-wrapper'>
              <input className='file-path validate' type='text' />
            </div>
          </div>
        ) : (
          <button
            onClick={() => delete_account()}
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
          >
            Delete Account
          </button>
        )}
      </div>
      <div className='gallary'>
        {mypics.map((item) => {
          return (
            <img
              className='item'
              src={item.photo}
              alt={item._id}
              key={item._id}
            />
          );
        })}
        <img
          className='item'
          src='https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        />
      </div>
    </div>
  );
};

export default Profile;

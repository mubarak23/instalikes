import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../App';
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(userContext);
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
  return (
    <div className='home-card'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '18px auto',
          borderBottom: '1px solid grey',
        }}
      >
        <div>
          <img
            style={{ width: '160px', height: '160px', borderRadius: '80px' }}
            src='https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
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

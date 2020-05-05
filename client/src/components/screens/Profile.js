import React from 'react';

const Profile = () => {
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
          <h4>Dom Devis</h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '108%',
            }}
          >
            <h5>40 Posts</h5>
            <h5>40 Followers</h5>
            <h5>40 Following</h5>
          </div>
        </div>
      </div>
      <div className='gallary'>
        <img
          className='item'
          src='https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        />
        <img
          className='item'
          src='https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        />
        <img
          className='item'
          src='https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        />
      </div>
    </div>
  );
};

export default Profile;

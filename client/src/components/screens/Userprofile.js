import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../App';
import { useParams } from 'react-router-dom';
const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { userid } = useParams();
  console.log(userid);
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setProfile(result);
      });
  }, []);
  return (
    <>
      {userProfile ? (
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
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '80px',
                }}
                src='https://images.unsplash.com/photo-1546458904-143d1674858d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>

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
            {userProfile.posts.map((item) => {
              return (
                <img
                  className='item'
                  src={item.photo}
                  alt={item._id}
                  key={item._id}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h2>Loading...!</h2>
      )}
    </>
  );
};

export default Profile;

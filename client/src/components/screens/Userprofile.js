import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../App';
import { useParams } from 'react-router-dom';
const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { userid } = useParams();
  console.log(userid);
  const { state, dispatch } = useContext(userContext);
  const [showfollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );
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

  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

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
                <h5>{userProfile.posts.length} Posts</h5>
                <h5>40 Followers</h5>
                <h5>40 Following</h5>
              </div>
              {showfollow ? (
                <button
                  style={{
                    margin: '10px',
                  }}
                  className='btn waves-effect waves-light #64b5f6 blue darken-1'
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              ) : (
                <button
                  style={{
                    margin: '10px',
                  }}
                  className='btn waves-effect waves-light #64b5f6 blue darken-1'
                  onClick={() => unfollowUser()}
                >
                  UnFollow
                </button>
              )}
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

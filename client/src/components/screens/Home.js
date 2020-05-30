import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../App';

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    fetch('/allpost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
        console.log(result.posts);
      });
  }, []);

  const likePost = (postid) => {};
  const unlikePost = (postid) => {};
  return (
    <div className='home'>
      {data.map((item) => {
        return (
          <div className='card  home-card' key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className='card-image'>
              <img src={item.photo} />
            </div>
            <div className='card-content'>
              <i className='material-icons'>favorite</i>
              {item.likes.includes(state._id) ? (
                <i
                  className='material-icons'
                  onClick={() => {
                    unlikePost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className='material-icons'
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}

              <h5>{item.title}</h5>
              <p>{item.body}</p>
              <input type='text' placeholder='Add a comment' />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

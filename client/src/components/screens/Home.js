import React, { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/allpost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  });
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
              <h5>{item.title}</h5>
              <p>This is the first InternLike Post</p>
              <input type='text' placeholder='Add a comment' />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

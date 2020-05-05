import React from 'react';

const Home = () => {
  return (
    <div className='home'>
      <div className='card  home-card'>
        <h5>Latest Post</h5>
        <div className='card-image'>
          <img src='https://images.unsplash.com/photo-1558981285-6f0c94958bb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' />
        </div>
        <div className='card-content'>
          <i className='material-icons'>favorite</i>
          <h5>title</h5>
          <p>This is the first InternLike Post</p>
          <input type='text' placeholder='Add a comment' />
        </div>
      </div>
      <div className='card  home-card'>
        <h5>Latest Post</h5>
        <div className='card-image'>
          <img src='https://images.unsplash.com/photo-1558981285-6f0c94958bb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' />
        </div>
        <div className='card-content'>
          <i className='material-icons'>favorite</i>
          <h5>title</h5>
          <p>This is the first InternLike Post</p>
          <input type='text' placeholder='Add a comment' />
        </div>
      </div>
      <div className='card  home-card'>
        <h5>Latest Post</h5>
        <i className='material-icons'>favorite</i>
        <div className='card-image'>
          <img src='https://images.unsplash.com/photo-1558981285-6f0c94958bb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' />
        </div>
        <div className='card-content'>
          <i className='material-icons'>favorite</i>
          <h5>title</h5>
          <p>This is the first InternLike Post</p>
          <input type='text' placeholder='Add a comment' />
        </div>
      </div>
    </div>
  );
};

export default Home;

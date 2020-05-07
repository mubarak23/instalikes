import React, { useState } from 'react';

const CreatePost = () => {
  const [title, SetTitle] = useState('');
  const [body, SetBody] = useState('');
  const [image, setImage] = useState('');
  const postDetails = () => {
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
      })
      .then((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className='card input-field'
      style={{
        margin: '10px auto',
        maxWidth: '500px',
        padding: '20px',
        textAlign: 'center',
        marginTop: '30px',
      }}
    >
      <input
        type='text'
        value={title}
        onChange={(e) => SetTitle(e.target.value)}
        placeholder='Title'
      />
      <input
        type='text'
        value={body}
        onChange={(e) => SetBody(e.target.value)}
        placeholder='body'
      />
      <div className='file-field input-field'>
        <div className='btn #64b5f6 blue darken-1'>
          <span>Uplaod Image</span>
          <input type='file' onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className='file-path-wrapper'>
          <input className='file-path validate' type='text' />
        </div>
      </div>
      <button
        onClick={() => postDetails()}
        className='btn waves-effect waves-light #64b5f6 blue darken-1'
      >
        Submit Post
      </button>
    </div>
  );
};

export default CreatePost;

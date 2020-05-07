import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import '../../App.css';
const CreatePost = () => {
  const history = useHistory();
  const [title, SetTitle] = useState('');
  const [body, SetBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
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
        setUrl(data.url);
        console.log(data);
      })
      .then((err) => {
        console.log(err);
      });

    fetch('/createpost', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        title,
        body,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          M.toast({
            html: 'Post Added Successfully',
            classes: '#43a047 green darken-1',
          });
          history.push('/');
        }
      })
      .catch((err) => {
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

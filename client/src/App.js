import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Singin';
import Singup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
      <Route path='/sigin'>
        <Signin />
      </Route>
      <Route path='/signup'>
        <Singup />
      </Route>
      <Route path='/createpost'>
        <CreatePost />
      </Route>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Login';
import Singup from './components/screens/Signup';
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
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Singup />
      </Route>
    </BrowserRouter>
  );
}

export default App;

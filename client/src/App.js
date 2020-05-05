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
      <Route path='/' component={Home} />
      <Route path='/profile' component={Profile} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Singup} />
    </BrowserRouter>
  );
}

export default App;

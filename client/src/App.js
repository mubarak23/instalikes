import React, { useEffect, createContext, useReducer } from 'react';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Singin';
import Singup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import { reducer, intialState } from './reducers/userReducer';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { json } from 'body-parser';

export const userContext = createContext();

const Routing = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      history.push('/');
    } else {
      history.push('/signin');
    }
  }, [input]);

  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
      <Route path='/signin'>
        <Signin />
      </Route>
      <Route path='/signup'>
        <Singup />
      </Route>
      <Route path='/createpost'>
        <CreatePost />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;

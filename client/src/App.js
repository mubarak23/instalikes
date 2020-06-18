import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Singin';
import Singup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import Reset from './components/screens/Reset';
import SetNewPassword from './components/screens/SetNewPassword';
import SubscribrUserPost from './components/screens/SubcribeUserPosts';
import UserProfile from './components/screens/Userprofile';
import { reducer, intialState } from './reducers/userReducer';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { json } from 'body-parser';

export const userContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      if (!history.location.pathname.startsWith('/reset'))
        history.push('/signin');
    }
  }, []);

  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/profile'>
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
      <Route path='/followingpost'>
        <SubscribrUserPost />
      </Route>
      <Route path='/profile/:userid'>
        <UserProfile />
      </Route>
      <Route path='/reset'>
        <Reset />
      </Route>
      <Route path='/setnewpassword/:email'>
        <SetNewPassword />
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

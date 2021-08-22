import react,{useContext} from 'react';
import './App.css';
import LoginProvider from './components/LoginProvider/LoginProvider.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Login from './components/LoginProvider/Login';
import Register from './components/LoginProvider/Register';
import { UserProvider } from './Context/UserContext'
import Main from './components/Main/Main';


function App() {

  return (
    <UserProvider>
    <Router>
    <Switch>
    <Route exact path='/' component={LoginProvider}></Route>
    <Route exact path='/login' component={Login}></Route>
    <Route exact path='/register' component={Register}></Route>
    <Route exact path='/main' component={Main}></Route>
    </Switch>
    </Router>
    </UserProvider>
    
  );
}

export default App;

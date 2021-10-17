import react, { useContext } from 'react';
import './App.css';

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
import Cart from './components/Cart/Cart';
import Accounts from './components/Accounts/Accounts';

function App() {

  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Login}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/main' component={Main}></Route>
          <Route exact path='/cart' component={Cart}></Route>
          <Route exact path='/accounts' component={Accounts}></Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;

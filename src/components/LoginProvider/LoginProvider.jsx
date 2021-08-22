import React,{useContext, useState}from 'react';
// import Main from '../Main/Main';
import Login from './Login';
import Register from './Register';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,useHistory
  } from 'react-router-dom';
import {UserContext} from '../../Context/UserContext'
import Navbar from '../Navbar';
import { Grid } from 'semantic-ui-react';

  
export default function LoginProvider(){
    const [user,setUser] = useContext(UserContext)
    const history = useHistory();

    return(<Grid container
    //  style={{backgroundColor:'red'}}
     >
        <Grid.Row>
            
        <Navbar></Navbar>
        </Grid.Row>
        <Grid.Row>
                {/* <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                {user.loggedIn&&(
                <li>
                    <Link to="/main">Access</Link>
                </li>
                )}
                </ul> */}
                </Grid.Row>
                </Grid>
    )
}
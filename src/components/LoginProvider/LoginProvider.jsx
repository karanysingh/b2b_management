import React,{useContext}from 'react';
import { UserProvider } from '../../Context/UserContext'
// import Main from '../Main/Main';
import Login from './Login';
import Register from './Register';

export default function LoginProvider(){
    const user = {name:'Karan',loggedIn:true}
    return(
        <UserProvider value={user}>
            {/* <Main></Main> */}
            <Login></Login>
            <Register></Register>
        </UserProvider>
    )
}
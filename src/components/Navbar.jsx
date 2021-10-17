import React, { useState,useContext } from 'react';
import { Grid,Menu } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import {UserContext} from '../Context/UserContext'
import firebase from 'firebase';

export default function Navbar(){
    const history = useHistory()
    const [activeItem, setactiveItem] = useState("home")
    const [user,setUser] = useContext(UserContext)


    const signout = () => {
        console.log('ce')
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            setUser([{ name: 'guest', loggedIn: false, role: 'guest', uid: '101' }])
            history.push('/')
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    }

    return(
    <Grid
    //  style={{backgroundColor:'green'}} 
     >
        {/* <Grid.Row  style={{backgroundColor:'blue'}} >
            <Grid.Column width={12}> */}
    <Menu 
    // style={{backgroundColor:'red'}} 
    text color="green" fluid>
        <Menu.Item
            name="home"
            active={activeItem==='home'}
            onClick={()=>{
                setactiveItem('home') 
            history.push('/main')}}
        >
            Home
        </Menu.Item>
        <Menu.Item
            name="manage"
            active={activeItem==='manage'}
            onClick={()=>{
                setactiveItem('manage') 
            history.push('/main')}}
            >
            Manage Products
        </Menu.Item>
        <Menu.Item
            name="view"
            active={activeItem==='view'}
            onClick={()=>{
                setactiveItem('view') 
            history.push('/main')}}
            >
            View Products
        </Menu.Item>
        
        <Menu.Item
            name="cart"
            active={activeItem==='cart'}
            onClick={()=>{
                setactiveItem('cart') 
            history.push('/cart')}}
            >
            View Cart
        </Menu.Item>

        {user.loggedIn?(
        <Menu.Item
            name="signout"
            onClick={signout} 
            >
            Signout
        </Menu.Item>):(
        <Menu.Item
            name="register"
            active={activeItem==='register'}
            onClick={()=>{
                setactiveItem('home') 
            history.push('/login')}}
            >
            Register/Login
        </Menu.Item>)
    }
    </Menu>
    {/* </Grid.Column>
    </Grid.Row> */}
    </Grid>
    )
}
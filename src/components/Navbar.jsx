import React, { useState } from 'react';
import { Grid,Menu } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default function Navbar(){
    const history = useHistory()
    const [activeItem, setactiveItem] = useState("home")
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
            name="register"
            active={activeItem==='register'}
            onClick={()=>{
                setactiveItem('home') 
            history.push('/login')}}
            >
            Register/Login
        </Menu.Item>
        <Menu.Item
            name="retail"
            active={activeItem==='retail'}
            onClick={()=>{
                setactiveItem('retail') 
            history.push('/retail')}}
            >
            Retail Owner
        </Menu.Item>
        <Menu.Item
            name="wholesale"
            active={activeItem==='wholesale'}
            onClick={()=>{
                setactiveItem('wholesale') 
            history.push('/admin')}}
            >
            Wholesale Owner
        </Menu.Item>
    </Menu>
    {/* </Grid.Column>
    </Grid.Row> */}
    </Grid>
    )
}
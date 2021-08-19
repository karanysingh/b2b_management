import React,{useContext,useState}from 'react';
import { Grid, Header, Image, Input,Button,Segment,Dropdown,Checkbox,Radio} from 'semantic-ui-react';

import {register} from '../../firebase/Auth'
import firebase from 'firebase';

export default function Register(){
    const [name,setname] = useState('null')
    const [email,setemail] = useState('null')
    const [pass,setpass] = useState('null')
    const [role,setrole] = useState('retail')

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
        const userReg = await register({email:email,password:pass})
        // console.log(userReg)
        const db = firebase.firestore();
        if(userReg){
        setTimeout(
            ()=>{
                
        db.collection("users").doc(userReg.uid).set(
            {
                name:name,
                email:email,
                role:role,
            }
            )
            .then(()=>{
            console.log("Doc");
            })
            .catch((error)=>{
            console.log("Error writing document:", error)
            })
            },1000

        )}
        }catch(e){
            console.log("error in creating user")
        }
    }

    return(
        <Grid centered>
        <Grid.Row centered>
          <Grid.Column computer={8} mobile={12} 
        //   style={{backgroundColor:'green',minHeight:"10vh"}}
          >
            <Segment centered inverted color="red">
              Register
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column computer={6}  mobile={12} 
        //   style={{backgroundColor:'green',minHeight:"10vh"}}
          >
            <Segment centered inverted color="grey">
              <Input onChange={(e,data)=>{setemail(data.value)}} placeholder='Email' fluid></Input>
              <br></br>
              <Input onChange={(e,data)=>{setpass(data.value)}} placeholder='password' fluid></Input>
              <br></br>
              <Input onChange={(e,data)=>{setname(data.value)}} placeholder='Name' fluid></Input>
              <br></br>
              <Button onClick={handleLogin} secondary>Login</Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
        </Grid.Row>       
      </Grid>
    )
}
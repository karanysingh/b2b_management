import React,{useContext,useEffect,useState}from 'react';
import { Grid, Header, Image, Input,Button,Segment,Dropdown,Checkbox,Radio} from 'semantic-ui-react';

import {login} from '../../firebase/Auth'
import firebase from 'firebase';
import { useHistory } from "react-router-dom";

import {UserContext} from '../../Context/UserContext'

export default function Login(){
    const [email,setemail] = useState('null')
    const [pass,setpass] = useState('null')
    const [user,setUser] = useContext(UserContext)

    const history = useHistory();
    const db = firebase.firestore();

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(email,pass)
        const userReg = await login({email:email,password:pass})
        // console.log(userReg)
        if(userReg){
            var docRef = db.collection("users").doc(userReg.uid);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setUser({name:doc.data().name,loggedIn:true,role:doc.data().role,uid:userReg.id})
                    history.push('/')
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }
    return(
        <Grid centered>
        <Grid.Row centered>
          <Grid.Column computer={8} mobile={12} 
        //   style={{backgroundColor:'green',minHeight:"10vh"}}
          >
            <Segment centered inverted color="red">
              LOGIN
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
              <Input onChange={(e,data)=>{setpass(data.value)}} placeholder='Password' fluid></Input>
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
import React,{useContext,useState}from 'react';
import { Grid, Header, Image, Input,Button,Segment,Dropdown,Checkbox,Radio} from 'semantic-ui-react';

import {login} from '../../firebase/Auth'


export default function Login(){
    const [email,setemail] = useState('null')
    const [pass,setpass] = useState('null')

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(email,pass)
        const userReg = await login(email,pass)
        console.log(userReg)
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
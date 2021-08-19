
import { Grid, Header, Image, Input,Button,Segment,Dropdown,Checkbox,Radio } from 'semantic-ui-react'
import React, {useEffect, useState,useContext} from 'react';
import UserContext from '../../Context/UserContext'

// import firestore from "../../firebase/firebase";


const ROLES = {
  ADMIN:'admin',
  CLIENT:'client',
  CONSUMER:'consumer',
}
const temp=[
  { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
]

function Homepage(){
    
  const [id,setId] = useState('null')
  const [name,setName] = useState('null')
  const [role,setRole] = useState('null')
  
  const [idSelect,setIdSelect] = useState('null')
  const [nameSelect,setNameSelect] = useState('null')
  const [roleSelect,setRoleSelect] = useState('null')

  const [admin,setadmin]=useState(false)
  const [client,setclient]=useState(false)
  const [consumer,setconsumer]=useState(false)

  
  const [options,setoptions] = useState([
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
  ])
  const handleSubmit = (e) =>{
    e.preventDefault()
    const db = firestore.firestore();
    db.collection("users").add(
      {
        id:id,
        name:name,
        role:role,
      }
    )
    .then(()=>{
      console.log("Doc");
    })
    .catch((error)=>{
      console.log("Error writing document:", error)
    })
  }
  const handleSelect = (e,{value,checked}) => {
    e.preventDefault()
    console.log(e)
    console.log(value)
    // console.log(checked)
    if(checked){
      if(options[value].role === ROLES.ADMIN){
        setadmin(true)
      }
      if(options[value].role === ROLES.CONSUMER){
        setconsumer(true)
      }
      if(options[value].role === ROLES.CLIENT){
        setclient(true)
      }
    }else{
      
      if(options[value].role === ROLES.ADMIN){
        setadmin(false)
      }
      if(options[value].role === ROLES.CONSUMER){
        setconsumer(false)
      }
      if(options[value].role === ROLES.CLIENT){
        setclient(false)
      }

    }
    setTimeout(() => {
      
    console.log("user selected:",options[value])
    }, 200);
    
  }
  const getdata= async ()=>{
    const db = firestore.firestore();
    const arr=[]
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          // arr.push({value:doc.id,key:doc.data().role,text:doc.data().name})
          arr.push({key:doc.id,value:doc.data().id,text:doc.data().name,role:doc.data().role})
      });
    setoptions(arr)
    console.log(options)
  });
  }
  useEffect(()=>{
    // getdata()
  },[])
  const user = useContext(UserContext)
  return(
    <Grid>
      <Grid.Row centered>
        <Grid.Column width={10} 
        // style={{backgroundColor:'green',minHeight:"10vh"}}
        >
          <Segment centered inverted color="black">
            ADD USER 
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={5} 
        // style={{backgroundColor:'green',minHeight:"10vh"}}
        ><Segment inverted color="red">
        <Input fluid onChange={(e)=>{
          setId(e.target.value) 
          }} placeholder="Id" ></Input>
        <Input fluid onChange={(e)=>setName(e.target.value)} placeholder="Name" ></Input><Radio
            label='admin'
            name='radioGroup'
            value='admin'
            checked={role === 'admin'}
            onChange={()=>{
              setRole('admin')
          }}
          /><Radio
          label='client'
          name='radioGroup'
          value='client'
          checked={role === 'client'}
          onChange={()=>{
            setRole('client')
        }}
        /><Radio
        label='consumer'
        name='radioGroup'
        value='consumer'
        checked={role === 'consumer'}
        onChange={()=>{
          setRole('consumer')
        }}
      />
        <Button fluid primary type="submit" onClick={handleSubmit}>Submit</Button>
        </Segment>
        </Grid.Column>
        <Grid.Column width={5} 
        // style={{backgroundColor:'blue',minHeight:"10vh"}}
        ><Segment inverted color="green">
        <Header>
          Id: {id}
        </Header>
        <Header>
          Name: {name}
        </Header>
        <Header>
          Role: {role}
        </Header>
        </Segment></Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={10} 
        // style={{backgroundColor:'green',minHeight:"10vh"}}
        >
          <Segment centered inverted color="black">
            SELECT USER
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={5} 
        // style={{backgroundColor:'green',minHeight:"10vh"}}
        >     <Segment inverted color="blue">
        <Header>
          Role Selected: {admin?'Admin':client?'Client':(consumer&&'Consumer')}

        </Header>
        <Header>
        LOGGED IN STATUS: {user.name}
        </Header>
        </Segment>
          
        </Grid.Column>
        <Grid.Column width={5} 
        // style={{backgroundColor:'blue',minHeight:"10vh"}}
        >
   
  {
    options.map((ele,index)=>{
      return(
        <Segment>
      <Checkbox value={index} onChange={handleSelect} label={<label>{ele.text}</label>} />
        </Segment>
      )
    })
  }
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
      {admin? (
        <Grid.Column width={3} 
        // style={{backgroundColor:'red',minHeight:"10vh"}}
        >
          <Segment inverted color="red">
          <Header>
            VISIBILE TO ADMINS
          </Header>
          </Segment>
}
        </Grid.Column>
      ):(client?(
        <Grid.Column width={3} 
        // style={{backgroundColor:'green',minHeight:"10vh"}}
        >
          <Segment inverted color="green">
          <Header>
            VISIBILE TO CLIENTS
          </Header>
          </Segment>
        </Grid.Column>
      ):(consumer&&
        <Grid.Column width={3} 
        // style={{backgroundColor:'blue',minHeight:"10vh"}}
        >
          <Segment inverted color="blue">
          <Header>
            VISIBILE TO CONSUMERS
          </Header>
          </Segment>
        </Grid.Column>))
        }
      </Grid.Row>
    </Grid>
  )
}

function Main() {
  return (
      <Homepage></Homepage>
  );
}

export default Main;

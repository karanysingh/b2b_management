import React, {useContext,useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Grid,Segment,Input,Button, Table, Tab} from 'semantic-ui-react';
import Navbar from '../Navbar';
import {UserContext} from '../../Context/UserContext'
import firebase from 'firebase';

const shopData = [
  {
    name:'potato',
    price:'$3',
    quantity:'per KG',
    availability:true
  },
  {
    name:'potato',
    price:'$3',
    quantity:'per KG',
    availability:true
  },
  {
    name:'potato',
    price:'$3',
    quantity:'per KG',
    availability:true
  },
  {
    name:'potato',
    price:'$3',
    quantity:'per KG',
    availability:true
  },
  {
    name:'potato',
    price:'$3',
    quantity:'per KG',
    availability:true
  }
]

export default function Main(){
  const [user,setUser] = useContext(UserContext)
  const [additem,setadditem] = useState(false)
  const [pname,setPname] = useState('null')
  const [price,setPrice] = useState('null')
  const [quantity,setQuantity] = useState('null')
  const [availability,setAvailability] = useState('null')
  const [data,setdata] = useState([
    {
      name:'potato',
      price:'$3',
      quantity:'per KG',
      availability:true
    }])
  const db = firebase.firestore();

  // user = { name: 'guest', loggedIn: false, role: 'guest', uid: '101' }
  const history = useHistory()
  const handleAddItem = (e) => {
    if(additem===false){
    setadditem(true)
    }else{
    e.preventDefault()
    try{
    // console.log(userReg)
    const db = firebase.firestore();
    if(user.loggedIn){
    setTimeout(
        ()=>{
            
    db.collection("products").add(
        {
            pname:pname,
            price:price,
            quantity:quantity,
            availability:availability,
        }
        )
        .then(()=>{
        console.log("Doc");
        })
        .catch((error)=>{
        console.log("Error writing document:", error)
        })
        },1000

    )

}
    }catch(e){
        console.log("error in adding product")
    }
  }
  }
  const populateData = async () =>{
    var arr = []
    db.collection("products").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          arr.push(doc.data())
          // console.log(arr)
      }
      );
      
  setTimeout(
    setdata(arr),1000
    )
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
  }
  useEffect(()=>populateData())
  return( 
    <>
    { user.loggedIn && user.role==='admin'?
  (
    <Grid centered>
      <Navbar></Navbar>  
    <Grid.Row centered>
      <Grid.Column computer={8} mobile={12} 
    //   style={{backgroundColor:'green',minHeight:"10vh"}}
      >
        <Segment centered inverted color="red">
          Hi {user.name}! You have <b> {user.role} </b> level access.
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row centered>
      <Grid.Column computer={10}  mobile={12} 
    //   style={{backgroundColor:'green',minHeight:"10vh"}}
      >
        <Segment centered>
          <Table color="red" singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Product Price</Table.HeaderCell>
                  <Table.HeaderCell>Product Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Product Availability</Table.HeaderCell>
                </Table.Row>
                
              </Table.Header>
              <Table.Row>
                { additem?
                      (
                        <>
                        <Table.Cell>
                        <Input 
                        onChange={(e,{value})=>setPname(value)}
                        ></Input>
                        </Table.Cell>
                        <Table.Cell>
                        <Input                        
                        onChange={(e,{value})=>setPrice(value)}
                        ></Input>
                        </Table.Cell>
                        <Table.Cell>
                        <Input                       
                        onChange={(e,{value})=>setQuantity(value)}
></Input>
                        </Table.Cell>
                        <Table.Cell>
                        <Input                        
                        onChange={(e,{value})=>setAvailability(value)}
></Input>
                        </Table.Cell>
                        </>
                      )
                      :null
                    }
                      </Table.Row>
                <Table.Row>
                  <Table.Cell width='4'>
                    <Button color={additem?'blue':'white'} onClick={(e)=>handleAddItem(e)} fluid>
                    Add Item +
                    </Button>
                    
                  </Table.Cell>
                  <Table.Cell>
                    
                  {additem?
                    <Button circular  color='red' onClick={(e)=>setadditem(false)} >
                    Cancel
                    </Button>:null} 
                  </Table.Cell>
                </Table.Row>
                      
                <Table.Body>
                  {
                    data.map((product)=>{
                      return(
                        
                  <Table.Row>
                  <Table.Cell>{product.pname}</Table.Cell>
                  <Table.Cell>{product.price}</Table.Cell>
                  <Table.Cell>{product.quantity}</Table.Cell>
                  <Table.Cell>{product.availability?'yes':'no'}</Table.Cell>
                </Table.Row>
                      )
                    })
                  }
                </Table.Body>
          </Table>
          
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row centered>
    </Grid.Row>  
  </Grid> ):((user.loggedIn&&user.role=="retail")?(
    <Grid centered>
      <Navbar></Navbar>  
    <Grid.Row centered>
      <Grid.Column computer={8} mobile={12} 
    //   style={{backgroundColor:'green',minHeight:"10vh"}}
      >
        <Segment centered inverted color="red">
          Hi {user.name}! You have <b> {user.role} </b> level access.
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row centered>
      <Grid.Column computer={10}  mobile={12} 
    //   style={{backgroundColor:'green',minHeight:"10vh"}}
      >
        <Segment centered>
          <Table color="red" singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Product Price</Table.HeaderCell>
                  <Table.HeaderCell>Product Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Product Availability</Table.HeaderCell>
                </Table.Row>
                
              </Table.Header>
                <Table.Body>
                  {
                    data.map((product)=>{
                      return(
                        
                  <Table.Row>
                  <Table.Cell>{product.pname}</Table.Cell>
                  <Table.Cell>{product.price}</Table.Cell>
                  <Table.Cell>{product.quantity}</Table.Cell>
                  <Table.Cell>{product.availability?'yes':'no'}</Table.Cell>
                </Table.Row>
                      )
                    })
                  }
                </Table.Body>
          </Table>
          
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row centered>
    </Grid.Row>  
  </Grid> ):history.push('/'))   }
  </>
  )
}
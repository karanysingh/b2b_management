import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Grid, Segment, Input, Button, Table, Tab, Checkbox, Dimmer,Loader,Message } from 'semantic-ui-react';
import Navbar from '../Navbar';
import { UserContext } from '../../Context/UserContext'
import firebase from 'firebase';

const db = firebase.firestore();

export default function Cart(){
  const [user, setUser,products,setProducts] = useContext(UserContext)
  // const [cart,setCart] = useState({})
  const [userorders,setuserorders] = useState([{
    pname: 'potato',
    price: '$3',
    quantity: 'per KG',
    availability: true
  },
  {
    pname: 'potato',
    price: '$3',
    quantity: 'per KG',
    availability: true
  },])
  const [loaderActive,setLoaderActive] = useState(true)
  const history = useHistory()
  var arr = []

  function populateCart(){
    db.collection("cart").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
          arr.push({...doc.data(),id:doc.id})
          // console.log(arr)
        }
        );

        setTimeout(()=>{
          var cart = arr
          var orders = []
    for(let i=0;i<cart.length; i++){
      if(cart[i].userid==user.uid){
        orders = cart[i].order
        console.log("found user cart")
      }
      // console.log("cart",cart[i],user)
      // console.log("orders",orders)
    }
    let temp = []
    for(let j = 0;j<orders.length;j++){
      for(let k=0;k<products.length;k++){
        if(orders[j].id==products[k].id){
          temp.push({...products[k],"quantity":orders[j].quantity})
          console.log("same")
          break
        } 
        // console.log("cart",cart,products)
      }
      console.log("set",temp)
      // setProducts(temp)
      setuserorders(temp)
      setLoaderActive(false)
    }
        }
          , 1000
        )
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    
  }
  useEffect(()=>{
    // setTimeout(() => {
      populateCart()
      console.log("populating")
    // }, 1000);
  },[])
    return(
        <>

        {user.loggedIn ?
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
              <Grid.Column computer={10} mobile={12}
              //   style={{backgroundColor:'green',minHeight:"10vh"}}
              ><Segment centered>

        <Dimmer active={loaderActive}>
          <Loader indeterminate>Preparing Files</Loader>
        </Dimmer>
                    <Table color="red" singleLine>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Product Name</Table.HeaderCell>
                          <Table.HeaderCell>Product Price</Table.HeaderCell>
                          <Table.HeaderCell>Product Quantity</Table.HeaderCell>
                        </Table.Row>
  
                      </Table.Header>
                    
                      <Table.Body>
                        {
                          userorders.map((product) => {
                            return (
  
                              <Table.Row>
                                <Table.Cell>{product.pname}</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>{product.quantity}</Table.Cell>
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
            </Grid>):history.push(
              '/')}
            </>
    )
}
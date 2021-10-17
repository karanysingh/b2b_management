import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Grid, Segment, Input, Button, Table, Tab, Checkbox, Dimmer,Loader,Message } from 'semantic-ui-react';
import Navbar from '../Navbar';
import { UserContext } from '../../Context/UserContext'
import firebase from 'firebase';
import populateData from '../../utils/populateData';
import shopData from '../../utils/shopData.js'

export default function Main() {
  const [user, setUser,products,setProducts] = useContext(UserContext)
  const [additem, setadditem] = useState(false)
  const [pname, setPname] = useState('null')
  const [price, setPrice] = useState('null')
  const [placeOrder,setplaceOrder] = useState(false)
  const [quantity, setQuantity] = useState('null')
  const [availability, setAvailability] = useState('null')
  const [data, setdata] = useState(shopData)
  const [loaderActive,setLoaderActive] = useState(true)
  const [cartOrders, setcartOrder] = useState([])
  const [Msg,setMsg] = useState(false)


  const db = firebase.firestore();

  // user = { name: 'guest', loggedIn: false, role: 'guest', uid: '101' }
  const history = useHistory()
  const handlePlaceOrder = () => {
    console.log(cartOrders)
    setLoaderActive(true)
    try {
      // console.log(userReg)
      
      const db = firebase.firestore();
          setTimeout(
          () => {

            db.collection("cart").add(
              {
                order:cartOrders,
                userid:user.uid
              }
            )
              .then(() => {
                // console.log("Order Placed");
                setMsg(true);
              })
              .catch((error) => {
                console.log("Error writing document:", error)
              })
          }, 1000

        )
    } catch (e) {
      console.log("error in adding cart")
    }

  }
  const handleDelete = (docid) => {
    setLoaderActive(true)
    db.collection("products").doc(docid).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }
  const AddCheckboxItem = (id) => {
    setplaceOrder(true)
    
    cartOrders.push({id:id,quantity:10})
    console.log("added",cartOrders)

    setcartOrder(cartOrders)
  }
  const RemoveCheckboxItem = (id) => {
    
    // setplaceOrder(true)
    for(let i =0;i<cartOrders.length;i++){
      if(cartOrders[i].id==id){
        cartOrders.splice(i,1)
      }
    }
    console.log("spliced",cartOrders)

    setcartOrder(cartOrders)
    if(cartOrders.length==0){
      setplaceOrder(false)
    }
  }
  const handleAddItem = (e) => {
    setLoaderActive(true)
    if (additem === false) {
      setadditem(true)
    } else {
      e.preventDefault()
      try {
        // console.log(userReg)
        const db = firebase.firestore();
        if (user.loggedIn) {
          setTimeout(
            () => {

              db.collection("products").add(
                {
                  pname: pname,
                  price: price,
                  quantity: quantity,
                  availability: availability,
                }
              )
                .then(() => {
                  console.log("Doc");
                })
                .catch((error) => {
                  console.log("Error writing document:", error)
                })
            }, 1000

          )

        }
      } catch (e) {
        console.log("error in adding product")
      }
    }
  }
  
  useEffect(() =>
    setTimeout(() => {
      setInterval(()=>{
      populateData(setProducts)
      setLoaderActive(false)
      },2000)
    }, 2000)
    , []
  )
  return (
    <>
      {user.loggedIn && user.role === 'admin' ?
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
              >{Msg?
                 <Message
          onDismiss={()=>setMsg(false)}
          header='Order Placed Succesfully'
        />
        :null}
                <Segment centered>

      <Dimmer active={loaderActive}>
        <Loader indeterminate>Checking Records</Loader>
      </Dimmer>
                  <Table color="red" singleLine>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Product Name</Table.HeaderCell>
                        <Table.HeaderCell>Product Price</Table.HeaderCell>
                        <Table.HeaderCell>Product Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Product Availability</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                        {!additem?
                        <Table.HeaderCell>Select to Place Order</Table.HeaderCell>
                        :null}

                      </Table.Row>

                    </Table.Header>
                    <Table.Row>
                      {additem ?
                        (
                          <>
                            <Table.Cell>
                              <Input
                                onChange={(e, { value }) => setPname(value)}
                              ></Input>
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                onChange={(e, { value }) => setPrice(value)}
                              ></Input>
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                onChange={(e, { value }) => setQuantity(value)}
                              ></Input>
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                onChange={(e, { value }) => setAvailability(value)}
                              ></Input>
                            </Table.Cell>
                          </>
                        )
                        : null
                      }
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell></Table.Cell>
                      <Table.Cell colSpan={additem ? 1 : 3}>
                        {placeOrder?
                        <Button color={'blue'} onClick={() => handlePlaceOrder()} fluid>
                          Place Order
                        </Button>:
                        <Button color={additem ? 'blue' : 'white'} onClick={(e) => handleAddItem(e)} fluid>
                          Add Item +
                        </Button>}

                      </Table.Cell>
                      <Table.Cell>

                        {additem ?
                          <Button circular color='red' onClick={(e) => setadditem(false)} >
                            Cancel
                          </Button> : null}
                      </Table.Cell>
                    </Table.Row>

                    <Table.Body>
                      {
                        products.map((product) => {
                          return (

                            <Table.Row>
                              <Table.Cell>{product.pname}</Table.Cell>
                              <Table.Cell>{product.price}</Table.Cell>
                              <Table.Cell>{product.quantity}</Table.Cell>
                              <Table.Cell>{product.availability ? 'yes' : 'no'}</Table.Cell>
                              <Table.Cell><Button onClick={()=>handleDelete(product.id)} color="red" inverted icon>X</Button></Table.Cell>
                              {!additem?
                              <Table.Cell>  
                                <Checkbox onChange={(e,{checked})=>{checked?AddCheckboxItem(product.id):RemoveCheckboxItem(product.id)}} />

                              </Table.Cell>
                                :null}
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
          </Grid>) : ((user.loggedIn) ? (
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
                >
                  <Segment centered>
                  <Message
          onDismiss={()=>setMsg(false)}
          header='Order Placed Succesfully'
        />
        :null}
      <Dimmer active={loaderActive}>
        <Loader indeterminate>Checking Records</Loader>
      </Dimmer>
                    <Table color="red" singleLine>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Product Name</Table.HeaderCell>
                          <Table.HeaderCell>Product Price</Table.HeaderCell>
                          <Table.HeaderCell>Product Quantity</Table.HeaderCell>
                          <Table.HeaderCell>Product Availability</Table.HeaderCell>
                          {!additem?
                          <Table.HeaderCell>Select to Place Order</Table.HeaderCell>
                          :null}
                        </Table.Row>

                      </Table.Header>
                      <Table.Body>
                        {
                          products.map((product) => {
                            return (
                              <Table.Row>
                                <Table.Cell>{product.pname}</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>{product.quantity}</Table.Cell>
                                <Table.Cell>{product.availability ? 'yes' : 'no'}</Table.Cell>
                                {!additem?
                                <Table.Cell>
                                  <Checkbox onChange={(e,{checked})=>{checked?AddCheckboxItem(product.id):RemoveCheckboxItem(product.id)}} />
                                </Table.Cell>
                                :null}
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
            </Grid>) : history.push('/'))}
    </>
  )
}
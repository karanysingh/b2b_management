import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Grid, Segment, Input, Button, Table, Tab, Checkbox, Dimmer,Loader,Message,Dropdown } from 'semantic-ui-react';
import Navbar from '../Navbar';
import { UserContext } from '../../Context/UserContext'
import firebase from 'firebase';
import populateData from '../../utils/populateData';
import shopData from '../../utils/shopData.js'

export default function Main() {
  const [user] = useContext(UserContext)
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
  const [accountsdata,setaccountsdata] = useState([{name:"guest", role:"retail",email:"xyz@gmail.com"}])

  const db = firebase.firestore();

  const history = useHistory()
 
  const handleDelete = (docid) => {
    setLoaderActive(true)
    db.collection("users").doc(docid).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }
  
  const ElevatePriv = (docid,priv) => {
    var userRef = db.collection('users').doc(docid);

    userRef.set({
        role:priv
    }, { merge: true });

  }

  const populateAccountsData = () => {
    var arr = []
    db.collection("users").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
          arr.push({...doc.data(),id:doc.id})
          // console.log(arr)
        }
        );

        setTimeout(()=>{
          setaccountsdata(arr)
        }
          , 1000
        )
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
  const roleOptions = [
    { key: 1, text: 'Retail', value: 'retail' },
    { key: 2, text: 'Admin', value: 'admin' },
  ]
  
  useEffect(() =>
    setTimeout(() => {
      setInterval(()=>{
      populateAccountsData()
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
              >{
                Msg?
                 <Message
          onDismiss={()=>setMsg(false)}
          header='Order Placed Succesfully'
        />
        :null
        }
                <Segment centered>

      <Dimmer active={loaderActive}>
        <Loader indeterminate>Checking Records</Loader>
      </Dimmer>
                  <Table color="red" singleLine>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>User Name</Table.HeaderCell>
                        <Table.HeaderCell>User Email</Table.HeaderCell>
                        <Table.HeaderCell>User Role</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                        {/* {!additem?
                        <Table.HeaderCell>Select to Place Order</Table.HeaderCell>
                        :null} */}

                      </Table.Row>

                    </Table.Header>

                    <Table.Body>
                      {
                        accountsdata.map((account) => {
                          return (

                            <Table.Row>
                              <Table.Cell>{account.name}</Table.Cell>
                              <Table.Cell>{account.email}</Table.Cell>
                              <Table.Cell>
                                  <Dropdown
                                    onChange={(e,{value})=>{
                                        ElevatePriv(account.id,value)
                                    }}
                                    options={roleOptions}
                                    placeholder={account.role}
                                    selection
                                    value={account.role}
                                />
                              </Table.Cell>
                              <Table.Cell><Button onClick={()=>handleDelete(account.id)} color="red" inverted icon>X</Button></Table.Cell>
                              {/* {!additem?
                              <Table.Cell>  
                                <Checkbox onChange={(e,{checked})=>{checked?AddCheckboxItem(product.id):RemoveCheckboxItem(product.id)}} />

                              </Table.Cell>
                                :null} */}
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
          </Grid>) : history.push('/')}
    </>
  )
}
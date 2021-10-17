// import { UserContext } from '../Context/UserContext'
import firebase from 'firebase';

const db = firebase.firestore();

async function populateData(setProducts){
    // const [user, setUser,products,setProducts] = useContext(UserContext)

    var arr = []
    db.collection("products").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
          arr.push({...doc.data(),id:doc.id})
          // console.log(arr)
        }
        );

        setTimeout(()=>{
          setProducts(arr)
        }
          , 1000
        )
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
export default populateData;
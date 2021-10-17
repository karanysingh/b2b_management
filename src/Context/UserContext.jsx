import React, { useState } from 'react'
import shopData from '../utils/shopData.js'

export const UserContext = React.createContext()
// export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export const UserProvider = props => {
    const [user, setUser] = useState([{ name: 'guest', loggedIn: false, role: 'guest', uid: '101' }])
    const [products, setProducts] = useState(shopData)
    return <UserContext.Provider
        value={[user,setUser,products,setProducts]}
    >{props.children}
    </UserContext.Provider>
}

import React, { useState } from 'react'


export const UserContext = React.createContext()

// export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export const UserProvider = props => {
    const [user, setUser] = useState([{ name: 'guest', loggedIn: false, role: 'guest', uid: '101' }])
    return <UserContext.Provider
        value={[user,setUser]}
    >{props.children}
    </UserContext.Provider>
}

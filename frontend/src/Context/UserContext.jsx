import React, { useState, createContext } from "react"

export const UserContext = createContext();

export default function UserProvider(props) {
  const [user, setUser] = useState({
    isLogged: false,
    id: null
  })

  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  )
}
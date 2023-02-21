import React, { useState, createContext, useEffect } from "react"

export const UserContext = createContext();

export default function UserProvider(props) {
  const [user, setUser] = useState({
    isLogged: false,
    id: null
  })

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token !== null) {
      fetch("http://localhost:3000/api/login/checkToken", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
      }).then(response => {
        return response.json()

      })
        .then(data => setUser({ isLogged: true, id: data.user.id }))
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
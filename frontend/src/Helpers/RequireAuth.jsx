import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children, withAuth }) {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token !== null) {
      fetch('http://localhost:3000/api/login/checkToken', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.status === 200) {
            setUser({
              isLogged: true,
              id: res.user.id,
            });

          } else {
            setRedirect(true);
          }
        })
        .catch(err => console.log("non"));
    } else {
      if (withAuth) {
        setRedirect(true);
      }
    }
  }, [setUser, withAuth, token]);
  if (redirect) {
    return <Navigate to='/signin' />;
  }

  return <>{children}</>;
}

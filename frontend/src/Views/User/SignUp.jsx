/* eslint-disable import/no-anonymous-default-export */
import React, {useState} from "react"
import { Navigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignUp() {
  const [redirect, setRedirect] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("confirm_password")) {
      return;
    }
    const dataObj = {
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      confirm_password: data.get('password')
    };
    // check if email already exists
    const res = await fetch(`http://localhost:3306/api/users?email=${data.get('email')}`, {method:'GET'});
    if(!res.ok){
      // handle error, email already exists
    } else {
      // proceed with the post request
      const postres = await fetch('http://localhost:3306/api/users/add', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers:{ 'Content-Type': 'application/json' }
      });
      // console.log(dataObj)
      if (postres.ok) {
        setRedirect(true);
      } else {
        // handle error
        const json = await postres.json()
        if(postres.status === 422){
        // handle error, email already exists
          console.log("email already exists");
        }else{
          console.log("error adding user");
        }
      }
    }
  };

  if (redirect) {
    return <Navigate to='/login' />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirmer votre mot de passe"
                  type="password"
                  id="confirm_password"
                  autoComplete="new-password"
                />
              </Grid>
              </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./Login" variant="body2">
                Déjà enregistré ? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

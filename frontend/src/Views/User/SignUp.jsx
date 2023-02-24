/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FormField } from './FormField';

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
	const [redirect, setRedirect] = useState(false);
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		if (data.get('password') !== data.get('confirm_password')) {
			return;
		}

		// utilise le token pour effectuer la req de creation user
		const dataObj = {
			first_name: data.get('firstName'),
			last_name: data.get('lastName'),
			email: data.get('email'),
			password: data.get('password'),
			confirm_password: data.get('password'),
		};
		// check if email already exists
		const res = await fetch(`http://localhost:3000/api/users?email=${data.get('email')}`, {
			method: 'GET',
		});
		if (!res.ok) {
			// handle error, email already exists
		} else {
			// proceed with the post request
			const token = localStorage.getItem('token');
			const postres = await fetch('http://localhost:3000/api/users/add', {
				method: 'POST',
				body: JSON.stringify(dataObj),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (postres.ok) {
				setRedirect(true);
			} else {
				// handle error
				const json = await postres.json();
				if (postres.status === 422) {
					// handle error, email already exists
					console.log('email already exists');
				} else {
					console.log('error adding user');
				}
			}
		}
	};

	if (redirect) {
		return <Navigate to='/login' />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
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
						<LockOutlinedIcon
							sx={{
								fontSize: 50,
								backgroundColor: '#15684C',
								padding: '10px',
								borderRadius: '50px',
								color: 'white',
							}}
						/>
					</Avatar>
					<Typography
						component='h1'
						variant='h5'
						sx={{ color: '#117A5D', fontFamily: 'Time new roman' }}
					>
						Inscription
					</Typography>
					<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<FormField/>							
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{
								mt: 3,
								mb: 2,
								marginBottom: '10px',
								bgcolor: '#117A5D',
								':hover': {
									bgcolor: '#fff',
									color: '#117A5D',
									border: '1px solid #117A5D',
								},
								fontFamily: 'Time new roman',
							}}
						>
							S'inscrire
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link
									href='./Login'
									variant='body2'
									sx={{ color: '#117A5D', fontFamily: 'Time new roman' }}
								>
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

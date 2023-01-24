import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, FormControl, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { UserContext } from './UserContext';

export default function Login() {
	const [logs, setLogs] = useState({
		email: '',
		password: '',
	});

	const [redirect, setRedirect] = useState(false);
	// const { user, setUser } = useContext(UserContext);

	const handleChange = (event) => {
		const fieldName = event.target.name;
		const fieldValue = event.target.value;

		const inputedLogs = { [fieldName]: fieldValue };
		setLogs({ ...logs, ...inputedLogs });
	};

	const handleSubmit = () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(logs),
		};
		fetch('http://localhost:3306/api/login', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				// localStorage.setItem('token', data.token);
				// setUser({ isLogged: true, _id: data.user._id });
				setRedirect(true);
			});
	};

	if (redirect) {
		return <Navigate to='/' />;
	}

	return (
		<Box
			sx={{
				margin: 'auto',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<LockOutlinedIcon
				sx={{
					fontSize: 50,
					backgroundColor: 'green',
					padding: '10px',
					borderRadius: '50px',
					color: 'white',
				}}
			/>
			<Typography variant='h6'>Connexion</Typography>

			<FormControl>
				<TextField
					id='outlined-basic'
					label='Email address'
					name='email'
					variant='outlined'
					helperText=''
					sx={{ margin: '10px 0 5px 0' }}
					onChange={handleChange}
					required
				/>
				<TextField
					id='outlined-basic'
					label='Password'
					variant='outlined'
					name='password'
					helperText=''
					sx={{ margin: '5px 0 10px 0' }}
					onChange={handleChange}
					required
				/>
				<Button onClick={handleSubmit} variant='contained' sx={{ marginBottom: '10px' }}>
					Se connecter
				</Button>
			</FormControl>
			<Link href='/passwordReset'>Mot de passe oublié ?</Link>
			<Link href='/register'>Pas encore de compte ? Inscrivez-vous</Link>
		</Box>
	);
}

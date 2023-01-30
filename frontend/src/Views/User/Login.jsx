import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, FormControl, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
	const [logs, setLogs] = useState({
		email: '',
		password: '',
	});

	const [redirect, setRedirect] = useState(false);
	const { user, setUser } = useContext(UserContext);

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

		fetch('http://localhost:3000/api/users/login', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				localStorage.setItem('token', data.token);
				localStorage.setItem('user', JSON.stringify({ id: data.user.id, isLogged: true }));
				setUser({ isLogged: true, id: data.user.id });
				window.location.href = '/';
			});
	};

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
					backgroundColor: '#15684C',
					padding: '10px',
					borderRadius: '50px',
					color: 'white',
				}}
			/>
			<Typography variant='h6' sx={{ color: '#117A5D', fontFamily: 'Time new roman' }}>
				Connexion
			</Typography>

			<FormControl>
				<TextField
					id='outlined-basic'
					label='Email address'
					name='email'
					variant='outlined'
					helperText=''
					sx={{
						margin: '10px 0 5px 0',
						label: { color: '#117A5D', fontFamily: 'Time new roman' },
						input: { color: '#117A5D', fontFamily: 'Time new roman' },
						fielset: { color: '#117A5D' },
					}}
					onChange={handleChange}
					required
				/>
				<TextField
					id='outlined-basic'
					label='Password'
					type='password'
					variant='outlined'
					name='password'
					helperText=''
					sx={{
						margin: '5px 0 10px 0',
						label: { color: '#117A5D', fontFamily: 'Time new roman' },
						input: { color: '#117A5D', fontFamily: 'Time new roman' },
						fielset: { color: '#117A5D' },
					}}
					onChange={handleChange}
					required
				/>
				<Button
					onClick={handleSubmit}
					variant='contained'
					sx={{
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
					Se connecter
				</Button>
			</FormControl>
			<Link href='/passwordReset' sx={{ color: '#117A5D' }}>
				Mot de passe oublié ?
			</Link>
			<Link href='/register' sx={{ color: '#117A5D' }}>
				Pas encore de compte ? Inscrivez-vous
			</Link>
		</Box>
	);
}

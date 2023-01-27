import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../Context/UserContext'
import { Box, AppBar, Toolbar, Link, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../Assets/logo.png';

export default function Header(props) {
	const {user} = useContext(UserContext);
	const [firstName, setFirstName] = useState();

	useEffect(() => {
		if (user.id !== null) {
			fetch('http://localhost:3000/api/users/' + user.id)
				.then((res) => res.json())
				.then((user) => {
					let firstName = user.first_name.toLowerCase();
					firstName = firstName[0].toUpperCase() + firstName.substr(1);
					setFirstName(firstName);
				})
				.catch((err) => console.error(err));
		}
	});
	return (
		<Box sx={{ marginBottom: 5 }}>
			<AppBar position='static' sx={{ backgroundColor: '#117A5D' }}>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						flexWrap: 'wrap',
						width: '90%',
						maxWidth: '1200px',
						margin: 'auto',
					}}
				>
					<Box sx={{ flex: 1 }}>
						<Link href='/' sx={{ color: 'white' }}>
							<img src={logo} alt='Recycle-rat logo' style={{ width: 50 }} />
						</Link>
					</Box>

					{user.isLogged && (
						<Box sx={{ display: 'flex', marginLeft: 'auto' }}>
							<Link href='/profile'>
								<Typography sx={{ margin: '0 15px', color: 'white' }}>{firstName}</Typography>
							</Link>
							<Link href='/cart'>
								<ShoppingCartIcon sx={{ margin: '0 15px', color: 'white' }} />
							</Link>
							<Link onClick={() => alert('tu es pas déconnecté.e / fonction à faire bisou')}>
								<LogoutIcon sx={{ margin: '0 15px', color: 'white' }} />
							</Link>
						</Box>
					)}

					{!user.isLogged && (
						<Box sx={{ flex: 1, textAlign: 'end' }}>
							<Button color='inherit' href='/signup'>
								INSCRIPTION
							</Button>
							<Button color='inherit' href='/login'>
								CONNEXION
							</Button>
						</Box>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

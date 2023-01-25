import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Link, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../Assets/logo.png';

export default function Header() {
	// à remplacer par {user} = useContext(UserContext)
	const [user, setUser] = useState({
		id: 1,
		isLogged: true,
	});
	const [firstName, setFirstName] = useState();

	useEffect(() => {
		if (user.id !== null) {
			fetch('http://localhost:3000/api/users/' + user.id)
				.then((res) => res.json())
				.then((user) => {
					let firstName = user[0].first_name.toLowerCase();
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
							<img src={logo} alt='Recycle-rat logo' style={{ height: 50 }} />
						</Link>
					</Box>

					{/* Provisoire */}
					<Link sx={{ margin: '0 15px', color: 'white' }} href='/orders'>
						<Typography>ORDERS</Typography>
					</Link>

					{user.isLogged && (
						<Box sx={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
							<Link href='/profile' sx={{ margin: '0 15px', color: 'white' }}>
								<Typography>{firstName}</Typography>
							</Link>
							<Link href='/cart' sx={{ margin: '0 15px', color: 'white' }}>
								<ShoppingCartIcon />
							</Link>
							<Link
								onClick={() => alert('tu es pas déconnecté.e / fonction à faire bisou')}
								sx={{ margin: '0 15px', color: 'white' }}
							>
								<LogoutIcon />
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

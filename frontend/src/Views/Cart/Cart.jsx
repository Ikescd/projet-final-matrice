import React, { useState, useEffect } from 'react';
import { Box, Link, Typography } from '@mui/material';

import CartList from './CartList';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function Cart() {
	const [cart, setCart] = useState(() => {
		const localCart = localStorage.getItem('cart');
		return localCart ? JSON.parse(localCart) : [];
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
		setIsLoading(false);
	}, [cart]);

	return (
		<Box sx={{ width: '75%', margin: '50px auto' }}>
			<Link href='/' sx={{ display: 'flex' }}>
				<KeyboardArrowLeftIcon />
				<Typography>Retour à l'accueil</Typography>
			</Link>

			<Typography variant='h5' sx={{ textAlign: 'center', margin: '50px' }}>
				Mon panier
			</Typography>

			{isLoading ? <Typography>Chargement de votre panier...</Typography> : <CartList />}
			{!isLoading && cart.length == 0 && (
				<Typography>Il n'y a rien dans votre panier. Voulez-vous faire quelques achats ?</Typography>
			)}
		</Box>
	);
}

export default Cart;

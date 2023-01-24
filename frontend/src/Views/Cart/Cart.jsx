import React, { useState, useEffect } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';

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

	const updateProduct = (productId, updatedQuantity) => {
		setCart((prevCart) =>
			prevCart.map((prod) => {
				if (prod.product_id === productId) {
					return { ...prod, quantity: updatedQuantity };
				}
				return prod;
			})
		);
	};

	const removeProduct = (/*product*/) => {
		console.log('remove');
		// setProductDetails((prevProducts) => prevProducts.filter((prod) => prod.id !== product));
		// setCart(cart.filter((prod) => prod.product !== product));
	};

	return (
		<Box sx={{ width: '75%', margin: '50px auto' }}>
			<Box id='goToHomepage'>
				<Link href='/' sx={{ display: 'flex' }}>
					<KeyboardArrowLeftIcon />
					<Typography>Retour à l'accueil</Typography>
				</Link>
			</Box>

			<Box id='cartContainer'>
				<Typography variant='h5' sx={{ textAlign: 'center', margin: '50px' }}>
					Mon panier
				</Typography>

				{!isLoading && <CartList cart={cart} onUpdate={updateProduct} onRemove={removeProduct} />}

				{isLoading && <Typography>Chargement de votre panier...</Typography>}
				{!isLoading && cart.length == 0 && (
					<Typography>
						Il n'y a rien dans votre panier. Voulez-vous faire quelques achats ?
					</Typography>
				)}

				<Button>Passer la commande</Button>
			</Box>
		</Box>
	);
}

export default Cart;

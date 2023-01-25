import React, { useState, useEffect } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import CartList from './CartList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function Cart() {
	const [cart, setCart] = useState(() => {
		const localCart = localStorage.getItem('cart');
		return localCart ? JSON.parse(localCart) : [];
	});
	const [productsToOrder, setProductsToOrder] = useState();
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

	const removeProduct = (productId) => {
		console.log('remove');

		setCart(cart.filter((prod) => prod.product_id !== productId));
	};

	return (
		<Box sx={{ margin: '0 auto' }}>
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

				{!isLoading && (
					<CartList
						cart={cart}
						onUpdate={updateProduct}
						onRemove={removeProduct}
						productsToOrder={productsToOrder}
						setProductsToOrder={setProductsToOrder}
					/>
				)}

				{isLoading && <Typography>Chargement de votre panier...</Typography>}

				{!isLoading && cart.length == 0 && (
					<Typography>
						Il n'y a rien dans votre panier. Voulez-vous faire quelques achats ?
					</Typography>
				)}

				<Button href='/to-order'>Passer la commande</Button>
			</Box>
		</Box>
	);
}

export default Cart;

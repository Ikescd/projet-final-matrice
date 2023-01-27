import React, { useState, useEffect } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import CartList from './CartList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function Cart() {
	const [cart, setCart] = useState(() => {
		const localCart = localStorage.getItem('cart');
		return localCart
			? JSON.parse(localCart)
			: [
					{ product_id: 1, quantity: 2 },
					{ product_id: 5, quantity: 1 },
					{ product_id: 8, quantity: 1 },
			  ];
	});
	const [isLoading, setIsLoading] = useState(true);

	let products = [];

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
		setIsLoading(false);
		cart.map((el) => {
			fetch('http://localhost:3000/api/products/' + el.product_id)
				.then((res) => res.json())
				.then((data) => console.log(data.result[0]))
				.then((err) => console.error(err));
		});
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
		<Box sx={{ margin: '50px auto' }}>
			<Box id='goToHomepage'>
				<Link href='/' sx={{ display: 'flex' }}>
					<KeyboardArrowLeftIcon />
					<Typography>Retour à l'accueil</Typography>
				</Link>
			</Box>

			{/* <Box id='cartContainer'>
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

				<Button href='/to-order'>Passer la commande</Button>
			</Box> */}
		</Box>
	);
}

export default Cart;

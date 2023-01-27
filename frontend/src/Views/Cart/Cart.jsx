import React, { useState, useEffect } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { Link as LinkDOM } from 'react-router-dom';
import CartList from './CartList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function Cart() {
	const [cart, setCart] = useState(() => {
		const localCart = localStorage.getItem('cart');
		return localCart
			? JSON.parse(localCart)
			: [
					/* Uncomment to add a dummy cart */
					// { product_id: 1, quantity: 2 },
					// { product_id: 5, quantity: 1 },
					// { product_id: 8, quantity: 1 },
			  ];
	});
	const [isLoading, setIsLoading] = useState(true);
	const [totalCart, setTotalCart] = useState([]);
	const [productsInCart, setProductsInCart] = useState([]);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
		setIsLoading(false);
		let productsList = [];

		let total = 0;
		cart.map((el) => {
			fetch('http://localhost:3000/api/products/' + el.product_id)
				.then((res) => res.json())
				.then((data) => {
					let totalProd = data[0].price * el.quantity;
					total = total + totalProd;
					productsList.push({ product: data[0], buyingQuantity: el.quantity });
					setProductsInCart(productsList);
					setTotalCart(total);
				})
				.catch((err) => console.error(err));
			return el;
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
		<Box sx={{ margin: '0 auto' }}>
			<Box id='goToHomepage'>
				<Link href='/' sx={{ display: 'flex', textDecoration: 'none' }}>
					<KeyboardArrowLeftIcon sx={{ color: '#117A5D' }} />
					<Typography sx={{ color: '#117A5D' }}>Retour à l'accueil</Typography>
				</Link>
			</Box>

			<Box id='cartContainer'>
				<Typography variant='h5' sx={{ textAlign: 'center', margin: '50px' }}>
					Mon panier
				</Typography>

				{/* Panier en cours de chargement */}
				{isLoading && <Typography>Chargement de votre panier...</Typography>}

				{/* Panier chargé, mais vide  */}
				{!isLoading && cart.length === 0 && (
					<Typography>
						Il n'y a rien dans votre panier. Voulez-vous faire quelques achats ?
					</Typography>
				)}

				{/* Panier chargé et non-vide  */}
				{!isLoading && (
					<>
						<CartList cart={cart} onUpdate={updateProduct} onRemove={removeProduct} />

						<Typography sx={{ textAlign: 'center', marginTop: '25px' }}>
							Total de la commande : {totalCart / 100} €
						</Typography>

						<LinkDOM
							to='/to-order'
							state={{ products: productsInCart, total: totalCart }}
							style={{
								textDecoration: 'none',
								display: 'flex',
								justifyContent: 'center',
								margin: '15px',
							}}
						>
							<Button variant='contained' sx={{ backgroundColor: '#117A5D' }}>
								Passer la commande
							</Button>
						</LinkDOM>
					</>
				)}
			</Box>
		</Box>
	);
}

export default Cart;

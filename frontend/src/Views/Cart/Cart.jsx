import React, { useState, useEffect } from 'react';
import {
	Box as MUIBox,
	Button as MUIButton,
	Link as MUILink,
	Typography as MUITypo,
} from '@mui/material';
import { Link as DOMLink } from 'react-router-dom';

import CartList from './CartList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function Cart() {
	/* We retrieve the cart from localstorage */
	const [cart, setCart] = useState(() => {
		const localCart = localStorage.getItem('cart');
		return localCart
			? JSON.parse(localCart)
			: [
					/* Uncomment to add a dummy cart */
					{ product_id: 1, quantity: 2 },
					{ product_id: 5, quantity: 1 },
					{ product_id: 8, quantity: 1 },
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

		/* 
    For each product in cart, we fetch the correct data and push it on "productsInCart",
    this variable we'll be used to create the order.
    We also calculate the total amount of cart.
    */
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
		setCart(cart.filter((prod) => prod.product_id !== productId));
	};

	return (
		<MUIBox sx={{ margin: '0 auto' }}>
			<MUIBox id='goToHomepage'>
				<MUILink href='/' sx={{ display: 'flex', textDecoration: 'none' }}>
					<KeyboardArrowLeftIcon sx={{ color: '#117A5D' }} />
					<MUITypo sx={{ color: '#117A5D' }}>Retour à l'accueil</MUITypo>
				</MUILink>
			</MUIBox>

			<MUIBox id='cartContainer'>
				<MUITypo variant='h5' sx={{ textAlign: 'center', margin: '50px' }}>
					Mon panier
				</MUITypo>

				{/* Panier en cours de chargement */}
				{isLoading && <MUITypo>Chargement de votre panier...</MUITypo>}

				{/* Panier chargé, mais vide  */}
				{!isLoading && cart.length === 0 && (
					<MUIBox sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
						<MUITypo>Il n'y a rien dans votre panier. Voulez-vous faire quelques achats ?</MUITypo>
						<MUIButton
							variant='contained'
							sx={{
								marginTop: 5,
								backgroundColor: '#117A5D',
								color: 'white',
								':hover': { backgroundColor: '#117A5D' },
							}}
							onClick={() => (window.location.href = '/')}
						>
							Faire quelques emplettes
						</MUIButton>
					</MUIBox>
				)}

				{/* Panier chargé et non-vide  */}
				{!isLoading && cart.length >= 1 && (
					<>
						<CartList cart={cart} onUpdate={updateProduct} onRemove={removeProduct} />

						<MUITypo sx={{ textAlign: 'center', marginTop: '25px' }}>
							Total de la commande : {totalCart / 100} €
						</MUITypo>

						<DOMLink
							to='/to-order'
							state={{ products: productsInCart, total: totalCart }}
							style={{
								textDecoration: 'none',
								display: 'flex',
								justifyContent: 'center',
								margin: '15px',
							}}
						>
							<MUIButton
								variant='contained'
								sx={{
									backgroundColor: '#117A5D',
									marginBottom: '25px',
									':hover': { backgroundColor: '#117A5D' },
								}}
							>
								Passer la commande
							</MUIButton>
						</DOMLink>
					</>
				)}
			</MUIBox>
		</MUIBox>
	);
}

export default Cart;

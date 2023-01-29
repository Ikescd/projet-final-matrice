import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';

import { Box, Button, Grid, Link, Modal, TextField, Typography } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export default function ProductDetails() {
	const [product, setProduct] = useState([]);
	const params = useParams();
	const [quantity, setQuantity] = useState(1);

	const [cart, setCart] = useState(() => {
		const localCart = localStorage.getItem('cart');
		return localCart ? JSON.parse(localCart) : [];
	});

	const [newCart, setNewCart] = useState();

	useEffect(() => {
		fetch(`http://localhost:3000/api/products/${params.id}`)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data[0]);
			})
			.catch((err) => console.error(err));
	}, [params.id]);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const styleModal = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		minWidth: 340,

		bgcolor: '#fff',
		border: '1px solid #117A5D',
		borderRadius: 2,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		p: 4,
		color: '#117A5D',
	};

	const styleButton = {
		m: 1,
		bgcolor: '#117A5D',
		':hover': {
			bgcolor: '#fff',
			color: '#117A5D',
			border: '1px solid #117A5D',
		},
	};

	const addProductToCart = (id) => {
		const uniqueProduct = cart.filter((el) => el.product_id !== id);
		const newProduct = {
			product_id: id,
			quantity: parseInt(quantity),
		};
		let cartArr = uniqueProduct;
		cartArr.push(newProduct);
		setNewCart(cartArr);
		localStorage.setItem('cart', JSON.stringify(cartArr));
		handleOpen();
	};

	const handleQuantity = (event) => {
		setQuantity(event.target.value);
	};

	return (
		<>
			<Box
				sx={{
					my: 3,
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'center',
					alignItems: 'flex-start',
				}}
			>
				<Box sx={{ mx: 2, color: '#117A5D' }}>
					<Link component={RouterLink} to={'/'} underline='none' color='text.primary'>
						<Grid container direction='row' alignItems='center'>
							<Grid sx={{ mr: 2 }}>
								<ArrowCircleLeftIcon />
							</Grid>
							<Grid>
								<Typography sx={{ color: '#117A5D', fontFamily: 'Time new roman' }}>
									Retour à l'accueil
								</Typography>
							</Grid>
						</Grid>
					</Link>

					<img
						src={product.picture}
						alt={product.name}
						style={{
							height: 'auto',
							width: '340px',
							marginRight: '5px',
							borderRadius: '5px',
							border: '1px solid #117A5D',
						}}
					/>
				</Box>

				<Box sx={{ mx: 2, color: '#117A5D' }}>
					<Typography variant='h6' sx={{ my: 1, pt: 3, fontFamily: 'Time new roman' }}>
						{product.name}
					</Typography>
					<Typography variant='h6' sx={{ my: 1, fontFamily: 'Time new roman' }}>
						{(product.price / 100).toFixed(2)} €
					</Typography>

					<Typography sx={{ minWidth: 300, maxWidth: 500, fontFamily: 'Time new roman' }}>
						{product.description}
					</Typography>
					<TextField
						id='quantityNumber'
						label='Quantité'
						type='number'
						size='small'
						defaultValue='1'
						inputProps={{ min: 1, max: product.quantityInStock }}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={handleQuantity}
						sx={{
							my: 1,
							input: { color: '#117A5D', fontFamily: 'Time new roman' },
							label: { color: '#117A5D', fontFamily: 'Time new roman' },
							fieldset: { borderColor: '#117A5D' },
						}}
					/>

					<Button
						sx={styleButton}
						variant='contained'
						name={product.id}
						onClick={() => addProductToCart(product.id)}
					>
						Ajouter au panier
					</Button>
				</Box>
			</Box>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={styleModal}>
					<Box>
						<Typography
							id='modal-modal-title'
							variant='h6'
							component='h2'
							sx={{ fontFamily: 'Time new roman', textAlign: 'center' }}
						>
							Bien joué!
						</Typography>
						<Typography id='modal-modal-description' sx={{ fontFamily: 'Time new roman', mb: 2 }}>
							{product.name} ajouté au panier
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							flexWrap: 'wrap',
							alignItems: 'center',
						}}
					>
						<Link component={RouterLink} to={'/'} underline='none'>
							<Button sx={styleButton} variant='contained'>
								Continuer mes achats
							</Button>
						</Link>

						<Link component={RouterLink} to={'/cart'} underline='none'>
							<Button sx={styleButton} variant='contained'>
								Voir mon panier
							</Button>
						</Link>
					</Box>
				</Box>
			</Modal>
		</>
	);
}

import { Box, Button, TableCell, TableRow, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function CartDetails(props) {
	const [product, setProduct] = useState();
	const { id, productCart, onUpdate, onRemove } = props;

	useEffect(() => {
		fetch('http://localhost:3000/api/products/' + id)
			.then((res) => res.json())
			.then((data) => setProduct(data[0]));
	}, []);

	return (
		product !== undefined && (
			<TableRow>
				<TableCell>
					<img src={product.picture} alt={product.name} style={{ width: 150 }} />
				</TableCell>
				<TableCell>
					<Typography sx={{ fontFamily: 'Times new roman' }}>{product.name}</Typography>
					<Typography sx={{ fontFamily: 'Times new roman' }}>
						Prix à l'unité : {(product.price / 100).toFixed(2)} €
					</Typography>
				</TableCell>

				<TableCell sx={{ textAlign: 'center' }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Button
							variant='outlined'
							size='small'
							sx={{
								color: '#117A5D',
								borderColor: '#117A5D',
								':hover': {
									backgroundColor: '#117A5D',
									color: 'white',
								},
							}}
							onClick={() => onUpdate(productCart.product_id, productCart.quantity + 1)}
							disabled={productCart.quantity >= product.quantityInStock}
						>
							+
						</Button>
						<Typography sx={{ padding: '5px', fontFamily: 'Times new roman' }}>
							{productCart.quantity}
						</Typography>
						<Button
							variant='outlined'
							size='small'
							sx={{
								color: '#117A5D',
								borderColor: '#117A5D',
								':hover': {
									backgroundColor: '#117A5D',
									color: 'white',
								},
							}}
							onClick={() => onUpdate(productCart.product_id, productCart.quantity - 1)}
							disabled={productCart.quantity <= 1}
						>
							-
						</Button>
					</Box>
					<Button
						onClick={() => onRemove(productCart.product_id)}
						sx={{ color: '#117A5D', fontFamily: 'Times new roman' }}
					>
						Supprimer
					</Button>
				</TableCell>

				<TableCell sx={{ textAlign: 'right' }}>
					<Typography sx={{ fontFamily: 'Times new roman' }}>
						{((product.price * productCart.quantity) / 100).toFixed(2)} €
					</Typography>
				</TableCell>
			</TableRow>
		)
	);
}

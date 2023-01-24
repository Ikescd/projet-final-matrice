import {
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function CartDetails(props) {
	const [product, setProduct] = useState();
	const { id, productCart, onUpdate, onRemove } = props;

	useEffect(() => {
		fetch('http://localhost:3000/api/products/' + id)
			.then((res) => res.json())
			.then((data) => setProduct(data[0]));
	}, []);

	console.log(product);

	return (
		product !== undefined && (
			<>
				<TableCell>
					<img src={product.picture} alt={product.name} style={{ width: 150 }} />
				</TableCell>
				<TableCell>
					<Typography>{product.name}</Typography>
					<Typography>{product.price}</Typography>
				</TableCell>

				<TableCell>
					<Button onClick={() => onUpdate(productCart.product_id, productCart.quantity + 1)}>
						+++
					</Button>
					<Typography>{productCart.quantity}</Typography>
					<Button onClick={() => onUpdate(productCart.product_id, productCart.quantity - 1)}>
						---
					</Button>
				</TableCell>

				<TableCell>
					<Typography>TOTAL</Typography>
				</TableCell>
			</>
		)
	);
}

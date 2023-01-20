import { useEffect } from 'react';
import { useState } from 'react';
import { cart as data } from '../../Helpers/FakeData';

import {
	Link,
	Typography,
	Box,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
	TextField,
} from '@mui/material/';

import { KeyboardArrowLeft } from '@mui/icons-material';

const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

export default function Cart() {
	const [isLoading, setIsLoading] = useState(true);
	// const [cart, setCart] = useState(data);
	const [cart, setCart] = useState(data);

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((/*data*/) => {
				// setCart(data);
				setIsLoading(false);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<Box>
			<Link href='/' sx={{ display: 'flex' }}>
				<KeyboardArrowLeft />
				<Typography>Retour à l'accueil</Typography>
			</Link>

			<Typography>Mon panier</Typography>

			{isLoading && (
				<Box>
					<Typography>Vous n'avez pas encore de panier</Typography>
				</Box>
			)}

			{!isLoading && (
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Nom</TableCell>
							<TableCell>Quantité</TableCell>
							<TableCell>Total</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cart.map((el) => (
							<CartProductDetails
								product={el.product}
								quantity={el.quantityBuy}
								key={el.product.product_id}
							/>
						))}
					</TableBody>
				</Table>
			)}
			<Button>Mettre à jour le panier</Button>
			<Button>Passer la commande</Button>
		</Box>
	);
}

const CartProductDetails = (props) => {
	const { product, quantity } = props;
	const initialState = product.price * quantity;

	const [total, setTotal] = useState(initialState);

	const handleChange = (event) => {
		const newTotal = product.price * event.target.value;
		setTotal(newTotal);
	};

	return (
		<TableRow key={product.product_id}>
			<TableCell>
				<img src={product.picture} style={{ width: 150 }} />
			</TableCell>
			<TableCell>{product.name}</TableCell>
			<TableCell>
				<TextField type='number' defaultValue={quantity} onChange={handleChange} />
			</TableCell>
			<TableCell>{parseFloat(total / 100)} €</TableCell>
		</TableRow>
	);
};

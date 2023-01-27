import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useEffect } from 'react';

export default function Order(props) {
	const [user, setUser] = useState({
		id: 1,
		isLogged: true,
	});

	const [userData, setUserData] = useState();

	const addresses = {
		address_line1: '11 rue des dedes',
		address_line2: null,
		zip_code: 12345,
		city: 'Ville',
		libelle: null,
		user_id: 1,
	};

	useEffect(() => {
		if (user.id != null) {
			fetch('http://localhost:3000/api/users/' + user.id)
				.then((res) => res.json())
				.then((data) => setUserData(data[0]));
		}
		// fetch les adresses ici
	});

	const location = useLocation();
	const productsList = location.state?.products;
	const totalOrder = location.state?.total;

	return (
		<Box sx={{ width: '80%', margin: '25px auto' }}>
			<Box sx={{ display: 'flex' }}>
				<Typography>Adresse de livraison</Typography>
				<Box>
					<Typography>
						{userData.first_name} {userData.last_name}
					</Typography>
					<Typography>{addresses.address_line1}</Typography>
					<Typography>{addresses.address_line2}</Typography>
					<Typography>
						{addresses.zip_code}, {addresses.city}
					</Typography>
				</Box>
			</Box>

			<Box>Mode de paiement</Box>

			<Box>
				<Typography>Vérification et validation de votre commande</Typography>
				{productsList.map((el) => {
					const product = el.product;
					return (
						<Box sx={{ display: 'flex', margin: 5 }} key={product.id}>
							<img src={product.picture} style={{ width: 150, height: '75px', objectFit: 'cover' }} />
							<Box>
								<Typography>{product.name}</Typography>
								<Typography>Prix à l'unité : {product.price / 100} €</Typography>
							</Box>
							<Typography>Quantité : {el.buyingQuantity}</Typography>
						</Box>
					);
				})}
			</Box>
			<Box>
				<Typography>Total de la commande : {totalOrder / 100} €</Typography>
				<Button>Passer la commande et payer</Button>
			</Box>
		</Box>
	);
}

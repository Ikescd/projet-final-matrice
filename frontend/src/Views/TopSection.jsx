import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import logoWithText from '../Assets/logoWithText.png';

import { Box, Link, Typography } from '@mui/material';

const TopSection = () => {
	const [topProduct, setTopProduct] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/api/products')
			.then((res) => res.json())
			.then((data) => {
				Math.floor(Math.random() * data.length);

				setTopProduct(data[Math.floor(Math.random() * data.length)]);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', height: '300px', margin: '50px 0' }}>
			<Box
				sx={{
					backgroundColor: '#ECF0C6',
					flex: 1,
					textAlign: 'center',
					padding: '25px',
					borderRadius: '5px',
				}}
			>
				<img src={logoWithText} style={{ width: 150, marginBottom: '25px', margin: '10px auto' }} />
				<Typography
					sx={{
						textAlign: 'center',
						fontSize: '1.2em',
						color: '#117A5D',
						fontFamily: 'Time new roman',
						mx: 2,
					}}
				>
					Bienvenue sur le site de <strong>Recycle-RAT</strong>, le paRATdis des écolos à petits
					budgets !
				</Typography>
			</Box>

			<Box
				sx={{ flex: 1, margin: '0 0 0 10px ', overflow: 'hidden', cursor: 'pointer' }}
				onClick={() => {
					window.location.href = `/products/${topProduct.id}`;
				}}
			>
				<img
					src={topProduct.picture}
					style={{
						border: '1px solid #117A5D',
						borderRadius: 5,
						objectFit: 'cover',
						height: '80%',
						width: '100%',
					}}
				/>
				<Typography
					sx={{
						fontSize: '1em',
						color: '#117A5D',
						fontFamily: 'Time new roman',
						flex: 1,
						fontWeight: 'bold',
					}}
				>
					{topProduct.name}
				</Typography>

				<Typography sx={{ color: '#117A5D', fontFamily: 'Time new roman' }}>
					{(topProduct.price / 100).toFixed(2)} €
				</Typography>
			</Box>
		</Box>
	);
};

export default TopSection;

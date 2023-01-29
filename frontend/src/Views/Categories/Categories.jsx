import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Card, CardContent, CardMedia, Link, Typography } from '@mui/material';

export default function Categories() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/api/categories')
			.then((res) => res.json())
			.then((data) => {
				setCategories(data);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<Box sx={{ borderTop: ' thick double #117A5D', padding: '25px 0 50px 0' }}>
			<Typography
				variant='h4'
				sx={{ color: '#117A5D', fontFamily: 'Time new roman', margin: 2, textAlign: 'center' }}
			>
				Catégories
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
				{categories.map((category) => (
					<Card sx={{ margin: 2, width: 150, height: 150 }} key={category.id}>
						<Link component={RouterLink} to={`/categories/${category.id}`} underline='none'>
							<CardMedia component='img' sx={{ height: '80px' }} image={category.picture} />
							<CardContent
								sx={{
									bgcolor: '#117A5D',
								}}
							>
								<Typography
									gutterBottom
									variant='h5'
									component='div'
									sx={{
										fontFamily: 'Time new roman',
										color: '#fff',
									}}
								>
									{category.name}
								</Typography>
							</CardContent>
						</Link>
					</Card>
				))}
			</Box>
		</Box>
	);
}

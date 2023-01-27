import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export default function Order(props) {
	const location = useLocation();
	const productsList = location.state?.products;
	const totalOrder = location.state?.total;

	productsList.map((el) => console.log(el));
	return (
		<Box>
			<Typography>Total de la commande : {totalOrder / 100} €</Typography>
			{productsList.map((el) => {
				const product = el.product;
				return <Box>{product.name}</Box>;
			})}
		</Box>
	);
}

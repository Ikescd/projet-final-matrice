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

import CartDetails from './CartDetails';

export default function CartList(props) {
	const { cart, onUpdate, onRemove } = props;

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell colSpan={2} sx={{ textAlign: 'center' }}>
						<Typography sx={{ fontFamily: 'Times new roman', fontSize: '1.50em' }}>
							Produit
						</Typography>
					</TableCell>
					<TableCell sx={{ width: 150, textAlign: 'center' }}>
						<Typography sx={{ fontFamily: 'Times new roman', fontSize: '1.50em' }}>
							Quantité
						</Typography>
					</TableCell>
					<TableCell sx={{ textAlign: 'right' }}>
						<Typography sx={{ fontFamily: 'Times new roman', fontSize: '1.50em' }}>Prix</Typography>
					</TableCell>
				</TableRow>
			</TableHead>

			<TableBody>
				{cart.map((element) => {
					return (
						<CartDetails
							key={element.product_id}
							id={element.product_id}
							onUpdate={onUpdate}
							onRemove={onRemove}
							productCart={element}
						/>
					);
				})}
			</TableBody>
		</Table>
	);
}

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
					<TableCell colSpan={2}>Produit</TableCell>
					<TableCell>Quantité</TableCell>
					<TableCell>Prix total</TableCell>
				</TableRow>
			</TableHead>

			<TableBody>
				{cart.map((el) => {
					return (
						<TableRow key={el.product_id}>
							<CartDetails
								id={el.product_id}
								onUpdate={onUpdate}
								onRemove={onRemove}
								productCart={el}
							></CartDetails>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

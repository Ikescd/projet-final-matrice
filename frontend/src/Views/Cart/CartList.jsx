import {
	Table as MUITable,
	TableBody as MUITBody,
	TableCell as MUITCell,
	TableHead as MUITHead,
	TableRow as MUITRow,
	Typography as MUITypo,
} from '@mui/material';

import CartDetails from './CartDetails';

export default function CartList(props) {
	const { cart, onUpdate, onRemove } = props;

	return (
		<MUITable>
			<MUITHead>
				<MUITRow>
					<MUITCell colSpan={2} sx={{ textAlign: 'center' }}>
						<MUITypo>Produit</MUITypo>
					</MUITCell>
					<MUITCell sx={{ width: 150, textAlign: 'center' }}>
						<MUITypo>Quantité</MUITypo>
					</MUITCell>
					<MUITCell sx={{ textAlign: 'right' }}>
						<MUITypo>Prix</MUITypo>
					</MUITCell>
				</MUITRow>
			</MUITHead>

			<MUITBody>
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
			</MUITBody>
		</MUITable>
	);
}

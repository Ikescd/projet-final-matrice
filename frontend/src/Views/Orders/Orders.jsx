import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

const productsInOrder1 = [
	{
		product: {
			id: 1,
			name: 'Meuble TV en bois recyclé',
			description:
				"Faire du recyclage tout en habillant votre salon, c'est ce que vous livre ce meuble tv en bois recyclé issu de vieux bateaux de pêche.",
			item_code: null,
			price: 23050,
			quantityInStock: 4,
			picture:
				'https://www.trendymobilier.com/app/uploads/2020/07/55365-Meuble-TV-vintage-en-bois-recycle.jpg',
			category_id: 1,
		},
		buyingQuantity: 1,
	},
	{
		product: {
			id: 2,
			name: 'Jouet Van et figurines en plastique recyclé',
			description:
				'LE JOUET qui accompagne les carnets de voyage ! Dans chaque magazine, vos enfants suivent les aventure des petits Duchemin, et ils adorent…',
			item_code: null,
			price: 1500,
			quantityInStock: 10,
			picture:
				'https://lacartefrancaise.fr//wp-content/uploads/2022/10/jouet-van-plastique-recycle-1-600x437.jpg',
			category_id: 2,
		},
		buyingQuantity: 2,
	},
];
const productsInOrder2 = [
	{
		product: {
			id: 2,
			name: 'Jouet Van et figurines en plastique recyclé',
			description:
				'LE JOUET qui accompagne les carnets de voyage ! Dans chaque magazine, vos enfants suivent les aventure des petits Duchemin, et ils adorent…',
			item_code: null,
			price: 1500,
			quantityInStock: 10,
			picture:
				'https://lacartefrancaise.fr//wp-content/uploads/2022/10/jouet-van-plastique-recycle-1-600x437.jpg',
			category_id: 2,
		},
		buyingQuantity: 5,
	},
];
const ordersTEST = [
	{
		id: 1,
		status: 'Pending',
		amount: '15623',
		orderDate: '23-01-2023',
		user_id: 1,
		productsOrdered: productsInOrder1,
		addressDelivery: `
    "first_name": "Alain", 
    "last_name": "Dupont",
    "address_line1":"",
    "address_line2: null",
    "zip_code": 12300,
    `,
		addressInvoice: `
    "first_name": "Alain", 
    "last_name": "Dupont",
    "address_line1":"",
    "address_line2: null",
    "zip_code": 12300,
    `,
	},
	{
		id: 2,
		status: 'cancelled',
		amount: 123,
		orderDate: '14-01-2023',
		user_id: 1,
		productsInOrder: productsInOrder2,
		addressDelivery: `
    "first_name": "Alain", 
    "last_name": "Dupont",
    "address_line1":"",
    "address_line2: null",
    "zip_code": 12300,
    `,
		addressInvoice: `
    "first_name": "Alain", 
    "last_name": "Dupont",
    "address_line1":"",
    "address_line2: null",
    "zip_code": 12300,
    `,
	},
];

export default function Orders() {
	const [orders, setOrders] = useState();

	useEffect();
	return (
		<Box
			sx={{
				width: '80%',
				margin: '10px auto',
			}}
		>
			<Typography variant='h5' sx={{ textAlign: 'center' }}>
				Historique de mes commandes
			</Typography>

			{}
			<OrderCard />
			<OrderCard />
			<OrderCard />
		</Box>
	);
}

function OrderCard() {
	return (
		<Box sx={{ margin: '2em auto' }}>
			<Box sx={{ display: 'flex' }}>
				<p style={{ flex: 1 }}>
					Commande passée le
					<br /> 00 MOIS 0000
				</p>
				<p style={{ flex: 1 }}>
					Total :<br /> 00,00 €
				</p>
				<p style={{ flex: 1 }}>
					Livraison à : <br />
					ADDRESS
				</p>
				<p style={{ flex: 2, textAlign: 'right' }}>N° de commande : </p>
			</Box>

			<ProductsListInOrder />
		</Box>
	);
}

function ProductsListInOrder() {
	return (
		<>
			<ProductInOrderCard />
			<ProductInOrderCard />
			<ProductInOrderCard />
		</>
	);
}

function ProductInOrderCard() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<p>IMAGE PRODUIT</p>
			<p>NOM PRODUIT</p>
			<p>QUANTITE PRODUIT</p>
			<p>PRIX</p>
		</Box>
	);
}

const users = [
	{
		user_id: 1,
		first_name: 'Florian',
		last_name: 'Vilmot',
		email: 'flo@flo.com',
		password: 'florian',
		role: 'admin',
	},
	{
		user_id: 2,
		first_name: 'Cristiano',
		last_name: 'Corti',
		email: 'cricri@cricri.com',
		password: 'cristiano',
		role: 'admin',
	},
	{
		user_id: 3,
		first_name: 'Sarah',
		last_name: 'Delmas',
		email: 'dede@dede.com',
		password: 'sarah',
		role: 'admin',
	},
	{
		user_id: 4,
		first_name: 'San',
		last_name: 'Goku',
		email: 'boules-du-dragon@saiyen.com',
		password: 'kamehameha',
		role: 'user',
	},
	{
		user_id: 5,
		first_name: 'Eren',
		last_name: 'Yeager',
		email: 'jesuispascontent@rumbling.com',
		password: 'titanassaillant',
		role: 'user',
	},
	{
		user_id: 6,
		first_name: 'Livaï',
		last_name: 'Ackerman',
		email: 'jaimelaproprete@cestpropre.com',
		password: 'noregrets',
		role: 'user',
	},
];

const categories = [
	{
		id: 1,
		name: 'Ameublement',
	},
	{
		id: 2,
		name: 'Jouets',
	},
];

const products = [
	{
		id: 1,
		name: 'Meuble TV en bois recyclé',
		description: `Faire du recyclage tout en habillant votre salon, c'est ce que vous livre ce meuble tv en bois recyclé issu de vieux bateaux de pêche.`,
		item_code: '',
		price: 23050,
		quantityInStock: 4,
		picture:
			'https://www.trendymobilier.com/app/uploads/2020/07/55365-Meuble-TV-vintage-en-bois-recycle.jpg',
		// récupérée directement par la BDD.
		FK_category_id: 1,
	},
	{
		id: 2,
		name: 'Jouet Van et figurines en plastique recyclé',
		description: `LE JOUET qui accompagne les carnets de voyage ! Dans chaque magazine, vos enfants suivent les aventure des petits Duchemin, et ils adorent…
`,
		item_code: '',
		price: 1500,
		quantityInStock: 10,
		picture:
			'https://lacartefrancaise.fr//wp-content/uploads/2022/10/jouet-van-plastique-recycle-1-600x437.jpg',
		FK_category_id: 2,
	},
	{
		id: 3,
		name: 'Sous marin arrosoir de bain en plastique recyclé Green Toys',
		description: `Prenez la barre de ce sous-marin ! Immergez-le sous l'eau pour explorer le fond de la baignoire, de la piscine ou de la mer et observez l'hélice tournante. Cette embarcation robuste et stable est très ludique.`,
		item_code: '',
		price: 1400,
		quantityInStock: 15,
		picture: 'https://www.chez-les-enfants.fr/web/image/product.product/11596/image',
		FK_category_id: 2,
	},
];

const orders = [];

const cart = [
	{
		product_id: 1,
		quantity: 2,
	},
	{
		product_id: 2,
		quantity: 1,
	},
];

module.exports = { users, cart, categories, products, orders };

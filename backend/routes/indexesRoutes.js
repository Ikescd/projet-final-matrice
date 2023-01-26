const productsRoutes = require('./products/productsRoutes');
const categoriesRoutes = require('./categories/categoriesRoutes');
const ordersRoutes = require('./orders/ordersRoutes');

const indexesRoutes = (app, db) => {
	// Products routes
	productsRoutes.getAllProducts(app, db);
	productsRoutes.getOneProduct(app, db);
	productsRoutes.createProduct(app, db);

	// Categories routes
	categoriesRoutes.getAllCategories(app, db);
	categoriesRoutes.getProductsByCategory(app, db);
	categoriesRoutes.getOneCategory(app, db);
	categoriesRoutes.createCategory(app, db);

	// Orders routes
	ordersRoutes.getAllOrders(app, db);
	ordersRoutes.getOneOrder(app, db);
};

module.exports = indexesRoutes;

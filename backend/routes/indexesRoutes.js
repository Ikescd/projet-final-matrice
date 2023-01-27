const productsRoutes = require("./products/productsRoutes");
const categoriesRoutes = require("./categories/categoriesRoutes");

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
};

module.exports = indexesRoutes;

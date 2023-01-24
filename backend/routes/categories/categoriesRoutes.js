function categoriesRoutes(app, db) {
  // get all categories
  app.get("/api/categories", async (req, res) => {
    await db.query(`SELECT * FROM categories`, (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
  });

  // get products by category
  app.get("/api/category/:id", async (req, res) => {
    const id = req.params.id;

    await db.query(
      `SELECT products.id, products.name, description, item_code, price, quantityInStock, products.picture, category_id, categories.name as category_name FROM products
      INNER JOIN categories ON products.category_id=categories.id
      WHERE category_id = ?`,
      [id],
      (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
      }
    );
  });

  //Create product
  app.post("/api/category", async (req, res) => {
    if (req.body.name && req.body.picture) {
      const name = req.body.name;
      const picture = req.body.picture;

      const responseDB = await db.query(
        "INSERT INTO categories (name, picture) VALUES (?,?)",
        [name, picture],
        (err, result) => {
          if (err) throw err;
          res.json({ status: 200, result });
        }
      );
    } else {
      res.sendStatus(422);
    }
  });
}

module.exports = categoriesRoutes;

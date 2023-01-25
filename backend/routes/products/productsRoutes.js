function productsRoutes(app, db) {
  // get all products
  app.get("/api/products", async (req, res) => {
    await db.query(`SELECT * FROM products`, (err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
  });

  // get one product
  app.get("/api/products/:id", async (req, res) => {
    const id = req.params.id;

    await db.query(
      `SELECT * FROM products WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
      }
    );
  });

  //Create product
  app.post("/api/products", async (req, res) => {
    if (
      req.body.name &&
      req.body.description &&
      req.body.price &&
      req.body.quantityInStock &&
      req.body.picture
    ) {
      const name = req.body.name;
      const description = req.body.description;
      const price = req.body.price;
      const quantityInStock = req.body.quantityInStock;
      const picture = req.body.picture;
      const item_code = req.body.item_code;
      const category_id = req.body.category;

      const responseDB = await db.query(
        "INSERT INTO products (name, description, price, quantityInStock, picture, item_code, category_id) VALUES (?,?,?,?,?,?,?)",
        [
          name,
          description,
          price,
          quantityInStock,
          picture,
          item_code,
          category_id,
        ],
        (err, result) => {
          if (err) throw err;
          res.status(200).send(result);
        }
      );
    } else {
      res.sendStatus(422);
    }
  });

  //TODO : creation des routes pour supprimer ou modifier un produit
  /*
  // Update product
  app.put("/api/products/:id", async (req, res) => {});

  // Delete product
  app.delete("/api/products/:id", async (req, res) => {
    const id = req.params.id;
    await db.query(`DELETE FROM products WHERE id = ?`, [id]);
    res.status(200).send(result);
  });
  */
}

module.exports = productsRoutes;

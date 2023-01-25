function categoriesRoutes(app, db) {
  // get all categories
  app.get("/api/categories", async (req, res) => {
    await db.query(`SELECT * FROM categories`, (err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
  });

  // get products by category
  app.get("/api/category/:id/products", async (req, res) => {
    const id = req.params.id;

    await db.query(
      `SELECT * FROM products WHERE category_id = ?`,
      [id],
      (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
      }
    );
  });

  // get one category
  app.get("/api/category/:id", async (req, res) => {
    const id = req.params.id;

    await db.query(
      `SELECT * FROM categories WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
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
          res.status(200).send(result);
        }
      );
    } else {
      res.sendStatus(422);
    }
  });
}

module.exports = categoriesRoutes;

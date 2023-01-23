function productsRoutes(app, db) {
  // get all products
  app.get("/api/products", async (req, res) => {
    await db.query(`SELECT * FROM products`, (err, result) => {
      if (err) throw err;
      res.json({ status: 200, result });
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
        res.json({ status: 200, result });
      }
    );
  });

  //Create product
  app.post("/api/products", async (req, res) => {});

  // Update product
  app.put("/api/products/:id", async (req, res) => {});

  // Delete product
  app.delete("/api/products/:id", async (req, res) => {
    const id = req.params.id;
    const responseDB = await db.query(`DELETE FROM products WHERE id = ?`, [
      id,
    ]);
    res.json({ status: 200, responseDB });
  });
}

module.exports = productsRoutes;

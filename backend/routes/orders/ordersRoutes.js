function getAllOrders(app, db) {
	app.get('/api/orders', async (req, res) => {
		await db.query('SELECT * FROM orders', (error, result) => {
			if (error) throw error;
			else res.status(200).send(result);
		});
	});
}

function getOneOrder(app, db) {
	app.get('/api/orders/:id', async (req, res) => {
		const id = req.params.id;

		await db.query('SELECT * FROM orders WHERE id=?', [id], (error, result) => {
			res.status(200).send(result);
		});
	});
}

module.exports = { getAllOrders, getOneOrder };

require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const withAuth = require('./withAuth');

function usersRoutes(app, connection) {
	const secretKey = process.env.SECRET_KEY;
	//Create new user
	app.post('/api/users/add', async (req, res) => {
		const hash = await bcrypt.hash(req.body.password, 10);

		const first_name = req.body.first_name;
		const last_name = req.body.last_name;
		const email = req.body.email;
		const password = hash;
		const role = 'user';

		const responseDB = await connection.query(
			'INSERT INTO users ( first_name, last_name, email, password, role) VALUES (?,?,?,?,?)',
			[first_name, last_name, email, password, role]
		);
		res.status(200).send(responseDB);
	});

	app.post('/api/users/login', async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;

		const user = await connection.query('SELECT * from users WHERE email=?', [req.body.email]);

		// verify the user
		await connection.query('SELECT * FROM users WHERE email = ? ', [email], (err, result) => {
			let user = result[0];
			console.log('dans le login backend');
			if (!user) {
				return res.status(401).send({ message: 'Invalid email' });
			}
			bcrypt.compare(password, user.password).then((match) => {
				if (!match) {
					return res.status(401).json({ message: 'Invalid password' });
				}
				const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '24h' });
				res.json({ status: 200, token: token, user: user });
			});
		});
	});

	app.get('/api/login/checkToken', withAuth, async (req, res) => {
		const id = req.body.id;

		await connection.query('SELECT * FROM users WHERE id = ? ', [id], (err, result) => {
			let user = result[0];
			if (user === null || user === undefined)
				return res.status(400).send({ message: 'User not found' });
			else res.status(200).json({ message: 'token ok', user: user });
		});
	});

	//Read all users
	app.get('/api/users', (req, res) => {
		connection.query(`SELECT * FROM users`, (err, result) => {
			if (err) throw err;
			return res.status(200).json(result);
		});
	});

	//Read one user
	app.get('/api/users/:id', async (req, res) => {
		const id = req.params.id;

		await connection.query(`SELECT * FROM users WHERE id = ?`, [id], (err, result) => {
			let user = result[0];
			if (user === null || user === undefined) return res.status(400).send('User not found');
			else {
				res.status(200).send(user);
			}
		});
	});

	//Update one user(TODO)
	app.put('/api/users/:id', (req, res) => {});

	//Delete one user
	app.delete('/api/users/:id', async (req, res) => {
		const id = req.params.id;
		const responseDB = await connection.query(`DELETE FROM users WHERE id = ?`, [id]);
		res.status(200).send({ message: 'User deleted' });
	});
}

module.exports = usersRoutes;

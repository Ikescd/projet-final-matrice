require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql');

const cors = require('cors');
const { users } = require('../frontend/src/Helpers/FakeData');

const corsOptions = {
	origin: '*',
	credentials: true,
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

const connectionOptions = {
	host: 'localhost',
	database: 'recycle_rat',
	user: 'root',
	password: '',
};

const connection = mysql.createConnection(connectionOptions);
connection.connect();

app.get('/', (req, res) => {
	res.send('oui');
});

app.get('/api/users', (req, res) => {
	connection.query('SELECT * FROM users', (err, result) => {
		if (err) return res.sendStatus(400);
		return res.send(result);
	});
});

app.get('/api/products', (req, res) => {
	connection.query('SELECT * FROM products', (err, result) => {
		if (err) return res.sendStatus(400);
		return res.send(result);
	});
});

app.get('/api/products/:id', (req, res) => {
	connection.query('SELECT * FROM products WHERE id=' + req.params.id, (err, result) => {
		if (err) return res.sendStatus(400);
		return res.send(result);
	});
});

app.listen(port, () => {
	console.log('bien connecté');
});

require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql');

const cors = require('cors');

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

app.get('/users', (req, res) => {
	connection.query('SELECT * FROM users', (err, result) => {
		if (err) return res.sendStatus(400);
		return res.send(result);
	});
});

app.listen(3000, () => {
	console.log('bien connecté');
});

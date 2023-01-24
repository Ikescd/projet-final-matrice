require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql');

const cors = require('cors');

const usersRoutes = require ('./routes/usersRoutes')

const corsOptions = {
	origin: '*',
	credentials: true,
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 8080;

const connectionOptions = {
	host: 'localhost',
	database: 'recycle_rat',
	user: 'root',
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT
};

const connection = mysql.createConnection(connectionOptions);
connection.connect();

app.get('/', (req, res) => {
	res.send('oui');
});

usersRoutes(app, connection)

// app.get("/api/users", (req, res) => {
// 	 connection.query(
// 	  `SELECT * FROM users`,
// 	  (err, result) => {
// 		// if (err) throw err;
// 		// console.log(result);
// 		return res.status(200).json(result);
// 	  }
// 	);
//   });


app.listen(port, () => {
	console.log('bien connecté');
});

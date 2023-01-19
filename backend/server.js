const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();
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
	console.log('oui');
	res.send('oui');
});

app.listen(3000, () => {
	console.log('bien connecté');
});

// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// require("dotenv").config();
// const cors = require("cors");
// const usersRoutes = require('./routes/users_routes');

// const corsOptions = {
//     origin: 'http://localhost:5173/'
// }

// app.use(cors(corsOptions));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// const port = process.env.PORT || 5000;

// const connectionOptions = {
//     host : 'localhost',
//     database : 'Vagabond',
//     user : 'root',
//     password : 'root',
//     port : 8889
// }

// const connection = mysql.createConnection(connectionOptions)
//         connection.connect(
//             function(error){
//                 if(error)
//                 {
//                     throw error;
//                 }
//                 else
//                 {
//                     console.log('MySQL Database is connected Successfully');
//                 }
//             }
//         )
//         usersRoutes.getAllUsers(app);
//         usersRoutes.createUser(app, connection)

// app.listen(5000, ()=> {
//     console.log(Serveur connecté sur le port : ${port});
// });

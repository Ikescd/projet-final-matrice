require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql');

const cors = require('cors');

const indexesRoutes = require('./routes/indexesRoutes')


const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/api/login/checkToken", withAuth, usersRoutes);


const port = process.env.PORT || 3000;

const connectionOptions = {
  host: 'localhost',
  database: 'recycle_rat',
  user: 'root',
  password: process.env.DB_PASSWORD,
  // cristiano, il me semble que tu as besoin du port de ton côté ! donc décommente ^^ 
  port: process.env.DB_PORT 
};

const connection = mysql.createConnection(connectionOptions);
connection.connect();

app.get('/', (req, res) => {
  res.send('oui');
});

indexesRoutes(app, connection)


app.listen(3000, () => {
  console.log("On the port: " + port)
})



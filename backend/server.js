require('dotenv').config();
const mysql = require('mysql');
const cors = require('cors');

const { app } = require('./app')
const indexesRoutes = require('./routes/indexesRoutes')

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const connectionOptions = {
  host: 'localhost',
  database: 'recycle_rat',
  user: 'root',
  password: process.env.DB_PASSWORD,
  // cristiano, il me semble que tu as besoin du port de ton côté ! donc décommente ^^ 
  //port: process.env.DB_PORT
};

app.use(cors(corsOptions));

const connection = mysql.createConnection(connectionOptions);
connection.connect();

indexesRoutes(app, connection)

app.listen(port, () => {
  console.log("On the port: " + port)
})



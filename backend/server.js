require('dotenv').config();
const app = require('./app')
const indexesRoutes = require('./routes/indexesRoutes')
const mysql = require('mysql');

const connectionOptions = {
  host: 'localhost',
  database: 'recycle_rat',
  user: 'root',
  password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT
};

const connection = mysql.createConnection(connectionOptions);
connection.connect();
indexesRoutes(app, connection)

app.listen(port, () => {
})



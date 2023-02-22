const { app } = require("../app");
const request = require("supertest")
const mysql = require('mysql');

const indexesRoutes = require('../routes/indexesRoutes')
const connectionOptions = {
  host: 'localhost',
  database: 'recycle_rat_tests',
  user: 'root',
  password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT
};
const connection = mysql.createConnection(connectionOptions);

describe('test block', () => {
  beforeEach(() => {
    connection.connect();
    indexesRoutes(app, connection)
  });

  afterEach((done) => {
    connection.end(done)
    // mongoDB.disconnect(done);
  });


  test("get users", async () => {
    const responseGET = await request(app).get("/api/users");
    expect(responseGET.status).toEqual(200)
  })
});
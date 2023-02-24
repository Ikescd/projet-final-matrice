const { app } = require("../app");
const request = require("supertest");
const mysql = require("mysql");

const { createTable, fillTable } = require("./initDB");

const indexesRoutes = require("../routes/indexesRoutes");
const connectionOptions = {
  host: "localhost",
  database: "recycle_rat_tests",
  user: "root",
  password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT
};
const connection = mysql.createConnection(connectionOptions);

describe("test block", () => {
  beforeEach(() => {
    connection.connect();
    indexesRoutes(app, connection);
  });

  afterEach((done) => {
    connection.query("DROP TABLE IF EXISTS addresses");
    connection.query("DROP TABLE IF EXISTS productsinorder");
    connection.query("DROP TABLE IF EXISTS products");
    connection.query("DROP TABLE IF EXISTS orders");
    connection.query("DROP TABLE IF EXISTS categories");
    connection.query("DROP TABLE IF EXISTS users");

    connection.query(createTable.addresses);
    connection.query(createTable.products);
    connection.query(createTable.users);
    connection.query(createTable.productsinorder);
    connection.query(createTable.orders);
    connection.query(createTable.categories);

    connection.query(fillTable.categories);
    connection.query(fillTable.products);

    connection.end(done);
    // mongoDB.disconnect(done);
  });

  test("get users", async () => {
    const responseGET = await request(app).get("/api/products");
    expect(responseGET.status).toEqual(200);
  });
});

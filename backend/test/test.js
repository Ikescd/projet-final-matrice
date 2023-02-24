const { app } = require("../app");
const request = require("supertest")
const mysql = require('mysql');
const { addresses, orders, categories, productsinorder, users, products } = require("./queries")
const indexesRoutes = require('../routes/indexesRoutes')
const connectionOptions = {
  host: 'localhost',
  database: 'recycle_rat_tests',
  user: 'root',
  password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT
};
const connection = mysql.createConnection(connectionOptions);


beforeAll(() => {
  connection.connect();
  indexesRoutes(app, connection)

  connection.query(addresses)
  connection.query(orders)
  connection.query(categories)
  connection.query(products)
  connection.query(productsinorder)
  connection.query(users)
})

afterAll((done) => {
  connection.query("DROP TABLE addresses;")
  connection.query("DROP TABLE productsinorder;")
  connection.query("DROP TABLE orders;")
  connection.query("DROP TABLE products;")
  connection.query("DROP TABLE users;")
  connection.query("DROP TABLE categories;")
  connection.end(done)
});

describe('users routes', () => {

  test("POST /api/users/add OK", async () => {
    const user1 = await request(app).post("/api/users/add").send({
      first_name: "dede",
      last_name: "dede",
      email: "dede@dede.com",
      password: "dede",
      role: "user"
    })
    const user2 = await request(app).post("/api/users/add").send({
      first_name: "dede",
      last_name: "dede",
      email: "dede@lol.com",
      password: "dede",
      role: "user"
    })

    const responsePOSTNEWUser = await request(app).post("/api/users/add").send({ first_name: "dede", last_name: "dede", email: "test@test.com", password: "dede", role: "user" })

    expect(responsePOSTNEWUser.body.result.insertId).toEqual(3)
  })

  test("POST /api/users/add FAIL (email already used)", async () => {
    const responsePOST = await request(app).post("/api/users/add").send({ first_name: "dede", last_name: "dede", email: "test@test.com", password: "dede", role: "user" })


    expect(responsePOST.status).toEqual(400)
  })

  test("POST /api/users/add FAIL (incomplete body)", async () => {
    const responsePOST = await request(app).post("/api/users/add").send({ first_name: "oui" })
    expect(responsePOST.status).toEqual(422)
  })

  test("POST /api/users/login OK", async () => {
    const responsePOST = await request(app).post("/api/users/login").send({ email: "dede@dede.com", password: "dede" });
    expect(responsePOST.status).toEqual(200)
  })

  test("POST /api/users/login FAIL (wrong mail)", async () => {
    const responsePOST = await request(app).post("/api/users/login").send({ email: "non@non.com", password: "dede" })
    expect(responsePOST.text).toEqual("{\"message\":\"Invalid email\"}")
  })

  test("POST /api/users/login FAIL (wrong pwd)", async () => {
    const responsePOST = await request(app).post("/api/users/login").send({ email: "dede@dede.com", password: "non" })
    expect(responsePOST.text).toEqual("{\"message\":\"Invalid password\"}")
  })

  test("GET /api/login/checkToken OK token", async () => {
    const responsePOST = await request(app).post("/api/users/login").send({ email: "dede@dede.com", password: "dede" });
    const token = responsePOST.body.token;

    const responseGET = await request(app).get("/api/login/checkToken").set("authorization", "Bearer " + token)
    expect(responseGET.status).toEqual(200)
  })

  test("GET /api/login/checkToken BAD token", async () => {
    const responseGET = await request(app).get("/api/login/checkToken").set("authorization", "Bearer dede")
    expect(responseGET.text).toEqual("{\"status\":401,\"msg\":\"wrong token\"}")
  })

  test("GET /api/users", async () => {
    const responseGET = await request(app).get("/api/users");
    expect(responseGET.status).toEqual(200)
  })

  test("GET /api/users/:id", async () => {
    const responseGET = await request(app).get("/api/users/1");
    expect(responseGET.body.email).toEqual("dede@dede.com")
  })

  // not implemented in back
  test("PUT /api/users/:id", async () => {
    const responsePUT = await request(app).get("/api/users/2").send({ first_name: "new dede" });
    expect(responsePUT.body.first_name).toEqual("dede")
  })

  test("DELETE /api/users/:id", async () => {
    const responseDELETE = await request(app).delete("/api/users/3");
    const responseGET = await request(app).get("/api/users/3");

    expect(responseDELETE.status).toEqual(200)
    expect(responseGET.body).toEqual({})
  })

});


// test("/", async () => {
//   const responseGET = await request(app).get("/");
//   expect(responseGET.text).toEqual("oui")
// })

// test("GET /api/categories", async () => {
//   const responseGET = await request(app).get("/api/categories");
//   expect(responseGET.status).toEqual(200)
// })

// test("GET /api/products", async () => {
//   const responseGET = await request(app).get("/api/products")
//   expect(responseGET.status).toEqual(200)
// })


// test("POST /api/category", async () => {
//   const responsePOST = await request(app).post("/api/category").send({ name: "Dede", picture: "dede" });
//   expect(responsePOST.status).toEqual(200)
// })

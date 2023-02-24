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
  beforeAll(() => {
    connection.connect();
    indexesRoutes(app, connection);
  });

  afterAll((done) => {
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
    const responseGET = await request(app).get("/api/users");
    expect(responseGET.status).toEqual(200);
  });

  test("get categories", async () => {
    const responseGET = await request(app).get("/api/categories");
    expect(responseGET.status).toEqual(200);
    expect(responseGET).toHaveProperty("_body", [
      {
        id: 1,
        name: "Vêtements",
        picture:
          "https://www.modeintextile.fr/wp-content/uploads/2019/12/reportecap-770x513.jpg",
      },
      {
        id: 2,
        name: "Jouets",
        picture:
          "https://france3-regions.francetvinfo.fr/image/zfKKwBCgw-Nn0naBR_lVNHvckis/1200x900/regions/2020/06/09/5edf8fb3e537d_noe03805-2_2-4493289.jpg",
      },
      {
        id: 3,
        name: "Meubles",
        picture:
          "https://www.kohdeco-meubles.com/3757-thickbox/meuble-tv-plugo-bois-bateau-salon.jpg",
      },
      {
        id: 4,
        name: "Décorations",
        picture:
          "https://www.floraqueen.com/fr/blog/wp-content/uploads/sites/6/2015/10/shutterstock_594793604.jpg",
      },
    ]);
  });

  test("get a category", async () => {
    const responseGET = await request(app).get("/api/category/2");
    expect(responseGET.status).toEqual(200);
    expect(responseGET).toHaveProperty("_body", [
      {
        id: 2,
        name: "Jouets",
        picture:
          "https://france3-regions.francetvinfo.fr/image/zfKKwBCgw-Nn0naBR_lVNHvckis/1200x900/regions/2020/06/09/5edf8fb3e537d_noe03805-2_2-4493289.jpg",
      },
    ]);
  });

  test("get products by category", async () => {
    const responseGET = await request(app).get("/api/category/2/products");
    expect(responseGET.status).toEqual(200);
    expect(responseGET).toHaveProperty("_body", [
      {
        category_id: 2,
        description:
          "LE JOUET qui accompagne les carnets de voyage ! Dans chaque magazine, vos enfants suivent les aventure des petits Duchemin, et ils adorent…",
        id: 2,
        item_code: null,
        name: "Jouet Van et figurines en plastique recyclé",
        picture:
          "https://lacartefrancaise.fr//wp-content/uploads/2022/10/jouet-van-plastique-recycle-1-600x437.jpg",
        price: 1500,
        quantityInStock: 10,
      },
    ]);
  });

  test("post a new category and get it", async () => {
    const bodyData = {
      name: "Animaux",
      picture: "https://picsum.photos/id/237/200/300",
    };

    const responsePOST = await request(app)
      .post("/api/category")
      .send(bodyData);
    expect(responsePOST.status).toEqual(200);

    const responseGET = await request(app).get("/api/category/5");
    expect(responseGET.status).toEqual(200);
    expect(responseGET).toHaveProperty("_body", [
      {
        id: 5,
        name: "Animaux",
        picture: "https://picsum.photos/id/237/200/300",
      },
    ]);
  });
});

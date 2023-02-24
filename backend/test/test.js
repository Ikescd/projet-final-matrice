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

describe("test Categories", () => {
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

describe("test Products", () => {
  test("get all products", async () => {
    const responseGET = await request(app).get("/api/products");
    expect(responseGET.status).toEqual(200);
    expect(responseGET).toHaveProperty("_body", [
      {
        category_id: 3,
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.",
        id: 1,
        item_code: null,
        name: "Meuble TV en bois recyclé",
        picture:
          "https://www.trendymobilier.com/app/uploads/2020/07/55365-Meuble-TV-vintage-en-bois-recycle.jpg",
        price: 23050,
        quantityInStock: 4,
      },
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
      {
        category_id: 3,
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.",
        id: 3,
        item_code: "123",
        name: "Tabouret",
        picture:
          "https://cdn.tiptoe.fr/wp-content/uploads/2019/06/LOU-CHENE-MASSIF-NOIR-V2.jpg?twic=v1/resize=270",
        price: 4000,
        quantityInStock: 8,
      },
      {
        category_id: 3,
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.",
        id: 4,
        item_code: "123",
        name: "Tabouret",
        picture:
          "https://cdn.tiptoe.fr/wp-content/uploads/2019/06/LOU-CHENE-MASSIF-NOIR-V2.jpg?twic=v1/resize=270",
        price: 4000,
        quantityInStock: 8,
      },
      {
        category_id: 3,
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.",
        id: 5,
        item_code: "123",
        name: "Tabouret bas",
        picture:
          "https://meuble-passion.com/8219-large_default/tabouret-bois-de-bateau-recycle-truckwood-50cm.jpg",
        price: 3000,
        quantityInStock: 8,
      },
      {
        category_id: 3,
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.",
        id: 6,
        item_code: null,
        name: "Fauteuil recyclé",
        picture:
          "https://www.designferia.com/sites/default/files/styles/article_images__s640_/public/field/image/anciens-pneus-objets-recycles-jardin.jpg",
        price: 5000,
        quantityInStock: 6,
      },
      {
        category_id: 4,
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.",
        id: 7,
        item_code: null,
        name: "Bougie",
        picture:
          "https://www.cdixvins.fr/cache/2/f/e/6/6/2fe66854a9e777f90665f5f944c6fdcfe00eb6f5.png",
        price: 999,
        quantityInStock: 19,
      },
    ]);
  });

  test("get a product", async () => {
    const responseGET = await request(app).get("/api/products/7");
    expect(responseGET.status).toEqual(200);
    expect(responseGET).toHaveProperty("_body", [
      {
        category_id: 4,
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.",
        id: 7,
        item_code: null,
        name: "Bougie",
        picture:
          "https://www.cdixvins.fr/cache/2/f/e/6/6/2fe66854a9e777f90665f5f944c6fdcfe00eb6f5.png",
        price: 999,
        quantityInStock: 19,
      },
    ]);
  });

  test("post a new product and get it", async () => {
    const bodyData = {
      name: "Nanimal",
      picture: "https://picsum.photos/id/237/200/300",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicin",
      price: 5999,
      quantityInStock: 42,
      category: 2,
    };

    const responsePOST = await request(app)
      .post("/api/products")
      .send(bodyData);
    expect(responsePOST.status).toEqual(200);

    const responseGET = await request(app).get("/api/products/8");
    expect(responseGET.status).toEqual(200);
    expect(responseGET).toHaveProperty("_body", [
      {
        category_id: 2,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicin",
        id: 8,
        item_code: null,
        name: "Nanimal",
        picture: "https://picsum.photos/id/237/200/300",
        price: 5999,
        quantityInStock: 42,
      },
    ]);
  });
});

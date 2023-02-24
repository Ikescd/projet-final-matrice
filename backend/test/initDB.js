const createTable = {
  addresses:
    "CREATE TABLE IF NOT EXISTS addresses (id int(11) NOT NULL AUTO_INCREMENT, adress_line1 varchar(50) NOT NULL, address_line2 varchar(50) DEFAULT NULL, zip_code varchar(50) NOT NULL, libelle varchar(50) NOT NULL, user_id int(11) NOT NULL, PRIMARY KEY (id), KEY user_id (user_id)) ENGINE=InnoDB DEFAULT CHARSET=utf8",

  categories:
    "CREATE TABLE IF NOT EXISTS categories (id int(11) NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, picture varchar(255) NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;",

  orders:
    "CREATE TABLE IF NOT EXISTS orders (id int(11) NOT NULL AUTO_INCREMENT, status varchar(50) NOT NULL, amount int(11) NOT NULL, orderDate varchar(50) NOT NULL, addressDelivery varchar(255) NOT NULL, addressInvoice varchar(255) NOT NULL, user_id int(11) NOT NULL, PRIMARY KEY (id), UNIQUE KEY user_id (user_id) ) ENGINE=InnoDB DEFAULT CHARSET=utf8",

  products:
    "CREATE TABLE IF NOT EXISTS products (id int(11) NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, description varchar(255) DEFAULT NULL, item_code varchar(255) DEFAULT NULL, price int(11) NOT NULL, quantityInStock int(11) NOT NULL, picture varchar(255) NOT NULL,category_id int(11) DEFAULT NULL, PRIMARY KEY (id), KEY category_id (category_id)) ENGINE=InnoDB DEFAULT CHARSET=utf8",

  productsinorder:
    "CREATE TABLE IF NOT EXISTS productsinorder (product_id int(11) NOT NULL, order_id int(11) NOT NULL, buyingQuantity int(11) NOT NULL, buyingPrice int(11) NOT NULL, PRIMARY KEY (product_id, order_id), KEY order_id (order_id)) ENGINE=InnoDB DEFAULT CHARSET=utf8",

  users:
    "CREATE TABLE IF NOT EXISTS users (id int(11) NOT NULL AUTO_INCREMENT, first_name varchar(50) NOT NULL, last_name varchar(50) NOT NULL, email varchar(255) NOT NULL, password varchar(255) NOT NULL, role varchar(50) NOT NULL, PRIMARY KEY (id), UNIQUE KEY email (email)) ENGINE=InnoDB DEFAULT CHARSET=utf8",
};

const fillTable = {
  categories:
    "INSERT INTO categories (id, name, picture) VALUES (1, 'Vêtements', 'https://www.modeintextile.fr/wp-content/uploads/2019/12/reportecap-770x513.jpg'), (2, 'Jouets', 'https://france3-regions.francetvinfo.fr/image/zfKKwBCgw-Nn0naBR_lVNHvckis/1200x900/regions/2020/06/09/5edf8fb3e537d_noe03805-2_2-4493289.jpg'), (3, 'Meubles', 'https://www.kohdeco-meubles.com/3757-thickbox/meuble-tv-plugo-bois-bateau-salon.jpg'), (4, 'Décorations', 'https://www.floraqueen.com/fr/blog/wp-content/uploads/sites/6/2015/10/shutterstock_594793604.jpg')",
  products:
    "INSERT INTO products (id, name, description, item_code, price, quantityInStock, picture, category_id) VALUES (1, 'Meuble TV en bois recyclé', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', NULL, 23050, 4, 'https://www.trendymobilier.com/app/uploads/2020/07/55365-Meuble-TV-vintage-en-bois-recycle.jpg', 3), (2, 'Jouet Van et figurines en plastique recyclé', 'LE JOUET qui accompagne les carnets de voyage ! Dans chaque magazine, vos enfants suivent les aventure des petits Duchemin, et ils adorent…', NULL, 1500, 10, 'https://lacartefrancaise.fr//wp-content/uploads/2022/10/jouet-van-plastique-recycle-1-600x437.jpg', 2), (3, 'Tabouret', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', '123', 4000, 8, 'https://cdn.tiptoe.fr/wp-content/uploads/2019/06/LOU-CHENE-MASSIF-NOIR-V2.jpg?twic=v1/resize=270', 3),(4, 'Tabouret', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', '123', 4000, 8, 'https://cdn.tiptoe.fr/wp-content/uploads/2019/06/LOU-CHENE-MASSIF-NOIR-V2.jpg?twic=v1/resize=270', 3), (5, 'Tabouret bas', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', '123', 3000, 8, 'https://meuble-passion.com/8219-large_default/tabouret-bois-de-bateau-recycle-truckwood-50cm.jpg', 3), (6, 'Fauteuil recyclé', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', NULL, 5000, 6, 'https://www.designferia.com/sites/default/files/styles/article_images__s640_/public/field/image/anciens-pneus-objets-recycles-jardin.jpg', 3), (7, 'Bougie', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', NULL, 999, 19, 'https://www.cdixvins.fr/cache/2/f/e/6/6/2fe66854a9e777f90665f5f944c6fdcfe00eb6f5.png', 4)",
};

module.exports = { createTable, fillTable };

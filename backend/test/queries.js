const addresses = "CREATE TABLE IF NOT EXISTS addresses (id int(11) NOT NULL AUTO_INCREMENT, adress_line1 varchar(50) NOT NULL, address_line2 varchar(50) DEFAULT NULL, zip_code varchar(50) NOT NULL, libelle varchar(50) NOT NULL, user_id int(11) NOT NULL, PRIMARY KEY (id), KEY user_id (user_id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;"

const categories = "CREATE TABLE IF NOT EXISTS categories (  id int(11) NOT NULL AUTO_INCREMENT,  name varchar(50) NOT NULL,  picture varchar(255) NOT NULL,  PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;"

const orders = "CREATE TABLE IF NOT EXISTS orders (id int(11) NOT NULL AUTO_INCREMENT, status varchar(50) NOT NULL, amount int(11) NOT NULL, orderDate varchar(50) NOT NULL, addressDelivery varchar(255) NOT NULL, addressInvoice varchar(255) NOT NULL, user_id int(11) NOT NULL, PRIMARY KEY (id), UNIQUE KEY user_id (user_id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

const products = "CREATE TABLE IF NOT EXISTS products (id int(11) NOT NULL AUTO_INCREMENT,name varchar(50) NOT NULL,description varchar(255) DEFAULT NULL,item_code varchar(255) DEFAULT NULL,price int(11) NOT NULL,quantityInStock int(11) NOT NULL,picture varchar(255) NOT NULL,category_id int(11) DEFAULT NULL,PRIMARY KEY (id),KEY category_id (category_id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

const productsinorder = "CREATE TABLE IF NOT EXISTS productsinorder (product_id int(11) NOT NULL,order_id int(11) NOT NULL,buyingQuantity int(11) NOT NULL,buyingPrice int(11) NOT NULL,PRIMARY KEY (product_id,order_id),KEY order_id (order_id)) ENGINE=InnoDB DEFAULT CHARSET=utf8;"

const users = "CREATE TABLE IF NOT EXISTS users (id int(11) NOT NULL AUTO_INCREMENT,first_name varchar(50) NOT NULL,last_name varchar(50) NOT NULL,email varchar(255) NOT NULL,password varchar(255) NOT NULL,role varchar(50) NOT NULL,PRIMARY KEY (id),UNIQUE KEY email (email)) ENGINE=InnoDB DEFAULT CHARSET=utf8;"

module.exports = { addresses, orders, categories, products, productsinorder, users };
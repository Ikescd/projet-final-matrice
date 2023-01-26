-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 20 jan. 2023 à 09:25
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `recycle_rat`
--

-- --------------------------------------------------------

--
-- Structure de la table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adress_line1` varchar(50) NOT NULL,
  `address_line2` varchar(50) DEFAULT NULL,
  `zip_code` varchar(50) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `picture` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `orderDate` varchar(50) NOT NULL,
  `addressDelivery` varchar(255) NOT NULL,
  `addressInvoice` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `item_code` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `quantityInStock` int(11) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `productsinorder`
--

DROP TABLE IF EXISTS `productsinorder`;
CREATE TABLE IF NOT EXISTS `productsinorder` (
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `buyingQuantity` int(11) NOT NULL,
  `buyingPrice` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`order_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `item_code`, `price`, `quantityInStock`, `picture`, `category_id`) VALUES
(1, 'Meuble TV en bois recyclé', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', NULL, 23050, 4, 'https://www.trendymobilier.com/app/uploads/2020/07/55365-Meuble-TV-vintage-en-bois-recycle.jpg', 3),
(2, 'Jouet Van et figurines en plastique recyclé', 'LE JOUET qui accompagne les carnets de voyage ! Dans chaque magazine, vos enfants suivent les aventure des petits Duchemin, et ils adorent…', NULL, 1500, 10, 'https://lacartefrancaise.fr//wp-content/uploads/2022/10/jouet-van-plastique-recycle-1-600x437.jpg', 2),
(3, 'Sous marin arrosoir de bain en plastique recyclé', 'Prenez la barre de ce sous-marin ! Immergez-le sous l\'eau pour explorer le fond de la baignoire, de la piscine et observez l\'hélice tournante.', NULL, 1400, 15, 'https://www.chez-les-enfants.fr/web/image/product.product/11596/image', 2),
(4, 'Tabouret', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', '123', 4000, 8, 'https://cdn.tiptoe.fr/wp-content/uploads/2019/06/LOU-CHENE-MASSIF-NOIR-V2.jpg?twic=v1/resize=270', 3),
(5, 'Tabouret bas', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', '123', 3000, 8, 'https://meuble-passion.com/8219-large_default/tabouret-bois-de-bateau-recycle-truckwood-50cm.jpg', 3),
(6, 'Fauteuil recyclé', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', NULL, 5000, 6, 'https://www.designferia.com/sites/default/files/styles/article_images__s640_/public/field/image/anciens-pneus-objets-recycles-jardin.jpg', 3),
(7, 'Bougie', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', NULL, 999, 19, 'https://www.cdixvins.fr/cache/2/f/e/6/6/2fe66854a9e777f90665f5f944c6fdcfe00eb6f5.png', 4),
(8, 'Vide-Poche', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', NULL, 1999, 12, 'https://luisart.fr/wp-content/uploads/2021/03/victoria-coupelle-vide-poche-papier-3.jpg', 4),
(9, 'Chaise', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', NULL, 2999, 12, 'https://cache.marieclaire.fr/data/photo/w1000_ci/5v/design-recyclage.jpg', 3),
(10, 'Miroir en papier recyclé', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', NULL, 5999, 6, 'https://media.adeo.com/marketplace/MKP/82698656/8e2337218809d1a1bd556760a2a91188.jpeg', 4),
(11, 'Buffet', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus excepturi porro cum sit, voluptatibus quo blanditiis saepe nam commodi eaque necessitatibus dicta itaque facilis.', NULL, 15999, 6, 'https://d2ans0z9s1x1c.cloudfront.net/produits/buffet-bois-recycle-brisbane-5fe2345d51d08.jpg', 3);

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `picture`) VALUES
(1, 'Vêtements', 'https://www.modeintextile.fr/wp-content/uploads/2019/12/reportecap-770x513.jpg'),
(2, 'Jouets', 'https://france3-regions.francetvinfo.fr/image/zfKKwBCgw-Nn0naBR_lVNHvckis/1200x900/regions/2020/06/09/5edf8fb3e537d_noe03805-2_2-4493289.jpg'),
(3, 'Meubles', 'https://www.kohdeco-meubles.com/3757-thickbox/meuble-tv-plugo-bois-bateau-salon.jpg'),
(4, 'Décorations', 'https://www.floraqueen.com/fr/blog/wp-content/uploads/sites/6/2015/10/shutterstock_594793604.jpg');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Contraintes pour la table `productsinorder`
--
ALTER TABLE `productsinorder`
  ADD CONSTRAINT `productsinorder_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `productsinorder_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

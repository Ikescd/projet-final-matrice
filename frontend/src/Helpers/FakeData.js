const users = [
  {
    user_id: 1,
    first_name: "Florian",
    last_name: "Vilmot",
    email: "flo@flo.com",
    password: "florian",
    role: "admin",
  },
  {
    user_id: 2,
    first_name: "Cristiano",
    last_name: "Corti",
    email: "cricri@cricri.com",
    password: "cristiano",
    role: "admin",
  },
  {
    user_id: 3,
    first_name: "Sarah",
    last_name: "Delmas",
    email: "dede@dede.com",
    password: "sarah",
    role: "admin",
  },
  {
    user_id: 4,
    first_name: "San",
    last_name: "Goku",
    email: "boules-du-dragon@saiyen.com",
    password: "kamehameha",
    role: "user",
  },
  {
    user_id: 5,
    first_name: "Eren",
    last_name: "Yeager",
    email: "jesuispascontent@rumbling.com",
    password: "titanassaillant",
    role: "user",
  },
  {
    user_id: 6,
    first_name: "Livaï",
    last_name: "Ackerman",
    email: "jaimelaproprete@cestpropre.com",
    password: "noregrets",
    role: "user",
  },
];

const categories = [
  {
    id: 1,
    name: "Ameublement",
  },
  {
    id: 2,
    name: "Jouets",
  },
];

const products = [
  {
    product_id: 1,
    name: "Meuble TV en bois recyclé",
    description: `Faire du recyclage tout en habillant votre salon, c'est ce que vous livre ce meuble tv en bois recyclé issu de vieux bateaux de pêche. Achetez ce meuble tv en bois massif afin d'avoir un salon au décor unique. Grâce à ses 2 portes contenant 2 tablettes, son tiroir et ses 2 niches ouvertes, ce meuble tv accueillera vos appareils multimédia ou autres accessoires de salon avec facilité.`,
    item_code: "",
    price: 23050,
    quantityInStock: 4,
    picture:
      "https://www.trendymobilier.com/app/uploads/2020/07/55365-Meuble-TV-vintage-en-bois-recycle.jpg",
    // récupérée directement par la BDD.
    FK_category_id: 1,
  },
  {
    product_id: 2,
    name: "Jouet Van et figurines en plastique recyclé",
    description: `LE JOUET qui accompagne les carnets de voyage ! Dans chaque magazine, vos enfants suivent les aventure des petits Duchemin, et ils adorent…

    Mais avec le jouet c’est encore mieux ! Le van et les figurines, sûrement le jouet le plus cool et le mieux fabriqué au monde.
    Un jouet fun, personnalisable grâce à des autocollants repositionnables et conçu pour jouer des heures grâce à l’empilement des éléments.

    Cette petite maison sur roues permet à vos enfants de se projeter dans le quotidien de maman Jeanne, papa Jim, Sacha et Oscar et de s’inventer plein d’histoires. Le tout avec un jouet sain pour la planète, entièrement fabriqué en France à partir de plastique recyclé. Une véritable prouesse.

    Un jouet parfait pour faire rêver vos enfants et les aider à développer leur imaginaire pendant des années.

    Testé et approuvé par plus de 50 000 familles. En route pour l’aventure !`,
    item_code: "",
    price: 1500,
    quantityInStock: 10,
    picture:
      "https://lacartefrancaise.fr//wp-content/uploads/2022/10/jouet-van-plastique-recycle-1-600x437.jpg",
    FK_category_id: 2,
  },
  {
    product_id: 3,
    name: "Sous marin arrosoir de bain en plastique recyclé Green Toys",
    description: `Prenez la barre de ce sous-marin ! Immergez-le sous l'eau pour explorer le fond de la baignoire, de la piscine ou de la mer et observez l'hélice tournante. Cette embarcation robuste et stable est très ludique. Ce jouet sous-marin est aussi un arrosoir, qui permet aux plus jeunes enfants de recueillir et verser l'eau facilement grâce à la poignée, source de grand plaisir chez les enfants. La cabine s'ouvre complètement pour « voir comment ça marche » !... et pour un lavage plus facile.`,
    item_code: "",
    price: 1400,
    quantityInStock: 15,
    picture:
      "https://www.chez-les-enfants.fr/web/image/product.product/11596/image",
    FK_category_id: 2,
  },
];

const orders = [];

module.exports = { users, categories, products, orders };

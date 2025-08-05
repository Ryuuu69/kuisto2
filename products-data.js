// products-data.js - Données partagées entre toutes les pages
// Pour ajouter un produit, il suffit de compléter ce tableau
// -- Options centralisées pour réutilisation --
const sauceOptions = [
  { name: "Blanche", price: 0.50, image: "img/sauce-blanche.jpg" },
  { name: "Smoky", price: 0.50, image: "img/sauce-smoky.jpg" },
  { name: "Chili Thaï", price: 0.50, image: "img/sauce-chili.jpg" },
  { name: "Mayo Truffe", price: 0.50, image: "img/sauce-truffe.jpg" },
  { name: "Fromagère", price: 0.50, image: "img/sauce-fromagere.jpg" }
];

const petitCreuxOptions = [
  { name: "Frites", price: 0, image: "img/frites.jpg" },
  { name: "Potatoes", price: 0.50, image: "img/potatoes.jpg" },
  { name: "Onion Rings", price: 1.00, image: "img/onionrings.jpg" },
  { name: "Salade", price: 0.80, image: "img/salade.jpg" }
];

const burgerOptions = [
  { name: "Smash Burger", price: 6.50, image: "img/smash-burger.jpg" },
  { name: "Signature Burger", price: 7.90, image: "img/signature-burger.jpg" },
  { name: "Golden Burger", price: 7.50, image: "img/golden-burger.jpg" }
];

const meatOptions = [
  { name: "Poulet mariné", image: "img/poulet.jpg" },
  { name: "Kefta", image: "img/kefta.jpg" },
  { name: "Tenders", image: "img/tenders.jpg" },
  { name: "Cordon Bleu", image: "img/cordonbleu.jpg" },
  { name: "Steak haché", image: "img/steak.jpg" }
];

const meatCounts = [
  { value: 1, label: "1 viande", price: 6.00 },
  { value: 2, label: "2 viandes", price: 7.50 },
  { value: 3, label: "3 viandes", price: 8.90 }
];
// Option centralisée pour "enlever" sur tous les burgers
const removeOptions = [
  { name: "Sans salade", price: 0 },
  { name: "Sans tomate", price: 0 },
  { name: "Sans oignon", price: 0 }
];

// D’abord, tu déclares tes smashBurgers et signatureBurgers
const smashBurgersMenuChoices = [
  { name: "Classique", price: 6.00, image: "img/burger-classique.jpg" },
  { name: "Double", price: 7.50, image: "img/burger-double.jpg" },
  { name: "Bacon", price: 7.50, image: "img/burger-bacon.jpg" },
  { name: "Double Bacon", price: 8.00, image: "img/burger-double-bacon.jpg" },
  { name: "Chicken", price: 8.00, image: "img/burger-chicken.jpg" },
  { name: "Chèvre Miel", price: 8.00, image: "img/burger-chevre.jpg" },
  { name: "Fish", price: 8.00, image: "img/burger-fish.jpg" },
];
const signatureBurgersMenuChoices = [
  { name: "Kuisto", price: 10.50, image: "img/burger-kuisto.jpg" },
  { name: "Pistachio", price: 12.50, image: "img/burger-pistachio.jpg" },
  { name: "Grogon", price: 10.50, image: "img/burger-grogon.jpg" },
  { name: "Le Veggie", price: 11.50, image: "img/burger-veggie.jpg" },
  { name: "Chicken Truff", price: 12.50, image: "img/burger-truff.jpg" },
];
// Pour le menu combo :
const allMenuBurgers = [...smashBurgersMenuChoices, ...signatureBurgersMenuChoices];

// Dans chaque objet menu (voir plus haut pour la structure)


const products = [
  // Nouveautés
   {
    id: 200,
    name: "Tacos personnalisé",
    slug: "tacos",
    category: "tacos",
    description: "Compose ton tacos : 1, 2 ou 3 viandes au choix, sauces et suppléments.",
    price: 6.00, // base = 1 viande, le reste dynamique via meatCounts
    image: "img/tacos.jpg",
    options: {
      meatCounts: meatCounts,   // ← Sélection du nombre de viandes (radio)
      meats: meatOptions,       // ← Liste des viandes possibles (radio ou checkbox selon nb viandes)
      sauces: sauceOptions,     // ← Multi (checkbox)
      supplements: [
        { name: "Cheddar", price: 1.00, image: "img/cheddar.jpg" },
        { name: "Bacon", price: 1.00, image: "img/bacon.jpg" }
      ],
      remove: [
        { name: "Sans oignons", price: 0 },
        { name: "Sans salade", price: 0 },
        { name: "Sans tomate", price: 0 }
      ]
    }
  },
  {
    id: 101,
    name: "Classique",
    slug: "smash-classique",
    category: "smash-burgers",
    description: "Viande hachée, cheddar, salade, tomate, oignon",
    price: 6.00,
    image: "img/smash-classique.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  {
    id: 102,
    name: "Double",
    slug: "smash-double",
    category: "smash-burgers",
    description: "2 steaks, double cheddar, salade, tomate, oignon",
    price: 7.50,
    image: "img/smash-double.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  {
    id: 103,
    name: "Bacon",
    slug: "smash-bacon",
    category: "smash-burgers",
    description: "Steak haché, bacon, cheddar, salade, tomate, oignon",
    price: 7.50,
    image: "img/smash-bacon.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  {
    id: 104,
    name: "Double Bacon",
    slug: "smash-double-bacon",
    category: "smash-burgers",
    description: "2 steaks, bacon, double cheddar, salade, tomate, oignon",
    price: 8.00,
    image: "img/smash-double-bacon.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  {
    id: 105,
    name: "Chicken",
    slug: "smash-chicken",
    category: "smash-burgers",
    description: "Tenders, cheddar, salade, tomate, oignon",
    price: 8.00,
    image: "img/smash-chicken.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  {
  id: 15,
  name: "BABY SMASH CHEESE",
  slug: "cheese-burger",
  category: "sides",
  description: "Portion de fromage.",
  price: 2.90,
  image: "img/cheese.jpg",
  options: {}
},
{
  id: 16,
  name: "BABAY SMASH DOUBLE CHEESE",
  slug: "double-cheese-burger",
  category: "sides",
  description: "Double portion de fromage.",
  price: 3.90,
  image: "img/cheese.jpg",
  options: {}
},
  {
    id: 106,
    name: "Chèvre Miel",
    slug: "smash-chevre-miel",
    category: "smash-burgers",
    description: "Viande hachée, salade, fromage de chèvre, miel",
    price: 8.00,
    image: "img/smash-chevre-miel.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  {
    id: 107,
    name: "Fish",
    slug: "smash-fish",
    category: "smash-burgers",
    description: "Poisson pané, salade, tomate, oignon, sauce blanche",
    price: 8.00,
    image: "img/smash-fish.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  {
    id: 201,
    name: "Kuisto",
    slug: "signature-kuisto",
    category: "burgers-signature",
    description: "Viande hachée, 2 tenders, oignons frits, cheddar, salade, ketchup",
    price: 10.50,
    image: "img/signature-kuisto.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  {
    id: 202,
    name: "Pistachio",
    slug: "signature-pistachio",
    category: "burgers-signature",
    description: "Viande hachée, roquette, tomates poêlées, stracciatella, pistache, parmesan",
    price: 12.50,
    image: "img/signature-pistachio.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  {
    id: 203,
    name: "Grogon",
    slug: "signature-grogon",
    category: "burgers-signature",
    description: "Double cheese, viande hachée, onion rings, oignons frits, sauce burger, frites, cornichons",
    price: 10.50,
    image: "img/signature-grogon.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  {
    id: 204,
    name: "Le Veggie",
    slug: "signature-le-veggie",
    category: "burgers-signature",
    description: "Steak de falafel, stracciatella, roquette, tomates poêlées, oignons, sauce blanche ciboulette",
    price: 11.50,
    image: "img/signature-le-veggie.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  {
    id: 205,
    name: "Chicken Truff",
    slug: "signature-chicken-truff",
    category: "burgers-signature",
    description: "Tenders, oignons, champignons persillés, sauce truffe",
    price: 12.50,
    image: "img/signature-chicken-truff.jpg",
    options: {
      remove: removeOptions,
      sauces: sauceOptions
    }
  },
  
  {
  id: 301,
  name: "Menu Smash Burger",
  slug: "menu-smash-burger",
  category: "menus-burgers",
  description: "Smash burger au choix, frites, boisson, sauces",
  price: 8.50, // <-- prix géré dynamiquement
  image: "img/menu-smash.jpg",
  options: {
    burgerSelect: smashBurgersMenuChoices,
    sauces: sauceOptions,
    drinks: [
      { name: "Coca-Cola", price: 0, image: "img/coca.jpg" },
      { name: "Ice Tea", price: 0, image: "img/icetea.jpg" },
      { name: "Eau", price: 0, image: "img/eau.jpg" }
    ],
    remove: removeOptions
  }
},
{
  id: 302,
  name: "Menu Signature Burger",
  slug: "menu-signature-burger",
  category: "menus-burgers",
  description: "Burger signature au choix, frites, boisson, sauces",
  price: 0, // <-- prix géré dynamiquement
  image: "img/menu-signature.jpg",
  options: {
    burgerSelect: signatureBurgersMenuChoices,
    sauces: sauceOptions,
    drinks: [
      { name: "Coca-Cola", price: 0, image: "img/coca.jpg" },
      { name: "Ice Tea", price: 0, image: "img/icetea.jpg" },
      { name: "Eau", price: 0, image: "img/eau.jpg" }
    ],
    remove: removeOptions
  }
},
{
  id: 303,
  name: "Menu Combo",
  slug: "menu-combo",
  category: "menus-burgers",
  description: "Burger au choix, frites, boisson, sauces, petit creux",
  price: 0, // <-- prix géré dynamiquement
  image: "img/menu-combo.jpg",
  options: {
    burgerSelect: allMenuBurgers,
    petitCreuxSelect: petitCreuxOptions,
    sauces: sauceOptions,
    drinks: [
      { name: "Coca-Cola", price: 0, image: "img/coca.jpg" },
      { name: "Ice Tea", price: 0, image: "img/icetea.jpg" },
      { name: "Eau", price: 0, image: "img/eau.jpg" }
    ],
    remove: removeOptions
  }
},


  

  {
  id: 12,
  name: "CHICKEN POP",
  slug: "chicken-pop",
  category: "sides",
  description: "Petites bouchées de poulet croustillant.",
  price: null, // prix selon la taille
  image: "img/chicken-pop.jpg",
  options: {
    sizes: [
      { name: "S (200g)", price: 2.99 },
      { name: "M (350g)", price: 3.99 },
      { name: "L (500g)", price: 4.99 }
    ]
  }
},
{
  id: 13,
  name: "STICK MOZZA",
  slug: "stick-mozza",
  category: "sides",
  description: "Bâtonnets de mozzarella panés.",
  price: null,
  image: "img/stick-mozza.jpg",
  options: {
    sizes: [
      { name: "S (4p)", price: 3.50 },
      { name: "M (6p)", price: 4.50 },
      { name: "L (8p)", price: 5.50 }
    ]
  }
},
{
  id: 14,
  name: "NUGGETS",
  slug: "nuggets",
  category: "sides",
  description: "Nuggets de poulet croustillants.",
  price: null,
  image: "img/nuggets.jpg",
  options: {
    sizes: [
      { name: "S (200g)", price: 2.99, image: "img/sides-s.jpg" },
  { name: "M (350g)", price: 3.99, image: "img/sides-m.jpg" },
  { name: "L (500g)", price: 4.99, image: "img/sides-l.jpg" }
    ]
  }
},

{
  id: 17,
  name: "FRITES MAISON",
  slug: "frites-maison",
  category: "sides",
  description: "Frites fraîches maison.",
  price: 3.00,
  image: "img/frites.jpg",
  options: {}
},
  
  {
  id: 21,
  name: "BUCKET DUO",
  slug: "bucket-duo",
  category: "buckets",
  description: "Bucket Duo : 16 wings ou 8 wings + 6 tenders, avec 2 frites maison, 4 sauces et 2 boissons de 33 cl. Le combo parfait à partager.",
  price: null,
  image: "img/nuggets.jpg",
  options: {
    sizes: [
      { name: "16 wings", price: 18.00 },
      { name: "8 wings et 6 Tenders", price: 19.00 },
    ]
  }
},
   {
  id: 22,
  name: "BUCKET FAMILY",
  slug: "bucket-family",
  category: "buckets",
  description: "Bucket Family : 28 wings ou 16 wings + 10 tenders, avec 4 frites maison, 8 sauces et boisson 1,5L. Le combo familial à partager.",
  price: null,
  image: "img/nuggets.jpg",
  options: {
    sizes: [
      { name: "28 wings", price: 32.00 },
      { name: "16 wings et 10 Tenders", price: 34.00 },
    ]
  }
},
  {
  id: 23,
  name: "Tarte au daim",
  slug: "tarte",
  category: "boissons-desserts",
  description: "Tarte au Daim : base sablée, crème caramel, éclats de Daim et nappage chocolat. Dessert gourmand et croquant à partager.",
  price: 3.50,
  image: "img/cheese.jpg",
  options: {}
},
  {
  id: 24,
  name: "Tiramisu",
  slug: "tiramisu",
  category: "boissons-desserts",
  description: "Mascarpone crémeux, Nutella, spéculoos croquant et éclats d’Orio — le tiramisu qui fait fondre.",
  price: 3.50,
  image: "img/cheese.jpg",
  options: {}
},
  {
  id: 25,
  name: "Boisson 33 CL",
  slug: "boisson-33cl",
  category: "boissons-desserts",
  description: "Canette de 33 cl au choix (Coca-Cola, Sprite, Fanta, etc.).",
  price: 2.00,
  image: "img/boisson-33cl.jpg",
  options: {}
},
{
  id: 26,
  name: "Boisson 1,5 L",
  slug: "boisson-1-5l",
  category: "boissons-desserts",
  description: "Bouteille de 1,5 litre au choix.",
  price: 3.50,
  image: "img/boisson-1-5l.jpg",
  options: {}
},
  {
  id: 29,
  name: "Menu Cheese Burger",
  slug: "menu-cheese-burger",
  category: "menus-bambino",
  description: "Cheese burger, sauce ketchup, une portion de frites, et un Capri Sun.",
  price: 6.00,
  image: "img/menu-cheese-burger.jpg",
  options: {}
},
{
  id: 30,
  name: "Menu Nuggets Kids",
  slug: "menu-nuggets-kids",
  category: "menus-bambino",
  description: "5 nuggets, sauce ketchup, une portion de frites, et un Capri Sun.",
  price: 6.00,
  image: "img/menu-nuggets-kids.jpg",
  options: {}
},
{
  id: 31,
  name: "Menu Mini Tacos",
  slug: "menu-mini-tacos",
  category: "menus-bambino",
  description: "Mini tacos, une portion de frites, et un Capri Sun.",
  price: 6.00,
  image: "img/menu-mini-tacos.jpg",
  options: {}
}
  
 
  
];

// Fonction utilitaire pour générer un slug depuis un nom
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// Fonction pour trouver un produit par slug
function findProductBySlug(slug) {
  return products.find(product => product.slug === slug);
}

// Auto-génération des slugs si manquants (optionnel, pour la compatibilité)
products.forEach(product => {
  if (!product.slug) {
    product.slug = generateSlug(product.name);
  }
});
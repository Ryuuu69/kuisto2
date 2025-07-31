// products-data.js - Données partagées entre toutes les pages
// Pour ajouter un produit, il suffit de compléter ce tableau

const products = [
  // Nouveautés
  {
    id: 1,
    name: "TACOS CLASSIQUE",
    slug: "tacos-classique", // généré automatiquement depuis le nom
    category: "tacos",
    description: "Tacos Classique : salade fraîche, tendres croutons, tomates cerises, copeaux de parmesan",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&crop=center",
    options: {
      supplements: [
        { name: "Cheddar", price: 1.00, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=100&h=100&fit=crop" },
        { name: "Avocat", price: 1.50, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100&h=100&fit=crop" }
      ],
      drinks: [
        { name: "Coca-Cola", price: 2.90, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop" },
        { name: "Milkshake Vanille", price: 4.50, image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=100&h=100&fit=crop" },
        { name: "Limonade", price: 2.50, image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=100&h=100&fit=crop" }
      ],
      remove: [
        { name: "Sans croutons", price: 0 },
        { name: "Sans parmesan", price: 0 },
        { name: "Sans tomates", price: 0 }
      ]
    }
  },
  {
    id: 2,
    name: "SPICY TACOS",
    slug: "spicy-tacos",
    category: "tacos",
    description: "Potato bun, double steak haché smashé, oignons frais, pickles, salade double cheddar + frites + boisson",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=center",
    options: {
      supplements: [
        { name: "Cheddar supplémentaire", price: 1.00, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=100&h=100&fit=crop" },
        { name: "Steak supplémentaire", price: 2.50, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=100&h=100&fit=crop" },
        { name: "Bacon", price: 1.50, image: "https://images.unsplash.com/photo-1528607929212-2636ec44b957?w=100&h=100&fit=crop" }
      ],
      drinks: [
        { name: "Coca-Cola", price: 0, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop" },
        { name: "Milkshake", price: 2.00, image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=100&h=100&fit=crop" },
        { name: "Limonade", price: 0, image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=100&h=100&fit=crop" }
      ],
       
    
      remove: [
        { name: "Sans cheddar", price: 0 },
        { name: "Sans oignons", price: 0 },
        { name: "Sans pickles", price: 0 },
        { name: "Sans salade", price: 0 }
      ]
      
    }
  },
  

  {
    id: 3,
    name: "TACOS VÉGÉTARIEN",
    slug: "tacos-vege",
    category: "tacos",
    description: "Potato bun, double steak haché smashé, salade iceberg, pickles, oignons frais, double cheddar",
    price: 8.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=center",
    options: {
      supplements: [
        { name: "Cheddar supplémentaire", price: 1.00, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=100&h=100&fit=crop" },
        { name: "Steak supplémentaire", price: 2.50, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=100&h=100&fit=crop" }
      ],
      drinks: [
        { name: "Coca-Cola", price: 2.90, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop" },
        { name: "Milkshake", price: 4.50, image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=100&h=100&fit=crop" }
      ],
      remove: [
        { name: "Sans cheddar", price: 0 },
        { name: "Sans oignons", price: 0 },
        { name: "Sans pickles", price: 0 }
      ]
    }
  },
  {
    id: 4,
    name: "HOT‑G CHEESY",
    slug: "hot-cheesy",
    category: "hot-dogs",
    description: "Frites fraîches coupées maison, cuites dans l'huile de tournesol",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop&crop=center",
    options: {
      supplements: [
        { name: "Sauce cheddar", price: 0.50, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=100&h=100&fit=crop" },
        { name: "Sauce barbecue", price: 0.50, image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=100&h=100&fit=crop" }
      ]
    }
  },
  {
   id: 5,
    name: "HOT‑G SPICY",
    slug: "hot-spicy",
    category: "hot-dogs",
    description: "Pain complet, steak végétal, salade, tomate, frites + boisson",
    price: 10.90,
    image: "img/menu-veggie.jpg",
    options: {}
   }, 
  {
    id: 6,
    name: "HOT‑G BACON",
    slug: "hot-bacon",
    category: "hot-dogs",
    description: "Boisson gazeuse sans sucre",
    price: 2.00,
    image: "img/cola-zero.jpg",
    options: {}
  },
  {
    id: 7,
    name: "HOT‑G VEGGIE ",
    slug: "hot-veggie",
    category: "hot-dogs",
    description: "Boisson gazeuse sans sucre",
    price: 2.00,
    image: "img/cola-zero.jpg",
    options: {}
  },
{
    id: 8,
    name: "HOT‑G FISH ",
    slug: "hot-fish",
    category: "hot-dogs",
    description: "Boisson gazeuse sans sucre",
    price: 2.00,
    image: "img/cola-zero.jpg",
    options: {}
  },
  {
  id: 9,
  name: "MENU SMASH BURGER",
  slug: "smash-burger",
  category: "menus-burgers",
  description: "Burger smash avec frites, boisson au choix et suppléments possibles.",
  price: 9.90,
  image: "img/smash-burger.jpg",
  options: {
    supplements: [
      { name: "Cheddar supplémentaire", price: 1.00, image: "img/cheddar.jpg" },
      { name: "Bacon", price: 1.50, image: "img/bacon.jpg" }
    ],
    remove: [
      { name: "Sans oignons", price: 0 },
      { name: "Sans sauce", price: 0 }
    ],
    side: [
      { name: "Frites classiques", price: 0, image: "img/frites.jpg" },
      { name: "Potatoes", price: 0.50, image: "img/potatoes.jpg" }
    ],
    drinks: [
      { name: "Coca-Cola", price: 0, image: "img/coca.jpg" },
      { name: "Ice Tea", price: 0, image: "img/icetea.jpg" },
      { name: "Eau", price: 0, image: "img/eau.jpg" }
    ]
  }
},
{
  id: 10,
  name: "MENU GOLDEN",
  slug: "golden-menu",
  category: "menus-burgers",
  description: "Golden burger avec frites, boisson, supplément possible.",
  price: 11.50,
  image: "img/golden-burger.jpg",
  options: {
    supplements: [
      { name: "Cheddar supplémentaire", price: 1.00, image: "img/cheddar.jpg" },
      { name: "Œuf", price: 1.00, image: "img/egg.jpg" }
    ],
    remove: [
      { name: "Sans cornichons", price: 0 },
      { name: "Sans salade", price: 0 }
    ],
    side: [
      { name: "Frites classiques", price: 0, image: "img/frites.jpg" },
      { name: "Potatoes", price: 0.50, image: "img/potatoes.jpg" }
    ],
    drinks: [
      { name: "Coca-Cola", price: 0, image: "img/coca.jpg" },
      { name: "Sprite", price: 0, image: "img/sprite.jpg" }
    ]
  }
},
   {
  id: 11,
  name: "MENU SIGNATURE BURGER",
  slug: "signature-burger",
  category: "menus-burgers",
  description: "Burger smash avec frites, boisson au choix et suppléments possibles.",
  price: 9.90,
  image: "img/smash-burger.jpg",
  options: {
    supplements: [
      { name: "Cheddar supplémentaire", price: 1.00, image: "img/cheddar.jpg" },
      { name: "Bacon", price: 1.50, image: "img/bacon.jpg" }
    ],
    remove: [
      { name: "Sans oignons", price: 0 },
      { name: "Sans sauce", price: 0 }
    ],
    side: [
      { name: "Frites classiques", price: 0, image: "img/frites.jpg" },
      { name: "Potatoes", price: 0.50, image: "img/potatoes.jpg" }
    ],
    drinks: [
      { name: "Coca-Cola", price: 0, image: "img/coca.jpg" },
      { name: "Ice Tea", price: 0, image: "img/icetea.jpg" },
      { name: "Eau", price: 0, image: "img/eau.jpg" }
    ]
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
      { name: "S (4p)", price: 3.50 },
      { name: "M (6p)", price: 4.50 },
      { name: "L (8p)", price: 5.50 }
    ]
  }
},
{
  id: 15,
  name: "CHEESE",
  slug: "cheese-side",
  category: "sides",
  description: "Portion de fromage.",
  price: 2.90,
  image: "img/cheese.jpg",
  options: {}
},
{
  id: 16,
  name: "DOUBLE CHEESE",
  slug: "double-cheese-side",
  category: "sides",
  description: "Double portion de fromage.",
  price: 3.90,
  image: "img/cheese.jpg",
  options: {}
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
    id: 18,
    name: "SMASH BURGER",
    slug: "smash-burger-simple",
    category: "burgers",
    description: "Burger smash classique avec steak, cheddar, salade, sauce au choix.",
    price: 6.50,
    image: "img/smash-burger.jpg",
    options: {
      supplements: [
        { name: "Cheddar supplémentaire", price: 1.00, image: "img/cheddar.jpg" },
        { name: "Bacon", price: 1.50, image: "img/bacon.jpg" }
      ],
      remove: [
        { name: "Sans oignons", price: 0 },
        { name: "Sans sauce", price: 0 }
      ]
    }
  },
  {
    id: 19,
    name: "GOLDEN BURGER",
    slug: "golden-burger-simple",
    category: "burgers",
    description: "Burger golden avec steak, cheddar, sauce maison, salade.",
    price: 7.50,
    image: "img/golden-burger.jpg",
    options: {
      supplements: [
        { name: "Cheddar supplémentaire", price: 1.00, image: "img/cheddar.jpg" },
        { name: "Œuf", price: 1.00, image: "img/egg.jpg" }
      ],
      remove: [
        { name: "Sans cornichons", price: 0 },
        { name: "Sans salade", price: 0 }
      ]
    }
  },
  {
    id: 20,
    name: "SIGNATURE BURGER",
    slug: "signature-burger-simple",
    category: "burgers",
    description: "Burger signature, sauce maison, double cheddar, salade, tomate.",
    price: 7.90,
    image: "img/signature-burger.jpg",
    options: {
      supplements: [
        { name: "Cheddar supplémentaire", price: 1.00, image: "img/cheddar.jpg" },
        { name: "Bacon", price: 1.50, image: "img/bacon.jpg" }
      ],
      remove: [
        { name: "Sans oignons", price: 0 },
        { name: "Sans tomate", price: 0 }
      ]
    }
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
  category: "desserts",
  description: "Tarte au Daim : base sablée, crème caramel, éclats de Daim et nappage chocolat. Dessert gourmand et croquant à partager.",
  price: 3.50,
  image: "img/cheese.jpg",
  options: {}
},
  {
  id: 24,
  name: "Tiramisu",
  slug: "tiramisu",
  category: "desserts",
  description: "Mascarpone crémeux, Nutella, spéculoos croquant et éclats d’Orio — le tiramisu qui fait fondre.",
  price: 3.50,
  image: "img/cheese.jpg",
  options: {}
},
  {
  id: 25,
  name: "Boisson 33 CL",
  slug: "boisson-33cl",
  category: "boissons",
  description: "Canette de 33 cl au choix (Coca-Cola, Sprite, Fanta, etc.).",
  price: 2.00,
  image: "img/boisson-33cl.jpg",
  options: {}
},
{
  id: 26,
  name: "Boisson 1,5 L",
  slug: "boisson-1-5l",
  category: "boissons",
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
/**
 * DONNÉES PRODUITS PARTAGÉES - Big Smash
 * Fichier central contenant tous les produits du restaurant
 * Utilisé par produits.html et produit.html
 */

const products = [
  {
    name: "Big Caesar",
    desc: "Salade fraîche, tendres croutons, tomates cerises, copeaux de parmesan, sauce caesar maison",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&crop=center",
    price: 8.90,
    category: "Salades",
    drinks: [
      { name: "Coca-Cola", price: 2.90, img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=150&h=150&fit=crop&crop=center" },
      { name: "Milkshake Vanille", price: 4.50, img: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=150&h=150&fit=crop&crop=center" },
      { name: "Limonade Maison", price: 2.50, img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=150&h=150&fit=crop&crop=center" },
      { name: "Thé Glacé", price: 2.20, img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=150&h=150&fit=crop&crop=center" }
    ],
    options: [
      { name: "Sans croûtons", price: 0 },
      { name: "Extra parmesan", price: 1.50 },
      { name: "Poulet grillé", price: 3.00 }
    ]
  },
  {
    name: "Menu Big Cheese",
    desc: "Potato bun, double steak haché smashé, oignons frais, pickles, salade, double cheddar, sauce big smash. Servi avec frites et boisson.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=center",
    price: 11.90,
    category: "Menus",
    drinks: [
      { name: "Coca-Cola", price: 0, img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=150&h=150&fit=crop&crop=center" },
      { name: "Sprite", price: 0, img: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=150&h=150&fit=crop&crop=center" },
      { name: "Milkshake (+2€)", price: 2.00, img: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=150&h=150&fit=crop&crop=center" },
      { name: "Jus d'Orange", price: 0.50, img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=150&h=150&fit=crop&crop=center" }
    ],
    options: [
      { name: "Sans pickles", price: 0 },
      { name: "Sans oignons", price: 0 },
      { name: "Extra cheddar", price: 1.00 },
      { name: "Extra steak", price: 2.50 },
      { name: "Sans sauce", price: 0 }
    ]
  },
  {
    name: "Big Smash Classic",
    desc: "Pain burger, 2 steaks smashés, 2 tranches de cheddar, pickles, salade iceberg, sauce maison",
    img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop&crop=center",
    price: 6.90,
    category: "Burgers",
    drinks: [
      { name: "Coca-Cola", price: 2.90, img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=150&h=150&fit=crop&crop=center" },
      { name: "Milkshake Chocolat", price: 4.50, img: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=150&h=150&fit=crop&center" },
      { name: "Limonade", price: 2.50, img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=150&h=150&fit=crop&crop=center" }
    ],
    options: [
      { name: "Sans pickles", price: 0 },
      { name: "Extra cheddar", price: 1.00 },
      { name: "Bacon", price: 1.50 }
    ]
  },
  {
    name: "Surf & Turf",
    desc: "Potato bun, steak haché smashé, crevettes panées, graine de sésame, cheddar, sauce cocktail",
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop&crop=center",
    price: 8.90,
    category: "Burgers",
    drinks: [
      { name: "Coca-Cola", price: 2.90, img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=150&h=150&fit=crop&crop=center" },
      { name: "Milkshake Fraise", price: 4.50, img: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=150&h=150&fit=crop&crop=center" },
      { name: "Thé Glacé", price: 2.20, img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=150&h=150&fit=crop&crop=center" }
    ],
    options: [
      { name: "Extra crevettes", price: 2.00 },
      { name: "Sans sauce cocktail", price: 0 },
      { name: "Sauce épicée", price: 0.50 }
    ]
  },
  {
    name: "Frites Maison",
    desc: "Frites fraîches coupées maison, cuites dans l'huile de tournesol",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop&crop=center",
    price: 3.50,
    category: "Accompagnements",
    drinks: [
      { name: "Coca-Cola", price: 2.90, img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=150&h=150&fit=crop&crop=center" },
      { name: "Sprite", price: 2.90, img: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=150&h=150&fit=crop&crop=center" }
    ],
    options: [
      { name: "Sauce ketchup", price: 0.50 },
      { name: "Sauce mayo", price: 0.50 },
      { name: "Sauce barbecue", price: 0.50 }
    ]
  }
];

/**
 * FONCTIONS UTILITAIRES
 */

// Génère un slug à partir du nom du produit
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

// Trouve un produit par son slug
function findProductBySlug(slug) {
  return products.find(product => generateSlug(product.name) === slug);
}

// Ajoute automatiquement le slug à chaque produit
products.forEach(product => {
  product.slug = generateSlug(product.name);
});
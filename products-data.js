// products-data.js - Données partagées entre toutes les pages
// Pour ajouter un produit, il suffit de compléter ce tableau

const products = [
  // Nouveautés
  {
    id: 1,
    name: "BIG SALADES",
    slug: "big-salades", // généré automatiquement depuis le nom
    category: "Nouveautés",
    description: "Big Caesar : salade fraîche, tendres croutons, tomates cerises, copeaux de parmesan",
    price: 9.90,
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
    name: "MENU BIG CHEESE",
    slug: "menu-big-cheese",
    category: "Nouveautés",
    description: "Potato bun, double steak haché smashé, oignons frais, pickles, salade double cheddar + frites + boisson",
    price: 11.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=center",
    options: {
      supplements: [
        { name: "Cheddar supplémentaire", price: 1.00, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=100&h=100&fit=crop" },
        { name: "Steak supplémentaire", price: 2.50, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=100&h=100&fit=crop" },
        { name: "Bacon", price: 1.50, image: "https://images.unsplash.com/photo-1528607929212-2636ec44b957?w=100&h=100&fit=crop" }
      ],
      drinks: [
        { name: "Coca-Cola", price: 0, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop" },
        { name: "Milkshake (+2€)", price: 2.00, image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=100&h=100&fit=crop" },
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
    name: "BIG CHEESE",
    slug: "big-cheese",
    category: "Big Burgers",
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
    name: "FRITES MAISON",
    slug: "frites-maison",
    category: "Extras",
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
    name: "MENU VEGGIE",
    slug: "menu-veggie",
    category: "Nouveautés",
    description: "Pain complet, steak végétal, salade, tomate, frites + boisson",
    price: 10.90,
    image: "img/menu-veggie.jpg",
    options: {}
   }, 
  {
    id: 6,
    name: "COLA ZERO",
    slug: "cola-zero",
    category: "Boissons",
    description: "Boisson gazeuse sans sucre",
    price: 2.00,
    image: "img/cola-zero.jpg",
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
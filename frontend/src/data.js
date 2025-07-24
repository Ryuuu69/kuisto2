// Données mockées pour BigSmash - réplique pixel-perfect

export const categories = [
  'Nouveautés',
  'Big Salades', 
  'Big Burgers',
  'Menus Burger',
  'Extras',
  'Boissons',
  'Desserts'
];

export const locations = [
  {
    id: 'montpellier',
    name: 'MONTPELLIER',
    address: '121 Av. de Palavas, 34000 Montpellier',
    hasClickCollect: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=128&h=96&fit=crop&crop=center'
  }
];

export const products = [
  // Nouveautés
  {
    id: 1,
    category: 'Nouveautés',
    name: 'BIG SALADES',
    description: 'Big Caesar, Salade fraîche, tendres croutons, tomates cerises, copeaux de parmesan.',
    price: 9.90,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop&crop=center'
  },
  {
    id: 2,
    category: 'Nouveautés', 
    name: 'THÉ & LIMONADE',
    description: 'Thé Blanc Natural, thé blanc purée d\'ananas d\'Orée, abricot, sans sucre',
    price: 2.90,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop&crop=center'
  },
  {
    id: 3,
    category: 'Nouveautés',
    name: 'PISTACHIO',
    description: 'Milkshake au Sundae 7.4 kg de châtaib',
    price: 3.95,
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop&crop=center'
  },
  {
    id: 4,
    category: 'Nouveautés',
    name: 'MENU BIG CHEESE',
    description: 'Potato bun, double steak haché smashé, oignons frais, pickles, salade double cheddar',
    price: 11.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop&crop=center'
  },
  {
    id: 5,
    category: 'Nouveautés',
    name: 'MENU SURF & TURF',
    description: 'Potato bun, steak haché smashé, crevettes panées, graine de sésame, cheddar',
    price: 11.90,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=300&fit=crop&crop=center'
  },
  {
    id: 6,
    category: 'Nouveautés',
    name: 'TACO SMASH',
    description: 'Choisissez deux Taco (classique ou épicé)',
    price: 7.90,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center'
  },

  // Big Burgers
  {
    id: 7,
    category: 'Big Burgers',
    name: 'BIG CHEESE',
    description: 'Potato bun, double steak haché smashé, salade iceberg, pickles, oignons',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop&crop=center'
  },
  {
    id: 8,
    category: 'Big Burgers',
    name: 'SURF & TURF',
    description: 'Potato bun, steak haché smashé, crevettes panées, graine de sésame, cheddar',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=300&fit=crop&crop=center'
  },
  {
    id: 9,
    category: 'Big Burgers',
    name: 'BIG SMASH',
    description: 'Pain Burger, 2 steaks smashés, 2 tranches de cheddar, pickles, salade',
    price: 6.90,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300&h=300&fit=crop&crop=center'
  },

  // Big Salades
  {
    id: 10,
    category: 'Big Salades',
    name: 'BIG CAESAR',
    description: 'Salade fraîche, tendres croutons, tomates cerises, copeaux de parmesan',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop&crop=center'
  },

  // Menus Burger
  {
    id: 11,
    category: 'Menus Burger',
    name: 'MENU BIG CHEESE',
    description: 'Potato bun, double steak haché smashé, oignons frais, pickles, salade double cheddar + frites + boisson',
    price: 11.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop&crop=center'
  },

  // Extras
  {
    id: 12,
    category: 'Extras',
    name: 'FRITES MAISON',
    description: 'Frites fraîches coupées maison',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop&crop=center'
  },

  // Boissons
  {
    id: 13,
    category: 'Boissons',
    name: 'COCA-COLA 33CL',
    description: 'Boisson gazeuse rafraîchissante',
    price: 2.90,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop&crop=center'
  },

  // Desserts
  {
    id: 14,
    category: 'Desserts',
    name: 'MILKSHAKE VANILLE',
    description: 'Milkshake onctueux à la vanille',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop&crop=center'
  }
];
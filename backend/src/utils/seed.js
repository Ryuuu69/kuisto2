const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Créer l'utilisateur admin par défaut
  const hashedPassword = await bcrypt.hash(
    process.env.DEFAULT_ADMIN_PASSWORD || 'admin123', 
    10
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@kuisto.com' },
    update: {},
    create: {
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@kuisto.com',
      password: hashedPassword,
      name: 'Administrateur Kuisto',
      role: 'ADMIN'
    }
  });

  console.log('👤 Utilisateur admin créé:', admin.email);

  // Créer les catégories
  const categories = [
    {
      name: 'Nouveautés',
      description: 'Nos dernières créations culinaires',
      order: 1
    },
    {
      name: 'Kuisto Salades',
      description: 'Salades fraîches et savoureuses',
      order: 2
    },
    {
      name: 'Kuisto Burgers',
      description: 'Nos burgers signature',
      order: 3
    },
    {
      name: 'Menus Burger',
      description: 'Menus complets avec burger, frites et boisson',
      order: 4
    },
    {
      name: 'Extras',
      description: 'Accompagnements et suppléments',
      order: 5
    },
    {
      name: 'Boissons',
      description: 'Boissons fraîches et chaudes',
      order: 6
    },
    {
      name: 'Desserts',
      description: 'Desserts gourmands',
      order: 7
    }
  ];

  const createdCategories = {};
  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      where: { name: categoryData.name },
      update: categoryData,
      create: categoryData
    });
    createdCategories[category.name] = category;
    console.log('📂 Catégorie créée:', category.name);
  }

  // Créer les produits
  const products = [
    // Nouveautés
    {
      name: 'Kuisto Caesar',
      description: 'Salade fraîche, tendres croutons, tomates cerises, copeaux de parmesan',
      price: 9.90,
      categoryName: 'Nouveautés',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop'
    },
    {
      name: 'Menu Kuisto Cheese',
      description: 'Potato bun, double steak haché smashé, oignons frais, pickles, salade double cheddar + frites + boisson',
      price: 11.90,
      categoryName: 'Nouveautés',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop'
    },

    // Kuisto Salades
    {
      name: 'Kuisto Caesar',
      description: 'Salade fraîche, tendres croutons, tomates cerises, copeaux de parmesan',
      price: 8.90,
      categoryName: 'Kuisto Salades',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop'
    },

    // Kuisto Burgers
    {
      name: 'Kuisto Cheese',
      description: 'Potato bun, double steak haché smashé, salade iceberg, pickles, oignons frais, double cheddar',
      price: 8.90,
      categoryName: 'Kuisto Burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop'
    },
    {
      name: 'Kuisto Smash',
      description: 'Pain Burger, 2 steaks smashés, 2 tranches de cheddar, pickles, salade',
      price: 6.90,
      categoryName: 'Kuisto Burgers',
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop'
    },

    // Menus Burger
    {
      name: 'Menu Kuisto Cheese',
      description: 'Potato bun, double steak haché smashé, oignons frais, pickles, salade double cheddar + frites + boisson',
      price: 11.90,
      categoryName: 'Menus Burger',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop'
    },

    // Extras
    {
      name: 'Frites Maison',
      description: 'Frites fraîches coupées maison',
      price: 3.50,
      categoryName: 'Extras',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop'
    },

    // Boissons
    {
      name: 'Coca-Cola 33cl',
      description: 'Boisson gazeuse rafraîchissante',
      price: 2.90,
      categoryName: 'Boissons',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop'
    },

    // Desserts
    {
      name: 'Milkshake Vanille',
      description: 'Milkshake onctueux à la vanille',
      price: 4.50,
      categoryName: 'Desserts',
      image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&h=400&fit=crop'
    }
  ];

  for (const productData of products) {
    const { categoryName, ...data } = productData;
    const category = createdCategories[categoryName];
    
    if (category) {
      await prisma.product.upsert({
        where: { 
          name_categoryId: {
            name: data.name,
            categoryId: category.id
          }
        },
        update: data,
        create: {
          ...data,
          categoryId: category.id
        }
      });
      console.log('🍔 Produit créé:', data.name);
    }
  }

  console.log('✅ Seeding terminé avec succès!');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
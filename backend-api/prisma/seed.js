const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Créer un utilisateur admin par défaut
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('👤 Created admin user:', admin.username);

  // Créer des catégories
  const categories = [
    { name: 'Nouveautés' },
    { name: 'Kuisto Salades' },
    { name: 'Kuisto Burgers' },
    { name: 'Menus Burger' },
    { name: 'Extras' },
    { name: 'Boissons' },
    { name: 'Desserts' }
  ];

  const createdCategories = [];
  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      where: { name: categoryData.name },
      update: {},
      create: categoryData
    });
    createdCategories.push(category);
    console.log('📂 Created category:', category.name);
  }

  // Créer des produits d'exemple
  const products = [
    {
      name: 'KUISTO SALADES',
      description: 'Kuisto Caesar, Salade fraîche, tendres croutons, tomates cerises, copeaux de parmesan.',
      price: 9.90,
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop&crop=center',
      categoryName: 'Nouveautés'
    },
    {
      name: 'MENU KUISTO CHEESE',
      description: 'Potato bun, double steak haché smashé, oignons frais, pickles, salade double cheddar + frites + boisson',
      price: 11.90,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop&crop=center',
      categoryName: 'Nouveautés'
    },
    {
      name: 'KUISTO CHEESE',
      description: 'Potato bun, double steak haché smashé, salade iceberg, pickles, oignons frais, double cheddar',
      price: 8.90,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop&crop=center',
      categoryName: 'Kuisto Burgers'
    },
    {
      name: 'FRITES MAISON',
      description: 'Frites fraîches coupées maison, cuites dans l\'huile de tournesol',
      price: 3.50,
      imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop&crop=center',
      categoryName: 'Extras'
    },
    {
      name: 'COCA-COLA 33CL',
      description: 'Boisson gazeuse rafraîchissante',
      price: 2.90,
      imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop&crop=center',
      categoryName: 'Boissons'
    }
  ];

  for (const productData of products) {
    const category = createdCategories.find(cat => cat.name === productData.categoryName);
    if (category) {
      const product = await prisma.product.create({
        data: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          imageUrl: productData.imageUrl,
          categoryId: category.id
        }
      });
      console.log('🍔 Created product:', product.name);
    }
  }

  // Créer une commande d'exemple
  const sampleProducts = await prisma.product.findMany({ take: 2 });
  if (sampleProducts.length >= 2) {
    const sampleOrder = await prisma.order.create({
      data: {
        customerName: 'Jean Dupont',
        customerAddress: '123 Rue de la Paix, 34000 Montpellier',
        customerPhone: '06 12 34 56 78',
        customerEmail: 'jean.dupont@email.com',
        totalAmount: 15.80,
        status: 'PENDING',
        deliveryMode: 'RESTAURANT',
        notes: 'Sans oignons sur le burger',
        orderItems: {
          create: [
            {
              productId: sampleProducts[0].id,
              quantity: 1,
              priceAtOrder: sampleProducts[0].price
            },
            {
              productId: sampleProducts[1].id,
              quantity: 2,
              priceAtOrder: sampleProducts[1].price
            }
          ]
        }
      }
    });
    console.log('📋 Created sample order:', sampleOrder.id);
  }

  console.log('✅ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
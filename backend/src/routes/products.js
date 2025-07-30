const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/products - Liste des produits actifs
router.get('/', async (req, res, next) => {
  try {
    const { categoryId, search } = req.query;
    
    const where = {
      isActive: true,
      ...(categoryId && { categoryId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/category/:categoryId - Produits par catégorie
router.get('/category/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const products = await prisma.product.findMany({
      where: {
        categoryId,
        isActive: true
      },
      include: {
        category: {
          select: { id: true, name: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id - Détail d'un produit
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true }
        }
      }
    });

    if (!product || !product.isActive) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
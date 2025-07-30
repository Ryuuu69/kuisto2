const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/categories - Liste des catégories actives
router.get('/', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { products: { where: { isActive: true } } }
        }
      }
    });

    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// GET /api/categories/:id - Détail d'une catégorie
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          orderBy: { name: 'asc' }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
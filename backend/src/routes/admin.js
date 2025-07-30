const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateBody, validateParams, schemas } = require('../middleware/validation');
const { createError } = require('../middleware/errorHandler');

const router = express.Router();
const prisma = new PrismaClient();

// Middleware d'authentification pour toutes les routes admin
router.use(authenticateToken);
router.use(requireAdmin);

// === GESTION DES COMMANDES ===

// GET /api/admin/orders - Liste de toutes les commandes
router.get('/orders', async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          orderItems: {
            include: {
              product: {
                select: { id: true, name: true, price: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: parseInt(skip),
        take: parseInt(limit)
      }),
      prisma.order.count({ where })
    ]);

    res.json({
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/orders/:id - Détail d'une commande
router.get('/orders/:id', validateParams(schemas.id), async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: {
              select: { id: true, name: true, price: true, image: true }
            }
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/orders/:id/status - Modifier le statut d'une commande
router.put('/orders/:id/status', 
  validateParams(schemas.id),
  validateBody(schemas.orderStatus),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await prisma.order.update({
        where: { id },
        data: { status },
        include: {
          orderItems: {
            include: {
              product: {
                select: { id: true, name: true, price: true }
              }
            }
          }
        }
      });

      res.json({
        message: 'Statut de la commande mis à jour',
        order
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }
      next(error);
    }
  }
);

// === GESTION DES CATÉGORIES ===

// GET /api/admin/categories - Toutes les catégories
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/categories - Créer une catégorie
router.post('/categories', validateBody(schemas.category), async (req, res, next) => {
  try {
    const category = await prisma.category.create({
      data: req.body
    });

    res.status(201).json({
      message: 'Catégorie créée avec succès',
      category
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/categories/:id - Modifier une catégorie
router.put('/categories/:id', 
  validateParams(schemas.id),
  validateBody(schemas.category),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await prisma.category.update({
        where: { id },
        data: req.body
      });

      res.json({
        message: 'Catégorie mise à jour',
        category
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Catégorie non trouvée' });
      }
      next(error);
    }
  }
);

// DELETE /api/admin/categories/:id - Supprimer une catégorie
router.delete('/categories/:id', validateParams(schemas.id), async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id }
    });

    res.json({ message: 'Catégorie supprimée' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    next(error);
  }
});

// === GESTION DES PRODUITS ===

// GET /api/admin/products - Tous les produits
router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
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

// POST /api/admin/products - Créer un produit
router.post('/products', validateBody(schemas.product), async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body,
      include: {
        category: {
          select: { id: true, name: true }
        }
      }
    });

    res.status(201).json({
      message: 'Produit créé avec succès',
      product
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/products/:id - Modifier un produit
router.put('/products/:id', 
  validateParams(schemas.id),
  validateBody(schemas.product),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await prisma.product.update({
        where: { id },
        data: req.body,
        include: {
          category: {
            select: { id: true, name: true }
          }
        }
      });

      res.json({
        message: 'Produit mis à jour',
        product
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }
      next(error);
    }
  }
);

// DELETE /api/admin/products/:id - Supprimer un produit
router.delete('/products/:id', validateParams(schemas.id), async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id }
    });

    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    next(error);
  }
});

module.exports = router;
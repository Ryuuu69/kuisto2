const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { validateBody, schemas } = require('../middleware/validation');
const { createError } = require('../middleware/errorHandler');

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/orders - Créer une nouvelle commande
router.post('/', validateBody(schemas.order), async (req, res, next) => {
  try {
    const { customerName, customerPhone, customerAddress, deliveryOption, notes, items } = req.body;

    // Vérifier que tous les produits existent et calculer le total
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });

      if (!product || !product.isActive) {
        throw createError(400, `Produit ${item.productId} non trouvé ou indisponible`);
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      validatedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Générer un numéro de commande unique
    const orderNumber = `KUI${Date.now()}`;

    // Créer la commande avec les items
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerPhone,
        customerAddress,
        deliveryOption,
        notes,
        totalAmount,
        orderItems: {
          create: validatedItems
        }
      },
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

    res.status(201).json({
      message: 'Commande créée avec succès',
      order
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:orderNumber - Récupérer une commande par son numéro
router.get('/:orderNumber', async (req, res, next) => {
  try {
    const { orderNumber } = req.params;

    const order = await prisma.order.findUnique({
      where: { orderNumber },
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

module.exports = router;
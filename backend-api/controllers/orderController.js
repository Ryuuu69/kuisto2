const { PrismaClient } = require('@prisma/client');
const uberEatsService = require('../services/uberEatsService');

const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customerName
 *         - totalAmount
 *         - orderItems
 *       properties:
 *         id:
 *           type: string
 *           description: ID unique de la commande
 *         customerName:
 *           type: string
 *           description: Nom du client
 *         customerAddress:
 *           type: string
 *           description: Adresse du client
 *         customerPhone:
 *           type: string
 *           description: Téléphone du client
 *         customerEmail:
 *           type: string
 *           description: Email du client
 *         totalAmount:
 *           type: number
 *           format: float
 *           description: Montant total de la commande
 *         status:
 *           type: string
 *           enum: [PENDING, CONFIRMED, PREPARING, READY, DELIVERED, CANCELLED]
 *           description: Statut de la commande
 *         deliveryMode:
 *           type: string
 *           enum: [RESTAURANT, UBER_EATS]
 *           description: Mode de livraison
 *         notes:
 *           type: string
 *           description: Notes spéciales
 *         uberEatsOrderId:
 *           type: string
 *           description: ID de la commande Uber Eats (si applicable)
 *         orderItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     OrderItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         productId:
 *           type: string
 *         quantity:
 *           type: integer
 *         priceAtOrder:
 *           type: number
 *           format: float
 *         product:
 *           $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Récupérer toutes les commandes
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, CONFIRMED, PREPARING, READY, DELIVERED, CANCELLED]
 *         description: Filtrer par statut
 *       - in: query
 *         name: deliveryMode
 *         schema:
 *           type: string
 *           enum: [RESTAURANT, UBER_EATS]
 *         description: Filtrer par mode de livraison
 *     responses:
 *       200:
 *         description: Liste des commandes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
const getAllOrders = async (req, res) => {
  try {
    const { status, deliveryMode } = req.query;

    const where = {};
    if (status) where.status = status;
    if (deliveryMode) where.deliveryMode = deliveryMode;

    const orders = await prisma.order.findMany({
      where,
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch orders'
    });
  }
};

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Récupérer une commande par ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la commande
 *     responses:
 *       200:
 *         description: Détails de la commande
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Commande non trouvée
 */
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({
        error: 'Order not found',
        message: 'The requested order does not exist'
      });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch order'
    });
  }
};

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Créer une nouvelle commande
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - totalAmount
 *               - orderItems
 *             properties:
 *               customerName:
 *                 type: string
 *               customerAddress:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *                 format: float
 *               deliveryMode:
 *                 type: string
 *                 enum: [RESTAURANT, UBER_EATS]
 *                 default: RESTAURANT
 *               notes:
 *                 type: string
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                     - priceAtOrder
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     priceAtOrder:
 *                       type: number
 *                       format: float
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Données invalides
 */
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerAddress,
      customerPhone,
      customerEmail,
      totalAmount,
      deliveryMode = 'RESTAURANT',
      notes,
      orderItems
    } = req.body;

    if (!customerName || !totalAmount || !orderItems || orderItems.length === 0) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Customer name, total amount, and order items are required'
      });
    }

    if (totalAmount <= 0) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Total amount must be greater than 0'
      });
    }

    // Vérifier que tous les produits existent
    const productIds = orderItems.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({
        error: 'Invalid products',
        message: 'One or more products do not exist'
      });
    }

    // Créer la commande avec les items
    const order = await prisma.order.create({
      data: {
        customerName,
        customerAddress,
        customerPhone,
        customerEmail,
        totalAmount: parseFloat(totalAmount),
        deliveryMode,
        notes,
        orderItems: {
          create: orderItems.map(item => ({
            productId: item.productId,
            quantity: parseInt(item.quantity),
            priceAtOrder: parseFloat(item.priceAtOrder)
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    // Si c'est une commande Uber Eats, préparer l'intégration future
    if (deliveryMode === 'UBER_EATS') {
      try {
        await uberEatsService.sendOrderToUberEats(order);
      } catch (uberError) {
        console.error('Uber Eats integration error:', uberError);
        // Ne pas faire échouer la création de commande si Uber Eats échoue
      }
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create order'
    });
  }
};

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Mettre à jour le statut d'une commande
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, PREPARING, READY, DELIVERED, CANCELLED]
 *     responses:
 *       200:
 *         description: Statut mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Commande non trouvée
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status',
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    res.json(order);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Order not found',
        message: 'The requested order does not exist'
      });
    }

    console.error('Update order status error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update order status'
    });
  }
};

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Supprimer une commande
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commande supprimée
 *       404:
 *         description: Commande non trouvée
 */
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: { id }
    });

    res.json({
      message: 'Order deleted successfully'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Order not found',
        message: 'The requested order does not exist'
      });
    }

    console.error('Delete order error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete order'
    });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
};
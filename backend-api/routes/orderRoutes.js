const express = require('express');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route publique pour créer une commande (depuis le frontend client)
router.post('/', createOrder);

// Routes protégées (admin seulement)
router.get('/', authenticateToken, requireAdmin, getAllOrders);
router.get('/:id', authenticateToken, requireAdmin, getOrderById);
router.patch('/:id/status', authenticateToken, requireAdmin, updateOrderStatus);
router.delete('/:id', authenticateToken, requireAdmin, deleteOrder);

module.exports = router;
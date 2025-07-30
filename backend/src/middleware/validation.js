const Joi = require('joi');

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Données invalides',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({
        error: 'Paramètres invalides',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

// Schémas de validation
const schemas = {
  // Auth
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),

  // Category
  category: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500).optional(),
    image: Joi.string().uri().optional(),
    order: Joi.number().integer().min(0).optional(),
    isActive: Joi.boolean().optional()
  }),

  // Product
  product: Joi.object({
    name: Joi.string().min(2).max(200).required(),
    description: Joi.string().max(1000).required(),
    price: Joi.number().positive().required(),
    image: Joi.string().uri().optional(),
    categoryId: Joi.string().required(),
    isActive: Joi.boolean().optional()
  }),

  // Order
  order: Joi.object({
    customerName: Joi.string().min(2).max(100).required(),
    customerPhone: Joi.string().pattern(/^[0-9+\-\s()]+$/).required(),
    customerAddress: Joi.string().max(500).optional(),
    deliveryOption: Joi.string().valid('RESTAURANT_DELIVERY', 'UBER_EATS').required(),
    notes: Joi.string().max(500).optional(),
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required()
      })
    ).min(1).required()
  }),

  // Order status update
  orderStatus: Joi.object({
    status: Joi.string().valid(
      'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'
    ).required()
  }),

  // ID parameter
  id: Joi.object({
    id: Joi.string().required()
  })
};

module.exports = {
  validateBody,
  validateParams,
  schemas
};
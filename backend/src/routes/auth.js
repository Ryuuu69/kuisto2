const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { validateBody, schemas } = require('../middleware/validation');
const { createError } = require('../middleware/errorHandler');

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/auth/login - Connexion administrateur
router.post('/login', validateBody(schemas.login), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Rechercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw createError(401, 'Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createError(401, 'Email ou mot de passe incorrect');
    }

    // Générer le token JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Middleware pour vérifier l'authentification JWT
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied', 
        message: 'No token provided' 
      });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier que l'utilisateur existe toujours
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, role: true }
    });

    if (!user) {
      return res.status(401).json({ 
        error: 'Access denied', 
        message: 'User not found' 
      });
    }

    // Ajouter les infos utilisateur à la requête
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        error: 'Invalid token', 
        message: 'Token is not valid' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        error: 'Token expired', 
        message: 'Please login again' 
      });
    }

    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Authentication failed' 
    });
  }
};

/**
 * Middleware pour vérifier les rôles d'administration
 */
const requireAdmin = (req, res, next) => {
  if (!req.user || !['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ 
      error: 'Access denied', 
      message: 'Admin privileges required' 
    });
  }
  next();
};

/**
 * Middleware pour vérifier le rôle super admin
 */
const requireSuperAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ 
      error: 'Access denied', 
      message: 'Super admin privileges required' 
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireSuperAdmin
};
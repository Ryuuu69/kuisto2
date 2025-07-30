const errorHandler = (err, req, res, next) => {
  console.error('Erreur:', err);

  // Erreur de validation Prisma
  if (err.code === 'P2002') {
    return res.status(400).json({
      error: 'Violation de contrainte unique',
      details: err.meta
    });
  }

  // Erreur de validation Joi
  if (err.isJoi) {
    return res.status(400).json({
      error: 'Données invalides',
      details: err.details.map(detail => detail.message)
    });
  }

  // Erreur personnalisée
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  // Erreur générique
  res.status(500).json({
    error: 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = {
  errorHandler,
  createError
};
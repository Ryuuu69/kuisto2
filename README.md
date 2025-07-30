# Kuisto - Application de Restaurant

Application complète de gestion de restaurant avec interface client et administrateur.

## Stack Technique

- **Backend**: Node.js, Express, PostgreSQL, Prisma ORM
- **Frontend Client**: React (interface publique)
- **Frontend Admin**: React (dashboard administrateur)
- **Authentification**: JWT
- **API**: RESTful

## Structure du Projet

```
kuisto-restaurant-app/
├── backend/                 # API Node.js/Express
├── frontend-client/         # Interface client (React)
├── frontend-admin/          # Interface admin (React)
└── README.md
```

## Installation

1. **Cloner le projet et installer les dépendances**
```bash
npm run install:all
```

2. **Configuration de la base de données**
```bash
cd backend
cp .env.example .env
# Modifier les variables d'environnement dans .env
npm run db:migrate
npm run db:seed
```

3. **Démarrage en développement**
```bash
# Depuis la racine du projet
npm run dev
```

Cela démarre simultanément :
- Backend API sur http://localhost:3001
- Interface client sur http://localhost:3000
- Interface admin sur http://localhost:3002

## URLs d'accès

- **Interface Client**: http://localhost:3000
- **Interface Admin**: http://localhost:3002
- **API Backend**: http://localhost:3001

## Comptes par défaut

**Administrateur**:
- Email: admin@kuisto.com
- Mot de passe: admin123

## API Documentation

### Endpoints Publics
- `GET /api/categories` - Liste des catégories
- `GET /api/products` - Liste des produits
- `GET /api/products/category/:id` - Produits par catégorie
- `POST /api/orders` - Créer une commande

### Endpoints Admin (JWT requis)
- `POST /api/auth/login` - Connexion admin
- `GET /api/admin/orders` - Liste des commandes
- `PUT /api/admin/orders/:id/status` - Modifier statut commande
- `GET /api/admin/orders/:id` - Détail commande
- CRUD complet pour categories et products

## Variables d'Environnement

Voir `backend/.env.example` pour la configuration complète.

## Scripts Disponibles

- `npm run dev` - Démarrage développement complet
- `npm run build` - Build production
- `npm run install:all` - Installation toutes dépendances
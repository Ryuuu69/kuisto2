# Kuisto Restaurant API

API REST sécurisée pour la gestion des commandes du restaurant Kuisto.

## 🚀 Démarrage rapide

### Prérequis

- Node.js (v16 ou plus récent)
- PostgreSQL
- npm ou yarn

### Installation

1. **Cloner le projet et installer les dépendances**
```bash
cd backend-api
npm install
```

2. **Configurer la base de données**
```bash
# Copier le fichier d'environnement
cp .env.example .env

# Modifier le fichier .env avec vos paramètres de base de données
# DATABASE_URL="postgresql://username:password@localhost:5432/kuisto_db?schema=public"
```

3. **Initialiser la base de données**
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev --name init

# Peupler la base avec des données d'exemple
npm run db:seed
```

4. **Démarrer le serveur**
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

Le serveur sera accessible sur `http://localhost:3001`

## 📚 Documentation API

Une fois le serveur démarré, la documentation Swagger est disponible sur :
- **Swagger UI** : http://localhost:3001/api-docs
- **Health Check** : http://localhost:3001/health

## 🔐 Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification des administrateurs.

### Connexion admin par défaut
- **Username** : `admin`
- **Password** : `admin123`

### Utilisation
1. Faire une requête POST vers `/api/auth/login` avec les identifiants
2. Récupérer le token JWT dans la réponse
3. Inclure le token dans l'en-tête `Authorization: Bearer <token>` pour les routes protégées

## 🛠 Scripts disponibles

```bash
# Démarrer en mode développement
npm run dev

# Démarrer en mode production
npm start

# Migrations de base de données
npm run db:migrate

# Générer le client Prisma
npm run db:generate

# Peupler la base avec des données d'exemple
npm run db:seed

# Interface d'administration de la base de données
npm run db:studio
```

## 📋 Endpoints principaux

### Authentification
- `POST /api/auth/login` - Connexion admin
- `GET /api/auth/me` - Informations utilisateur connecté

### Catégories
- `GET /api/categories` - Liste des catégories
- `POST /api/categories` - Créer une catégorie (admin)
- `PUT /api/categories/:id` - Modifier une catégorie (admin)
- `DELETE /api/categories/:id` - Supprimer une catégorie (admin)

### Produits
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détails d'un produit
- `POST /api/products` - Créer un produit (admin)
- `PUT /api/products/:id` - Modifier un produit (admin)
- `DELETE /api/products/:id` - Supprimer un produit (admin)

### Commandes
- `POST /api/orders` - Créer une commande (public)
- `GET /api/orders` - Liste des commandes (admin)
- `GET /api/orders/:id` - Détails d'une commande (admin)
- `PATCH /api/orders/:id/status` - Changer le statut (admin)
- `DELETE /api/orders/:id` - Supprimer une commande (admin)

## 🔧 Configuration CORS

Le serveur est configuré pour accepter les requêtes depuis :
- `http://localhost:3000` (React dev server)
- `http://localhost:5173` (Vite dev server)
- `https://kuistofood.netlify.app` (Site de production)

Modifiez la variable `CORS_ORIGINS` dans le fichier `.env` pour ajouter d'autres origines.

## 🚚 Intégration Uber Eats

La structure est préparée pour l'intégration future avec l'API Uber Eats :
- Service placeholder dans `services/uberEatsService.js`
- Champ `uberEatsOrderId` dans le modèle Order
- Mode de livraison `UBER_EATS` disponible

## 🗄 Structure de la base de données

### Modèles principaux

- **User** : Administrateurs du système
- **Category** : Catégories de produits
- **Product** : Produits du menu
- **Order** : Commandes clients
- **OrderItem** : Articles d'une commande

### Statuts des commandes

- `PENDING` : En attente
- `CONFIRMED` : Confirmée
- `PREPARING` : En préparation
- `READY` : Prête
- `DELIVERED` : Livrée
- `CANCELLED` : Annulée

### Modes de livraison

- `RESTAURANT` : À récupérer au restaurant
- `UBER_EATS` : Livraison Uber Eats

## 🛡 Sécurité

- Authentification JWT
- Hachage des mots de passe avec bcrypt
- Protection CORS
- Rate limiting
- Validation des données d'entrée
- Middleware de sécurité Helmet

## 🐛 Développement

Pour contribuer au projet :

1. Créer une branche feature
2. Faire les modifications
3. Tester avec `npm test` (à implémenter)
4. Créer une pull request

## 📝 Variables d'environnement

```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/kuisto_db?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Serveur
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGINS="http://localhost:3000,http://localhost:5173,https://kuistofood.netlify.app"
```

## 📞 Support

Pour toute question ou problème, consultez la documentation Swagger ou contactez l'équipe de développement.
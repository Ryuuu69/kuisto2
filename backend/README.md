# Restaurant API Backend

Backend FastAPI complet pour la gestion d'un restaurant avec PostgreSQL.

## Fonctionnalités

- **Gestion des catégories** : CRUD complet pour les catégories de produits
- **Gestion des produits** : CRUD avec liaison aux catégories
- **Gestion des suppléments** : Suppléments avec prix
- **Gestion des options** : Options liées aux produits avec choix multiples
- **Gestion des choix d'options** : Choix avec prix supplémentaire
- **Gestion des commandes** : Commandes complètes avec articles
- **Gestion des articles de commande** : Articles avec suppléments et choix d'options

## Installation

1. Installer les dépendances :
```bash
cd backend
pip install -r requirements.txt
```

2. Configurer la base de données PostgreSQL dans le fichier `.env` :
```
DATABASE_URL=postgresql+asyncpg://username:password@localhost:5432/restaurant_db
```

3. Lancer le serveur :
```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

## Documentation API

Une fois le serveur lancé, la documentation interactive est disponible à :
- Swagger UI : http://localhost:8000/docs
- ReDoc : http://localhost:8000/redoc

## Endpoints principaux

### Catégories
- `GET /api/categories` - Liste toutes les catégories
- `POST /api/categories` - Crée une nouvelle catégorie
- `GET /api/categories/{id}` - Récupère une catégorie par ID
- `PUT /api/categories/{id}` - Met à jour une catégorie
- `DELETE /api/categories/{id}` - Supprime une catégorie

### Produits
- `GET /api/products` - Liste tous les produits
- `POST /api/products` - Crée un nouveau produit
- `GET /api/products/{id}` - Récupère un produit par ID
- `PUT /api/products/{id}` - Met à jour un produit
- `DELETE /api/products/{id}` - Supprime un produit

### Suppléments
- `GET /api/supplements` - Liste tous les suppléments
- `POST /api/supplements` - Crée un nouveau supplément
- `GET /api/supplements/{id}` - Récupère un supplément par ID
- `PUT /api/supplements/{id}` - Met à jour un supplément
- `DELETE /api/supplements/{id}` - Supprime un supplément

### Options
- `GET /api/options` - Liste toutes les options
- `POST /api/options` - Crée une nouvelle option
- `GET /api/options/{id}` - Récupère une option par ID
- `PUT /api/options/{id}` - Met à jour une option
- `DELETE /api/options/{id}` - Supprime une option

### Choix d'options
- `GET /api/choice-options` - Liste tous les choix d'options
- `POST /api/choice-options` - Crée un nouveau choix d'option
- `GET /api/choice-options/{id}` - Récupère un choix d'option par ID
- `PUT /api/choice-options/{id}` - Met à jour un choix d'option
- `DELETE /api/choice-options/{id}` - Supprime un choix d'option

### Commandes
- `GET /api/orders` - Liste toutes les commandes
- `POST /api/orders` - Crée une nouvelle commande
- `GET /api/orders/{id}` - Récupère une commande par ID
- `PUT /api/orders/{id}` - Met à jour une commande
- `DELETE /api/orders/{id}` - Supprime une commande

### Articles de commande
- `GET /api/order-items` - Liste tous les articles de commande
- `POST /api/order-items` - Crée un nouvel article de commande
- `GET /api/order-items/{id}` - Récupère un article de commande par ID
- `PUT /api/order-items/{id}` - Met à jour un article de commande
- `DELETE /api/order-items/{id}` - Supprime un article de commande

## Structure des données

### Exemple de création d'une commande complète

```json
{
  "total": 25.50,
  "delivery_address": "123 Rue de la Paix, 75001 Paris",
  "phone": "0123456789",
  "delivery_mode": "restaurant",
  "status": "pending",
  "order_items": [
    {
      "product_id": 1,
      "quantity": 2,
      "unit_price": 12.50,
      "supplement_ids": [1, 2],
      "choice_option_ids": [3]
    }
  ]
}
```

## CORS

Le backend est configuré pour accepter toutes les origines (`*`), permettant à vos pages HTML existantes de faire des requêtes Ajax/fetch vers l'API.

## Intégration future Uber Eats

Un point d'intégration est préparé dans la fonction de création de commande pour l'API Uber Eats (commenté pour l'instant).

## Base de données

Les tables sont créées automatiquement au démarrage de l'application. Pour la production, il est recommandé d'utiliser Alembic pour les migrations.
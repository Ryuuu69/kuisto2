// cart-system.js - Système de panier partagé (à inclure sur toutes les pages)

class CartSystem {
  constructor() {
    this.cart = this.loadCart();
    this.init();
  }

  // Initialisation du système
  init() {
    this.createCartBar();
    this.updateCartDisplay();
    
    // Écouter les changements de localStorage depuis d'autres onglets
    window.addEventListener('storage', (e) => {
      if (e.key === 'bigsmash_cart') {
        this.cart = this.loadCart();
        this.updateCartDisplay();
      }
    });
  }

  // Charger le panier depuis localStorage
  loadCart() {
    try {
      const saved = localStorage.getItem('bigsmash_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Erreur lors du chargement du panier:', e);
      return [];
    }
  }

  // Sauvegarder le panier dans localStorage
  saveCart() {
    try {
      localStorage.setItem('bigsmash_cart', JSON.stringify(this.cart));
      this.updateCartDisplay();
    } catch (e) {
      console.error('Erreur lors de la sauvegarde du panier:', e);
    }
  }

  // Ajouter un produit au panier
  addToCart(product, quantity = 1, options = {}) {
    const cartItem = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      basePrice: product.price,
      quantity: quantity,
      options: options,
      totalPrice: this.calculateItemPrice(product, quantity, options),
      addedAt: new Date().toISOString()
    };

    // Vérifier si le même produit avec les mêmes options existe déjà
    const existingIndex = this.cart.findIndex(item => 
      item.id === product.id && 
      JSON.stringify(item.options) === JSON.stringify(options)
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
      this.cart[existingIndex].totalPrice = this.calculateItemPrice(
        product, 
        this.cart[existingIndex].quantity, 
        options
      );
    } else {
      this.cart.push(cartItem);
    }

    this.saveCart();
    
  }

  // Calculer le prix d'un article avec ses options
  calculateItemPrice(product, quantity, options) {
    let price = product.price * quantity;
    
    // Ajouter le prix des suppléments
    if (options.supplements) {
      Object.values(options.supplements).forEach(supplement => {
        if (supplement.quantity > 0) {
          price += supplement.price * supplement.quantity * quantity;
        }
      });
    }

    // Ajouter le prix de la boisson
    if (options.drink && options.drink.price > 0) {
      price += options.drink.price * quantity;
    }

    return price;
  }

  // Obtenir le nombre total d'articles
  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Obtenir le prix total
  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.totalPrice, 0);
  }


  // Créer la barre de panier sticky
  createCartBar() {
    if (document.getElementById('cart-bar')) return; // Éviter les doublons

    const cartBar = document.createElement('div');
    cartBar.id = 'cart-bar';
    cartBar.className = 'cart-bar';
    cartBar.innerHTML = `
      <div class="cart-content">
        <span class="cart-icon">🛒</span>
        <span class="cart-text">
          <span id="cart-count">0</span> article(s) — 
          <span id="cart-price">0,00 €</span>
        </span>
      </div>
    `;

    // Styles inline pour éviter les conflits
    cartBar.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #191919;
      color: white;
      padding: 12px 20px;
      border-radius: 25px;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 600;
      display: none;
    `;

    cartBar.addEventListener('click', () => {
      window.location.href = 'panier.html';
    });

    cartBar.addEventListener('mouseenter', () => {
      cartBar.style.background = '#EA3D2F';
      cartBar.style.transform = 'translateY(-2px)';
    });

    cartBar.addEventListener('mouseleave', () => {
      cartBar.style.background = '#191919';
      cartBar.style.transform = 'translateY(0)';
    });

    document.body.appendChild(cartBar);
  }

  // Mettre à jour l'affichage du panier
   updateCartDisplay() {
    const cartBar = document.getElementById('cart-bar');
    const cartCount = document.getElementById('cart-count');
    const cartPrice = document.getElementById('cart-price');

    if (!cartBar || !cartCount || !cartPrice) return;

    const totalItems = this.getTotalItems();
    const totalPrice = this.getTotalPrice();

    cartCount.textContent = totalItems;
    cartPrice.textContent = totalPrice.toFixed(2).replace('.', ',') + ' €';

    // Afficher/masquer la barre selon le contenu du panier
    cartBar.style.display = totalItems > 0 ? 'block' : 'none';
  }

  
  
    // Supprimer l'ancien toast s'il existe
    const existingToast = document.getElementById('cart-toast');
    if (existingToast) {
      existingToast.remove();
    }

   

  // Vider le panier
  clearCart() {
    this.cart = [];
    this.saveCart();
  }
}

// Initialiser le système de panier automatiquement et le rendre globalement accessible
window.cartSystem = new CartSystem();
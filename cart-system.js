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

  // Calculer le prix d'un article avec ses options
  calculateItemPrice(product, quantity, options) {
    let price = parseFloat(product.price || product.prix || 0);

    // Ajouter le prix des suppléments
    if (options.supplements) {
      Object.values(options.supplements).forEach(supplement => {
        if (supplement.quantity > 0) {
          price += supplement.price * supplement.quantity;
        }
      });
    }

    // Ajouter le prix de la boisson
    if (options.drink && options.drink.price > 0) {
      price += options.drink.price;
    }

    // Multiplier par la quantité totale
    return price * quantity;
  }

  // Ajouter un produit au panier
  addToCart(product, quantity, options) {
    // 1. Chercher si même produit + options existe déjà
    const existingIndex = this.cart.findIndex(item =>
      item.id === (product.slug || product.id) &&
      JSON.stringify(item.supplements) === JSON.stringify(options.supplements || {}) &&
      JSON.stringify(item.drink) === JSON.stringify(options.drink || null) &&
      JSON.stringify(item.remove) === JSON.stringify(options.remove || null)
    );

    // 2. Calcul du prix total pour cette ligne
    const lineTotal = this.calculateItemPrice(product, quantity, options);

    if (existingIndex > -1) {
      // Déjà présent, on incrémente la quantité et le total
      this.cart[existingIndex].quantity += quantity;
      this.cart[existingIndex].lineTotal += lineTotal;
    } else {
      // Nouveau, on ajoute la ligne au panier
      const cartItem = {
        id: product.slug || product.id,
        name: product.name || product.nom,
        basePrice: parseFloat(product.price || product.prix || 0),
        supplements: options.supplements || {},
        drink: options.drink || null,
        remove: options.remove || null,
        quantity: quantity,
        lineTotal: lineTotal
      };
      this.cart.push(cartItem);
    }

    this.saveCart();
    this.showToast(`${product.name || product.nom} ajouté au panier !`);
  }

  // Obtenir le nombre total d'articles
  getTotalItems() {
    return this.cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }

  // Obtenir le prix total
  getTotalPrice() {
    return this.cart.reduce((total, item) => total + (item.lineTotal || 0), 0);
  }

  // Créer la barre de panier sticky
  createCartBar() {
    if (document.getElementById('cart-icon-bar')) return;
    const cartBar = document.createElement('div');
    cartBar.id = 'cart-icon-bar';
    cartBar.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        background: #E42B16;
        border-radius: 9999px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.13);
        padding: 14px 22px;
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        cursor: pointer;
        display: none;
        transition: all 0.25s;
    `;
    cartBar.innerHTML = `
      🛒 <span id="cart-count"></span> • <span id="cart-subtotal"></span>€
    `;
    cartBar.onclick = function() {
        window.location.href = 'panier.html';
    };
    document.body.appendChild(cartBar);
  }

  // Mettre à jour l'affichage du panier sticky en bas à droite
  updateCartDisplay() {
    const cartBar = document.getElementById('cart-icon-bar');
    if (!cartBar) return;
    const count = this.getTotalItems();
    const subtotal = this.getTotalPrice();
    document.getElementById('cart-count').textContent = count;
    document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2).replace('.', ',');
    cartBar.style.display = count > 0 ? 'block' : 'none';
  }

  // Afficher un toast de confirmation
  showToast(message) {
    // Supprimer l'ancien toast s'il existe
    const existingToast = document.getElementById('cart-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1001;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      animation: slideInUp 0.3s ease;
    `;

    // Ajouter l'animation CSS
    if (!document.getElementById('toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Supprimer le toast après 3 secondes
    setTimeout(() => {
      toast.style.animation = 'slideInUp 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Afficher la modale du panier (optionnel)
  showCartModal() {
    alert(`Panier: ${this.getTotalItems()} article(s) - ${this.getTotalPrice().toFixed(2)} €\n\nFonctionnalité de panier détaillé à implémenter selon vos besoins.`);
  }

  // Vider le panier
  clearCart() {
    this.cart = [];
    this.saveCart();
  }
}

// Initialiser le système de panier automatiquement
let cartSystem;
document.addEventListener('DOMContentLoaded', () => {
  cartSystem = new CartSystem();
});

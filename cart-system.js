// cart-system.js - Système de panier partagé (à inclure sur toutes les pages)
function updateCartFab() {
  // temporaire : évite l’erreur si elle n’existe pas encore
}

class CartSystem {
  constructor() {
    this.cart = this.loadCart();
    this.init();
  }

  init() {
    this.createCartBar();
    this.updateCartDisplay();
    window.addEventListener('storage', (e) => {
      if (e.key === 'bigsmash_cart') {
        this.cart = this.loadCart();
        this.updateCartDisplay();
      }
    });
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('bigsmash_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Erreur lors du chargement du panier:', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('bigsmash_cart', JSON.stringify(this.cart));
      this.updateCartDisplay();
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    } catch (e) {
      console.error('Erreur lors de la sauvegarde du panier:', e);
    }
    updateCartFab();
  }

  addToCart(product, quantity = 1, options = {}, basePrice = null) {
    const realBasePrice = (basePrice !== null && basePrice !== undefined) ? basePrice : product.price;
    const cartItem = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      basePrice: realBasePrice,
      quantity: quantity,
      options: options,
      totalPrice: this.calculateItemPrice(product, quantity, options, realBasePrice),
      addedAt: new Date().toISOString()
    };
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
    // *** REDIRECTION AUTOMATIQUE COMME AVANT ***
    window.location.href = "produits.html";
  }

  calculateItemPrice(product, quantity, options) {
    let basePrice = product.price;
    if (options.size && options.size.price !== undefined) {
      basePrice = options.size.price;
    }
    if (!basePrice) basePrice = 0;
    let price = basePrice * quantity;
    if (options.supplements) {
      Object.values(options.supplements).forEach(supplement => {
        if (supplement.quantity > 0) {
          price += supplement.price * supplement.quantity * quantity;
        }
      });
    }
    if (options.drink && options.drink.price > 0) {
      price += options.drink.price * quantity;
    }
    return price;
  }

  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.totalPrice, 0);
  }

  // --- NOUVEAU ---
  getTotalQuantityForProduct(slug) {
    return this.cart
      .filter(item => item.slug === slug)
      .reduce((total, item) => total + item.quantity, 0);
  }

  // --- NOUVEAU ---
  removeLastVariantOfProduct(slug) {
    const candidates = this.cart.filter(item => item.slug === slug);
    if (candidates.length === 0) return;
    let last = candidates[0];
    for (const item of candidates) {
      if (item.addedAt > last.addedAt) last = item;
    }
    const index = this.cart.indexOf(last);
    if (last.quantity > 1) {
      last.quantity--;
      last.totalPrice = this.calculateItemPrice(
        { price: last.basePrice },
        last.quantity,
        last.options
      );
    } else {
      this.cart.splice(index, 1);
    }
    this.saveCart();
  }

  getProductQuantity(productSlug) {
    const item = this.cart.find(item => item.slug === productSlug);
    return item ? item.quantity : 0;
  }

  createCartBar() {
    if (document.getElementById('cart-bar')) return;
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
      cartBar.style.background = '#F18701';
      cartBar.style.transform = 'translateY(-2px)';
    });
    cartBar.addEventListener('mouseleave', () => {
      cartBar.style.background = '#191919';
      cartBar.style.transform = 'translateY(0)';
    });
    document.body.appendChild(cartBar);
  }

  updateCartDisplay() {
    const cartBar = document.getElementById('cart-bar');
    const cartCount = document.getElementById('cart-count');
    const cartPrice = document.getElementById('cart-price');
    if (!cartBar || !cartCount || !cartPrice) return;
    const totalItems = this.getTotalItems();
    const totalPrice = this.getTotalPrice();
    cartCount.textContent = totalItems;
    cartPrice.textContent = totalPrice.toFixed(2).replace('.', ',') + ' €';
    cartBar.style.display = totalItems > 0 ? 'block' : 'none';
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }
  removeFromCart(productSlug) {
    this.cart = this.cart.filter(item => item.slug !== productSlug);
    this.saveCart();
  }
  decreaseQuantity(productSlug) {
    const itemIndex = this.cart.findIndex(item => item.slug === productSlug);
    if (itemIndex > -1) {
      if (this.cart[itemIndex].quantity > 1) {
        this.cart[itemIndex].quantity--;
        this.cart[itemIndex].totalPrice = this.calculateItemPrice(
          { price: this.cart[itemIndex].basePrice },
          this.cart[itemIndex].quantity,
          this.cart[itemIndex].options
        );
      } else {
        this.cart.splice(itemIndex, 1);
      }
      this.saveCart();
    }
  }
  increaseQuantity(productSlug) {
    const itemIndex = this.cart.findIndex(item => item.slug === productSlug);
    if (itemIndex > -1) {
      this.cart[itemIndex].quantity++;
      this.cart[itemIndex].totalPrice = this.calculateItemPrice(
        { price: this.cart[itemIndex].basePrice },
        this.cart[itemIndex].quantity,
        this.cart[itemIndex].options
      );
      this.saveCart();
    }
  }
}

window.cartSystem = new CartSystem();

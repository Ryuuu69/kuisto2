document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-detail-container');

  // 1. Cibler tous les boutons “+” et ajouter le listener
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;

      // 2. Récupérer les données du produit via votre API REST
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) {
        alert('Erreur de chargement du produit');
        return;
      }
      const p = await res.json();

      // 3. Générer le HTML de la fiche
      container.innerHTML = `
        <article class="product-page" data-id="${p.id}">
          <button class="close-detail" aria-label="Fermer la fiche">×</button>
          <h1>${p.title}</h1>
          ${p.image ? `<img src="${p.image}" alt="${p.title}">` : ''}
          <p>${p.description}</p>
          <div class="price" data-base-price="${p.price}">
            Prix : <span id="total-price">${p.price.toFixed(2)} €</span>
          </div>
          <form id="add-to-cart-form">
            <label>
              Quantité
              <input type="number" name="quantity" value="1" min="1">
            </label>

            ${p.options && p.options.length
              ? `<fieldset><legend>Suppléments</legend>
                   ${p.options.map(o => `
                     <label>
                       <input type="checkbox" name="options" value="${o.id}" data-price="${o.price}">
                       ${o.name} (+${o.price.toFixed(2)} €)
                     </label>
                   `).join('')}
                 </fieldset>`
              : ''}

            ${p.removals && p.removals.length
              ? `<fieldset><legend>Retirer</legend>
                   ${p.removals.map(r => `
                     <label>
                       <input type="checkbox" name="removals" value="${r.id}">
                       ${r.name}
                     </label>
                   `).join('')}
                 </fieldset>`
              : ''}

            ${p.drinks && p.drinks.length
              ? `<label>
                   Boisson
                   <select name="drink">
                     <option value="">Aucune</option>
                     ${p.drinks.map(d => `
                       <option value="${d.id}" data-price="${d.price}">
                         ${d.name} (+${d.price.toFixed(2)} €)
                       </option>
                     `).join('')}
                   </select>
                 </label>`
              : ''}

            <button type="submit">Ajouter au panier</button>
          </form>
        </article>
      `;

      // 4. Fermer la fiche au clic sur “×”
      container.querySelector('.close-detail')
               .addEventListener('click', () => container.innerHTML = '');

      // 5. Initialiser la logique de calcul du prix et d’ajout au panier
      initProductForm();
    });
  });

  // Fonction qui gère le recalcul du prix et le submit AJAX
  function initProductForm() {
    const form      = document.getElementById('add-to-cart-form');
    const article   = document.querySelector('.product-page');
    const basePrice = parseFloat(article.querySelector('.price').dataset.basePrice);
    const totalEl   = article.querySelector('#total-price');

    // Formate un nombre en euros
    function formatPrice(n) {
      return n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    }

    // Recalcule le prix en fonction des options et de la quantité
    function updatePrice() {
      let total = basePrice;
      // Suppléments cochés
      form.querySelectorAll('input[name="options"]:checked')
          .forEach(cb => total += parseFloat(cb.dataset.price));
      // Boisson sélectionnée
      const drink = form.querySelector('select[name="drink"]');
      if (drink && drink.value) {
        total += parseFloat(drink.selectedOptions[0].dataset.price);
      }
      // Multiplie par la quantité
      const qty = parseInt(form.quantity.value, 10) || 1;
      total *= qty;
      totalEl.textContent = formatPrice(total);
    }

    form.addEventListener('change', updatePrice);
    form.addEventListener('input',  updatePrice);

    // Envoi du formulaire en AJAX
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const payload = {
        product_id: parseInt(article.dataset.id, 10),
        quantity:   parseInt(form.quantity.value, 10),
        options:    Array.from(form.querySelectorAll('input[name="options"]:checked')).map(cb => cb.value),
        removals:   Array.from(form.querySelectorAll('input[name="removals"]:checked')).map(cb => cb.value),
        drink_id:   (form.drink && form.drink.value) || null
      };
      const r = await fetch('/api/cart/add', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      });
      if (r.ok) {
        alert('Produit ajouté au panier !');
      } else {
        alert('Erreur lors de l’ajout au panier');
      }
    });

    // Prix initial
    updatePrice();
  }
});

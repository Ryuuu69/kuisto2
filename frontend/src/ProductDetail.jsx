import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from './data';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Recherche du produit par slug
  const product = products.find(p => p.slug === slug);

  // Gestion du cas produit non trouvé
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Produit non trouvé
          </h1>
          <p className="text-gray-600 mb-6">
            Le produit que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-bigRed text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const [qty, setQty] = useState(1);
  const total = (product.price * qty).toFixed(2).replace('.', ',');

  const handleAddToCart = () => {
    console.log('Ajouter au panier :', { 
      productId: product.id, 
      slug: product.slug,
      name: product.name,
      price: product.price,
      qty: qty,
      total: product.price * qty
    });
    // Ici vous pourriez ajouter la logique pour ajouter au panier
    alert(`${product.name} ajouté au panier (${qty} x ${product.price.toFixed(2)}€)`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto p-6">
        {/* Bouton retour */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 text-bigRed hover:text-red-700 font-semibold flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>

        {/* Contenu principal */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image du produit */}
          <div className="aspect-video w-full">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="p-6">
            {/* Informations produit */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Prix */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-bigRed">
                {product.price.toFixed(2).replace('.', ',')} €
              </span>
            </div>

            {/* Options (si disponibles) */}
            {product.options?.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-900">
                  Options disponibles
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  {product.options.map((opt, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700 mb-2 last:mb-0">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {opt.name}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contrôles quantité et ajout au panier */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantité :</span>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setQty(q => Math.max(1, q - 1))} 
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-semibold">{qty}</span>
                  <button 
                    onClick={() => setQty(q => q + 1)} 
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-xl font-bold text-bigRed">
                  {total} €
                </div>
              </div>
            </div>

            {/* Bouton d'ajout au panier */}
            <button
              onClick={handleAddToCart}
              className="w-full mt-6 bg-bigRed hover:bg-red-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
              Ajouter au panier – {total} €
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

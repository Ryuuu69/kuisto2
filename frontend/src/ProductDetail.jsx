// frontend/src/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from './data'; // ton data.js doit contenir slug

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);

  if (!product) return (
    <div className="p-8 text-center">
      Produit introuvable…
    </div>
  );

  const [qty, setQty] = useState(1);
  const total = (product.price * qty).toFixed(2);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-6 text-red-600">
        ← Retour
      </button>

      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full rounded-lg mb-6" />
      <p className="mb-6 text-gray-600">{product.description}</p>

      {/* Boucle options si présentes */}
      {product.options?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Options</h2>
          {product.options.map(opt => (
            <p key={opt.name} className="text-sm">• {opt.name}</p>
          ))}
        </section>
      )}

      <div className="flex items-center space-x-3 mb-8">
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          className="w-8 h-8 border rounded"
        >-</button>
        <span>{qty}</span>
        <button
          onClick={() => setQty(q => q + 1)}
          className="w-8 h-8 border rounded"
        >+</button>
      </div>

      <button
        onClick={() => console.log('Ajouter au panier :', { productId: product.id, qty })}
        className="w-full bg-red-600 text-white py-3 rounded-lg text-lg"
      >
        Ajouter au panier – {total.replace('.', ',')} €
      </button>
    </main>
  );
}

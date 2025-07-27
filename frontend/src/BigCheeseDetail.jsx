import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products }    from './data';

export default function BigCheeseDetail() {
  const navigate = useNavigate();
  const product  = products.find(p => p.id === 11); // ← ID du Big Cheese

  if (!product) return <div className="p-8">Produit introuvable</div>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-6 text-bigRed">← Retour</button>

      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full rounded-lg mb-6" />
      <p className="mb-6 text-gray-600">{product.description}</p>

      {/* 1 seul supplément pour l’exemple */}
      <label className="block mb-8">
        <input type="checkbox" className="mr-2" />
        {product.options[0].choices[0].label} (+1,00 €)
      </label>

      <button className="w-full bg-bigRed text-white py-3 rounded-lg text-lg">
        Ajouter au panier – 11,90 €
      </button>
    </main>
  );
}

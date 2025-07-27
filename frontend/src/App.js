// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import ProductList       from './ProductList';
import Produits          from './Produits';        // si tu as un composant Produits séparé
import ProductDetail     from './ProductDetail';
import BigCheeseDetail   from './BigCheeseDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<ProductList />} />

        {/* Liste de tous les produits */}
        <Route path="/produits" element={<Produits />} />

        {/* Détail d'un produit générique */}
        <Route path="/produit/:id" element={<ProductDetail />} />

        {/* Page dédiée Big Cheese (temporaire ou isolée) */}
        <Route path="/big-cheese" element={<BigCheeseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

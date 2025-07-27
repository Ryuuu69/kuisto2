// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home           from './Home';            // ou ProductList si c'est ton composant d'accueil
import Produits       from './Produits';        // ta page de listing
import ProductDetail  from './ProductDetail';   // le composant générique
import BigCheeseDetail from './BigCheeseDetail'; // optionnel, page isolée

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

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
        {/* Accueil (sélection de ville ou ProductList) */}
        <Route path="/" element={<Home />} />

        {/* Liste de tous les produits */}
        <Route path="/produits" element={<Produits />} />

        {/* Détail générique d’un produit */}
        <Route path="/produit/:id" element={<ProductDetail />} />

        {/* Page isolée Big Cheese (pour test ou page dédiée) */}
        <Route path="/big-cheese" element={<BigCheeseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

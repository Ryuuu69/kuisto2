// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';

export default function App() {
  return (
    // On ne gère plus la racine "/" ici, uniquement les URLs "/produit/:slug"
    <BrowserRouter basename="/produit">
      <Routes>
        {/* La page détail dynamique sera servie sous "/produit/:slug" */}
        <Route path=":slug" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

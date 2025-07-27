// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductDetail from './ProductDetail';

export default function App() {
  return (
    // basename fait que React gère uniquement /produit/*
    <BrowserRouter basename="/produit">
      <Routes>
        {/* /produit/:slug */}
        <Route path=":slug" element={<ProductDetail />} />
        {/* Redirige tout autre vers / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

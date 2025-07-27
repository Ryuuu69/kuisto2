import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductDetail from './ProductDetail';

export default function App() {
  return (
    <BrowserRouter basename="/produit">
      <Routes>
        <Route path=":slug" element={<ProductDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

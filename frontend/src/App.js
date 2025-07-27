// frontend/src/App.js
import BigCheeseDetail from './BigCheeseDetail';
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Header, LocationCard, SectionTitle, Sidebar, ProductCard, Footer, MobileSidebar } from './components';
import { locations, products, categories } from './data';
import ProductDetail from './ProductDetail';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      {/* Hero + sélection de ville */}
      <main className="px-4">
        <LocationCard
          image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=128&h=96&fit=crop&crop=center"
          name="MONTPELLIER"
          address="121 Av. de Palavas, 34000 Montpellier"
          onClick={() => navigate('/produits')}
        />
      </main>
      <Footer />
    </>
  );
}

function Produits() {
  return (
    <>
      <SectionTitle title="Nos produits" />
      <div className="flex">
        <Sidebar categories={categories} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
      <Footer />
      <MobileSidebar categories={categories} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/produits" element={<Produits />} />
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/produit/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

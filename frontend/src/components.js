// Composants BigSmash - approche monolithique

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations, products, categories } from './data';

/* --------------------------------------------------
   1.  HEADER + HERO (hauteur fixe 219 px, texte centré)
-------------------------------------------------- */
export const Header = () => (
  <header className="bg-bigRed">
    {/* barre logo 88 px */}
    <div className="h-[88px] flex items-center px-4">
      <div className="bg-red-700 rounded-lg p-3 shadow-lg">
        <div className="text-white font-bold">
          <div className="text-sm leading-none">BIG</div>
          <div className="text-base leading-none -mt-0.5">SMASH</div>
        </div>
      </div>
    </div>

    {/* hero : split rouge / photo */}
    <div className="relative flex h-[219px]">
      {/* côté gauche rouge avec texte centré */}
      <div className="flex flex-1 bg-bigRed items-center justify-center">
        <h1 className="font-montserrat font-extrabold text-white text-[32px] leading-[40px] text-center max-w-[340px]">
          THE BEST SMASH <br /> BURGER ARE MADE <span className="italic">HERE</span>
        </h1>
      </div>

      {/* côté droit : photo burger */}
      <img
        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=center"
        alt=""
        className="flex-1 object-cover object-center"
      />

      {/* ombre fine 0 → 10 % */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-b from-transparent to-black/10" />
    </div>
  </header>
);

/* --------------------------------------------------
   2.  SECTION  "NOS POINTS DE VENTE" (titre + filet)
-------------------------------------------------- */
export const SectionTitle = ({ children }) => (
  <h2
    className="
      flex items-center gap-3 mb-6
      font-montserrat font-medium text-[16px] leading-6 text-black
    "
  >
    {children}
    {/* ligne grise qui remplit l'espace restant */}
    <span className="flex-1 h-px bg-gray-300" />
  </h2>
);

/* --------------------------------------------------
   3.  LOCATION CARD (flèche incrustée coin bas‑droit)
-------------------------------------------------- */
export const LocationCard = ({ image, name, address, onClick }) => {
  return (
    <div
      className="store-card"
      onClick={onClick}
    >
      {/* vignette */}
      <img
        src={image}
        alt=""
        className="w-[128px] h-[96px] object-cover object-center rounded-md shrink-0"
      />

      {/* texte */}
      <div>
        <p className="font-montserrat text-[14px] leading-[16px] text-black">
          {name}
        </p>
        <p className="font-montserrat text-[14px] leading-[21px] text-[#808080]">
          {address}
        </p>
        <p className="font-montserrat text-[14px] leading-[21px] text-[#008000]">
          ✓ Click & Collect
        </p>
      </div>

      {/* Coin cliquable avec flèche */}
      <a href="#"
         className="card-arrow"
         aria-label="Accéder à la fiche du restaurant"
         onClick={(e) => {
           e.preventDefault();
           onClick();
         }}>
        <svg viewBox="0 0 24 24" className="icon">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>
  );
};

// Sidebar Component pour la page produits
export const Sidebar = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left py-3 px-4 text-sm font-semibold transition-colors ${
              activeCategory === category
                ? 'bg-bigRed text-white rounded-full'
                : 'text-gray-700 hover:bg-gray-100 rounded-full'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Product Card Component
export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Image */}
      <div className="aspect-square w-full">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="font-montserrat font-normal text-sm text-black mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="font-montserrat font-normal text-xs text-gray-500 mb-3 line-clamp-3">
          {product.description}
        </p>
        
        {/* Price */}
        <p className="font-montserrat font-bold text-sm text-black mb-4">
          À partir de {product.price.toFixed(2).replace('.', ',')}€
        </p>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleQuantityChange(-1)}
              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-6 text-center text-sm font-medium">{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(1)}
              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {/* Add Button */}
          <button className="w-11 h-11 bg-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer Component - SANS la barre de confidentialité et avec hover inversé
export const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="flex space-x-4">
          <button className="w-12 h-12 bg-bigRed hover:bg-white hover:text-bigRed rounded-full flex items-center justify-center transition-colors duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </button>
          <button className="w-12 h-12 bg-bigRed hover:bg-white hover:text-bigRed rounded-full flex items-center justify-center transition-colors duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

// Mobile Sidebar (Drawer) Component
export const MobileSidebar = ({ isOpen, onClose, activeCategory, onCategoryChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Catégories</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                onCategoryChange(category);
                onClose();
              }}
              className={`w-full text-left py-3 px-4 text-sm font-semibold transition-colors ${
                activeCategory === category
                  ? 'bg-bigRed text-white rounded-full'
                  : 'text-gray-700 hover:bg-gray-100 rounded-full'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
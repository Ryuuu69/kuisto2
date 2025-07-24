// Composants BigSmash - approche monolithique

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations, products, categories } from './data';

// Header Component - identique pour les deux pages
export const Header = () => {
  return (
    <header className="bg-red-600 relative overflow-hidden shadow-md" style={{ height: '219px' }}>
      {/* Logo */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-red-700 rounded-lg p-3 shadow-lg">
          <div className="text-white font-bold">
            <div className="text-sm leading-none">BIG</div>
            <div className="text-base leading-none -mt-0.5">SMASH</div>
          </div>
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="flex items-center justify-center h-full relative">
        {/* Couronne */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-8">
          <svg width="50" height="30" viewBox="0 0 50 30" className="text-white">
            <path d="M5 20 L12 12 L20 16 L30 12 L38 16 L45 12 L42 28 L8 28 Z" fill="currentColor"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <circle cx="20" cy="16" r="2" fill="currentColor"/>
            <circle cx="30" cy="12" r="2" fill="currentColor"/>
            <circle cx="38" cy="16" r="2" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Main Text */}
        <div className="text-center text-white z-10 mt-12">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-wide">
            THE BEST SMASH<br />
            BURGER ARE MADE <span className="italic font-black">HERE</span>
          </h1>
        </div>
        
        {/* Burger Image */}
        <div className="absolute right-0 top-0 h-full w-1/3">
          <img 
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=center" 
            alt="Big Smash Burger" 
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

// Location Card Component pour la page d'accueil
export const LocationCard = ({ location, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 flex items-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 relative group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="w-32 h-24 flex-shrink-0 mr-4">
        <img 
          src={location.image} 
          alt={location.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      {/* Contenu */}
      <div className="flex-1">
        <h3 className="font-normal text-sm leading-4 text-black mb-1" style={{fontFamily: 'Montserrat'}}>
          {location.name}
        </h3>
        <p className="font-normal text-sm leading-5 text-gray-500 mb-1" style={{fontFamily: 'Montserrat'}}>
          {location.address}
        </p>
        {location.hasClickCollect && (
          <p className="font-normal text-sm leading-5 text-green-600" style={{fontFamily: 'Montserrat'}}>
            ✓ Click & Collect
          </p>
        )}
      </div>
      
      {/* Arrow Button */}
      <div className="absolute top-4 right-4 w-10 h-10 bg-black rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
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
                ? 'bg-red-600 text-white rounded-full'
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
        <h3 className="font-normal text-sm text-black mb-2 line-clamp-2" style={{fontFamily: 'Montserrat'}}>
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="font-normal text-xs text-gray-500 mb-3 line-clamp-3" style={{fontFamily: 'Montserrat'}}>
          {product.description}
        </p>
        
        {/* Price */}
        <p className="font-bold text-sm text-black mb-4" style={{fontFamily: 'Montserrat'}}>
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

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </button>
          <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <p className="text-white text-sm">En continuant, vous acceptez notre politique de confidentialité.</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded">
            Accepter
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
                  ? 'bg-red-600 text-white rounded-full'
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
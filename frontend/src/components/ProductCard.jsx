import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const changeQty = (delta) => {
    setQty(q => Math.max(1, q + delta));
  };

  const handleProductClick = () => {
    if (!product.slug) {
      console.error('Product slug is missing:', product);
      return;
    }
    console.log('Navigating to product:', product.slug);
    navigate(`/produit/${product.slug}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="aspect-square w-full">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="p-4">
        <h3 className="font-montserrat text-sm text-black mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="font-montserrat text-xs text-gray-500 mb-3 line-clamp-3">
          {product.description}
        </p>
        <p className="font-montserrat font-bold text-sm text-black mb-4">
          À partir de {product.price.toFixed(2).replace('.', ',')}€
        </p>

        <div className="flex items-center justify-between">
          {/* Contrôles quantité */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => changeQty(-1)} 
              className="w-7 h-7 border rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              –
            </button>
            <span className="w-6 text-center text-sm font-medium">{qty}</span>
            <button 
              onClick={() => changeQty(1)} 
              className="w-7 h-7 border rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* Bouton + -> page détail */}
          <button
            onClick={handleProductClick}
            className="w-11 h-11 bg-black hover:bg-bigRed rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label={`Voir les détails de ${product.name}`}
          >
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 4v16m8-8H4" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
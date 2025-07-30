import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mt-4">
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>
            Votre panier est vide
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Découvrez nos délicieux produits et ajoutez-les à votre panier
          </p>
          <Link 
            to="/products"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              backgroundColor: '#F18701',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            Voir nos produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>
            Mon Panier
          </h1>
          <p style={{ color: '#666' }}>
            {items.length} article{items.length > 1 ? 's' : ''} dans votre panier
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Liste des articles */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              {items.map((item, index) => (
                <div key={item.id} style={{
                  padding: '20px',
                  borderBottom: index < items.length - 1 ? '1px solid #eee' : 'none',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center'
                }}>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        flexShrink: 0
                      }}
                    />
                  )}
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      marginBottom: '0.5rem',
                      color: '#333',
                      fontSize: '1.1rem'
                    }}>
                      {item.name}
                    </h3>
                    <p style={{ 
                      color: '#666',
                      fontSize: '14px',
                      marginBottom: '0.5rem'
                    }}>
                      {item.description}
                    </p>
                    <div style={{ 
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      color: '#F18701'
                    }}>
                      {item.price.toFixed(2).replace('.', ',')} € × {item.quantity}
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    flexShrink: 0
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      padding: '4px'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: 'none',
                          borderRadius: '6px',
                          backgroundColor: '#F18701',
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          fontWeight: 'bold'
                        }}
                      >
                        −
                      </button>
                      
                      <span style={{ 
                        minWidth: '40px',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: 'none',
                          borderRadius: '6px',
                          backgroundColor: '#F18701',
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          fontWeight: 'bold'
                        }}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: 'none',
                        borderRadius: '6px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                      }}
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Résumé de commande */}
          <div style={{ flex: '1', minWidth: '280px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              padding: '24px',
              position: 'sticky',
              top: '20px'
            }}>
              <h3 style={{ 
                marginBottom: '1.5rem',
                color: '#333',
                fontSize: '1.2rem'
              }}>
                Résumé de la commande
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  color: '#666'
                }}>
                  <span>Sous-total</span>
                  <span>{getCartTotal().toFixed(2).replace('.', ',')} €</span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid #eee',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  <span>Total</span>
                  <span style={{ color: '#F18701' }}>
                    {getCartTotal().toFixed(2).replace('.', ',')} €
                  </span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#F18701',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '16px',
                  marginBottom: '12px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e07600'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#F18701'}
              >
                Passer la commande
              </Link>
              
              <button
                onClick={clearCart}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'transparent',
                  color: '#dc3545',
                  border: '2px solid #dc3545',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#dc3545';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#dc3545';
                }}
              >
                Vider le panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
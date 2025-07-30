import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../utils/api';

const OrderConfirmationPage = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrder(orderNumber);
        setOrder(orderData);
      } catch (err) {
        setError('Commande non trouvée');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber]);

  const getStatusColor = (status) => {
    const colors = {
      PENDING: '#ffc107',
      CONFIRMED: '#17a2b8',
      PREPARING: '#F18701',
      READY: '#28a745',
      DELIVERED: '#28a745',
      CANCELLED: '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const getStatusText = (status) => {
    const texts = {
      PENDING: 'En attente',
      CONFIRMED: 'Confirmée',
      PREPARING: 'En préparation',
      READY: 'Prête',
      DELIVERED: 'Livrée',
      CANCELLED: 'Annulée'
    };
    return texts[status] || status;
  };

  const getDeliveryText = (deliveryOption) => {
    return deliveryOption === 'RESTAURANT_DELIVERY' 
      ? 'Livraison par le restaurant' 
      : 'Livraison Uber Eats';
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (error || !order) {
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
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>
            Commande non trouvée
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Le numéro de commande "{orderNumber}" n'existe pas ou n'est plus disponible.
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
            Retour au menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* En-tête de confirmation */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ color: '#28a745', marginBottom: '1rem' }}>
            Commande confirmée !
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1rem' }}>
            Merci pour votre commande. Voici les détails :
          </p>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#333'
          }}>
            #{order.orderNumber}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Détails de la commande */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              padding: '24px',
              marginBottom: '2rem'
            }}>
              <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
                Informations de livraison
              </h2>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#333' }}>Nom :</strong>
                <span style={{ marginLeft: '8px', color: '#666' }}>
                  {order.customerName}
                </span>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#333' }}>Téléphone :</strong>
                <span style={{ marginLeft: '8px', color: '#666' }}>
                  {order.customerPhone}
                </span>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#333' }}>Mode de livraison :</strong>
                <span style={{ marginLeft: '8px', color: '#666' }}>
                  {getDeliveryText(order.deliveryOption)}
                </span>
              </div>
              
              {order.customerAddress && (
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#333' }}>Adresse :</strong>
                  <div style={{ marginTop: '4px', color: '#666', lineHeight: '1.5' }}>
                    {order.customerAddress}
                  </div>
                </div>
              )}
              
              {order.notes && (
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#333' }}>Notes :</strong>
                  <div style={{ marginTop: '4px', color: '#666', lineHeight: '1.5' }}>
                    {order.notes}
                  </div>
                </div>
              )}
              
              <div>
                <strong style={{ color: '#333' }}>Statut :</strong>
                <span style={{
                  marginLeft: '8px',
                  padding: '4px 12px',
                  backgroundColor: getStatusColor(order.status),
                  color: 'white',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            {/* Articles commandés */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              padding: '24px'
            }}>
              <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
                Articles commandés
              </h2>
              
              {order.orderItems.map((item, index) => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: index < order.orderItems.length - 1 ? '1px solid #eee' : 'none'
                }}>
                  {item.product.image && (
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      style={{
                        width: '60px',
                        height: '60px',
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
                      fontSize: '1rem'
                    }}>
                      {item.product.name}
                    </h3>
                    <div style={{ 
                      color: '#666',
                      fontSize: '14px'
                    }}>
                      {item.price.toFixed(2).replace('.', ',')} € × {item.quantity}
                    </div>
                  </div>
                  
                  <div style={{ 
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#F18701'
                  }}>
                    {(item.price * item.quantity).toFixed(2).replace('.', ',')} €
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Résumé */}
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
                Résumé
              </h3>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: '2px solid #eee',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#333'
              }}>
                <span>Total payé</span>
                <span style={{ color: '#F18701' }}>
                  {order.totalAmount.toFixed(2).replace('.', ',')} €
                </span>
              </div>
              
              <div style={{ 
                fontSize: '14px',
                color: '#666',
                marginBottom: '1.5rem',
                lineHeight: '1.5'
              }}>
                Commande passée le {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              
              <Link
                to="/products"
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
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e07600'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#F18701'}
              >
                Commander à nouveau
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
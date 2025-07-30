import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder, updateOrderStatus } from '../utils/api';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const orderData = await getOrder(id);
      setOrder(orderData);
    } catch (err) {
      setError('Commande non trouvée');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      await updateOrderStatus(id, newStatus);
      setOrder(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setUpdating(false);
    }
  };

  // Fonction d'impression (vide pour l'instant)
  const printTicket = (order) => {
    // TODO: Implémenter l'impression du ticket
    console.log('Impression du ticket pour la commande:', order.orderNumber);
    alert(`Fonction d'impression à implémenter pour la commande ${order.orderNumber}`);
  };

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

  const getNextStatuses = (currentStatus) => {
    const statusFlow = {
      PENDING: ['CONFIRMED', 'CANCELLED'],
      CONFIRMED: ['PREPARING', 'CANCELLED'],
      PREPARING: ['READY', 'CANCELLED'],
      READY: ['DELIVERED'],
      DELIVERED: [],
      CANCELLED: []
    };
    return statusFlow[currentStatus] || [];
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (error || !order) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', color: '#dc3545', padding: '2rem' }}>
          <h2>Erreur</h2>
          <p>{error}</p>
          <Link to="/orders" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Retour aux commandes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <div>
            <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>
              Commande #{order.orderNumber}
            </h1>
            <p style={{ color: '#666' }}>
              Passée le {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => printTicket(order)}
              className="btn btn-info"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              🖨️ Imprimer le ticket
            </button>
            
            <Link to="/orders" className="btn btn-outline">
              ← Retour aux commandes
            </Link>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Informations principales */}
        <div style={{ flex: '2', minWidth: '300px' }}>
          {/* Statut et actions */}
          <div className="card mb-3">
            <div className="card-header">
              <h2 style={{ margin: 0, color: '#333' }}>Statut de la commande</h2>
            </div>
            <div className="card-body">
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge" style={{
                  backgroundColor: getStatusColor(order.status),
                  color: 'white',
                  fontSize: '16px',
                  padding: '8px 16px'
                }}>
                  {getStatusText(order.status)}
                </span>
              </div>
              
              {getNextStatuses(order.status).length > 0 && (
                <div>
                  <p style={{ marginBottom: '1rem', fontWeight: '600', color: '#333' }}>
                    Changer le statut :
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {getNextStatuses(order.status).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(status)}
                        disabled={updating}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: getStatusColor(status),
                          color: 'white',
                          border: 'none'
                        }}
                      >
                        {updating ? 'Mise à jour...' : getStatusText(status)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informations client */}
          <div className="card mb-3">
            <div className="card-header">
              <h2 style={{ margin: 0, color: '#333' }}>Informations client</h2>
            </div>
            <div className="card-body">
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
                <div>
                  <strong style={{ color: '#333' }}>Notes :</strong>
                  <div style={{ 
                    marginTop: '4px', 
                    color: '#666', 
                    lineHeight: '1.5',
                    backgroundColor: '#f8f9fa',
                    padding: '12px',
                    borderRadius: '8px',
                    fontStyle: 'italic'
                  }}>
                    {order.notes}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Articles commandés */}
          <div className="card">
            <div className="card-header">
              <h2 style={{ margin: 0, color: '#333' }}>Articles commandés</h2>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Prix unitaire</th>
                    <th>Quantité</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {item.product.image && (
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                borderRadius: '8px'
                              }}
                            />
                          )}
                          <div>
                            <div style={{ fontWeight: '600', color: '#333' }}>
                              {item.product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: '#666' }}>
                        {item.price.toFixed(2).replace('.', ',')} €
                      </td>
                      <td style={{ fontWeight: '600' }}>
                        {item.quantity}
                      </td>
                      <td style={{ fontWeight: 'bold', color: '#F18701' }}>
                        {(item.price * item.quantity).toFixed(2).replace('.', ',')} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Résumé */}
        <div style={{ flex: '1', minWidth: '280px' }}>
          <div className="card" style={{ position: 'sticky', top: '20px' }}>
            <div className="card-header">
              <h2 style={{ margin: 0, color: '#333' }}>Résumé</h2>
            </div>
            <div className="card-body">
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
                <span>Total</span>
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
                <div style={{ marginBottom: '8px' }}>
                  <strong>Articles :</strong> {order.orderItems.length}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Quantité totale :</strong> {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
                <div>
                  <strong>Dernière mise à jour :</strong><br />
                  {new Date(order.updatedAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
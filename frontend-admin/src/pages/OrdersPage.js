import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../utils/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = statusFilter ? { status: statusFilter } : {};
      const data = await getOrders(params);
      setOrders(data.orders || []);
    } catch (err) {
      setError('Erreur lors du chargement des commandes');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
      ? '🚚 Restaurant' 
      : '🛵 Uber Eats';
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', color: '#dc3545', padding: '2rem' }}>
          <h2>Erreur</h2>
          <p>{error}</p>
          <button 
            onClick={fetchOrders}
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            Réessayer
          </button>
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
              Gestion des commandes
            </h1>
            <p style={{ color: '#666' }}>
              {orders.length} commande{orders.length > 1 ? 's' : ''} 
              {statusFilter && ` (${getStatusText(statusFilter).toLowerCase()})`}
            </p>
          </div>
          
          <button 
            onClick={fetchOrders}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            🔄 Actualiser
          </button>
        </div>

        {/* Filtres */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <span style={{ fontWeight: '600', color: '#333' }}>Filtrer par statut :</span>
          
          <button
            onClick={() => setStatusFilter('')}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '20px',
              backgroundColor: !statusFilter ? '#F18701' : '#f8f9fa',
              color: !statusFilter ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Toutes
          </button>
          
          {['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                padding: '6px 12px',
                border: 'none',
                borderRadius: '20px',
                backgroundColor: statusFilter === status ? getStatusColor(status) : '#f8f9fa',
                color: statusFilter === status ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {getStatusText(status)}
            </button>
          ))}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="card">
          <div className="card-body" style={{ 
            textAlign: 'center', 
            padding: '3rem'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>
              {statusFilter 
                ? `Aucune commande ${getStatusText(statusFilter).toLowerCase()}`
                : 'Aucune commande'
              }
            </h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              {statusFilter 
                ? 'Aucune commande ne correspond à ce filtre.'
                : 'Les nouvelles commandes apparaîtront ici.'
              }
            </p>
            {statusFilter && (
              <button 
                onClick={() => setStatusFilter('')}
                className="btn btn-primary"
              >
                Voir toutes les commandes
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>N° Commande</th>
                  <th>Client</th>
                  <th>Livraison</th>
                  <th>Statut</th>
                  <th>Articles</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                      #{order.orderNumber}
                    </td>
                    <td>
                      <div>
                        <div style={{ fontWeight: '600' }}>{order.customerName}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {order.customerPhone}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '14px' }}>
                      {getDeliveryText(order.deliveryOption)}
                    </td>
                    <td>
                      <span className="badge" style={{
                        backgroundColor: getStatusColor(order.status),
                        color: 'white'
                      }}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td style={{ fontSize: '14px', color: '#666' }}>
                      {order.orderItems?.length || 0} article{(order.orderItems?.length || 0) > 1 ? 's' : ''}
                    </td>
                    <td style={{ fontWeight: 'bold', color: '#F18701' }}>
                      {order.totalAmount.toFixed(2).replace('.', ',')} €
                    </td>
                    <td style={{ fontSize: '14px', color: '#666' }}>
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td>
                      <Link 
                        to={`/orders/${order.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Voir détail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
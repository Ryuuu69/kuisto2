import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../utils/api';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    preparingOrders: 0,
    readyOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const ordersData = await getOrders({ limit: 10 });
      const orders = ordersData.orders || [];
      
      // Calculer les statistiques
      const stats = {
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'PENDING').length,
        preparingOrders: orders.filter(o => o.status === 'PREPARING').length,
        readyOrders: orders.filter(o => o.status === 'READY').length
      };
      
      setStats(stats);
      setRecentOrders(orders.slice(0, 5));
    } catch (err) {
      setError('Erreur lors du chargement des données');
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
            onClick={fetchDashboardData}
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
        <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>
          Dashboard
        </h1>
        <p style={{ color: '#666' }}>
          Vue d'ensemble de votre restaurant
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-4 mb-4">
        <div className="card">
          <div className="card-body text-center">
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#F18701',
              marginBottom: '0.5rem'
            }}>
              {stats.totalOrders}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>
              Commandes totales
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#ffc107',
              marginBottom: '0.5rem'
            }}>
              {stats.pendingOrders}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>
              En attente
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#F18701',
              marginBottom: '0.5rem'
            }}>
              {stats.preparingOrders}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>
              En préparation
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#28a745',
              marginBottom: '0.5rem'
            }}>
              {stats.readyOrders}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>
              Prêtes
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-3 mb-4">
        <Link to="/orders" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card-body text-center">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ color: '#F18701', marginBottom: '0.5rem' }}>
              Gérer les commandes
            </h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Voir et modifier le statut des commandes
            </p>
          </div>
        </Link>

        <Link to="/products" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card-body text-center">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍔</div>
            <h3 style={{ color: '#F18701', marginBottom: '0.5rem' }}>
              Gérer les produits
            </h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Ajouter, modifier ou supprimer des produits
            </p>
          </div>
        </Link>

        <Link to="/categories" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card-body text-center">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
            <h3 style={{ color: '#F18701', marginBottom: '0.5rem' }}>
              Gérer les catégories
            </h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Organiser vos produits par catégories
            </p>
          </div>
        </Link>
      </div>

      {/* Commandes récentes */}
      <div className="card">
        <div className="card-header">
          <div className="flex-between">
            <h2 style={{ margin: 0, color: '#333' }}>Commandes récentes</h2>
            <Link to="/orders" className="btn btn-primary btn-sm">
              Voir toutes
            </Link>
          </div>
        </div>
        
        <div className="card-body" style={{ padding: 0 }}>
          {recentOrders.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#666'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Aucune commande</h3>
              <p>Les nouvelles commandes apparaîtront ici</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>N° Commande</th>
                  <th>Client</th>
                  <th>Statut</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
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
                    <td>
                      <span className="badge" style={{
                        backgroundColor: getStatusColor(order.status),
                        color: 'white'
                      }}>
                        {getStatusText(order.status)}
                      </span>
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
                        Voir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
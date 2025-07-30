import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../utils/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    deliveryOption: 'RESTAURANT_DELIVERY',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Rediriger si le panier est vide
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Le nom est requis';
    }
    
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Le téléphone est requis';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'Format de téléphone invalide';
    }
    
    if (formData.deliveryOption === 'RESTAURANT_DELIVERY' && !formData.customerAddress.trim()) {
      newErrors.customerAddress = 'L\'adresse est requise pour la livraison';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const orderData = {
        ...formData,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };
      
      const response = await createOrder(orderData);
      
      // Vider le panier
      clearCart();
      
      // Rediriger vers la page de confirmation
      navigate(`/order-confirmation/${response.order.orderNumber}`);
      
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      alert('Erreur lors de la création de la commande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#333', marginBottom: '2rem', textAlign: 'center' }}>
          Finaliser votre commande
        </h1>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Formulaire */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            <form onSubmit={handleSubmit} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              padding: '24px'
            }}>
              <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
                Informations de livraison
              </h2>

              <div className="form-group">
                <label className="form-label">Nom complet *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className={`form-control ${errors.customerName ? 'error' : ''}`}
                  placeholder="Votre nom complet"
                />
                {errors.customerName && (
                  <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px' }}>
                    {errors.customerName}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Téléphone *</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className={`form-control ${errors.customerPhone ? 'error' : ''}`}
                  placeholder="Votre numéro de téléphone"
                />
                {errors.customerPhone && (
                  <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px' }}>
                    {errors.customerPhone}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Mode de livraison *</label>
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '12px 16px',
                    border: '2px solid',
                    borderColor: formData.deliveryOption === 'RESTAURANT_DELIVERY' ? '#F18701' : '#e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: formData.deliveryOption === 'RESTAURANT_DELIVERY' ? '#fff5f0' : 'white',
                    flex: 1
                  }}>
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="RESTAURANT_DELIVERY"
                      checked={formData.deliveryOption === 'RESTAURANT_DELIVERY'}
                      onChange={handleInputChange}
                    />
                    <span>🚚 Livraison par le restaurant</span>
                  </label>
                  
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '12px 16px',
                    border: '2px solid',
                    borderColor: formData.deliveryOption === 'UBER_EATS' ? '#F18701' : '#e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: formData.deliveryOption === 'UBER_EATS' ? '#fff5f0' : 'white',
                    flex: 1
                  }}>
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="UBER_EATS"
                      checked={formData.deliveryOption === 'UBER_EATS'}
                      onChange={handleInputChange}
                    />
                    <span>🛵 Uber Eats</span>
                  </label>
                </div>
              </div>

              {formData.deliveryOption === 'RESTAURANT_DELIVERY' && (
                <div className="form-group">
                  <label className="form-label">Adresse de livraison *</label>
                  <textarea
                    name="customerAddress"
                    value={formData.customerAddress}
                    onChange={handleInputChange}
                    className={`form-control ${errors.customerAddress ? 'error' : ''}`}
                    placeholder="Votre adresse complète"
                    rows="3"
                  />
                  {errors.customerAddress && (
                    <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px' }}>
                      {errors.customerAddress}
                    </div>
                  )}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Notes (optionnel)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Instructions spéciales, allergies, etc."
                  rows="3"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: loading ? '#ccc' : '#F18701',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {loading ? 'Commande en cours...' : 'Confirmer la commande'}
              </button>
            </form>
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
                Votre commande
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                {items.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#333' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        {item.price.toFixed(2).replace('.', ',')} € × {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontWeight: '600', color: '#F18701' }}>
                      {(item.price * item.quantity).toFixed(2).replace('.', ',')} €
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '2px solid #eee',
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
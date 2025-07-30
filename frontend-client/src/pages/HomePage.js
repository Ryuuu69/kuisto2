import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../utils/api';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError('Erreur lors du chargement des catégories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div style={{ textAlign: 'center', color: '#dc3545' }}>
          <h2>Erreur</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '60px 0',
        background: 'linear-gradient(135deg, #F18701 0%, #e07600 100%)',
        borderRadius: '12px',
        color: 'white',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          Bienvenue chez Kuisto
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
          Découvrez nos délicieux burgers, salades fraîches et bien plus encore
        </p>
        <Link 
          to="/products" 
          className="btn btn-lg"
          style={{
            backgroundColor: 'white',
            color: '#F18701',
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: '600',
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Voir notre menu
        </Link>
      </section>

      {/* Categories Section */}
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Nos Catégories
        </h2>
        
        <div className="grid grid-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products/category/${category.id}`}
              className="card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="card-body text-center">
                <h3 style={{ 
                  color: '#F18701', 
                  marginBottom: '1rem',
                  fontSize: '1.3rem'
                }}>
                  {category.name}
                </h3>
                <p style={{ 
                  color: '#666', 
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}>
                  {category.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#F18701',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {category._count?.products || 0} produit(s)
                  <span style={{ marginLeft: '8px' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ marginTop: '60px', padding: '40px 0' }}>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              color: '#F18701'
            }}>
              🚚
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>
              Livraison Rapide
            </h3>
            <p style={{ color: '#666', lineHeight: '1.5' }}>
              Livraison par notre équipe ou via Uber Eats
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              color: '#F18701'
            }}>
              🍔
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>
              Produits Frais
            </h3>
            <p style={{ color: '#666', lineHeight: '1.5' }}>
              Ingrédients frais et de qualité pour tous nos plats
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              color: '#F18701'
            }}>
              ⭐
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>
              Service de Qualité
            </h3>
            <p style={{ color: '#666', lineHeight: '1.5' }}>
              Une équipe dédiée à votre satisfaction
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
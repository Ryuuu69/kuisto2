import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts, getProductsByCategory, getCategories } from '../utils/api';
import { useCart } from '../context/CartContext';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Charger les catégories
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        // Charger les produits
        let productsData;
        if (categoryId) {
          productsData = await getProductsByCategory(categoryId);
          setSelectedCategory(categoryId);
        } else {
          productsData = await getProducts();
          setSelectedCategory('all');
        }
        
        setProducts(productsData);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleCategoryChange = async (newCategoryId) => {
    try {
      setLoading(true);
      setSelectedCategory(newCategoryId);
      
      let productsData;
      if (newCategoryId === 'all') {
        productsData = await getProducts();
      } else {
        productsData = await getProductsByCategory(newCategoryId);
      }
      
      setProducts(productsData);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    // Feedback visuel simple
    const button = document.activeElement;
    const originalText = button.textContent;
    button.textContent = 'Ajouté !';
    button.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = '#F18701';
    }, 1000);
  };

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
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Sidebar des catégories */}
        <aside style={{ 
          minWidth: '250px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          height: 'fit-content',
          position: 'sticky',
          top: '20px'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Catégories</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => handleCategoryChange('all')}
              style={{
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: selectedCategory === 'all' ? '#F18701' : 'transparent',
                color: selectedCategory === 'all' ? 'white' : '#333',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: selectedCategory === 'all' ? '600' : '400'
              }}
            >
              Tous les produits
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: selectedCategory === category.id ? '#F18701' : 'transparent',
                  color: selectedCategory === category.id ? 'white' : '#333',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: selectedCategory === category.id ? '600' : '400'
                }}
              >
                {category.name}
                <span style={{ 
                  fontSize: '12px', 
                  opacity: 0.7,
                  marginLeft: '8px'
                }}>
                  ({category._count?.products || 0})
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Contenu principal */}
        <main style={{ flex: 1 }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>
              {selectedCategory === 'all' 
                ? 'Tous nos produits' 
                : categories.find(c => c.id === selectedCategory)?.name || 'Produits'
              }
            </h1>
            <p style={{ color: '#666' }}>
              {products.length} produit{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}
            </p>
          </div>

          {products.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 20px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍽️</div>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>
                Aucun produit disponible
              </h3>
              <p style={{ color: '#666' }}>
                Cette catégorie ne contient pas encore de produits.
              </p>
              <Link 
                to="/products"
                style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  padding: '12px 24px',
                  backgroundColor: '#F18701',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '600'
                }}
              >
                Voir tous les produits
              </Link>
            </div>
          ) : (
            <div className="grid grid-2">
              {products.map((product) => (
                <div key={product.id} className="card">
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  
                  <div className="card-body">
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        backgroundColor: '#F18701',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        marginBottom: '8px'
                      }}>
                        {product.category?.name}
                      </span>
                    </div>
                    
                    <h3 style={{ 
                      marginBottom: '0.5rem',
                      color: '#333',
                      fontSize: '1.2rem'
                    }}>
                      {product.name}
                    </h3>
                    
                    <p style={{ 
                      color: '#666',
                      marginBottom: '1rem',
                      lineHeight: '1.5',
                      fontSize: '14px'
                    }}>
                      {product.description}
                    </p>
                    
                    <div className="flex-between" style={{ alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        color: '#F18701'
                      }}>
                        {product.price.toFixed(2).replace('.', ',')} €
                      </span>
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#F18701',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#e07600';
                          e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#F18701';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
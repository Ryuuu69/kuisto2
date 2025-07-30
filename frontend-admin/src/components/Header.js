import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navLinkStyle = (path) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    backgroundColor: isActive(path) ? 'rgba(255,255,255,0.2)' : 'transparent',
    fontWeight: isActive(path) ? '600' : '400'
  });

  return (
    <header className="admin-header">
      <div className="container">
        <nav className="flex-between">
          <div className="flex gap-2" style={{ alignItems: 'center' }}>
            <Link 
              to="/" 
              style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: 'white', 
                textDecoration: 'none',
                marginRight: '2rem'
              }}
            >
              🍔 Kuisto Admin
            </Link>
            
            <div className="flex gap-1">
              <Link 
                to="/" 
                style={navLinkStyle('/')}
                onMouseEnter={(e) => {
                  if (!isActive('/')) {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/')) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                Dashboard
              </Link>
              
              <Link 
                to="/orders" 
                style={navLinkStyle('/orders')}
                onMouseEnter={(e) => {
                  if (!isActive('/orders')) {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/orders')) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                Commandes
              </Link>
              
              <Link 
                to="/categories" 
                style={navLinkStyle('/categories')}
                onMouseEnter={(e) => {
                  if (!isActive('/categories')) {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/categories')) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                Catégories
              </Link>
              
              <Link 
                to="/products" 
                style={navLinkStyle('/products')}
                onMouseEnter={(e) => {
                  if (!isActive('/products')) {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/products')) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                Produits
              </Link>
            </div>
          </div>
          
          <div className="flex gap-2" style={{ alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
              Connecté en tant que <strong>{user?.name}</strong>
            </span>
            
            <button
              onClick={logout}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            >
              Déconnexion
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
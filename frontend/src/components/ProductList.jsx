import React, { useState } from 'react';
import { Header, SectionTitle, LocationCard, Sidebar, Footer, MobileSidebar } from '../components';
import ProductCard from './ProductCard';
import { products, categories, locations } from '../data';

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState('Nouveautés');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filtrer les produits par catégorie active
  const filteredProducts = products.filter(product => 
    product.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        {/* Sidebar Desktop */}
        <div className="hidden md:block">
          <Sidebar 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Contenu principal */}
        <main className="flex-1 p-6">
          {/* Bouton menu mobile */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="md:hidden mb-4 p-2 bg-bigRed text-white rounded-lg"
          >
            ☰ Menu
          </button>

          {/* Section Points de vente */}
          <section className="mb-8">
            <SectionTitle>NOS POINTS DE VENTE</SectionTitle>
            <div className="space-y-4">
              {locations.map(location => (
                <LocationCard
                  key={location.id}
                  image={location.image}
                  name={location.name}
                  address={location.address}
                  onClick={() => console.log('Location clicked:', location.name)}
                />
              ))}
            </div>
          </section>

          {/* Section Produits */}
          <section>
            <SectionTitle>{activeCategory.toUpperCase()}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun produit disponible dans cette catégorie.
              </div>
            )}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProductList;
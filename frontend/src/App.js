import ProductDetail from './ProductDetail';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Header, LocationCard, SectionTitle, Sidebar, ProductCard, Footer, MobileSidebar } from './components';
import { locations, products, categories } from './data';

/* --------------------------------------------------
   4.  PAGE ACCUEIL  ("Points de vente")
-------------------------------------------------- */
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      {/* container centré 1120 px */}
      <main className="max-w-[1120px] mx-auto px-6 py-12">
        <SectionTitle>NOS POINTS DE VENTE</SectionTitle>

        {/* Carte Montpellier */}
        <LocationCard
          image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=128&h=96&fit=crop&crop=center"
          name="MONTPELLIER"
          address="121 Av. de Palavas, 34000 Montpellier"
          onClick={() => navigate('/produits')}
        />
      </main>

      <Footer />
    </>
  );
};

// Page Produits
const Produits = () => {
  const [activeCategory, setActiveCategory] = useState('Nouveautés');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const filteredProducts = products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        {/* Desktop Sidebar */}
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
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Header */}
          <div className="md:hidden p-4 bg-white border-b">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setIsMobileSidebarOpen(true)}
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg font-semibold">Montpellier</h1>
              <div></div>
            </div>
          </div>
          
          {/* Products Section */}
          <div className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6 text-black uppercase">
              {activeCategory}
            </h2>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// App Principal avec Router
function App() {
  return (
    <div className="App">
      <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/produits" element={<Produits />} />
    <Route path="/produit/:id" element={<ProductDetail />} />
  </Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
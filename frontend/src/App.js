import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './ProductDetail';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/produit/:slug" element={<ProductDetail />} />
        <Route path="*" element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Page non trouvée
              </h1>
              <p className="text-gray-600 mb-6">
                La page que vous recherchez n'existe pas.
              </p>
              <a
                href="/"
                className="bg-bigRed text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-block"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}
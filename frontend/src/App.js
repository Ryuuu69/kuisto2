import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList   from './ProductList';
import ProductDetail from './ProductDetail';   // ← (point 2)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"element={<ProductList />} />
        {/* UNE SEULE page détail, paramètre :id */}
        <Route path="/produit/:slug" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

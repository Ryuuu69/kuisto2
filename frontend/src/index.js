// frontend/src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Ne monter React que si le div #react-detail-root est présent
const container = document.getElementById('react-detail-root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

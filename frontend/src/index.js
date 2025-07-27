import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// On monte préférentiellement sur `react-detail-root`
const detailContainer = document.getElementById('react-detail-root');
const mainContainer   = document.getElementById('root');
const container       = detailContainer || mainContainer;

if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

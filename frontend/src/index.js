import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const detailRoot = document.getElementById('react-detail-root');
const mainRoot   = document.getElementById('root');
const container  = detailRoot || mainRoot;

const root = createRoot(container);
root.render(<App />);

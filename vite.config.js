// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',         // racine du projet
  publicDir: 'images', // dossier des fichiers statiques (SVG, PNG…)
  server: {
    port: 3000,       // accès via http://localhost:3000
    open: true        // ouvre le navigateur automatiquement
  }
});

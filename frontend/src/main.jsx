import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// A correção está na linha abaixo, colocando o App dentro de { }
import { App } from './App.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
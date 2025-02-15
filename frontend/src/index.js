import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import MenuContextProvider from './context/MenuContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <MenuContextProvider>
      <App />
    </MenuContextProvider>
  </BrowserRouter>
);

reportWebVitals();

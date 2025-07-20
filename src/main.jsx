import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import firebaseConfig from '../firebaseConfig.js';
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
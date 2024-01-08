import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import RoutesComp from './App';
import { AuthProvider } from './auth/authProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <RoutesComp/>
    </AuthProvider>
  </BrowserRouter>
)



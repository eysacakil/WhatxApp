import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WhatsApp from './pages/WhatsApp';
import Register from './components/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WhatsApp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

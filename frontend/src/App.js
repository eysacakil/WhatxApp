import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WhatsApp from './pages/WhatsApp';
import Register from './components/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import ProfileUpdate from './components/ProfileUpdate/ProfileUpdate';
import { ProfileProvider } from './contexts/ProfileContext';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<WhatsApp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile-update" element={<ProfileUpdate />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
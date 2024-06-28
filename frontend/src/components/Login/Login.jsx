import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('E-posta ve şifre boş bırakılamaz.');
    } else if (password.length < 8) {
      setErrorMessage('Şifre en az 8 karakter olmalıdır.');
    } else {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/auth/login', { email, password });
        console.log('Login successful', response.data);

        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          userId: user.userId
        }));
  
        navigate('/home'); 
      } catch (error) {
        console.error('Error logging in', error);
        setErrorMessage('Giriş sırasında bir hata oluştu.');
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold text-center text-green-400">Giriş Yap</h2>
        <div>
          <label className="block text-sm font-medium text-gray-300">E-posta</label>
          <input
            className="w-full p-2 mt-1 border border-gray-600 rounded focus:ring focus:ring-green-400 bg-gray-700 text-gray-200"
            type="email"
            placeholder="E-posta adresinizi girin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Şifre</label>
          <input
            className="w-full p-2 mt-1 border border-gray-600 rounded focus:ring focus:ring-green-400 bg-gray-700 text-gray-200"
            type="password"
            placeholder="Şifrenizi girin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
        <button
          className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:ring focus:ring-green-400"
          type="submit"
        >
          Giriş Yap
        </button>

        <button
          onClick={handleRegisterRedirect}
          className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:ring focus:ring-green-400"
          type="submit"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Kullanıcı adı ve şifre boş bırakılamaz.');
    } else if (password.length < 8) {
      setErrorMessage('Şifre en az 8 karakter olmalıdır.');
    } else {
      // Burada giriş işlemleri gerçekleştirilir.
      // Örneğin, bir API'ye istek gönderilebilir.
      console.log('Kullanıcı adı:', username);
      console.log('Şifre:', password);
      // Başarılı giriş durumunda yönlendirme yapılır.
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-green-400">Giriş Yap</h2>
        <div>
          <label className="block text-sm font-medium text-gray-300">Kullanıcı Adı</label>
          <input
            className="w-full p-2 mt-1 border border-gray-600 rounded focus:ring focus:ring-green-400 bg-gray-700 text-gray-200"
            type="text"
            placeholder="Kullanıcı adınızı girin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
      </form>
    </div>
  );
};

export default Login;

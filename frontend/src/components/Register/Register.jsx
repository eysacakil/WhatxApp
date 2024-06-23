import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = 'İsim gereklidir';
    if (!form.lastName) newErrors.lastName = 'Soyisim gereklidir';
    if (!form.username) newErrors.username = 'Kullanıcı adı gereklidir';
    if (!form.email) newErrors.email = 'E-posta gereklidir';
    if (!form.password) newErrors.password = 'Şifre gereklidir';
    else if (form.password.length < 8) newErrors.password = 'Şifre en az 8 karakter olmalıdır';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Şifreler eşleşmiyor';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/users/register', {
          firstName: form.firstName,
          lastName: form.lastName,
          username: form.username,
          email: form.email,
          password: form.password,
        });
        console.log('Registration successful', response.data);
        setRedirect(true);
      } catch (error) {
        console.error('Error registering user', error);
        setErrors({ apiError: 'Kayıt sırasında bir hata oluştu' });
      }
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-400">Kayıt Ol</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300">İsim</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-600 rounded focus:ring focus:ring-green-400 bg-gray-700 text-gray-200"
            />
            {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Soyisim</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-600 rounded focus:ring focus:ring-green-400 bg-gray-700 text-gray-200"
            />
            {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Kullanıcı Adı</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-600 rounded focus:ring focus:ring-green-400 bg-gray-700 text-gray-200"
            />
            {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">E-posta</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-600 rounded focus:ring focus:ring-green-400 bg-gray-700 text-gray-200"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Şifre</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-600 rounded focus:ring focus:ring-green-400 bg-gray-700 text-gray-200"
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Şifre Onayı</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-600 rounded focus:ring focus:ring-green-400 bg-gray-700 text-gray-200"
            />
            {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
          {errors.apiError && <p className="text-sm text-red-600">{errors.apiError}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:ring focus:ring-green-400"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

// src/components/Login.tsx
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUser  } from '../features/authSlice';

import api from '../services/api';
import { Navigate, useNavigate } from 'react-router-dom';
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/adminlogin', { email, password });
// console.log(response.data.User.token)
      if (response.data.User) {
        dispatch(setUser(response.data.User));
        localStorage.setItem('user', JSON.stringify(response.data.User));
        navigate("/");
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
      </form>
    </div>
  );
};

export default Login;


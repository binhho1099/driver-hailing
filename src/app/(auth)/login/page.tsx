'use client';
import axios from '@/lib/axiosInstance';
import Input from '@/components/Input';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';

type LoginForm = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = async (data, event) => {
    event?.preventDefault();
    const { username, password } = data;
    try {
      const response = await axios.post('/api/auth', { username, password });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-4xl font-bold text-gray-800 text-gradient">
        RIDE HAILING
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <Input
            type="text"
            id="username"
            placeholder="Input your username"
            required
            {...register('username')}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <Input
            type="password"
            id="password"
            placeholder="Input your password"
            required
            {...register('password')}
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;

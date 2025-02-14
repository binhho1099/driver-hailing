'use client';
import AuthApi from '@/common/api/auth';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Spin from '@/components/Spin';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type LoginForm = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (params: LoginForm) => AuthApi.login({ params }),
    onSuccess: (data) => {      
      localStorage.setItem('token', data.token);
      router.push('/');
    },
    onError: (error) => {
      console.error('Internal Server Error', error);
    },
  });

  const handleSubmitForm = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <Spin spinning={mutation.isPending}>
        <h2 className="mb-6 text-center text-4xl font-bold text-gray-800 text-gradient">
          RIDE HAILING
        </h2>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
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
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Spin>
    </div>
  );
};

export default LoginPage;

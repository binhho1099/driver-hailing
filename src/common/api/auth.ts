import axiosInstance from '@/lib/axiosInstance';
import { endpoint } from '@/lib/constants';

const AuthEndpoint = `${endpoint}/auth`;

const AuthApi = {
  login: async ({ params }) =>
    await axiosInstance.post(AuthEndpoint, params).then((res) => res.data),
};

export default AuthApi;

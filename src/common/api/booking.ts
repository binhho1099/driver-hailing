import axiosInstance from '@/lib/axiosInstance';
import { endpoint } from '@/lib/constants';

const BookingEndpoint = `${endpoint}/booking`;

const BookingApi = {
  getList: async ({ params }) =>
    await axiosInstance
      .get(`${BookingEndpoint}`, { params })
      .then((res) => res.data),
  getDetail: async ({ id }) =>
    await axiosInstance.get(`${BookingEndpoint}/${id}`).then((res) => res.data),
  create: async ({ params }) =>
    await axiosInstance
      .post(`${BookingEndpoint}`, params)
      .then((res) => res.data),
  update: async ({ id, params }) =>
    await axiosInstance
      .put(`${BookingEndpoint}/${id}`, params)
      .then((res) => res.data),
  delete: async ({ id }) =>
    await axiosInstance
      .delete(`${BookingEndpoint}/${id}`)
      .then((res) => res.data),
};

export default BookingApi;

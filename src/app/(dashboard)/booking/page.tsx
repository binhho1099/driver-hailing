'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Spin from '@/components/Spin';
import Table, { TColumnTable } from '@/components/Table';
import Tag from '@/components/Tag';
import axiosInstance from '@/lib/axiosInstance';
import { STATUS_COLOR, STATUS_TEXT } from '@/lib/constants';
import { useState } from 'react';
import FormBooking from './FormBooking';
import { useQuery } from '@tanstack/react-query';
import BookingDetail from './BookingDetail';
import BookingApi from '@/common/api/booking';

const Booking = () => {
  const [modalForm, setModalForm] = useState({ open: false, id: null });
  const [modalDetail, setModalDetail] = useState({
    open: false,
    id: null,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['get-booking-list'],
    queryFn: () => BookingApi.getList({ params: {} }),
    staleTime: 300000,
  });

  const columns: TColumnTable[] = [
    {
      key: 'id',
      title: 'Ride ID',
    },
    {
      key: 'customer_name',
      title: 'Customer Name',
    },
    {
      key: 'location',
      title: 'Pickup & Drop-off Locations',
      render: (_, record) => (
        <p>
          {record.pickup} - {record.drop_off}
        </p>
      ),
    },
    {
      key: 'driver_name',
      title: 'Driver Name',
    },
    {
      key: 'status',
      title: 'Ride Status',
      render: (value) => (
        <Tag color={STATUS_COLOR[value]}>{STATUS_TEXT[value]}</Tag>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record) => (
        <div className="flex gap-2.5 justify-center">
          <Button
            color="primary"
            onClick={() => setModalDetail({ open: true, id: record?.id })}
          >
            Detail
          </Button>
          <Button
            color="warning"
            onClick={() => setModalForm({ open: true, id: record?.id })}
          >
            Edit
          </Button>
          <Button color="error">Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="grid p-5 gap-2.5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase">Booking management</h1>
        <div className="flex items-center gap-2.5">
          <Input placeholder="Search...." />
          <Button
            className="max-w-max"
            onClick={() => setModalForm({ open: true, id: null })}
          >
            + Add Booking
          </Button>
        </div>
      </div>
      <Spin spinning={isLoading}>
        <Table columns={columns} data={data || []} />
      </Spin>

      {modalForm.open && (
        <FormBooking
          open={modalForm.open}
          id={modalForm.id}
          onClose={() => setModalForm({ open: false, id: null })}
        />
      )}

      {modalDetail.open && (
        <BookingDetail
          open={modalDetail.open}
          id={modalDetail.id}
          onClose={() => setModalDetail({ open: false, id: null })}
        />
      )}
    </div>
  );
};

export default Booking;

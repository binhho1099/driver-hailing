import List from '@/components/List';
import Modal, { ModalProps } from '@/components/Modal';
import Tag from '@/components/Tag';
import axiosInstance from '@/lib/axiosInstance';
import { STATUS_COLOR, STATUS_TEXT } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

interface BookingDetailProps extends ModalProps {
  id?: number | string | null;
}

const BookingDetail = (props: BookingDetailProps) => {
  const { id, ...rest } = props;

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['get-booking-detail', id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `http://localhost:3000/api/booking/${id}`,
      );
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (id) refetch();
  }, [id]);

  const dataSource = [
    {
      key: '1',
      title: 'Customer name',
      value: data?.customer_name,
    },
    {
      key: '2',
      title: 'Pickup',
      value: data?.pickup,
    },
    {
      key: '3',
      title: 'Drop-off',
      value: data?.drop_off,
    },
    {
      key: '4',
      title: 'Driver name',
      value: data?.driver_name,
    },
    {
      key: '5',
      title: 'Status',
      value: data?.status && (
        <Tag color={STATUS_COLOR[data?.status]}>
          {STATUS_TEXT[data?.status]}
        </Tag>
      ),
    },
  ];

  return (
    <Modal
      title="Booking Detail"
      loading={isFetching}
      okButtonClassname="hidden"
      {...rest}
    >
      <List data={dataSource} />
    </Modal>
  );
};

export default BookingDetail;

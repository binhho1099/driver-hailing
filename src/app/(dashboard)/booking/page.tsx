'use client';
import BookingApi from '@/common/api/booking';
import { useDebounce } from '@/common/hooks/useDebounce';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Popconfirm from '@/components/Popcomfirm';
import Spin from '@/components/Spin';
import Table, { TColumnTable } from '@/components/Table';
import Tag from '@/components/Tag';
import { STATUS_COLOR, STATUS_TEXT } from '@/lib/constants';
import {
  EyeIcon,
  FunnelIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import BookingDetail from './BookingDetail';
import FormBooking from './FormBooking';
import Pagination from '@/components/Pagination';
import BookingFilter from './BookingFilter';

const Booking = () => {
  const [modalForm, setModalForm] = useState({ open: false, id: null });
  const [drawerFilter, setDrawerFilter] = useState({
    open: false,
    filter: {},
  });
  const [modalDetail, setModalDetail] = useState({
    open: false,
    id: null,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [search, setSearch] = useState<string>('');
  const searchDebounce = useDebounce(search, 500);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [
      'get-booking-list',
      searchDebounce,
      pagination,
      drawerFilter.filter,
    ],
    queryFn: () => {
      const params = {
        search: searchDebounce,
        ...pagination,
        ...drawerFilter.filter,
      };
      return BookingApi.getList({ params });
    },
    staleTime: 300000,
  });

  const mutation = useMutation({
    mutationFn: (id) => BookingApi.delete({ id }),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Lỗi khi tạo booking:', error);
    },
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
            <EyeIcon className="text-white w-6 h-6" />
          </Button>
          <Button
            color="warning"
            onClick={() => setModalForm({ open: true, id: record?.id })}
          >
            <PencilSquareIcon className="text-white w-6 h-6" />
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => mutation.mutate(record?.id)}
          >
            <Button color="error">
              <TrashIcon className="text-white w-6 h-6" />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="grid p-5 gap-2.5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase">Booking management</h1>
        <div className="flex items-center gap-2.5">
          <Input
            placeholder="Search...."
            value={search}
            onChange={(e) => {
              setPagination({ ...pagination, page: 1 });
              setSearch(e.target.value);
            }}
          />

          <Button
            className="max-w-max p-2"
            color="default"
            onClick={() => setDrawerFilter({ ...drawerFilter, open: true })}
          >
            <FunnelIcon className="w-6 h-6 text-gray-500" />
          </Button>

          <Button
            className="w-full"
            onClick={() => setModalForm({ open: true, id: null })}
          >
            + Add Booking
          </Button>
        </div>
      </div>
      <Spin spinning={isLoading || isFetching}>
        <Table columns={columns} data={data?.data || []} />
        <Pagination
          total={data?.total}
          pageSize={data?.limit}
          current={data?.page}
          onChange={(page) => setPagination({ ...pagination, page })}
        />
      </Spin>

      {modalForm.open && (
        <FormBooking
          open={modalForm.open}
          id={modalForm.id}
          onClose={() => setModalForm({ open: false, id: null })}
          onSuccess={refetch}
        />
      )}

      {modalDetail.open && (
        <BookingDetail
          open={modalDetail.open}
          id={modalDetail.id}
          onClose={() => setModalDetail({ open: false, id: null })}
        />
      )}

      {drawerFilter.open && (
        <BookingFilter
          filter={drawerFilter.filter}
          open={drawerFilter.open}
          onClose={() => setDrawerFilter({ ...drawerFilter, open: false })}
          onFilter={(filter) => setDrawerFilter({ open: false, filter })}
        />
      )}
    </div>
  );
};

export default Booking;

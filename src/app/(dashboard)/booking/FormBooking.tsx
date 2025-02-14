import BookingApi from '@/common/api/booking';
import Input from '@/components/Input';
import Modal, { ModalProps } from '@/components/Modal';
import Select from '@/components/Select';
import SelectDriver from '@/components/Select/SelectDriver';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type LoginForm = {
  customer_name: string;
  pickup: string;
  drop_off: string;
  driver_id: string;
  status?: string;
};

interface FormBookingProps extends ModalProps {
  id?: number | string | null;
  onSuccess?: () => void;
}

const FormBooking = (props: FormBookingProps) => {
  const { id, onClose, onSuccess, ...rest } = props;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleClose = () => {
    onClose?.();
    reset();
  };

  const mutation = useMutation({
    mutationFn: (params) =>
      id ? BookingApi.update({ id, params }) : BookingApi.create({ params }),
    onSuccess: () => {
      handleClose();
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Lỗi khi tạo booking:', error);
    },
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['get-booking-detail', id],
    queryFn: () => BookingApi.getDetail({ id }),
    enabled: !!id,
    staleTime: 300000,
  });

  const handleSubmitForm = (values) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (data && id) {
      reset({
        customer_name: data?.customer_name,
        pickup: data?.pickup,
        drop_off: data?.drop_off,
        driver_id: String(data?.driver_id),
        status: data?.status,
      });
    }
  }, [data, id]);

  const loading = mutation.isPending || (isFetching && !!id);

  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <Modal
      {...rest}
      title={id ? 'Edit Booking' : 'Add booking'}
      onOk={handleSubmit(handleSubmitForm)}
      onClose={handleClose}
      loading={loading}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="mb-4">
          <label
            htmlFor="customer_name"
            className="block text-sm font-medium text-gray-600"
          >
            Customer name
          </label>
          <Input
            type="text"
            id="customer_name"
            placeholder="Ex: Nguyen Van A"
            required
            {...register('customer_name', {
              required: 'Customer name is require',
            })}
          />
          {errors.customer_name && (
            <p className="text-red-500 text-sm">
              {errors.customer_name.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="pickup"
            className="block text-sm font-medium text-gray-600"
          >
            Pickup
          </label>
          <Input
            type="text"
            id="pickup"
            placeholder="Ex: Thu Duc, Ho Chi Minh"
            required
            {...register('pickup', { required: 'Pickup is require' })}
          />
          {errors.pickup && (
            <p className="text-red-500 text-sm">{errors.pickup.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="drop_off"
            className="block text-sm font-medium text-gray-600"
          >
            Drop-off
          </label>
          <Input
            type="text"
            id="drop_off"
            placeholder="Ex: Tan Binh, Ho Chi Minh"
            required
            {...register('drop_off', { required: 'Drop-off is require' })}
          />
          {errors.drop_off && (
            <p className="text-red-500 text-sm">{errors.drop_off.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="driver_id"
            className="block text-sm font-medium text-gray-600"
          >
            Driver name
          </label>
          <SelectDriver
            name="driver_id"
            control={control}
            rules={{ required: 'Please select driver' }}
            placeholder="Select driver"
          />
        </div>
        {id && (
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-600"
            >
              Status
            </label>
            <Select
              name="status"
              control={control}
              options={[
                { label: 'Pending', value: 'pending' },
                { label: 'In Progress', value: 'in_progress' },
                { label: 'Completed', value: 'completed' },
                { label: 'Canceled', value: 'canceled' },
              ]}
              rules={{ required: 'Please select status' }}
              placeholder="Select status"
            />
          </div>
        )}
      </form>
    </Modal>
  );
};

export default FormBooking;

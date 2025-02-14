import Button from '@/components/Button';
import Drawer from '@/components/Drawer';
import Select from '@/components/Select';
import SelectDriver from '@/components/Select/SelectDriver';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const BookingFilter = ({ open, filter, onClose, onFilter }) => {
  const { handleSubmit, control, reset } = useForm();

  const handleSubmitForm = (values) => {
    console.log('values', values);

    onClose();
    onFilter(values);
  };

  useEffect(() => {
    reset(filter);
  }, [filter]);

  return (
    <Drawer isOpen={open} onClose={onClose} title="Filter">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="mb-4">
          <label
            htmlFor="driver_id"
            className="block text-sm font-medium text-gray-600"
          >
            Assigned Driver
          </label>
          <SelectDriver
            name="driver_id"
            control={control}
            placeholder="Select driver"
          />
        </div>
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
            placeholder="Select status"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-red-500 cursor-pointer" onClick={() => reset()}>
            Clear
          </span>
          <Button type="submit">Filter</Button>
        </div>
      </form>
    </Drawer>
  );
};

export default BookingFilter;

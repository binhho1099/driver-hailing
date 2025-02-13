import React, { useMemo } from 'react';
import Select, { SelectProps } from '.';
import axiosInstance from '@/lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const SelectDriver = (props: SelectProps) => {
  const { data } = useQuery({
    queryKey: ['get-driver-list'],
    queryFn: async () => {
      const res = await axiosInstance.get('http://localhost:3000/api/driver');
      return res.data;
    },
  });

  const options = useMemo(() => {
    if (!data) return [];
    return data.map((item) => ({ label: item?.full_name, value: item?.id }));
  }, [data]);

  return <Select options={options} {...props} />;
};

export default SelectDriver;

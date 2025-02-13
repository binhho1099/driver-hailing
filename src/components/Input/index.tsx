import React from 'react';

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...rest } = props;
  return (
    <input
      className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none ${className}`}
      {...rest}
    />
  );
};

export default Input;

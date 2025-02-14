import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'success' | 'error' | 'warning' | 'default';
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { children, color = 'primary', className, ...restProps } = props;

  const colorClassName = {
    default:
      'border !text-gray-500 bg-white hover:bg-gray-100 focus:ring-gray-300',
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
    success: 'bg-green-600 hover:bg-green-700 focus:ring-green-300',
    error: 'bg-red-600 hover:bg-red-700 focus:ring-red-300',
    warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300',
  };

  return (
    <button
      className={`rounded-lg  px-4 py-2 text-white font-semibold focus:ring-2 ${colorClassName[color]} ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;

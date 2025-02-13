import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6 bg-gradient-to-r from-cyan-500 to-blue-500">
      {children}
    </div>
  );
};

export default AuthLayout;

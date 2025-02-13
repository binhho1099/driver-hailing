import React from 'react';

const tagColors = {
  blue: 'bg-blue-100 text-blue-800 border-blue-300',
  green: 'bg-green-100 text-green-800 border-green-300',
  red: 'bg-red-100 text-red-800 border-red-300',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  gray: 'bg-gray-100 text-gray-800 border-gray-300',
};

interface TagProps {
  children: React.ReactNode;
  color?: keyof typeof tagColors;
}

const Tag: React.FC<TagProps> = ({ children, color = 'gray' }) => {
  return (
    <span
      className={`px-3 py-1 rounded text-sm font-medium border ${tagColors[color]}`}
    >
      {children}
    </span>
  );
};

export default Tag;

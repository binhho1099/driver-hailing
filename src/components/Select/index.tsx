import { useState, useRef, useEffect } from 'react';
import { useController, Control } from 'react-hook-form';

type Option = { label: string; value: string };

export type SelectProps = {
  name: string;
  control: Control<any>;
  options?: Option[];
  placeholder?: string;
  rules?: any;
};

export default function Select({
  name,
  control,
  options = [],
  rules,
  placeholder = 'Select...',
}: SelectProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, rules });

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative w-full">
      <div
        className={`p-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg cursor-pointer bg-white flex justify-between items-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {options.find((o) => o.value === value)?.label || placeholder}
        </span>
        <svg
          className="w-4 h-4 transform transition-transform duration-200"
          style={{ rotate: isOpen ? '180deg' : '0deg' }}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full border border-gray-300 bg-white rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                value === option.value ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

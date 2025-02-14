import { useClickOutside } from '@/common/hooks/useClickOutside';
import { useState } from 'react';

interface PopconfirmProps {
  title: string;
  onConfirm: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
}

export default function Popconfirm({
  title,
  onConfirm,
  onCancel,
  children,
}: PopconfirmProps) {
  const [visible, setVisible] = useState(false);
  const ref = useClickOutside(() => setVisible(false));

  return (
    <div className="relative">
      <div onClick={() => setVisible(true)}>{children}</div>

      {visible && (
        <div
          ref={ref}
          className="absolute right-0 top-full z-50 mt-2 rounded-lg bg-white p-4 shadow-lg"
        >
          <p className="text-sm text-gray-700">{title}</p>
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => {
                setVisible(false);
                onCancel?.();
              }}
              className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setVisible(false);
                onConfirm();
              }}
              className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

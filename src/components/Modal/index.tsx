'use client';

import { useEffect } from 'react';
import Button from '../Button';
import Spin from '../Spin';

export interface ModalProps {
  open?: boolean;
  loading?: boolean;
  title?: string;
  okButtonClassname?: string;
  cancelButtonClassname?: string;
  onClose?: () => void;
  onOk?: () => void;
  children?: React.ReactNode;
}

const Modal = ({
  open = false,
  loading = false,
  title,
  okButtonClassname,
  cancelButtonClassname,
  children,
  onOk,
  onClose,
}: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 animate-fade-in">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">{title || 'Modal Title'}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <Spin spinning={loading}>
          <div className="mt-4">{children}</div>
        </Spin>
        <div className="mt-6 flex justify-end space-x-2">
          <Button
            onClick={onClose}
            color="default"
            className={cancelButtonClassname}
          >
            Cancel
          </Button>
          <Button onClick={onOk} className={okButtonClassname}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

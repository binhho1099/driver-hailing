import { XMarkIcon } from '@heroicons/react/24/outline';

const Drawer = ({ isOpen, onClose, children, title = 'Drawer Title' }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all ${
        isOpen ? 'visible bg-black/50' : 'invisible'
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()} // Ngăn chặn đóng khi bấm vào nội dung
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;

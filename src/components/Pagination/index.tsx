import { useMemo } from 'react';

interface PaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  total,
  pageSize,
  current,
  onChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const pages = useMemo(() => {
    const visiblePages = 5;
    const pageNumbers: (number | '...')[] = [];

    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (current <= 3) {
      pageNumbers.push(1, 2, 3, '...', totalPages);
    } else if (current >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(
        1,
        '...',
        current - 1,
        current,
        current + 1,
        '...',
        totalPages,
      );
    }

    return pageNumbers;
  }, [totalPages, current]);

  return (
    <div className="flex items-center justify-end space-x-2 mt-4">
      <button
        className={`px-3 py-2 border rounded-md ${
          current === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
      >
        Prev
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-3 py-2">
            ...
          </span>
        ) : (
          <button
            key={index}
            className={`px-3 py-2 border rounded-md ${
              page === current ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
            onClick={() => onChange(page as number)}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={`px-3 py-2 border rounded-md ${
          current === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-100'
        }`}
        onClick={() => onChange(current + 1)}
        disabled={current === totalPages}
      >
        Next
      </button>
    </div>
  );
}

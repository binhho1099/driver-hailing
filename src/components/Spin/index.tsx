interface SpinProps {
  spinning?: boolean;
  children?: React.ReactNode;
}

const Spin: React.FC<SpinProps> = ({ spinning = true, children }) => {
  return (
    <div className="relative">
      {spinning && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50">
          <div
            className={`h-10 w-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin`}
          />
        </div>
      )}
      <div className={spinning ? 'opacity-50' : ''}>{children}</div>
    </div>
  );
};

export default Spin;

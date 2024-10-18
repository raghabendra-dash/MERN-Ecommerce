const Spinner = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      {/* Centered spinning loader */}
      <div className="h-16 w-16 animate-spin rounded-full border-8 border-dashed border-primary" />
    </div>
  );
};

export default Spinner;

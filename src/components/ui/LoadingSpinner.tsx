import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 className="h-10 w-10 text-primary-500 animate-spin" />
      <p className="mt-4 text-dark-500 font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
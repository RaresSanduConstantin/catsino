import React from 'react';
import { LoaderCircle } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center"> {/* Full screen height */}
      <LoaderCircle className="animate-spin text-blue-500" size={48} />
      {/* Customizable size and color */}
    </div>
  );
};

export default Loading;

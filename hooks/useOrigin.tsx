'use client';

import { useEffect, useState } from 'react';

const useOrigin = () => {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    // Check if the window object is available
    if (typeof window !== 'undefined') {
      // Set the origin to the current window's origin
      setOrigin(window.location.origin);
    }
  }, []);

  return origin;
};

export default useOrigin;

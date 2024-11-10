'use client';

import React from 'react';
import useOrigin from '@/hooks/useOrigin';

const Publish = () => {
  useOrigin();

  return (
    <div className="publish">
      <button>Publish Document</button>
    </div>
  );
};

export default Publish;

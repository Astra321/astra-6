'use client';

import React from 'react';
import Spinner from '@/components/spinner';

const Heading = () => {
  return (
    <div className="heading">
      <Spinner />
      <h1>Welcome to the Astronomy Club!</h1>
    </div>
  );
};

export default Heading;

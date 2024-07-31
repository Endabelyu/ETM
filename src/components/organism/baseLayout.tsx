import React, { Children } from 'react';
import Navbar from '../molecules/navbar';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default BaseLayout;

// components/ScrollView.tsx
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface ScrollViewProps {
  children: React.ReactNode;
}

const ScrollView: React.FC<ScrollViewProps> = ({ children }) => {
  return (
    <Scrollbars className=" bg-red-400" style={{ width: 500, height: 600 }}>
      {children}
    </Scrollbars>
  );
};

export default ScrollView;
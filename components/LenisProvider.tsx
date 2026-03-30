// components/LenisProvider.tsx
"use client"; // Required for client-side functionality

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import React from 'react';

function LenisProvider({ children }: { children: React.ReactNode | any }) {
  // Optional: you can use the useLenis hook for more control if needed
  useLenis(({ scroll }) => {
    // console.log('Current scroll position:', scroll);
  });

  return (
    <ReactLenis
      root // Applies smooth scroll to the root of the page
      options={{
        lerp: 0.1, // Controls the smoothness (0.1 is quite smooth, smaller is slower/smoother)
        duration: 1.5, // Duration of the scroll animation
        smoothWheel: true, // Enables smooth scrolling for mouse wheel
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default LenisProvider;

// components/LenisProvider.tsx
"use client";

// IMPORTANT: Lenis handles all smooth scrolling. DO NOT add native CSS
// scroll-behavior: smooth or Tailwind scroll-smooth classes anywhere in
// the app - they conflict with Lenis and break scrolling in some browsers.
// See: https://github.com/studio-freight/lenis#required-css

import { ReactLenis } from '@studio-freight/react-lenis';
import React from 'react';

function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        touchMultiplier: 0.8,
        syncTouch: true,
        syncTouchLerp: 0.2,
        gestureOrientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default LenisProvider;

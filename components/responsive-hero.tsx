"use client";

import { useEffect, useState } from "react";

interface ResponsiveHeroProps {
  children: React.ReactNode;
  className?: string;
}

export default function ResponsiveHero({ children, className = "" }: ResponsiveHeroProps) {
  const [heroHeight, setHeroHeight] = useState("100vh");

  useEffect(() => {
    const calculateHeroHeight = () => {
      // For hero section, we want full viewport height
      // Header is positioned fixed/sticky, so hero should be full screen
      setHeroHeight("100vh");
    };

    // Set immediately
    calculateHeroHeight();

    // Also set on resize to maintain consistency
    window.addEventListener('resize', calculateHeroHeight);

    return () => {
      window.removeEventListener('resize', calculateHeroHeight);
    };
  }, []);

  return (
    <div 
      className={`hero-section ${className}`}
      style={{
        minHeight: heroHeight,
        height: heroHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        paddingTop: 0,
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

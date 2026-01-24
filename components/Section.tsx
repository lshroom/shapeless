import React from 'react';
import { SectionProps } from '../types';

interface Props extends SectionProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
}

const Section: React.FC<Props> = ({ id, children, className = '', bgImage }) => {
  const bgStyle = bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {};

  return (
    <section id={id} className={`py-16 px-4 md:px-8 lg:px-16 min-h-screen relative flex items-center justify-center ${className}`} style={bgStyle}>
      <div className="relative z-10 w-full max-w-7xl">
        {children}
      </div>
      {bgImage && <div className="absolute inset-0 bg-black opacity-70 z-0"></div>} {/* Overlay for background images */}
    </section>
  );
};

export default Section;
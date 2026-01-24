import React from 'react';
import {
  HERO_BACKGROUND_IMAGE,
  HOME_HEADER,
  HOME_SUBHEADER,
  SECTION_IDS,
  HEADLINE_LOGO,
  HERO_TEXT_BOX_BACKGROUND_IMAGE, // Import the new background image
} from '../constants';
import Button from './Button';
// import Section from './Section'; // No longer importing Section component for Hero

const Hero: React.FC = () => {
  const scrollToMusic = () => {
    // This will still work as it targets the ID, regardless of Hero using the Section component or not.
    document.getElementById(SECTION_IDS.KITCHEN)?.scrollBy({ top: 1, behavior: 'smooth' });
  };

  return (
    <> {/* Use a fragment to return multiple top-level elements: the fixed background and the main section */}
      {/* Background Layer: Fixed pirate ship image with overlay */}
      {/* This div is fixed to the viewport and positioned behind everything else. */}
      <div className="fixed inset-0 -z-10">
        <img
          src={HERO_BACKGROUND_IMAGE}
          alt="Shapeless Peace Pirate Ship Background"
          className="w-full h-full object-cover object-top"
        />
        {/* Overlay for the fixed background image */}
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Content Layer: Main section for the Hero area, now a direct <section> tag */}
      <section
        id={SECTION_IDS.HOME}
        className="relative flex flex-col items-center justify-center text-center h-screen w-screen text-white overflow-hidden bg-transparent pt-0" // justify-center to vertically center its children
      >
        {/* Animated background bar (HEADLINE_LOGO) - now correctly absolute to this section */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-repeat-x animate-slide-left opacity-80 z-[5]"
          style={{
            backgroundImage: `url(${HEADLINE_LOGO})`,
          }}
          aria-hidden="true"
        ></div>

        {/* Text content container - now with transparent dark background, rounded, and internally centered. */}
        <div
          className="relative z-10 p-8 rounded-xl bg-black bg-opacity-40 max-w-4xl flex flex-col items-center justify-center"
        >
          {/* Text content - positioned relative to appear above the container's background */}
          <h1
            className="relative z-10 text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-transparent bg-clip-text neon-text"
            style={{
              // Steampunk image now applied to the text letters via bg-clip-text
              backgroundImage: `url(${HERO_TEXT_BOX_BACKGROUND_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitTextFillColor: 'transparent',
              filter: 'brightness(75%)', // Darken the image within the letters by 50%
            }}
          >
            {HOME_HEADER}
          </h1>
          <p className="relative z-10 text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            {HOME_SUBHEADER}
          </p>
          <Button onClick={scrollToMusic} size="lg" variant="primary" className="relative z-10">
            Begin the Symphony of Peace
          </Button>
        </div>
      </section>
    </>
  );
};

export default Hero;
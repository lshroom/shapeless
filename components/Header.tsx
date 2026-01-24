import React, { useState } from 'react';
import { APP_TITLE, SECTION_IDS, LOGO_BACKGROUND_GIF } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: SECTION_IDS.HOME },
    { name: 'Kitchen', id: SECTION_IDS.KITCHEN }, // Updated to point to the new page
    { name: 'Factory', id: SECTION_IDS.FACTORY }, // New: Shapeless Song Factory
    { name: 'Artists', id: SECTION_IDS.ARTISTS },
    { name: 'Activism', id: SECTION_IDS.ACTIVISM },
    { name: 'About', id: SECTION_IDS.ABOUT },
    { name: 'Contact', id: SECTION_IDS.CONTACT },
  ];

  const handleNavLinkClick = (id: string) => {
    setIsOpen(false); // Close mobile menu on click
    if (id === SECTION_IDS.KITCHEN || id === SECTION_IDS.FACTORY) {
      window.location.hash = id; // Navigate to the Kitchen or Factory page
    } else if ([SECTION_IDS.KITCHEN, SECTION_IDS.FACTORY].includes(window.location.hash.substring(1))) {
      // If currently on Kitchen or Factory page, navigate back to home and then scroll
      window.location.hash = SECTION_IDS.HOME;
      // Add a slight delay to allow hash change to register and App component to re-render
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    } else {
      // For sections on the main page
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent h-24 md:h-36 px-4 md:px-8 overflow-visible relative">
      <div className="w-full absolute inset-0 flex justify-between items-center">
        <a
          href="#home"
          className="flex items-center space-x-2"
          onClick={() => handleNavLinkClick(SECTION_IDS.HOME)}
        >
          <img
            src={LOGO_BACKGROUND_GIF}
            alt="Shapeless Peace Logo GIF"
            className="h-48 w-48 md:h-64 md:w-64 object-contain rounded-full"
          />
          <span className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b69eff] to-[#9d81ff]">
            {APP_TITLE}
          </span>
        </a>

        {/* Mobile Menu Button - now the universal toggle */}
        <button
          className="text-white focus:outline-none z-50 p-2" // Higher z-index for the button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>

      {/* Full-screen Pop-up Navigation */}
      {isOpen && (
        <nav className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center space-y-8 z-40 animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => handleNavLinkClick(item.id)}
              className="text-white text-4xl md:text-5xl font-bold hover:text-[#9d81ff] transition duration-300"
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
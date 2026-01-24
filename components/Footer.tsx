import React from 'react';
import { APP_TITLE, DISCORD_INVITE_URL, WIX_SITE_URL } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black text-gray-400 py-8 px-4 md:px-8 border-t border-indigo-900/30">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0 font-monospace">
          <p>&copy; {new Date().getFullYear()} {APP_TITLE}. All rights reserved.</p>
          <p className="text-sm">Forging peace, one beat at a time.</p>
        </div>

        <div className="flex space-x-6 mb-4 md:mb-0">
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-purple-400 transition-colors duration-300 neon-text-hover"
            aria-label="Join our Discord"
          >
            Discord
          </a>
          <a
            href={WIX_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-purple-400 transition-colors duration-300 neon-text-hover"
            aria-label="Visit our Wix site"
          >
            Wix Site
          </a>
          {/* Add more social links if needed */}
        </div>

        <div className="text-sm font-monospace">
          <p>Powered by Peace & Code</p>
          <p>Design inspired by the pirate robot crew.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
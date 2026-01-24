import React, { useState } from 'react';
import MusicStudioIframe from './MusicStudioIframe';
import { KITCHEN_TITLE, KITCHEN_DESCRIPTION } from '../constants'; // Import new constants

const KitchenLanding: React.FC = () => {
  const [isCauldronActivated, setIsCauldronActivated] = useState(false);
  const [showStatusMessage, setShowStatusMessage] = useState(false);

  const letTheCookingBegin = () => {
    setIsCauldronActivated(true);
    setShowStatusMessage(true);

    const uniqueId = 'user_' + Math.random().toString(36).substr(2, 9);
    window.open(`https://vdo.ninja/?push=${uniqueId}&room=shapeless&codec=vp9&stereo=1`, '_blank');
    setTimeout(() => {
      window.open('sonobus://join/shapeless', '_blank');
    }, 500);

    // Hide status message after a few seconds
    setTimeout(() => {
      setShowStatusMessage(false);
    }, 5000);
  };

  return (
    <div className="cauldron-container" id="cauldronContainer">
      <div className="main-content">
        <div className="logo">⚗️</div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b69eff] to-[#00ffaa] mb-6 text-center neon-text-light">
          {KITCHEN_TITLE}
        </h2>
        <div
          className="instructions text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed prose prose-invert"
          dangerouslySetInnerHTML={{ __html: KITCHEN_DESCRIPTION }}
        />

        <button
          className={`neon-button ${isCauldronActivated ? 'activated' : 'pulsing'}`}
          id="cookingBtn"
          onClick={letTheCookingBegin}
          disabled={isCauldronActivated}
        >
          <span>{isCauldronActivated ? 'Sessions Launched!' : 'Let The Cooking Begin!'}</span>
        </button>

        <div className={`status-message ${showStatusMessage ? 'show' : ''}`} id="statusMsg">
          ✓ Opening Ghost Cauldron! Allow camera permissions when prompted.
        </div>
      </div>

      {isCauldronActivated && (
        <div className="mt-8 w-full">
          <MusicStudioIframe />
        </div>
      )}
    </div>
  );
};

export default KitchenLanding;
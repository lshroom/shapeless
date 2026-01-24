import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Section from './components/Section';
import Hero from './components/Hero';
import GrowthTracker from './components/GrowthTracker';
import DiscordConnect from './components/DiscordConnect';
import KitchenPage from './components/KitchenPage';
import ShapelessDashboard from './components/ShapelessDashboard';
import {
  ARTISTS_DESCRIPTION,
  ARTISTS_TITLE,
  ABOUT_DESCRIPTION,
  ABOUT_TITLE,
  CONTACT_DESCRIPTION,
  CONTACT_TITLE,
  PIRATE_SHIPS_BACKGROUND,
  SECTION_IDS,
  JELLYFISH_SCREEN_IMAGE,
  ARTISTS_BACKGROUND_IMAGE,
  FACTORY_TITLE,
  FACTORY_DESCRIPTION
} from './constants';
import { Song, Split } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(
    window.location.hash.substring(1) || SECTION_IDS.HOME
  );

  // Initial song data, now managed at the App level
  const [songs, setSongs] = useState<Song[]>([
    { id: '1', title: 'זרע השלום', status: 'SEED', type: 'ORIGINAL', creator: 'Harry', investors: 12, price: '0.05 ETH', audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', splits: [{ participant: 'Harry', share: 1, type: 'creator' }] },
    { id: '2', title: 'שלום באשקלון - רמיקס פיראטי', parentId: '1', status: 'PRODUCTION', type: 'BRANCH', creator: 'Jack', investors: 4, price: '0.08 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', splits: [{ participant: 'Jack', share: 0.9, type: 'forker' }, { participant: 'Harry', share: 0.1, type: 'lineage_royalty' }] },
    { id: '3', title: 'המנון התנועה', status: 'LOCKED', type: 'ORIGINAL', creator: 'Harry', investors: 85, price: '1.2 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', splits: [{ participant: 'Harry', share: 1, type: 'creator' }] },
    { id: '4', title: 'Bridge Over Troubled Waters', status: 'PRODUCTION', type: 'ORIGINAL', creator: 'Jane', investors: 7, price: '0.1 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', splits: [{ participant: 'Jane', share: 1, type: 'creator' }] }, // Changed to ORIGINAL SEED
    { id: '5', title: 'Unity Anthem Remix', parentId: '3', status: 'PRODUCTION', type: 'BRANCH', creator: 'Sophia', investors: 10, price: '0.15 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', splits: [{ participant: 'Sophia', share: 0.9, type: 'forker' }, { participant: 'Harry', share: 0.1, type: 'lineage_royalty' }] },
    { id: '6', title: 'Desert Rose Dub', parentId: '4', status: 'LOCKED', type: 'BRANCH', creator: 'Omar', investors: 22, price: '0.3 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', splits: [{ participant: 'Omar', share: 0.9, type: 'forker' }, { participant: 'Jane', share: 0.1, type: 'lineage_royalty' }] },
    { id: '7', title: 'Whispers of Hope', status: 'SEED', type: 'ORIGINAL', creator: 'Ella', investors: 3, price: '0.02 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', splits: [{ participant: 'Ella', share: 1, type: 'creator' }] },
    { id: '8', title: 'Echoes of Tomorrow', parentId: '7', status: 'PRODUCTION', type: 'BRANCH', creator: 'David', investors: 6, price: '0.09 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', splits: [{ participant: 'David', share: 0.9, type: 'forker' }, { participant: 'Ella', share: 0.1, type: 'lineage_royalty' }] },
    // Adding more SEED songs
    { id: '9', title: 'Rhythm of Unity', status: 'SEED', type: 'ORIGINAL', creator: 'Zara', investors: 5, price: '0.03 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', splits: [{ participant: 'Zara', share: 1, type: 'creator' }] },
    { id: '10', title: 'Peaceful Pulse', status: 'SEED', type: 'ORIGINAL', creator: 'Liam', investors: 8, price: '0.06 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', splits: [{ participant: 'Liam', share: 1, type: 'creator' }] },
    { id: '11', title: 'Morning Dew Drop', status: 'SEED', type: 'ORIGINAL', creator: 'Noah', investors: 2, price: '0.01 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', splits: [{ participant: 'Noah', share: 1, type: 'creator' }] },
    { id: '12', title: 'Starlight Serenade', status: 'SEED', type: 'ORIGINAL', creator: 'Mia', investors: 10, price: '0.04 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', splits: [{ participant: 'Mia', share: 1, type: 'creator' }] },
    { id: '13', title: 'Oceanic Whispers', parentId: '11', status: 'PRODUCTION', type: 'BRANCH', creator: 'Oliver', investors: 7, price: '0.12 ETH', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', splits: [{ participant: 'Oliver', share: 0.9, type: 'forker' }, { participant: 'Noah', share: 0.1, type: 'lineage_royalty' }] },
  ]);


  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash.substring(1) || SECTION_IDS.HOME);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Callback for when a recording is completed in the Kitchen page
  const handleRecordingComplete = (newForkId: string, recordedAudioUrl: string) => {
    setSongs(prevSongs => {
      const updatedSongs = prevSongs.map(song => {
        if (song.id === newForkId) {
          return { ...song, audioUrl: recordedAudioUrl, status: 'PRODUCTION' }; // Update audio and ensure status is production
        }
        return song;
      });
      return updatedSongs;
    });
    // Navigate back to the Factory dashboard
    window.location.hash = SECTION_IDS.FACTORY;
  };

  // Filter out the KITCHEN section from mainSections as it's now a separate page
  const mainSections = [
    { id: SECTION_IDS.ARTISTS, title: ARTISTS_TITLE, description: ARTISTS_DESCRIPTION, bgImage: ARTISTS_BACKGROUND_IMAGE },
    { id: SECTION_IDS.ACTIVISM, bgImage: PIRATE_SHIPS_BACKGROUND, content: () => (<><GrowthTracker /><DiscordConnect /></>) },
    { id: SECTION_IDS.ABOUT, title: ABOUT_TITLE, description: ABOUT_DESCRIPTION, bgImage: JELLYFISH_SCREEN_IMAGE },
    { id: SECTION_IDS.CONTACT, title: CONTACT_TITLE, description: CONTACT_DESCRIPTION, className: "bg-gray-950" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Tailwind global styles for neon effects and new animations */}
      <style>{`
        /* New Accent Color: #9d81ff (Purple/Neon) */
        /* Derived shades: #b69eff (lighter), #8165d4 (darker) */

        .neon-text {
          /* text-shadow removed to remove glow from headlines */
          -webkit-text-stroke: 1px white; /* Added thin white stroke */
        }
        .neon-text-light {
          /* text-shadow removed to remove glow from headlines */
        }
        .neon-hover:hover {
          text-shadow: 0 0 5px #9d81ff, 0 0 10px #b69eff, 0 0 15px #8165d4;
        }
        .shadow-neon-blue { /* Renamed conceptually to general neon shadow */
          box-shadow: 0 0 15px rgba(157, 129, 255, 0.6), 0 0 30px rgba(182, 158, 255, 0.4);
        }
        .shadow-neon-purple { /* Renamed conceptually to general neon shadow */
          box-shadow: 0 0 15px rgba(157, 129, 255, 0.6), 0 0 30px rgba(182, 158, 255, 0.4);
        }
        .glow-green-btn { /* Retaining distinct green glow for this button */
          box-shadow: 0 0 8px rgba(0, 255, 170, 0.6), 0 0 16px rgba(0, 255, 170, 0.4);
        }
        .glow-green-btn:hover {
          box-shadow: 0 0 12px rgba(0, 255, 170, 0.8), 0 0 24px rgba(0, 255, 170, 0.6);
        }

        /* Keyframe for the sliding background bar */
        @keyframes slide-left {
          from {
            background-position: 100% 0; /* Start from right */
          }
          to {
            background-position: 0% 0; /* End at left */
          }
        }
        .animate-slide-left {
          animation: slide-left 20s linear infinite; /* Adjust duration as needed */
        }

        /* Keyframe for fade-in effect */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        /* --- Kitchen Landing Page Button and Container Styles --- */
        .cauldron-container {
            position: relative;
            width: 100%;
            min-height: 400px;
            height: auto; /* Set height to auto to accommodate iframe */
            background: #1a1a1a; /* Changed from #000000 to a dark pirate grey */
            overflow: auto;
            border: 3px solid #9d81ff; /* Changed from #00FFFF to accent purple */
            border-radius: 12px;
            box-shadow: 0 0 40px rgba(157, 129, 255, 0.3); /* Changed from rgba(0, 255, 255, 0.3) to accent purple */
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 20px;
        }
        @media (max-width: 768px) {
            .cauldron-container {
                min-height: 200px;
                padding: 15px 10px;
                border-radius: 8px;
            }
        }

        .main-content {
            text-align: center;
            z-index: 10;
        }

        .neon-button {
            position: relative;
            display: inline-block;
            padding: 18px 45px;
            font-size: 22px;
            font-weight: bold;
            font-family: 'Arial', sans-serif;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #9d81ff; /* Changed from #0ff to accent purple */
            background: transparent;
            border: 3px solid #9d81ff; /* Changed from #0ff to accent purple */
            border-radius: 8px;
            box-shadow:
                0 0 10px #9d81ff, /* Changed from #0ff to accent purple */
                0 0 20px #9d81ff,
                0 0 40px #9d81ff,
                inset 0 0 10px rgba(157, 129, 255, 0.2); /* Changed from rgba(0, 255, 255, 0.2) to accent purple */
            transition: all 0.3s ease;
            cursor: pointer;
            overflow: hidden;
            margin: 10px;
        }
        @media (max-width: 768px) {
            .neon-button {
                padding: 10px 20px;
                font-size: 12px;
                letter-spacing: 1px;
                margin: 3px;
                border-width: 2px;
            }
        }

        .neon-button:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(157, 129, 255, 0.4), transparent); /* Changed from rgba(0, 255, 255, 0.4) to accent purple */
            transition: left 0.5s;
        }

        .neon-button:hover:before {
            left: 100%;
        }

        .neon-button:hover {
            color: #fff;
            border-color: #b69eff; /* Changed from #ff00ff to lighter accent purple */
            box-shadow:
                0 0 20px #b69eff, /* Changed from #ff00ff to lighter accent purple */
                0 0 40px #b69eff,
                0 0 60px #b69eff,
                0 0 80px #b69eff,
                inset 0 0 20px rgba(182, 158, 255, 0.3); /* Changed from rgba(255, 0, 255, 0.3) to lighter accent purple */
            text-shadow:
                0 0 10px #fff,
                0 0 20px #b69eff; /* Changed from #ff00ff to lighter accent purple */
        }

        @keyframes pulse {
            0%, 100% {
                box-shadow:
                    0 0 10px #9d81ff, /* Changed from #0ff to accent purple */
                    0 0 20px #9d81ff,
                    0 0 40px #9d81ff,
                    inset 0 0 10px rgba(157, 129, 255, 0.2); /* Changed from rgba(0, 255, 255, 0.2) to accent purple */
            }
            50% {
                box-shadow:
                    0 0 15px #9d81ff,
                    0 0 30px #9d81ff,
                    0 0 50px #9d81ff,
                    inset 0 0 15px rgba(157, 129, 255, 0.3);
            }
        }

        .neon-button.pulsing {
            animation: pulse 2s infinite;
        }

        .neon-button:hover {
            animation: none;
        }

        .neon-button.activated {
            color: #00ffaa; /* Changed from #0f0 to accent green */
            border-color: #00ffaa; /* Changed from #0f0 to accent green */
            box-shadow:
                0 0 20px #00ffaa, /* Changed from #0f0 to accent green */
                0 0 40px #00ffaa,
                0 0 60px #00ffaa,
                inset 0 0 20px rgba(0, 255, 170, 0.3); /* Changed from rgba(0, 255, 0, 0.3) to accent green */
            animation: none;
        }

        .instructions {
            color: #9d81ff; /* Changed from #00FFFF to accent purple */
            font-size: 14px;
            max-width: 500px;
            margin: 30px auto 20px;
            line-height: 1.6;
            text-align: center;
            padding: 0 10px;
        }
        @media (max-width: 768px) {
            .instructions {
                font-size: 9px;
                margin: 5px auto 5px;
                max-width: 95%;
                line-height: 1.3;
            }
        }

        .status-message {
            color: #00ffaa; /* Changed from #00FF00 to accent green */
            font-size: 12px;
            margin-top: 20px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        @media (max-width: 768px) {
            .status-message {
                font-size: 8px;
                margin-top: 5px;
            }
        }

        .status-message.show {
            opacity: 1;
        }

        .cauldron-container::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            background: radial-gradient(circle, rgba(157, 129, 255, 0.15) 0%, transparent 70%); /* Changed from rgba(0, 255, 255, 0.15) to accent purple */
            z-index: 0;
            pointer-events: none;
            animation: etherealGlow 4s ease-in-out infinite;
        }

        @keyframes etherealGlow {
            0%, 100% {
                opacity: 0.4;
                transform: translate(-50%, -50%) scale(1);
            }
            50% {
                opacity: 0.7;
                transform: translate(-50%, -50%) scale(1.15);
            }
        }

        @keyframes shimmer {
            0%, 100% {
                border-color: #9d81ff; /* Changed from #00FFFF to accent purple */
            }
            50% {
                border-color: #00ffaa; /* Changed from #00FF00 to accent green */
            }
        }

        .cauldron-container.active-state {
            animation: shimmer 3s ease-in-out infinite;
        }

        .logo {
            font-size: 48px;
            margin-bottom: 20px;
            animation: float 3s ease-in-out infinite;
        }
        @media (max-width: 768px) {
            .logo {
                font-size: 24px;
                margin-bottom: 5px;
            }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
      `}</style>

      <Header />

      <main className="flex-grow">
        {currentPage === SECTION_IDS.KITCHEN ? (
          <Section id={SECTION_IDS.KITCHEN} className="bg-gray-950 text-white">
            <KitchenPage songs={songs} setSongs={setSongs} onRecordingComplete={handleRecordingComplete} />
          </Section>
        ) : currentPage === SECTION_IDS.FACTORY ? ( // New conditional rendering for Factory page
          <Section id={SECTION_IDS.FACTORY} className="bg-gray-950 text-white">
            <div className="bg-black bg-opacity-80 p-8 rounded-xl shadow-neon-purple border border-[#9d81ff] mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b69eff] to-[#00ffaa] mb-6 text-center neon-text-light">
                {FACTORY_TITLE}
              </h2>
              <div
                className="text-lg text-gray-300 mb-8 leading-relaxed prose prose-invert max-w-none text-center mx-auto"
                dangerouslySetInnerHTML={{ __html: FACTORY_DESCRIPTION }}
              />
              <ShapelessDashboard songs={songs} setSongs={setSongs} />
            </div>
          </Section>
        ) : (
          <>
            <Hero />
            {mainSections.map((section, index) => (
              <Section
                key={section.id}
                id={section.id}
                bgImage={section.bgImage}
                className={section.className || ''}
              >
                {section.title && (
                  <h2 className={`text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${section.id === SECTION_IDS.ARTISTS ? 'from-[#9d81ff] to-[#b69eff]' : section.id === SECTION_IDS.ABOUT ? 'from-[#b69eff] to-[#9d81ff]' : 'from-[#00ffaa] to-[#b69eff]'} neon-text mb-6 text-center max-w-4xl mx-auto`}>
                    {section.title}
                  </h2>
                )}
                {section.description && (
                  <div
                    className={`text-lg text-gray-300 leading-relaxed prose prose-invert max-w-none ${section.id !== SECTION_IDS.CONTACT ? 'text-center' : ''} ${section.id === SECTION_IDS.ARTISTS || section.id === SECTION_IDS.ABOUT ? 'bg-black bg-opacity-70 p-8 rounded-xl border-2 border-[#9d81ff] shadow-neon-purple' : ''} mx-auto`}
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  />
                )}
                {section.content && section.content()}
                {section.id === SECTION_IDS.CONTACT && (
                  <div className="text-center bg-black bg-opacity-80 p-8 rounded-xl shadow-neon-purple border border-[#9d81ff] max-w-2xl mx-auto">
                    <a
                      href={`#${SECTION_IDS.HOME}`}
                      onClick={() => document.getElementById(SECTION_IDS.HOME)?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-block px-8 py-3 bg-[#9d81ff] text-white font-bold rounded-xl hover:bg-[#b69eff] transition duration-300 shadow-lg shadow-[#9d81ff]/50 hover:shadow-[#9d81ff]/70 glow-green-btn"
                    >
                      Back to Top
                    </a>
                  </div>
                )}
              </Section>
            ))}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
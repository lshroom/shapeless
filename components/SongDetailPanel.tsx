import React from 'react';
import { Song, Split } from '../types';
import Button from './Button'; // Import the Button component
import { X, DollarSign, GitFork } from 'lucide-react';

interface SongDetailPanelProps {
  song: Song | null;
  allSongs: Song[]; // Needed for market value calculation
  onClose: () => void;
  onFork: (song: Song) => void;
  calculateMarketValue: (song: Song, allSongs: Song[]) => string; // Pass the calculation function
}

const SongDetailPanel: React.FC<SongDetailPanelProps> = ({ song, allSongs, onClose, onFork, calculateMarketValue }) => {
  if (!song) {
    return null;
  }

  const marketValue = calculateMarketValue(song, allSongs);

  const handleInvest = () => {
    alert(`You are attempting to invest 0.01 ETH in "${song.title}". (Investment functionality coming soon!)`);
    // In a real dApp, this would initiate a blockchain transaction
  };

  const handleFork = () => {
    onFork(song);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-slate-900 bg-opacity-95 backdrop-blur-md z-40 p-6 shadow-neon-purple border-l border-[#9d81ff] overflow-y-auto transform transition-transform duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
        <h2 className="text-3xl font-bold text-cyan-400">{song.title}</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors duration-200">
          <X size={24} />
        </button>
      </div>

      <div className="mb-6 text-slate-100">
        <p className="mb-2"><span className="font-semibold text-slate-300">ID:</span> <span className="font-mono text-yellow-400">{song.id}</span></p>
        <p className="mb-2"><span className="font-semibold text-slate-300">Creator:</span> {song.creator}</p>
        <p className="mb-2"><span className="font-semibold text-slate-300">Status:</span> <span className={`font-bold ${song.status === 'LOCKED' ? 'text-red-400' : 'text-green-400'}`}>{song.status}</span></p>
        <p className="mb-2"><span className="font-semibold text-slate-300">Type:</span> {song.type}</p>
        {song.parentId && <p className="mb-2"><span className="font-semibold text-slate-300">Parent ID:</span> <span className="font-mono text-amber-400">{song.parentId}</span></p>}
        <p className="mb-2"><span className="font-semibold text-slate-300">Investors:</span> {song.investors}</p>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl mb-6 border border-slate-700 shadow-inner">
        <h3 className="text-xl font-bold text-green-400 flex items-center gap-2 mb-3">
          <DollarSign size={20} /> Market Value
        </h3>
        <p className="text-2xl font-bold text-white mb-4">{marketValue}</p>
        <Button onClick={handleInvest} variant="primary" className="w-full glow-green-btn">
          Invest (0.01 ETH)
        </Button>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl mb-6 border border-slate-700 shadow-inner">
        <h3 className="text-xl font-bold text-yellow-400 mb-3">Master Splits</h3>
        {song.splits.length > 0 ? (
          <ul className="list-disc list-inside text-slate-200">
            {song.splits.map((split, index) => (
              <li key={index} className="mb-1">
                <span className="font-semibold">{split.participant}:</span> {(split.share * 100).toFixed(0)}% ({split.type.replace('_', ' ')})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400 italic">No splits defined yet.</p>
        )}
      </div>

      <Button onClick={handleFork} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-teal-600/50 hover:shadow-teal-600/70 flex items-center justify-center gap-2">
        <GitFork size={20} /> FORK IN FACTORY
      </Button>
    </div>
  );
};

export default SongDetailPanel;
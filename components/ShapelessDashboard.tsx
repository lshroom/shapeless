import React, { useState } from 'react';
import { Share2, Lock, Play, Plus, GitFork, FlaskConical, Ship, Waves } from 'lucide-react';
import { SESSION_STORAGE_FORK_KEY, SECTION_IDS } from '../constants';
import { Song, Split } from '../types';
import SongLineageTree from './SongLineageTree';
import SongDetailPanel from './SongDetailPanel'; // Import the new component

interface ShapelessDashboardProps {
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

const ShapelessDashboard: React.FC<ShapelessDashboardProps> = ({ songs, setSongs }) => {
  const [showPlantSeedModal, setShowPlantSeedModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null); // New state for selected song

  // Helper to calculate market value
  const calculateMarketValue = (song: Song, allSongs: Song[]): string => {
    let value = 0.01; // Base value

    // Depth bonus: +0.005 ETH per level
    let current = song;
    let depth = 0;
    while (current.parentId) {
      depth++;
      current = allSongs.find(s => s.id === current.parentId) || current; // Find parent, or stop if not found
      if (current === song && depth > 0) break; // Break if cyclic (shouldn't happen with proper parentId)
    }
    value += depth * 0.005;

    // Fork count bonus: +0.01 ETH per child fork
    const childForks = allSongs.filter(s => s.parentId === song.id).length;
    value += childForks * 0.01;

    // Investor bonus: +0.001 ETH per investor
    value += song.investors * 0.001;

    return `${value.toFixed(2)} ETH`;
  };

  // Filter songs for each section
  const nurserySongs = songs.filter(song => song.status === 'SEED');
  const shipyardSongs = songs.filter(song => song.status === 'PRODUCTION' || song.status === 'LOCKED');

  const plantNewSeed = (seedType: 'Raw Idea' | 'Nearly Finished Track') => {
    const newId = (parseInt(songs[songs.length - 1]?.id || '0') + 1).toString(); // Simple ID generation, handle empty songs
    const currentUserId = 'User' + Math.floor(Math.random() * 1000); // Placeholder for actual user ID

    const newSong: Song = {
      id: newId,
      title: seedType === 'Raw Idea' ? `New Raw Idea #${newId}` : `New Track #${newId}`,
      status: seedType === 'Raw Idea' ? 'SEED' : 'PRODUCTION',
      type: 'ORIGINAL',
      creator: currentUserId,
      investors: 0,
      // Fix: Add a dummy 'price' property to satisfy the 'Song' interface for the temporary object
      // passed to calculateMarketValue, as the function itself does not use the 'price' field of the input.
      price: calculateMarketValue({
        id: newId,
        title: '',
        status: 'SEED',
        type: 'ORIGINAL',
        creator: currentUserId,
        investors: 0,
        audioUrl: '',
        splits: [],
        price: '0 ETH', // Dummy value
      }, songs),
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-random.mp3', // Placeholder audio
      splits: [{ participant: currentUserId, share: 1, type: 'creator' }],
    };
    setSongs(prevSongs => [...prevSongs, newSong]);
    setShowPlantSeedModal(false);
  };

  const handleForkTrack = (parentSong: Song) => {
    const currentUserId = 'User' + Math.floor(Math.random() * 1000); // Placeholder for actual user ID
    const newId = (parseInt(songs[songs.length - 1]?.id || '0') + 1).toString(); // Handle empty songs

    // 1. Generate Digital Footprint (a simple hash for frontend demo) - not used beyond conceptual understanding for now

    // 2. Inherit Splits and add new forker/lineage royalty
    const newSplits: Split[] = [];
    
    // Find the original creator of the parent track (can be the first creator or forker)
    // This logic might need to be more robust for deeply nested lineage if multiple original creators exist
    // For simplicity, we assume the direct parent's 'creator' or 'forker' is the beneficiary.
    const parentCreatorSplit = parentSong.splits.find(s => s.type === 'creator' || s.type === 'forker');
    const parentCreator = parentCreatorSplit ? parentCreatorSplit.participant : parentSong.creator;
    
    // Lineage royalty for the direct parent's primary creator/forker (10%)
    newSplits.push({ participant: parentCreator, share: 0.10, type: 'lineage_royalty' });
    // Main share for the current forker (90%)
    newSplits.push({ participant: currentUserId, share: 0.90, type: 'forker' });

    // 3. Create a New Branch track (initially with placeholder audio, will be updated by KitchenPage)
    const newForkedTrack: Song = {
      id: newId,
      title: `${parentSong.title} - Fork by ${currentUserId}`,
      status: 'PRODUCTION', // Newly forked tracks are in production
      type: 'BRANCH',
      creator: currentUserId,
      parentId: parentSong.id,
      investors: 0,
      // Fix: Add a dummy 'price' property to satisfy the 'Song' interface for the temporary object
      // passed to calculateMarketValue, as the function itself does not use the 'price' field of the input.
      price: calculateMarketValue({
        id: newId,
        title: '',
        status: 'PRODUCTION',
        type: 'BRANCH',
        creator: currentUserId,
        parentId: parentSong.id,
        investors: 0,
        audioUrl: '',
        splits: [],
        price: '0 ETH', // Dummy value
      }, songs),
      audioUrl: '', // Placeholder, will be filled by recorded audio
      splits: newSplits,
    };

    setSongs(prevSongs => [...prevSongs, newForkedTrack]);
    setSelectedSong(null); // Close the detail panel

    // 4. Store information for Kitchen to pick up and open the Sonic Cauldron
    try {
      sessionStorage.setItem(SESSION_STORAGE_FORK_KEY, JSON.stringify({
        isForking: true,
        parentTrackId: parentSong.id,
        parentTrackTitle: parentSong.title,
        backingTrackUrl: parentSong.audioUrl,
        newForkId: newForkedTrack.id, // Pass the ID of the newly created fork
        newForkTitle: newForkedTrack.title,
      }));
      window.location.hash = SECTION_IDS.KITCHEN; // Navigate to the Kitchen
    } catch (error) {
      console.error("Failed to save fork data to session storage:", error);
      alert("Could not initiate forking session. Please try again.");
    }
  };

  const SongCard: React.FC<{ song: Song }> = ({ song }) => (
    <div className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            song.status === 'LOCKED' ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'
          }`}>
            {song.status}
          </span>
          {song.type === 'BRANCH' && (
            <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
              <GitFork size={14} /> FORKED FROM #{song.parentId}
            </div>
          )}
           {song.type === 'ORIGINAL' && (
            <div className="flex items-center gap-1 text-green-400 text-xs font-mono">
              🌱 SEED TRACK
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{song.title}</h3>
        <p className="text-slate-400 text-sm mb-6">Created by: {song.creator}</p>

        <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl mb-6">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Market Price</p>
            <p className="font-mono font-bold text-green-400">{calculateMarketValue(song, songs)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Shareholders</p>
            <p className="font-mono font-bold">{song.investors}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {song.audioUrl ? (
            <a href={song.audioUrl} target="_blank" rel="noopener noreferrer" 
               className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 py-3 rounded-xl font-bold transition-colors">
              <Play size={18} /> LISTEN
            </a>
          ) : (
            <span className="flex-1 flex items-center justify-center gap-2 bg-slate-700/50 text-slate-400 py-3 rounded-xl font-bold">
              <Waves size={18} /> NO AUDIO YET
            </span>
          )}
          
          {song.status !== 'LOCKED' ? (
            <button 
              className="flex-1 flex items-center justify-center gap-2 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 py-3 rounded-xl font-bold transition-colors border border-cyan-500/30"
              onClick={() => handleForkTrack(song)} // Attach fork handler
            >
              <GitFork size={18} /> FORK
            </button>
          ) : (
            <button disabled className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-slate-600 py-3 rounded-xl font-bold cursor-not-allowed">
              <Lock size={18} /> LOCKED
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans relative"> {/* Added relative for panel positioning */}
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-cyan-400">SHAPELESS FACTORY</h1>
          <p className="text-slate-400">Captain's Command Center | 2026 Edition</p>
        </div>
        <button 
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105"
          onClick={() => setShowPlantSeedModal(true)}
        >
          <Plus size={20} /> PLANT NEW SEED
        </button>
      </header>

      {/* Stats Quick Look */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <p className="text-slate-400 text-sm">Active Fleet (Songs)</p>
          <p className="text-3xl font-bold">{songs.length}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <p className="text-slate-400 text-sm">DAO Treasury</p>
          <p className="text-3xl font-bold text-green-400">4.28 ETH</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <p className="text-slate-400 text-sm">Total Value Locked</p>
          <p className="text-3xl font-bold text-purple-400">7.15 ETH</p>
        </div>
      </div>

      {/* The Nursery Section */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FlaskConical className="text-yellow-400" /> The Nursery <span className="text-slate-500 text-base font-normal"> (Raw Ideas & Samples)</span>
      </h2>
      
      {nurserySongs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {nurserySongs.map((song) => <SongCard key={song.id} song={song} />)}
        </div>
      ) : (
        <p className="text-slate-500 mb-16 text-center italic">The Nursery is empty. Be the first to plant a raw idea!</p>
      )}

      {/* The Shipyard Section */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Ship className="text-blue-400" /> The Shipyard <span className="text-slate-500 text-base font-normal"> (Full Tracks & Productions)</span>
      </h2>

      {shipyardSongs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {shipyardSongs.map((song) => <SongCard key={song.id} song={song} />)}
        </div>
      ) : (
        <p className="text-slate-500 mb-16 text-center italic">The Shipyard is quiet. Let's get some tracks into production!</p>
      )}

      {/* Song Lineage Tree */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🌳 Song Lineage Tree <span className="text-slate-500 text-base font-normal"> (Visualizing our collective growth)</span>
      </h2>
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl mb-16">
        <SongLineageTree songs={songs} onNodeClick={setSelectedSong} />
      </div>

      {/* Plant New Seed Modal */}
      {showPlantSeedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full text-center relative">
            <button 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100"
              onClick={() => setShowPlantSeedModal(false)}
            >
              <Plus size={24} className="rotate-45" />
            </button>
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">What are you planting?</h3>
            <p className="text-slate-300 mb-8">Choose the stage of your contribution to the Shapeless Factory.</p>
            <div className="flex flex-col gap-4">
              <button 
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
                onClick={() => plantNewSeed('Raw Idea')}
              >
                <FlaskConical size={20} /> Upload Raw Idea (Nursery)
              </button>
              <button 
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
                onClick={() => plantNewSeed('Nearly Finished Track')}
              >
                <Ship size={20} /> Upload Nearly Finished Track (Shipyard)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Song Detail Panel */}
      <SongDetailPanel 
        song={selectedSong} 
        allSongs={songs} 
        onClose={() => setSelectedSong(null)} 
        onFork={handleForkTrack} 
        calculateMarketValue={calculateMarketValue}
      />
    </div>
  );
};

export default ShapelessDashboard;
'use client';

import React, { useState, useEffect } from 'react';

interface WaveData {
  waveNumber: number;
  totalMembers: number;
  activeMembers: number;
  targetSize: number;
  progressPercentage: number;
  startDate: string;
}

export default function WaveTracker() {
  const [waveData, setWaveData] = useState<WaveData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWaveData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchWaveData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchWaveData = async () => {
    try {
      const response = await fetch('/api/waves/current');
      const data = await response.json();
      if (data.success) {
        setWaveData(data.wave);
      }
    } catch (error) {
      console.error('Failed to fetch wave data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 border border-gray-700 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-32 bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (!waveData) {
    return null;
  }

  const { waveNumber, totalMembers, targetSize, progressPercentage } = waveData;

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 border border-purple-500/30">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-purple-400">Wave {waveNumber}</h2>
        <span className="text-sm text-gray-400">
          {totalMembers} / {targetSize} members
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Growth Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000 relative overflow-hidden"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Wave Visualization */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900/50 rounded p-4 text-center">
          <div className="text-3xl font-bold text-cyber-blue">{totalMembers}</div>
          <div className="text-xs text-gray-400 mt-1">Total Members</div>
        </div>
        <div className="bg-gray-900/50 rounded p-4 text-center">
          <div className="text-3xl font-bold text-neon-purple">
            {targetSize - totalMembers}
          </div>
          <div className="text-xs text-gray-400 mt-1">Needed for Next Wave</div>
        </div>
      </div>

      {/* Invite Info */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/20">
        <h3 className="font-bold text-sm text-purple-300 mb-2">How It Works</h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">→</span>
            Each member invites 2 people
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">→</span>
            Wave grows exponentially: 2, 4, 8, 16, 32...
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">→</span>
            When target is reached, new wave begins
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">→</span>
            Together we build a movement for peace
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      {progressPercentage >= 80 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded border border-green-500/30">
          <div className="flex items-center text-green-400">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">Almost there! Keep sharing the movement!</span>
          </div>
        </div>
      )}
    </div>
  );
}

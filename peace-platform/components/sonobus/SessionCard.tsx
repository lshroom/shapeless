'use client';

import React from 'react';
import { SonobusSession } from './types';

interface SessionCardProps {
  session: SonobusSession;
  isSelected: boolean;
  onJoin: () => void;
}

export default function SessionCard({ session, isSelected, onJoin }: SessionCardProps) {
  const participantPercentage = (session.participants / session.maxParticipants) * 100;

  return (
    <div
      className={`bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 border transition-all cursor-pointer hover:border-purple-500/50 ${
        isSelected ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-gray-700'
      }`}
      onClick={onJoin}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-white mb-1">{session.name}</h3>
          <p className="text-xs text-gray-400">{session.genre}</p>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded ${
            session.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
          }`}
        >
          {session.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Participants</span>
          <span>
            {session.participants}/{session.maxParticipants}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
            style={{ width: `${participantPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {session.host}:{session.port}
        </span>
        {session.password && (
          <span className="text-xs text-yellow-400 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Protected
          </span>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onJoin();
        }}
        className="w-full mt-3 btn-primary"
      >
        View Connection Details
      </button>
    </div>
  );
}

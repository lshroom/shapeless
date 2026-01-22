'use client';

import React, { useState, useEffect } from 'react';
import { SonobusSession, ConnectionDetails } from './types';
import SessionCard from './SessionCard';
import ConnectionInfo from './ConnectionInfo';

interface SonobusManagerProps {
  defaultSessions?: SonobusSession[];
}

export default function SonobusManager({ defaultSessions = [] }: SonobusManagerProps) {
  const [sessions, setSessions] = useState<SonobusSession[]>(defaultSessions);
  const [selectedSession, setSelectedSession] = useState<SonobusSession | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [newSessionPassword, setNewSessionPassword] = useState('');

  // Mock sessions for demo
  useEffect(() => {
    if (defaultSessions.length === 0) {
      setSessions([
        {
          id: 'shapeless-main',
          name: 'Shapeless Main Jam',
          host: 'aoo.vdo.ninja',
          port: 10998,
          genre: 'Peace Music',
          participants: 3,
          maxParticipants: 8,
          isActive: true,
          createdAt: new Date(),
        },
        {
          id: 'peace-collab',
          name: 'Peace Collaboration',
          host: 'aoo.vdo.ninja',
          port: 10998,
          genre: 'World Music',
          participants: 2,
          maxParticipants: 6,
          isActive: true,
          createdAt: new Date(),
        },
      ]);
    }
  }, [defaultSessions]);

  const handleJoinSession = (session: SonobusSession) => {
    setSelectedSession(session);
  };

  const handleCreateSession = () => {
    if (!newSessionName.trim()) return;

    const newSession: SonobusSession = {
      id: `session-${Date.now()}`,
      name: newSessionName,
      host: 'aoo.vdo.ninja',
      port: 10998,
      password: newSessionPassword || undefined,
      genre: 'Peace Music',
      participants: 1,
      maxParticipants: 8,
      isActive: true,
      createdAt: new Date(),
    };

    setSessions([...sessions, newSession]);
    setNewSessionName('');
    setNewSessionPassword('');
    setShowCreateForm(false);
    setSelectedSession(newSession);
  };

  const connectionDetails: ConnectionDetails | null = selectedSession
    ? {
        serverAddress: `${selectedSession.host}:${selectedSession.port}`,
        groupName: selectedSession.id,
        password: selectedSession.password,
        audioQuality: 'high',
        bufferTime: 10,
      }
    : null;

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-purple-950/30 to-gray-900 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyber-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            SonoBus Sessions
          </h1>
          <p className="text-gray-400">Join or create collaborative audio sessions for real-time music creation</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sessions List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-400">Active Sessions</h2>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="btn-primary"
              >
                {showCreateForm ? 'Cancel' : '+ Create Session'}
              </button>
            </div>

            {/* Create Session Form */}
            {showCreateForm && (
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 mb-4 border border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-3">Create New Session</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Session Name</label>
                    <input
                      type="text"
                      value={newSessionName}
                      onChange={(e) => setNewSessionName(e.target.value)}
                      placeholder="My Awesome Jam Session"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Password (Optional)</label>
                    <input
                      type="password"
                      value={newSessionPassword}
                      onChange={(e) => setNewSessionPassword(e.target.value)}
                      placeholder="Leave empty for public session"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                    />
                  </div>
                  <button
                    onClick={handleCreateSession}
                    className="w-full btn-primary"
                  >
                    Create Session
                  </button>
                </div>
              </div>
            )}

            {/* Sessions Grid */}
            <div className="space-y-3">
              {sessions.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No active sessions. Create one to get started!
                </div>
              ) : (
                sessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    isSelected={selectedSession?.id === session.id}
                    onJoin={() => handleJoinSession(session)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Connection Details */}
          <div>
            <h2 className="text-xl font-bold text-purple-400 mb-4">Connection Details</h2>
            {connectionDetails ? (
              <ConnectionInfo
                details={connectionDetails}
                sessionName={selectedSession?.name || ''}
              />
            ) : (
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-lg p-8 border border-gray-700 text-center">
                <div className="text-6xl mb-4">🎵</div>
                <p className="text-gray-400">Select a session to view connection details</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gray-800/30 backdrop-blur-lg rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-purple-400 mb-3">How to Connect</h3>
          <ol className="space-y-2 text-gray-400">
            <li className="flex items-start">
              <span className="font-bold text-cyber-blue mr-2">1.</span>
              <span>Download SonoBus from <a href="https://sonobus.net" target="_blank" rel="noopener noreferrer" className="text-cyber-blue hover:underline">sonobus.net</a></span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-cyber-blue mr-2">2.</span>
              <span>Install and open the SonoBus application on your computer</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-cyber-blue mr-2">3.</span>
              <span>Select a session above to view connection details</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-cyber-blue mr-2">4.</span>
              <span>Click "Connect to Server" in SonoBus and enter the server address and group name</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-cyber-blue mr-2">5.</span>
              <span>Configure your audio settings (input/output devices, quality)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-cyber-blue mr-2">6.</span>
              <span>Start making music together in real-time!</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

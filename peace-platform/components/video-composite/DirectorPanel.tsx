'use client';

import React, { useState } from 'react';
import { VideoLayer, Participant } from './types';
import LayerCard from './LayerCard';

interface DirectorPanelProps {
  isVisible: boolean;
  layers: VideoLayer[];
  participants: Participant[];
  backgroundColor: string;
  roomName: string;
  onAddLayer: (streamId: string) => void;
  onOpacityChange: (id: number, value: number) => void;
  onBlendModeChange: (id: number, mode: any) => void;
  onFilterChange: (id: number, filter: string, value: number) => void;
  onVisibilityToggle: (id: number) => void;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
  onRemove: (id: number) => void;
  onReload: (id: number) => void;
  onReloadAll: () => void;
  onReset: () => void;
  onFullscreen: () => void;
  onSonobus: () => void;
  onBackgroundChange: (color: string) => void;
}

export default function DirectorPanel({
  isVisible,
  layers,
  participants,
  backgroundColor,
  roomName,
  onAddLayer,
  onOpacityChange,
  onBlendModeChange,
  onFilterChange,
  onVisibilityToggle,
  onMoveUp,
  onMoveDown,
  onRemove,
  onReload,
  onReloadAll,
  onReset,
  onFullscreen,
  onSonobus,
  onBackgroundChange,
}: DirectorPanelProps) {
  const [customStreamId, setCustomStreamId] = useState('');
  const [sections, setSections] = useState({
    quickActions: true,
    participants: true,
    layers: true,
    background: true,
    shortcuts: true,
  });

  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddCustom = () => {
    if (customStreamId.trim()) {
      onAddLayer(customStreamId.trim());
      setCustomStreamId('');
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-gray-900/95 backdrop-blur-lg border-l-2 border-purple-500 p-5 overflow-y-auto transition-transform duration-300 z-50 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ fontFamily: 'var(--font-geist-sans)' }}
    >
      <h2 className="text-lg font-bold mb-5 pb-2 border-b border-gray-700 uppercase tracking-wider text-purple-400">
        Director Panel
      </h2>

      {/* Quick Actions */}
      <Section title="Quick Actions" isOpen={sections.quickActions} onToggle={() => toggleSection('quickActions')}>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button onClick={onFullscreen} className="btn-primary">
            Fullscreen
          </button>
          <button onClick={onSonobus} className="btn-secondary">
            SonoBus
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={onReloadAll} className="btn-secondary">
            Reload All
          </button>
          <button onClick={onReset} className="btn-danger">
            Reset
          </button>
        </div>
      </Section>

      {/* Room Participants */}
      <Section title={`Room: ${roomName}`} isOpen={sections.participants} onToggle={() => toggleSection('participants')}>
        <div className="max-h-40 overflow-y-auto bg-gray-950 rounded p-2 mb-3">
          {participants.map((p) => (
            <div key={p.id} className="flex justify-between items-center p-2 mb-1 bg-gray-800 rounded text-sm">
              <span>{p.name}</span>
              <button onClick={() => onAddLayer(p.id)} className="btn-sm btn-primary">
                Add
              </button>
            </div>
          ))}
        </div>
        <label className="block text-xs text-gray-400 mb-1">Custom Stream ID:</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customStreamId}
            onChange={(e) => setCustomStreamId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCustom()}
            placeholder="stream-id"
            className="flex-1 px-2 py-1 text-sm bg-gray-800 border border-gray-700 rounded text-white"
          />
          <button onClick={handleAddCustom} className="btn-secondary">
            Add
          </button>
        </div>
      </Section>

      {/* Active Layers */}
      <Section title="Active Layers" isOpen={sections.layers} onToggle={() => toggleSection('layers')}>
        {layers.length === 0 ? (
          <p className="text-gray-500 text-xs text-center">No layers added yet</p>
        ) : (
          [...layers].reverse().map((layer) => (
            <LayerCard
              key={layer.id}
              layer={layer}
              onOpacityChange={onOpacityChange}
              onBlendModeChange={onBlendModeChange}
              onFilterChange={onFilterChange}
              onVisibilityToggle={onVisibilityToggle}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              onRemove={onRemove}
              onReload={onReload}
            />
          ))
        )}
      </Section>

      {/* Background */}
      <Section title="Background" isOpen={sections.background} onToggle={() => toggleSection('background')}>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => onBackgroundChange(e.target.value)}
            className="w-10 h-7 rounded cursor-pointer"
          />
          <span className="text-sm">{backgroundColor}</span>
        </div>
      </Section>

      {/* Keyboard Shortcuts */}
      <Section title="Keyboard Shortcuts" isOpen={sections.shortcuts} onToggle={() => toggleSection('shortcuts')}>
        <div className="text-xs space-y-2 text-gray-400 bg-gray-950 rounded p-3">
          <div className="flex justify-between">
            <span>Toggle Panel</span>
            <kbd className="bg-gray-800 px-2 py-1 rounded border border-gray-700">Ctrl+D</kbd>
          </div>
          <div className="flex justify-between">
            <span>Fullscreen</span>
            <kbd className="bg-gray-800 px-2 py-1 rounded border border-gray-700">F</kbd>
          </div>
          <div className="flex justify-between">
            <span>Reset All</span>
            <kbd className="bg-gray-800 px-2 py-1 rounded border border-gray-700">R</kbd>
          </div>
        </div>
      </Section>

      <div className="absolute bottom-5 left-5 right-5 text-center text-xs text-gray-600">
        Press <kbd className="bg-gray-800 px-2 py-1 rounded border border-gray-700">Ctrl+D</kbd> to toggle
      </div>
    </div>
  );
}

function Section({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center cursor-pointer mb-3 select-none" onClick={onToggle}>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
        <span className={`text-xs text-gray-600 transition-transform ${isOpen ? '' : '-rotate-90'}`}>▼</span>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

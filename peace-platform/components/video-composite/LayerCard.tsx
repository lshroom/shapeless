'use client';

import React from 'react';
import { VideoLayer, BLEND_MODES, BlendMode } from './types';

interface LayerCardProps {
  layer: VideoLayer;
  onOpacityChange: (id: number, value: number) => void;
  onBlendModeChange: (id: number, mode: BlendMode) => void;
  onFilterChange: (id: number, filter: string, value: number) => void;
  onVisibilityToggle: (id: number) => void;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
  onRemove: (id: number) => void;
  onReload: (id: number) => void;
}

export default function LayerCard({
  layer,
  onOpacityChange,
  onBlendModeChange,
  onFilterChange,
  onVisibilityToggle,
  onMoveUp,
  onMoveDown,
  onRemove,
  onReload,
}: LayerCardProps) {
  return (
    <div className={`bg-gray-800 rounded-md p-3 mb-3 border ${layer.visible ? 'border-purple-500' : 'border-gray-700'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-sm text-purple-400">{layer.streamId}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onVisibilityToggle(layer.id)}
            className={`px-2 py-1 text-xs rounded ${
              layer.visible ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'
            }`}
          >
            {layer.visible ? 'ON' : 'OFF'}
          </button>
          <button onClick={() => onMoveUp(layer.id)} className="px-2 py-1 text-xs bg-gray-700 rounded hover:bg-gray-600">
            ▲
          </button>
          <button onClick={() => onMoveDown(layer.id)} className="px-2 py-1 text-xs bg-gray-700 rounded hover:bg-gray-600">
            ▼
          </button>
          <button onClick={() => onRemove(layer.id)} className="px-2 py-1 text-xs bg-red-600 rounded hover:bg-red-700">
            X
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-3">
        {/* Blend Mode */}
        <div className="col-span-2">
          <label className="block text-xs text-gray-400 mb-1">Blend Mode</label>
          <select
            value={layer.blendMode}
            onChange={(e) => onBlendModeChange(layer.id, e.target.value as BlendMode)}
            className="w-full px-2 py-1 text-xs bg-gray-900 border border-gray-700 rounded text-white"
          >
            {BLEND_MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        {/* Opacity */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Opacity: {layer.opacity}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={layer.opacity}
            onChange={(e) => onOpacityChange(layer.id, parseInt(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        {/* Brightness */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Brightness: {layer.filters.brightness}%</label>
          <input
            type="range"
            min="0"
            max="200"
            value={layer.filters.brightness}
            onChange={(e) => onFilterChange(layer.id, 'brightness', parseInt(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        {/* Contrast */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Contrast: {layer.filters.contrast}%</label>
          <input
            type="range"
            min="0"
            max="200"
            value={layer.filters.contrast}
            onChange={(e) => onFilterChange(layer.id, 'contrast', parseInt(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        {/* Saturation */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Saturation: {layer.filters.saturation}%</label>
          <input
            type="range"
            min="0"
            max="200"
            value={layer.filters.saturation}
            onChange={(e) => onFilterChange(layer.id, 'saturation', parseInt(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        {/* Reload Button */}
        <div className="col-span-2">
          <button
            onClick={() => onReload(layer.id)}
            className="w-full px-3 py-1 text-xs bg-gray-700 rounded hover:bg-gray-600"
          >
            Reload Feed
          </button>
        </div>
      </div>
    </div>
  );
}

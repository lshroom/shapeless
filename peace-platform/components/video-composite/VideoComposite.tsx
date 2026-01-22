'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import DirectorPanel from './DirectorPanel';
import { VideoLayer, Participant, BlendMode } from './types';

interface VideoCompositeProps {
  roomName?: string;
  defaultParticipants?: Participant[];
  sonobusUrl?: string;
  autoInit?: boolean;
}

export default function VideoComposite({
  roomName = 'shapeless',
  defaultParticipants = [
    { id: 'shapeless-kitchen', name: 'shapeless-kitchen' },
    { id: 'shapeless-guest', name: 'shapeless-guest' },
  ],
  sonobusUrl = 'sonobus://join/shapeless',
  autoInit = false,
}: VideoCompositeProps) {
  const [layers, setLayers] = useState<VideoLayer[]>([]);
  const [layerIdCounter, setLayerIdCounter] = useState(0);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(autoInit);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'SELECT') return;

      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        setIsPanelVisible((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        handleFullscreen();
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addLayer = useCallback(
    (streamId: string, blendMode: BlendMode = 'screen') => {
      const id = layerIdCounter;
      const zIndex = layers.length + 1;

      const newLayer: VideoLayer = {
        id,
        streamId,
        opacity: 100,
        blendMode: zIndex === 1 ? 'normal' : blendMode,
        visible: true,
        filters: { brightness: 100, contrast: 100, saturation: 100 },
        zIndex,
      };

      setLayers((prev) => [...prev, newLayer]);
      setLayerIdCounter((prev) => prev + 1);
    },
    [layerIdCounter, layers.length]
  );

  const removeLayer = useCallback((id: number) => {
    setLayers((prev) => {
      const filtered = prev.filter((l) => l.id !== id);
      return filtered.map((l, index) => ({ ...l, zIndex: index + 1 }));
    });
  }, []);

  const moveLayerUp = useCallback((id: number) => {
    setLayers((prev) => {
      const index = prev.findIndex((l) => l.id === id);
      if (index < prev.length - 1) {
        const newLayers = [...prev];
        [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
        return newLayers.map((l, i) => ({ ...l, zIndex: i + 1 }));
      }
      return prev;
    });
  }, []);

  const moveLayerDown = useCallback((id: number) => {
    setLayers((prev) => {
      const index = prev.findIndex((l) => l.id === id);
      if (index > 0) {
        const newLayers = [...prev];
        [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
        return newLayers.map((l, i) => ({ ...l, zIndex: i + 1 }));
      }
      return prev;
    });
  }, []);

  const updateLayerOpacity = useCallback((id: number, value: number) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, opacity: value } : l)));
  }, []);

  const updateLayerBlendMode = useCallback((id: number, mode: BlendMode) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, blendMode: mode } : l)));
  }, []);

  const updateLayerFilter = useCallback((id: number, filter: string, value: number) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, filters: { ...l.filters, [filter]: value } } : l))
    );
  }, []);

  const toggleLayerVisibility = useCallback((id: number) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)));
  }, []);

  const reloadLayer = useCallback((id: number) => {
    // Trigger iframe reload by updating a key
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l } : l)));
  }, []);

  const reloadAllLayers = useCallback(() => {
    setLayers((prev) => [...prev]);
  }, []);

  const handleReset = useCallback(() => {
    setLayers([]);
    setLayerIdCounter(0);
    setBackgroundColor('#000000');
    setIsInitialized(false);
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleSonobus = useCallback(() => {
    window.open(sonobusUrl, '_blank');
  }, [sonobusUrl]);

  const handleInitialize = () => {
    // Add default layers
    addLayer('shapeless-kitchen', 'normal');
    addLayer('shapeless-guest', 'screen');

    // Open SonoBus
    window.open(sonobusUrl, '_blank');

    setIsInitialized(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Video Layers */}
      {layers.map((layer) => (
        <iframe
          key={`${layer.id}-${layer.streamId}`}
          className="absolute top-0 left-0 w-full h-full border-0 transition-opacity duration-300"
          style={{
            zIndex: layer.zIndex,
            opacity: layer.opacity / 100,
            mixBlendMode: layer.blendMode,
            visibility: layer.visible ? 'visible' : 'hidden',
            filter: `brightness(${layer.filters.brightness}%) contrast(${layer.filters.contrast}%) saturate(${layer.filters.saturation}%)`,
          }}
          src={`https://vdo.ninja/?view=${layer.streamId}`}
          allow="camera;microphone;autoplay;fullscreen"
          allowFullScreen
        />
      ))}

      {/* Initialize Overlay */}
      {!isInitialized && (
        <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/85">
          <button
            onClick={handleInitialize}
            className="px-12 py-6 text-2xl font-bold uppercase tracking-widest text-white bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-lg shadow-purple-500/50 hover:scale-105 hover:shadow-purple-500/70 active:scale-95 transition-all"
          >
            Initialize
          </button>
        </div>
      )}

      {/* Director Panel */}
      <DirectorPanel
        isVisible={isPanelVisible}
        layers={layers}
        participants={defaultParticipants}
        backgroundColor={backgroundColor}
        roomName={roomName}
        onAddLayer={addLayer}
        onOpacityChange={updateLayerOpacity}
        onBlendModeChange={updateLayerBlendMode}
        onFilterChange={updateLayerFilter}
        onVisibilityToggle={toggleLayerVisibility}
        onMoveUp={moveLayerUp}
        onMoveDown={moveLayerDown}
        onRemove={removeLayer}
        onReload={reloadLayer}
        onReloadAll={reloadAllLayers}
        onReset={handleReset}
        onFullscreen={handleFullscreen}
        onSonobus={handleSonobus}
        onBackgroundChange={setBackgroundColor}
      />
    </div>
  );
}

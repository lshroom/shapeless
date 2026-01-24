export interface MusicLayer {
  id: string;
  iframe: HTMLIFrameElement;
  visible: boolean;
  muted: boolean;
  opacity: number;
  blend: string;
  isRecording: boolean;
  layerRecorder: MediaRecorder | null;
  recordedChunks: Blob[];
}

export interface SectionProps {
  id: string;
}

// Define interfaces for better type safety and readability for the Shapeless Dashboard
export interface Split {
  participant: string;
  share: number; // Percentage, e.g., 0.10 for 10%
  type: 'creator' | 'forker' | 'lineage_royalty';
}

export interface Song {
  id: string;
  title: string;
  status: 'SEED' | 'PRODUCTION' | 'LOCKED';
  type: 'ORIGINAL' | 'BRANCH';
  creator: string;
  parentId?: string; // Optional for original tracks
  investors: number;
  price: string;
  audioUrl: string;
  splits: Split[]; // Royalty splits
}

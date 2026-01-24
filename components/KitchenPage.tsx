import React, { useState, useEffect, useRef } from 'react';
import MusicStudioIframe from './MusicStudioIframe';
import { KITCHEN_TITLE, KITCHEN_DESCRIPTION, SESSION_STORAGE_FORK_KEY, SECTION_IDS } from '../constants';
import { Song } from '../types'; // Import Song interface
import { Play, Pause, Square, Mic, Waves } from 'lucide-react'; // Import Lucide icons, changed Waveform to Waves

// Define interface for ForkData
interface ForkData {
  isForking: boolean;
  parentTrackId: string;
  parentTrackTitle: string;
  backingTrackUrl: string;
  newForkId: string;
  newForkTitle: string;
}

interface KitchenPageProps {
  songs: Song[]; // Not directly used in this component, but required by App.tsx to pass
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>; // Not directly used, but passed from App
  onRecordingComplete: (newForkId: string, recordedAudioUrl: string) => void;
}

const KitchenPage: React.FC<KitchenPageProps> = ({ onRecordingComplete }) => {
  const [showStatusMessage, setShowStatusMessage] = useState(false);
  const [forkData, setForkData] = useState<ForkData | null>(null);

  // Recorder states
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [recordedAudioURL, setRecordedAudioURL] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for fork data in session storage
    const storedForkData = sessionStorage.getItem(SESSION_STORAGE_FORK_KEY);
    if (storedForkData) {
      try {
        const parsedData: ForkData = JSON.parse(storedForkData);
        if (parsedData.isForking) {
          setForkData(parsedData);
          // Do NOT clear session storage immediately. Clear it after the recording is saved.
        }
      } catch (error) {
        console.error("Failed to parse fork data from session storage:", error);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (recordedAudioURL) {
        URL.revokeObjectURL(recordedAudioURL); // Clean up object URL
      }
    };
  }, [recordedAudioURL]);

  const launchSessions = () => {
    // These links will open in new tabs/windows for the user to join/send their stream
    const uniqueId = 'user_' + Math.random().toString(36).substr(2, 9);
    window.open(`https://vdo.ninja/?push=${uniqueId}&room=shapeless&codec=vp9&stereo=1`, '_blank');
    setTimeout(() => {
      window.open('sonobus://join/shapeless', '_blank');
    }, 500);

    setShowStatusMessage(true);

    // Hide status message after a few seconds
    setTimeout(() => {
      setShowStatusMessage(false);
    }, 5000);
  };

  const startRecording = async () => {
    try {
      setRecordedAudioBlob(null); // Clear previous recording
      setRecordedAudioURL(null); // Clear previous URL

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioBlob(audioBlob);
        setRecordedAudioURL(audioUrl);
        setIsRecording(false);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        stream.getTracks().forEach(track => track.stop()); // Stop microphone stream
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);

    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone. Please ensure permissions are granted.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSaveRecording = () => {
    if (forkData && recordedAudioURL && recordedAudioBlob) {
      // Simulate Vercel Blob upload
      console.log("Simulating Vercel Blob upload for:", recordedAudioBlob);
      console.log("Recorded Audio URL (local):", recordedAudioURL);
      
      // In a real application, you would upload `recordedAudioBlob` to Vercel Blob here
      // and get a persistent URL from the server. For this demo, we use the local URL.
      onRecordingComplete(forkData.newForkId, recordedAudioURL);

      // Clear session storage once recording is successfully "saved" and processed
      sessionStorage.removeItem(SESSION_STORAGE_FORK_KEY);
    } else {
      alert("No recording to save or forking data is missing.");
    }
  };


  return (
    <div className="cauldron-container active-state" id="cauldronContainer">
      <div className="main-content">
        <div className="logo">⚗️</div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b69eff] to-[#00ffaa] mb-6 text-center neon-text-light">
          {KITCHEN_TITLE}
        </h2>

        {forkData ? (
          <div className="mb-8 p-6 rounded-xl border border-cyan-500 bg-cyan-900/20 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4">
              FORKING SESSION: <span className="text-white">"{forkData.parentTrackTitle}"</span>
            </h3>
            <p className="text-lg text-slate-300 mb-4">
              You are creating a new branch (ID: <span className="font-mono text-green-400">{forkData.newForkId}</span>).
            </p>
            <p className="text-slate-300 mb-4">
              Use the following track as a backing reference in your headphones:
            </p>
            {forkData.backingTrackUrl ? (
              <div className="flex flex-col items-center gap-4">
                <audio controls src={forkData.backingTrackUrl} className="w-full max-w-sm"></audio>
                <p className="text-sm text-slate-400">
                  (Make sure to play this in your headphones to avoid audio feedback with VDO.ninja/Sonobus.)
                </p>
              </div>
            ) : (
              <p className="text-red-400">No backing track URL provided for the parent song.</p>
            )}
            
            {/* Recording Interface */}
            <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
              <h4 className="text-xl font-bold text-yellow-400 mb-4 flex items-center justify-center gap-2">
                <Mic size={24} /> Record Your New Layer
              </h4>
              <p className="text-slate-400 text-sm mb-4">
                Click 'Start Recording' to capture your audio. Your recording will become the new audio for the forked track.
              </p>
              <div className="flex justify-center gap-4 mb-4">
                {!isRecording ? (
                  <button
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
                    onClick={startRecording}
                  >
                    <Play size={20} /> Start Recording
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 animate-pulse"
                    onClick={stopRecording}
                  >
                    <Square size={20} /> Stop Recording
                  </button>
                )}
              </div>
              {isRecording && (
                <p className="text-red-400 text-lg font-mono mb-4">Recording: {formatTime(recordingTime)}</p>
              )}

              {recordedAudioURL && !isRecording && (
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-cyan-400 mb-2">Your Recorded Layer:</h4>
                  <audio controls src={recordedAudioURL} className="w-full max-w-sm mx-auto"></audio>
                  <button
                    className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 mt-4 mx-auto"
                    onClick={handleSaveRecording}
                  >
                    Save Recording & Go to Factory
                  </button>
                </div>
              )}
            </div>

            <p className="text-slate-300 mt-6">
              When ready, launch the VDO.ninja sessions below to integrate your new layer live!
            </p>
          </div>
        ) : (
          <div
            className="instructions text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed prose prose-invert"
            dangerouslySetInnerHTML={{ __html: KITCHEN_DESCRIPTION }}
          />
        )}


        <button
          className="neon-button pulsing" // Always pulsing, not activated
          id="cookingBtn"
          onClick={launchSessions}
        >
          <span>Launch VDO.ninja Sessions</span>
        </button>

        <div className={`status-message ${showStatusMessage ? 'show' : ''}`} id="statusMsg">
          ✓ Opening Ghost Cauldron! Allow camera permissions when prompted.
        </div>
      </div>

      {/* MusicStudioIframe is now always rendered on this page */}
      <div className="mt-8 w-full">
        <MusicStudioIframe />
      </div>
    </div>
  );
};

export default KitchenPage;
import React, { useRef, useEffect } from 'react';
import { COMPOSITE_STUDIO_URL } from '../constants'; // Import the new constant

const MusicStudioIframe: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.src = COMPOSITE_STUDIO_URL; // Load the standalone HTML file
    }
  }, []);

  return (
    <div className="relative w-full min-h-[80vh] bg-black flex items-center justify-center p-4">
      <iframe
        ref={iframeRef}
        title="Shapeless Composite Music Studio"
        className="w-full h-full min-h-[80vh] border-2 border-[#9d81ff] rounded-xl shadow-neon-blue"
        allow="camera;microphone;autoplay;display-capture"
      ></iframe>
    </div>
  );
};

export default MusicStudioIframe;
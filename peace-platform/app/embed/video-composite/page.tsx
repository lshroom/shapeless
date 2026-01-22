'use client';

import { VideoComposite } from '@/components/video-composite';

export default function VideoCompositeEmbed() {
  return (
    <div className="w-screen h-screen bg-black">
      <VideoComposite
        roomName="shapeless"
        defaultParticipants={[
          { id: 'shapeless-kitchen', name: 'Shapeless Kitchen' },
          { id: 'shapeless-guest', name: 'Shapeless Guest' },
        ]}
        sonobusUrl="sonobus://join/shapeless"
      />
    </div>
  );
}

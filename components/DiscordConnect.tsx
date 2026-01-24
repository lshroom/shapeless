import React from 'react';
import Button from './Button';
import { ACTIVISM_DISCORD_DESCRIPTION, DISCORD_INVITE_URL } from '../constants';

const DiscordConnect: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#9d81ff]/50 to-[#8165d4]/50 p-8 rounded-xl shadow-neon-blue border border-[#9d81ff] mt-12">
      <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b69eff] to-[#00ffaa] mb-6 text-center neon-text-light">
        AI-Moderated Discord Groups
      </h3>
      <div
        className="text-lg text-gray-300 mb-8 leading-relaxed prose prose-invert max-w-none text-center"
        dangerouslySetInnerHTML={{ __html: ACTIVISM_DISCORD_DESCRIPTION }}
      />
      <div className="flex justify-center">
        <Button
          onClick={() => window.open(DISCORD_INVITE_URL, '_blank')}
          size="lg"
          variant="secondary"
          className="glow-green-btn"
        >
          Join the Shapeless Discord
          <span className="ml-2 text-xl">🚀</span>
        </Button>
      </div>
    </div>
  );
};

export default DiscordConnect;
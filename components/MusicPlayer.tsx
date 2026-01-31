import React from 'react';
import { PlayIcon, PauseIcon } from './Icons';

interface MusicPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, togglePlay }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className="w-12 h-12 bg-invitation-gold text-white rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-700 transition-colors duration-300 focus:outline-none ring-offset-2 focus:ring-2 ring-invitation-gold"
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 ml-1" />}
      </button>
    </div>
  );
};

export default MusicPlayer;
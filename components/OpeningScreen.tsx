import React from 'react';

interface OpeningScreenProps {
  onOpen: () => void;
}

const OpeningScreen: React.FC<OpeningScreenProps> = ({ onOpen }) => {
  return (
    <div className="fixed inset-0 z-50 bg-invitation-cream flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full border border-invitation-gold p-8 md:p-12 relative shadow-2xl bg-white animate-fade-in-up">
        {/* Decorative corner borders */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-invitation-gold"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-invitation-gold"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-invitation-gold"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-invitation-gold"></div>

        <p className="text-invitation-gold uppercase tracking-[0.2em] text-sm mb-4">You are invited to the wedding of</p>
        
        <h1 className="font-great-vibes text-5xl md:text-7xl text-invitation-dark mb-2">Juun</h1>
        <h1 className="font-great-vibes text-3xl md:text-5xl text-invitation-gold mb-2">&</h1>
        <h1 className="font-great-vibes text-5xl md:text-7xl text-invitation-dark mb-10">Bagas</h1>

        <div className="space-y-6">
          <p className="font-sans text-gray-500 text-sm">TOGETHER WITH THEIR FAMILIES</p>
          <div className="w-16 h-px bg-invitation-gold mx-auto my-6"></div>
          <button 
            onClick={onOpen}
            className="px-8 py-3 bg-invitation-dark text-white font-sans text-xs uppercase tracking-widest hover:bg-invitation-gold transition-colors duration-500 ease-in-out"
          >
            Open Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpeningScreen;
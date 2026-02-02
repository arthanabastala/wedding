import React, { useState, useRef, useEffect } from 'react';
import OpeningScreen from './components/OpeningScreen';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import MusicPlayer from './components/MusicPlayer';
import { MapPinIcon, HeartIcon } from './components/Icons';

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set the event date to Wednesday, August 5, 2026 at 10:00 AM
  const eventDate = "2026-08-05T10:00:00"; 
  const googleMapsUrl = "https://share.google/QkdkCRaqZCVAS2PWo";

  useEffect(() => {
    if (isInvitationOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isInvitationOpen]);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    // Attempt to play music after user interaction (browser policy)
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => console.log("Auto-play prevented:", error));
      }
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Audio Element */}
      {/* UPDATE: Changed src to '/music.mp3' to use local file */}
      <audio 
        ref={audioRef} 
        loop 
        src="/music.mp3" 
      />
      
      {/* Opening Overlay */}
      <div 
        className={`fixed inset-0 z-50 transition-transform duration-[1500ms] ease-in-out transform ${isInvitationOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <OpeningScreen onOpen={handleOpenInvitation} />
      </div>

      {/* Main Content */}
      <main className={`transition-opacity duration-1000 ${isInvitationOpen ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Hero Section */}
        {/* UPDATE: Using local image '/hero-image.jpg' from public folder */}
        <section className="h-screen flex flex-col items-center justify-center bg-[url('/7.png')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center text-white px-4">
            <p className="font-sans uppercase tracking-[0.3em] text-sm md:text-base mb-6 animate-pulse">Save the Date</p>
            <h1 className="font-great-vibes text-6xl md:text-8xl mb-4">Juun & Bagas</h1>
            <p className="font-serif text-2xl italic">are getting married</p>
          </div>
          <div className="absolute bottom-10 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-24 px-6 text-center bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl text-invitation-dark mb-8">The Wedding Celebration</h2>
            <p className="font-sans text-gray-600 leading-relaxed mb-12">
              Kami mengundang Anda untuk turut berbagi kebahagiaan dan dengan hormat mengharapkan kehadiran Anda pada pernikahan Juun dan Bagas. Bersama keluarga kami, kami menantikan sebuah malam yang penuh cinta, tawa, dan perayaan.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="border-r-0 md:border-r border-gray-200 p-4">
                <h3 className="font-great-vibes text-4xl text-invitation-gold mb-2">Kapan?</h3>
                <p className="font-sans text-invitation-dark font-medium">Rabu, 5 Agustus 2026</p>
                <p className="font-sans text-gray-500 text-sm mt-1">Akad Nikah 10:00 AM</p>
                <p className="font-sans text-gray-500 text-sm">Resepsi 13:00 PM</p>
              </div>
              <div className="p-4">
                <h3 className="font-great-vibes text-4xl text-invitation-gold mb-2">Dimana?</h3>
                <p className="font-sans text-invitation-dark font-medium">Happo-en Garden</p>
                <p className="font-sans text-gray-500 text-sm mt-1">1-1-1 Shirokanedai, Minato City</p>
                <p className="font-sans text-gray-500 text-sm">Tokyo 108-8631, Japan</p>
              </div>
            </div>

            <Countdown targetDate={eventDate} />
          </div>
        </section>

        {/* Location Parallax */}
        <section className="py-24 bg-invitation-cream relative">
           <div className="max-w-4xl mx-auto px-6 text-center">
             <div className="bg-white p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col items-center">
                <MapPinIcon className="w-12 h-12 text-invitation-gold mb-6" />
                <h2 className="font-serif text-3xl mb-4">Tempat Acara</h2>
                <p className="font-sans text-gray-600 mb-8 max-w-md">
                  Rayakan hari bahagia kami di Happo-en Garden, taman Jepang yang indah dengan pepohonan rimbun, aliran air yang menenangkan, dan nuansa tradisional yang penuh keanggunan.
                </p>
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-invitation-dark text-invitation-dark hover:bg-invitation-dark hover:text-white transition-colors duration-300 font-sans text-xs uppercase tracking-widest"
                >
                  View on Google Maps
                </a>
             </div>
           </div>
        </section>

        <Gallery />

        <RSVP />

        {/* Footer */}
        <footer className="bg-invitation-dark text-invitation-cream py-16 text-center">
           <HeartIcon className="w-8 h-8 mx-auto mb-6 text-invitation-gold" />
           <p className="font-great-vibes text-3xl mb-4">Juun & Bagas</p>
           <p className="font-sans text-xs uppercase tracking-widest text-gray-400">Can't wait to see you there</p>
           <div className="mt-12 text-[10px] text-gray-600 font-sans">
             Designed with love by The Organizers
           </div>
        </footer>
      </main>
      
      {/* Floating Controls */}
      {isInvitationOpen && (
        <MusicPlayer isPlaying={isPlaying} togglePlay={toggleMusic} />
      )}
    </div>
  );
}

export default App;
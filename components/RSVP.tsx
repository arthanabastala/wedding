import React, { useState } from 'react';

const RSVP: React.FC = () => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---------------------------------------------------------------------------
  // INSTRUCTIONS FOR GOOGLE SHEETS:
  // 1. Create a Google Sheet.
  // 2. Go to Extensions > Apps Script.
  // 3. Paste the script provided in the instructions.
  // 4. Deploy as Web App -> Execute as: "Me" -> Who has access: "Anyone".
  // 5. Paste the 'Web App URL' below inside the quotes.
  // ---------------------------------------------------------------------------
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzeZ2yXJHlN7oRlhrp1tMZbh4Ip0iopn7xQsiaVOAIcDcPi4Qq-el8n2ddlxezaGHyN/exec"; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create form data to send
    const formData = new FormData();
    formData.append('nama', name);
    formData.append('kehadiran', attending === 'yes' ? 'Hadir' : 'Tidak Hadir');
    formData.append('waktu', new Date().toLocaleString());

    try {
      if (!GOOGLE_SCRIPT_URL) {
        console.warn("Google Script URL is empty. Submitting to console only.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form Data:', { name, attending });
        setSubmitted(true);
        return;
      }

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Important: 'no-cors' allows sending to Google Scripts
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Maaf, terjadi kesalahan saat mengirim data. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 bg-invitation-cream">
        <div className="max-w-lg mx-auto px-6 text-center animate-fade-in-up">
          <h2 className="font-serif text-4xl text-invitation-dark mb-4">Terima Kasih!</h2>
          <p className="font-sans text-gray-600">Respon Anda telah tercatat. Kami menantikan kehadiran Anda untuk merayakan bersama.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-invitation-cream">
      <div className="max-w-lg mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-invitation-dark mb-2">Konfirmasi Kehadiran</h2>
          <p className="font-sans text-sm tracking-widest uppercase text-gray-500">Mohon konfirmasi sebelum 1 Juli 2026</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 shadow-sm border-t-4 border-invitation-gold">
          <div>
            <label htmlFor="name" className="block font-sans text-xs uppercase tracking-wider text-gray-500 mb-2">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-invitation-gold transition-colors font-serif text-lg bg-transparent"
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center py-4">
             <label className="flex items-center space-x-3 cursor-pointer group">
               <input 
                  type="radio" 
                  name="attending" 
                  value="yes" 
                  checked={attending === 'yes'}
                  onChange={() => setAttending('yes')}
                  className="sr-only"
                />
               <span className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center group-hover:border-invitation-gold transition-colors ${attending === 'yes' ? 'border-invitation-gold' : ''}`}>
                 {attending === 'yes' && <div className="w-3 h-3 bg-invitation-gold rounded-full" />}
               </span>
               <span className={`font-sans text-sm uppercase tracking-wide transition-colors ${attending === 'yes' ? 'text-invitation-dark' : 'text-gray-500'}`}>Akan Hadir</span>
             </label>

             <label className="flex items-center space-x-3 cursor-pointer group">
               <input 
                  type="radio" 
                  name="attending" 
                  value="no" 
                  checked={attending === 'no'}
                  onChange={() => setAttending('no')}
                  className="sr-only"
                />
               <span className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center group-hover:border-invitation-gold transition-colors ${attending === 'no' ? 'border-invitation-gold' : ''}`}>
                 {attending === 'no' && <div className="w-3 h-3 bg-invitation-gold rounded-full" />}
               </span>
               <span className={`font-sans text-sm uppercase tracking-wide transition-colors ${attending === 'no' ? 'text-invitation-dark' : 'text-gray-500'}`}>Maaf, Tidak Bisa</span>
             </label>
          </div>

          <button
            type="submit"
            disabled={!name || !attending || isSubmitting}
            className="w-full bg-invitation-dark text-white py-4 font-sans text-xs uppercase tracking-[0.2em] hover:bg-invitation-gold disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isSubmitting ? 'MENGIRIM...' : 'KIRIM KONFIRMASI'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RSVP;
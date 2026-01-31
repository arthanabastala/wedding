import React from 'react';

// UPDATE: These paths correspond to files inside your public/ folder
const images = [
  '/1.png', // Replace with your file names
  '/5.png',
  '/3.png',
  '/4.png',
  '/2.png',
  '/6.png',
];

const Gallery: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-0 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-invitation-dark italic mb-2">Momen Kami</h2>
          <div className="w-8 h-px bg-invitation-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <div key={index} className={`overflow-hidden ${index % 3 === 1 ? 'md:row-span-2' : ''}`}>
              <img 
                src={src} 
                alt={`Gallery ${index + 1}`} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
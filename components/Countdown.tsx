import React, { useState, useEffect } from 'react';
import { CountdownTime } from '../types';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft: CountdownTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <span className="text-3xl md:text-5xl font-serif font-light text-invitation-dark">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center py-8">
      <TimeBox value={timeLeft.days} label="Days" />
      <span className="text-2xl font-serif text-gray-400 mb-6">:</span>
      <TimeBox value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-serif text-gray-400 mb-6">:</span>
      <TimeBox value={timeLeft.minutes} label="Minutes" />
      <span className="text-2xl font-serif text-gray-400 mb-6">:</span>
      <TimeBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;
import React, { useEffect, useRef } from 'react';

interface LetterGlitchProps {
  text: string;
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
}

const LetterGlitch: React.FC<LetterGlitchProps> = ({
  text,
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

  useEffect(() => {
    const letters = containerRef.current?.children;
    if (!letters) return;

    const intervals: NodeJS.Timeout[] = [];

    Array.from(letters).forEach((letter, index) => {
      const originalChar = text[index];
      let isGlitching = false;

      const interval = setInterval(() => {
        if (Math.random() < 0.1 && !isGlitching) {
          isGlitching = true;
          let glitchCount = 0;
          const maxGlitches = 3;

          const glitchInterval = setInterval(() => {
            if (glitchCount >= maxGlitches) {
              (letter as HTMLElement).textContent = originalChar;
              clearInterval(glitchInterval);
              isGlitching = false;
              return;
            }

            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            (letter as HTMLElement).textContent = randomChar;
            glitchCount++;
          }, smooth ? 50 : 100);
        }
      }, glitchSpeed);

      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [text, glitchSpeed, smooth]);

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${centerVignette ? 'glitch-vignette-center' : ''} ${outerVignette ? 'glitch-vignette-outer' : ''}`}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-100 ease-in-out"
          style={{ textShadow: '0 0 8px rgba(139, 92, 246, 0.5)' }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default LetterGlitch;
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedLetter = ({ text, className = "" }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const chars = text.split("");
  const totalChars = chars.length;

  return (
    <p ref={containerRef} className={`inline-block ${className}`}>
      {chars.map((char, index) => {
        // Calculate the ideal progress point for this character
        const charProgress = index / totalChars;
        // The character fades in when the overall scroll progress is near charProgress
        const opacity = useTransform(
          scrollYProgress,
          [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
          [0.2, 1]
        );

        return (
          <motion.span 
            key={index} 
            style={{ opacity }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </p>
  );
};

export default AnimatedLetter;

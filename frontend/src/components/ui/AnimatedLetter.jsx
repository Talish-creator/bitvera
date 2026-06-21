import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CharComponent = ({ char, index, totalChars, scrollYProgress }) => {
  const charProgress = index / totalChars;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.2, 1]
  );

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

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
      {chars.map((char, index) => (
        <CharComponent
          key={index}
          char={char}
          index={index}
          totalChars={totalChars}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
};

export default AnimatedLetter;

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none opacity-50 dark:opacity-30">
      <motion.div
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.1, 1, 0.9, 1],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-200/40 dark:bg-teal-900/40 mix-blend-multiply dark:mix-blend-screen filter blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -150, 0, 150, 0],
          y: [0, -100, -50, 50, 0],
          scale: [1, 1.2, 1, 1.1, 1],
          rotate: [360, 270, 180, 90, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-200/40 dark:bg-blue-900/40 mix-blend-multiply dark:mix-blend-screen filter blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, 50, -50, 100, 0],
          y: [0, 150, 0, -100, 0],
          scale: [1, 0.9, 1.1, 1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-200/30 dark:bg-purple-900/30 mix-blend-multiply dark:mix-blend-screen filter blur-[120px]"
      />
    </div>
  );
};

export default AnimatedBackground;

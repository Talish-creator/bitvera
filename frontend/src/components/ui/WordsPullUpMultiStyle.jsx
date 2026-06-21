import React from 'react';
import { motion, useInView } from 'framer-motion';

const WordsPullUpMultiStyle = ({ segments, className = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Flatten segments into an array of words with their corresponding classes
  const wordsWithStyles = segments.flatMap(segment => 
    segment.text.split(" ").map(word => ({
      word,
      className: segment.className
    }))
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {wordsWithStyles.map((itemObj, i) => (
        <motion.span 
          key={i} 
          variants={item} 
          className={`inline-block mr-2 sm:mr-3 md:mr-4 ${itemObj.className || ''}`}
        >
          {itemObj.word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default WordsPullUpMultiStyle;

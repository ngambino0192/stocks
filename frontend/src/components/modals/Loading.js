/** @jsx jsx */
import { jsx } from '@emotion/core';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
const { colors } = theme;

export const Loading = () => {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const loadingCircleVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '100%',
    },
  };
  const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: 'easeInOut',
  };

  const loadingContainer = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 0px',
  };

  const loadingCircle = {
    display: 'block',
    width: '1rem',
    height: '1rem',
    backgroundColor: `${colors.lightGray100}`,
    borderRadius: '0.75rem',
    margin: '10px',
  };

  return (
    <motion.div
      style={loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
};

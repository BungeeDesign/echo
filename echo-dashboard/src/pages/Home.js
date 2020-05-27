import React from 'react';
import GlobalStyle from '../theme/globalStyle';
import Header from '../components/home/Header';
import { motion } from 'framer-motion';

const pageVariants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 4,
};

function Home(props) {
  return (
    <motion.div
      inital="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <GlobalStyle />
      <Header />
    </motion.div>
  );
}

export default Home;

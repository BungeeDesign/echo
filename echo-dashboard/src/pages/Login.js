import React from 'react';
import GlobalStyle from '../theme/globalStyle';
import Login from '../components/login/Login';
import { motion } from 'framer-motion';

const pageVariants = {
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: 400,
  },
};

const pageTransition = {
  duration: 1,
};

function LoginPage(props) {
  return (
    <motion.div
      inital="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <GlobalStyle />
      <Login />
    </motion.div>
  );
}

export default LoginPage;

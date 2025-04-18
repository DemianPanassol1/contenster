import React from 'react';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useSession } from '@/hooks/session.hook';


const Auth: React.FC = () => {
  const session = useSession();
  const { pathname } = useLocation();

  if (session) {
    return (
      <Navigate
        replace
        to="/"
      />
    );
  }

  if (pathname === '/auth') {
    return (
      <Navigate
        replace
        to="/auth/sign-in"
      />
    );
  }

  return (
    <Box
      exit="exit"
      initial="initial"
      animate="animate"
      component={motion.section}
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }}
      sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <Outlet />
      </AnimatePresence>
    </Box>
  );
};

export default Auth;

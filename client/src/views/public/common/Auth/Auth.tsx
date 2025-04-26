import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useSession } from '@/hooks/session.hook';

const Auth: React.FC = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (session) {
      console.log('Session exists, redirecting to home page');

      navigate('/', { replace: true });
      return;
    }

    if (pathname === '/auth') {
      console.log('No session, redirecting to sign-in page');

      navigate('/auth/sign-in', { replace: true });
      return;
    }
  }, [session, pathname]);

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

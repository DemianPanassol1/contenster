import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

import routes from '@/routes';
import { useGET } from '@/hooks/swr.hook';
import { SESSION_EXPIRED_EVENT } from '@/utils/consts.util';
import { useHomePage, useSession } from '@/hooks/session.hook';
import { setHomePage, setSession } from '@/utils/functions.util';

import Header from './Header';
import Footer from './Footer';
import Drawer from './Drawer';
import ChangePassword from './ChangePassword';
import ChangeEstablishment from './ChangeEstablishment';

const Admin: React.FC = () => {
  const session = useSession();
  const homePage = useHomePage();
  const navigate = useNavigate();

  const { data, isLoading } = useGET<Session>(
    routes.CONTENSTER.GLOBAL.GET_SYNC_USER,
    true
  );

  useEffect(() => {
    if (!isLoading && data) setSession(data);
  }, [data, isLoading]);

  useEffect(() => {
    if (homePage && 'redirect' in homePage && 'homePage' in homePage) {
      if (homePage.redirect === true) {
        Object.assign(homePage, { redirect: false });
        setHomePage(homePage);
        navigate(`/${homePage.homePage}`);
      }
    }
  }, [homePage]);

  useEffect(() => {
    const handleSessionExpired = () => {
      setTimeout(() => {
        navigate('/auth/sign-in', { replace: true });
      }, 50);
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired, {
      once: true,
    });

    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    };
  }, []);

  if (!session) {
    return null;
  }

  return (
    <Box
      id="main"
      exit="exit"
      initial="initial"
      animate="animate"
      component={motion.section}
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }}
      sx={{ display: 'flex' }}
    >
      <Drawer />
      <Box
        component="section"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <Header />
        <ChangePassword />
        <ChangeEstablishment />
        <Box
          component="section"
          sx={{ minHeight: 'calc(100vh - 64px)' }}
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <Outlet />
          </AnimatePresence>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Admin;

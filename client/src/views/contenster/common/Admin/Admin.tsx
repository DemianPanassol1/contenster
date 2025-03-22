import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useSessionStorage } from '@uidotdev/usehooks';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useGET, useNavigate } from '../../../../utils/hooks.util';
import { GET_SYNC_USER } from '../../../../routes/contenster/global';
import { useGlobalContext } from '../../../../contexts/global.context';

import Header from './Header';
import Footer from './Footer';
import Drawer from './Drawer';
import ChangePassword from './ChangePassword';
import ChangeEstablishment from './ChangeEstablishment';

const Admin: React.FC = () => {
  const {
    state: { configInfo },
  } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading }: GetSyncUser = useGET(GET_SYNC_USER, true);
  const [session, setSession] = useSessionStorage<Session | null>('session', null);
  const [homePage, setHomePage] = useSessionStorage<HomePage | null>('homePage', null);

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
  }, [homePage, navigate, setHomePage]);

  if (!session) {
    return (
      <Navigate
        replace
        to="/auth/sign-in"
      />
    );
  }

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = configInfo?.projectName ?? '';
    }
  }, [location.pathname, configInfo]);

  useEffect(() => {
    const link: HTMLLinkElement | null = document?.querySelector("link[rel~='icon']");

    if (link) {
      link.href = configInfo?.favicon ?? '';
    }
  }, [configInfo?.favicon]);

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

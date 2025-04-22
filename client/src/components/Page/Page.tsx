import { motion } from 'framer-motion';
import { Box, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import React, { ReactNode, useEffect } from 'react';

import strings from '@/strings';
import config from '@config';

import PageChip from '@/components/PageChip';
import { useRouteParams } from '@/hooks/router.hook';
import { usePermission, useSession } from '@/hooks/session.hook';

interface PageProps {
  children: ReactNode;
  pageChip?: boolean;
  transitionDelay?: boolean;
}

const Page: React.FC<PageProps> = ({
  children,
  pageChip = true,
  transitionDelay = true,
}) => {
  const theme = useTheme();
  const session = useSession();
  const location = useLocation();
  const permissions = usePermission();
  const { type, slug } = useRouteParams();

  const chipLabel = (() => {
    switch (type) {
      case 'edit':
        return strings.actions.edit;
      case 'create':
        return strings.actions.create;
      default:
        return '';
    }
  })();

  const mainChipLabel = (() => {
    return (
      permissions?.title ?? (slug === 'profile' ? strings.common.profile : '')
    );
  })();

  const title = (() => {
    if (session) {
      return `${mainChipLabel} ${chipLabel ? `- ${chipLabel}` : '-'} CMS ${
        session.establishment.fantasyName ?? ''
      }`;
    }

    const pageTitleMap: Record<string, string> = {
      'sign-in': strings.common.login,
      'reset-password': strings.common.recoverPassword,
      'create-password': strings.common.redeemPassword,
    };

    const lastPathSegment = location.pathname.split('/').pop() || '';
    return `${config.PROJECT_NAME} - ${pageTitleMap[lastPathSegment] ?? ''}`.trimEnd();
  })();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    document.title = title;
  }, [location.pathname]);

  return (
    <Box
      component={motion.section}
      exit="exit"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
      }}
      transition={{ delay: transitionDelay ? 0.25 : 0 }}
      sx={{
        flex: 1,
        padding: '0 1rem',
        [theme.breakpoints.up('sm')]: {
          padding: '0 1.5rem 0',
        },
      }}
    >
      {pageChip && (
        <PageChip
          chipLabel={chipLabel}
          mainChipLabel={mainChipLabel}
        />
      )}
      {children}
    </Box>
  );
};

export default Page;

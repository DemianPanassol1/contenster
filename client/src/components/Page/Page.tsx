import { motion } from 'framer-motion';
import { Box, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { ReactNode, useEffect } from 'react';

import { useGlobalContext } from '../../contexts/global.context';
import { usePermissions, useRouteParams, useUserSession } from '../../utils/hooks.util';

import PageChip from '../PageChip';

interface PageProps {
  pageChip?: boolean;
  children: ReactNode;
  transitionDelay?: boolean;
}

const Page: React.FC<PageProps> = ({
  pageChip = true,
  children,
  transitionDelay = true,
}) => {
  const {
    state: { configInfo },
  } = useGlobalContext();
  const theme = useTheme();
  const location = useLocation();
  const session = useUserSession();
  const permissions = usePermissions();
  const { type, slug } = useRouteParams();
  const { t } = useTranslation(['common']);

  const chipLabel = (() => {
    switch (type) {
      case 'edit':
        return t('common:edit');
      case 'create':
        return t('common:create');
      default:
        return '';
    }
  })();

  const mainChipLabel = (() => {
    return permissions?.title ?? (slug === 'profile' ? t('common:profile') : '');
  })();

  const title = (() => {
    if (session) {
      return `${mainChipLabel} ${chipLabel ? `- ${chipLabel}` : '-'} CMS ${
        session.establishment.fantasyName ?? ''
      }`;
    }

    const pageTitleMap: Record<string, string> = {
      'sign-in': t('common:login'),
      'reset-password': t('common:recoverPassword'),
      'create-password': t('common:redeemPassword'),
    };

    const lastPathSegment = location.pathname.split('/').pop() || '';
    return `${configInfo?.projectName ?? ''} - ${pageTitleMap[lastPathSegment] ?? ''}`.trimEnd();
  })();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    document.title = title;
  }, [location.pathname]);

  return (
    <Box
      exit="exit"
      initial="initial"
      animate="animate"
      sx={{
        flex: 1,
        padding: '0 1rem',
        [theme.breakpoints.up('sm')]: {
          padding: '0 1.5rem 0',
        },
      }}
      component={motion.section}
      variants={{
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
      }}
      transition={{ delay: transitionDelay ? 0.25 : 0 }}
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

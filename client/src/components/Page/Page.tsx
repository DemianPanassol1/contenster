import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Box, useTheme } from '@mui/material';

import { usePermissions, useRouteParams, useUserSession } from '../../utils/hooks.util';

import Header from '../Header';
import PageChip from '../PageChip';
import { useTranslation } from 'react-i18next';

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
  const theme = useTheme();
  const session = useUserSession();
  const permissions = usePermissions();
  const { type, slug } = useRouteParams();
  const { t } = useTranslation(['common']);

  const mainChipLabel =
    permissions?.title ?? (slug === 'profile' ? t('common:profile') : '');
  const chipLabel =
    type === 'edit' ? 'Editar' : type === 'create' ? t('common:create') : null;

  let title;

  if (session) {
    title = `${mainChipLabel} ${chipLabel ? `- ${chipLabel}` : '-'} CMS ${
      session.establishment.fantasyName ?? ''
    }`;
  } else {
    switch (slug) {
      case 'sign-in':
        title = t('common:projectLogin');
        break;
      case 'reset-password':
        title = t('common:projectRecoverPassword');
        break;
      case 'create-password':
        title = t('common:projectRedeemPassword');
        break;
      default:
        title = t('common:projectContenster');
    }
  }

  return (
    <>
      <Header title={title} />
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
    </>
  );
};

export default Page;

import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Dialog, DialogActions, DialogContent, useTheme } from '@mui/material';

import { useGlobalContext } from '../../../contexts/global.context';

import Button from '../../Button';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
  readOnly: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  onSubmit,
  children,
  readOnly,
  size = 'sm',
}) => {
  const {
    state: { loading },
  } = useGlobalContext();
  const theme = useTheme();
  const { t } = useTranslation(['common']);

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth={size}
      onClose={onClose}
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      <DialogContent
        sx={{
          display: 'grid',
          gap: '1.5rem 1rem',
          margin: '0 0 1rem',
          gridTemplateColumns: '1fr',
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr',
          },
          [theme.breakpoints.up('lg')]: {
            ...(size === 'xs' && { gridTemplateColumns: '1fr' }),
            ...(size === 'sm' && { gridTemplateColumns: '1fr 1fr' }),
            ...(['md', 'lg', 'xl'].includes(size) && {
              gridTemplateColumns: '1fr 1fr 1fr',
            }),
          },
        }}
      >
        <Box
          noValidate
          component="form"
          onSubmit={onSubmit}
        >
          {children}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
          },
        }}
      >
        <Button
          type="button"
          variant="text"
          onClick={onClose}
          content={readOnly ? t('common:goBack') : t('common:cancel')}
          customStyle={{
            ...(readOnly && { justifyContent: 'flex-end', width: 'fit-content' }),
          }}
        />
        {!readOnly && (
          <Button
            hasLoader
            type="submit"
            content={t('common:save')}
            onClick={onSubmit}
            loading={loading}
            customStyle={{
              textTransform: 'inherit',
              [theme.breakpoints.down('sm')]: {
                margin: '0 0 0.5rem',
              },
            }}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;

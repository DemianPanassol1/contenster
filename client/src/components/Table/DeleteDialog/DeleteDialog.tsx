import {
  Dialog,
  useTheme,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../Button';

interface DeleteDialogProps {
  open: { id: number } | null;
  onClose: () => void;
  onConfirm: (open: { id: number }) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm }) => {
  const theme = useTheme();
  const { t } = useTranslation(['common']);

  const handleOnConfirm = () => {
    if (open) onConfirm(open);
    onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      open={Boolean(open)}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle
        id="delete-dialog-title"
        sx={{ fontWeight: theme.typography.fontWeightRegular }}
      >
        {t('common:areYouSure')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ fontWeight: theme.typography.fontWeightRegular }}
          id="delete-dialog-description"
        >
          {t('common:deleteDialogMessage')}
        </DialogContentText>
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
          content={t('common:cancel')}
        />
        <Button
          type="button"
          onClick={handleOnConfirm}
          content={t('common:yesDeleteRecord')}
          customStyle={{
            textTransform: 'inherit',
            [theme.breakpoints.down('sm')]: {
              margin: '0 0 0.5rem',
            },
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;

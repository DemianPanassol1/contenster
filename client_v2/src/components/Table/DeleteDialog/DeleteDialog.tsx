import {
  Dialog,
  useTheme,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React from 'react';

import strings from '@/strings';
import Button from '@/components/Button';

interface DeleteDialogProps {
  open: { id: number } | null;
  onClose: () => void;
  onConfirm: (open: { id: number }) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const theme = useTheme();

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
        {strings.common.areYouSure}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ fontWeight: theme.typography.fontWeightRegular }}
          id="delete-dialog-description"
        >
          {strings.common.deleteDialogMessage}
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
          content={strings.actions.cancel}
        />
        <Button
          type="button"
          onClick={handleOnConfirm}
          content={strings.common.yesDeleteRecord}
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

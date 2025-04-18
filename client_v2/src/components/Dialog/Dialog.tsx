import {
  Slide,
  useTheme,
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog as DialogComponent,
} from '@mui/material';
import React, { ReactNode } from 'react';
import { TransitionProps } from '@mui/material/transitions';

import strings from '@/strings';

import { useGlobalContext } from '@/contexts/global.context';

import Button from '@/components/Button';

type DialogWidth = 'lg' | 'md' | 'sm' | 'xl' | 'xs';

interface DialogProps {
  title: string;
  children: ReactNode;
  content: string;
  loading: boolean;
  onSubmit: () => void;
  dialogWidth?: DialogWidth;
  onClose?: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="down"
      ref={ref}
      {...props}
    />
  );
});

const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  content,
  loading,
  onSubmit,
  dialogWidth = 'sm',
  onClose = () => null,
}) => {
  const {
    state: { dialogState },
    toggleDialog,
  } = useGlobalContext();
  const theme = useTheme();

  const onCloseDialog = () => {
    toggleDialog(null);
    onClose();
  };

  return (
    <DialogComponent
      fullWidth
      sx={{
        marginTop: '-10rem',
      }}
      maxWidth={dialogWidth}
      onClose={onCloseDialog}
      open={dialogState === content}
      slots={{ transition: Transition }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          type="button"
          variant="text"
          content={strings.actions.cancel}
          onClick={onCloseDialog}
          customStyle={{
            width: 'fit-content',
            borderRadius: '0.25rem',
            padding: '0.5rem 1.5rem',
            margin: '0 0 0 1rem',
            textTransform: 'uppercase',
          }}
        />
        <Button
          hasLoader
          type="button"
          content={strings.actions.save}
          loading={loading}
          variant="contained"
          onClick={onSubmit}
          customStyle={{
            width: 'fit-content',
            borderRadius: '0.25rem',
            padding: '0.5rem 1.5rem',
            margin: '0 0 0 1rem',
            textTransform: 'uppercase',
            backgroundColor: theme.palette.info.main,
          }}
        />
      </DialogActions>
    </DialogComponent>
  );
};

export default Dialog;

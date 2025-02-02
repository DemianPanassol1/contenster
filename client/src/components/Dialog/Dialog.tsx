import {
  DialogActions,
  Dialog as DialogComponent,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { TransitionProps } from '@mui/material/transitions';

import { useGlobalContext } from '../../contexts/global.context';

import Button from '../Button';

interface DialogProps {
  title: string;
  children: ReactNode;
  content: string;
  loading: boolean;
  onSubmit: () => void;
  dialogWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
  onClose?: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line
    children: React.ReactElement<any, any>;
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
  const { t } = useTranslation(['common']);

  const onCloseDialog = () => {
    toggleDialog();
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
      TransitionComponent={Transition}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          type="button"
          variant="text"
          content={t('common:cancel')}
          onClick={onCloseDialog}
          customStyle={{
            width: 'fit-content',
            borderRadius: '0.25rem',
            padding: '0.5rem 1.5rem',
            margin: '0 0 0 1rem',
            textTransform: 'capitalize',
          }}
        />
        <Button
          hasLoader
          type="button"
          content={t('common:save')}
          loading={loading}
          variant="contained"
          onClick={onSubmit}
          customStyle={{
            width: 'fit-content',
            borderRadius: '0.25rem',
            padding: '0.5rem 1.5rem',
            margin: '0 0 0 1rem',
            textTransform: 'capitalize',
          }}
        />
      </DialogActions>
    </DialogComponent>
  );
};

export default Dialog;

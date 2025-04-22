import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState, ReactNode } from 'react';
import { Box, Paper, SxProps, Theme, useTheme } from '@mui/material';

import { usePermission } from '@/hooks/session.hook';
import { useGlobalContext } from '@/contexts/global.context';

import Button from '@/components/Button';

type WrapperVariants = 'opacity' | 'left' | 'right' | 'top' | 'bottom';

interface WrapperProps {
  children: ReactNode;
  delay?: number;
  variant?: WrapperVariants;
  initial?: boolean;
  customStyles?: SxProps<Theme>;
  onSubmit?: () => void;
  onCancel?: () => void;
  hasSubmitButton?: boolean;
  hasCancelButton?: boolean;
  customSubmitButtonStyles?: SxProps<Theme>;
  customCancelButtonStyles?: SxProps<Theme>;
  submitButtonContent?: string;
  cancelButtonContent?: string;
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  delay = 0,
  variant = '',
  initial = false,
  customStyles = {},
  onSubmit = () => null,
  onCancel = () => null,
  hasSubmitButton = true,
  hasCancelButton = false,
  customSubmitButtonStyles = {},
  customCancelButtonStyles = {},
  submitButtonContent = 'Save',
  cancelButtonContent = 'Cancel',
}) => {
  const {
    state: { loading },
  } = useGlobalContext();
  const theme = useTheme();
  const { type } = useParams<{ type: string }>();
  const [view, setView] = useState(false);
  const { canCreate, canUpdate } = usePermission();

  useEffect(() => {
    setTimeout(() => setView(true), delay);
  }, [delay]);

  const canSubmit: boolean = !(
    (type === 'create' && canCreate) ||
    (type === 'edit' && canUpdate)
  );

  return (
    <AnimatePresence
      mode="wait"
      initial={initial}
    >
      {view && (
        <Paper
          exit="exit"
          initial="initial"
          animate="animate"
          variant="outlined"
          sx={{ width: '100%', padding: '1.5rem 1.5rem 2rem', ...customStyles }}
          component={motion.div}
          // transition={{ delay: 0.25 }}
          variants={(() => {
            switch (variant) {
              case 'left':
                return {
                  initial: { opacity: 0, x: -100 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -100 },
                };
              case 'right':
                return {
                  initial: { opacity: 0, x: 100 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: 100 },
                };
              case 'top':
                return {
                  initial: { opacity: 0, y: -100 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -100 },
                };
              case 'bottom':
                return {
                  initial: { opacity: 0, y: 100 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: 100 },
                };
              case 'opacity':
              default:
                return {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                };
            }
          })()}
        >
          <Box
            noValidate
            component="form"
            onSubmit={onSubmit}
          >
            {children}
            <Box
              sx={{
                display: 'flex',
                margin: '2rem 0 0',
                justifyContent: 'flex-end',
              }}
            >
              {hasCancelButton && (
                <Button
                  type="button"
                  variant="text"
                  content={cancelButtonContent}
                  onClick={onCancel}
                  customStyle={{
                    width: 'fit-content',
                    borderRadius: '0.25rem',
                    padding: '0.5rem 1.5rem',
                    margin: '0 0 0 1rem',
                    textTransform: 'uppercase',
                    ...customCancelButtonStyles,
                  }}
                />
              )}
              {hasSubmitButton && (
                <Button
                  hasLoader
                  type="submit"
                  content={submitButtonContent}
                  variant="contained"
                  disabled={(() => {
                    if (typeof type === 'undefined') {
                      return false;
                    }
                    return canSubmit;
                  })()}
                  loading={loading}
                  customStyle={{
                    width: 'fit-content',
                    borderRadius: '0.25rem',
                    padding: '0.5rem 1.5rem',
                    margin: '0 0 0 1rem',
                    textTransform: 'uppercase',
                    backgroundColor: theme.palette.info.main,
                    ...customSubmitButtonStyles,
                  }}
                />
              )}
            </Box>
          </Box>
        </Paper>
      )}
    </AnimatePresence>
  );
};

export default Wrapper;

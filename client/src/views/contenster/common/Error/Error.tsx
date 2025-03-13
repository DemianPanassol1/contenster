import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

import { useNavigate } from '../../../../utils/hooks.util';

import Button from '../../../../components/Button';

interface CircularProgressWithLabelProps {
  value: number;
}

interface ReactRouteError {
  status: number;
  statusText: string;
}

function CircularProgressWithLabel({ value }: CircularProgressWithLabelProps) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={(value / 5) * 100}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {`${value.toFixed(1)}s`}
        </Typography>
      </Box>
    </Box>
  );
}

const Error: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  const [timeLeft, setTimeLeft] = useState(5);
  const { status, statusText } = useRouteError() as ReactRouteError;

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 0.1);
    }, 100);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '75vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 1rem',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgressWithLabel value={timeLeft} />
        <Typography
          sx={{ margin: '0 0.75rem 0.2rem' }}
          variant="body1"
          fontWeight="400"
        >
          {t('common:backToStart')}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        fontWeight="400"
        sx={{ margin: '0 0 1rem' }}
      >
        {(() => {
          switch (status) {
            case 404:
              return t('common:pageNotFoundTitle');
            default:
              return t('common:unexpectedErrorTitle');
          }
        })()}
      </Typography>
      <Typography variant="h6">
        {(() => {
          switch (status) {
            case 404:
              return t('common:pageNotFoundMessage');
            default:
              return t('common:unexpectedErrorMessage');
          }
        })()}
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '1rem 0 0',
        }}
      >
        <Typography
          variant="body2"
          sx={{ margin: '0 0.5rem 0', color: 'gray' }}
        >
          {`${status} - ${statusText}`}
        </Typography>
      </Box>
      <Button
        type="button"
        content={t('common:takeMeBack')}
        customStyle={{
          borderRadius: 1,
          width: 'fit-content',
          margin: '1.5rem 0 0',
          textTransform: 'capitalize',
        }}
        onClick={() => navigate('/')}
      />
    </Box>
  );
};

export default Error;

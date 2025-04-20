import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Page from '../../../../components/Page';

import Main from './Main';

const CreatePassword: React.FC = () => {
  const { type, token } = useParams();

  if (!token) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <Page
      pageChip={false}
      transitionDelay={false}
    >
      {(() => {
        switch (type) {
          default:
            return <Main />;
        }
      })()}
    </Page>
  );
};

export default CreatePassword;

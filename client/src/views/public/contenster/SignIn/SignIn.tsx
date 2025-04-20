import React from 'react';
import { useParams } from 'react-router-dom';

import Page from '@/components/Page';

import Main from './Main';

const SignIn: React.FC = () => {
  const { type } = useParams();

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

export default SignIn;

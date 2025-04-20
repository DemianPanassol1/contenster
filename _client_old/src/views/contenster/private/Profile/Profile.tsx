import React from 'react';
import { useParams } from 'react-router-dom';

import Main from './Main';
import Page from '../../../../components/Page';

const Profile: React.FC = () => {
  const { type } = useParams();

  return (
    <Page>
      {(() => {
        switch (type) {
          default:
            return <Main />;
        }
      })()}
    </Page>
  );
};

export default Profile;

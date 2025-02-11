import React from 'react';
import { useParams } from 'react-router-dom';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const Roles: React.FC = () => {
  const { /* id, */ type } = useParams();

  return (
    <Page>
      {(() => {
        switch (type) {
          case 'edit':
            return (
              <Save
                pageType={type}
                saveContentUrl={''}
                getContentUrl={''}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={''}
              />
            );
          default:
            return <Main />;
        }
      })()}
    </Page>
  );
};

export default Roles;

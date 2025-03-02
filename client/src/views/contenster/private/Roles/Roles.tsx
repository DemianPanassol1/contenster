import React from 'react';
import { useParams } from 'react-router-dom';

import { GET_ROLE, POST_ROLE, PUT_ROLE } from '../../../../routes/contenster/roles';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const Roles: React.FC = () => {
  const { id, type } = useParams();

  return (
    <Page>
      {(() => {
        switch (type) {
          case 'edit':
            return (
              <Save
                pageType={type}
                saveContentUrl={PUT_ROLE}
                getContentUrl={GET_ROLE(id as string)}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={POST_ROLE}
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

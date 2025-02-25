import React from 'react';
import { useParams } from 'react-router-dom';

import { usePermissions, useUserSession } from '../../../../utils/hooks.util';
import { GET_USER, POST_USER, PUT_USER } from '../../../../routes/contenster/users';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const Users: React.FC = () => {
  const { id, type } = useParams();
  const session = useUserSession();
  const permission = usePermissions();

  return (
    <Page>
      {(() => {
        switch (type) {
          case 'edit':
            return (
              <Save
                pageType={type}
                saveContentUrl={PUT_USER}
                getContentUrl={GET_USER(
                  id as string,
                  (session?.establishment.id ?? '') as string
                )}
                permissionType={permission.type}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={POST_USER}
                permissionType={permission.type}
              />
            );
          default:
            return <Main />;
        }
      })()}
    </Page>
  );
};

export default Users;

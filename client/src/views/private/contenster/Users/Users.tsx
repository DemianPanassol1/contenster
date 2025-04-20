import React from 'react';
import { useParams } from 'react-router-dom';

import routes from '@/routes';
import { usePermission, useSession } from '@/hooks/session.hook';

import Main from './Main';
import Save from './Save';
import Page from '@/components/Page';

const Users: React.FC = () => {
  const session = useSession();
  const { id, type } = useParams();
  const permission = usePermission();

  return (
    <Page>
      {(() => {
        switch (type) {
          case 'edit':
            return (
              <Save
                pageType={type}
                permissionType={permission.type}
                saveContentUrl={routes.CONTENSTER.USERS.PUT_USER}
                getContentUrl={routes.CONTENSTER.USERS.GET_USER(
                  (id ?? '').toString(),
                  session!.establishment.id.toString()
                )}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={routes.CONTENSTER.USERS.POST_USER}
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

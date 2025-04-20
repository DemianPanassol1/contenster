import React from 'react';
import { useParams } from 'react-router-dom';

import routes from '@/routes';
import { usePermission } from '@/hooks/session.hook';

import Main from './Main';
import Save from './Save';
import Page from '@/components/Page';

const Roles: React.FC = () => {
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
                saveContentUrl={routes.CONTENSTER.ROLES.PUT_ROLE}
                getContentUrl={routes.CONTENSTER.ROLES.GET_ROLE(
                  (id ?? '').toString()
                )}
                permissionType={permission.type}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                permissionType={permission.type}
                saveContentUrl={routes.CONTENSTER.ROLES.POST_ROLE}
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

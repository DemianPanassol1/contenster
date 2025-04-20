import React from 'react';
import { useParams } from 'react-router-dom';

import { usePermissions } from '../../../../utils/hooks.util';
import { GET_ROLE, POST_ROLE, PUT_ROLE } from '../../../../routes/contenster/roles';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const Roles: React.FC = () => {
  const { id, type } = useParams();
  const permission = usePermissions();

  return (
    <Page>
      {(() => {
        switch (type) {
          case 'edit':
            return (
              <Save
                pageType={type}
                saveContentUrl={PUT_ROLE}
                getContentUrl={GET_ROLE((id ?? '').toString())}
                permissionType={permission.type}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={POST_ROLE}
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

export default Roles;

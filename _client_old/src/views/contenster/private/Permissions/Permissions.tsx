import React from 'react';
import { useParams } from 'react-router-dom';

import {
  GET_PERMISSION,
  POST_PERMISSION,
  PUT_PERMISSION,
} from '../../../../routes/contenster/permissions';
import { usePermissions } from '../../../../utils/hooks.util';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const Permissions: React.FC = () => {
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
                saveContentUrl={PUT_PERMISSION}
                getContentUrl={GET_PERMISSION((id ?? '').toString())}
                permissionType={permission.type}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={POST_PERMISSION}
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

export default Permissions;

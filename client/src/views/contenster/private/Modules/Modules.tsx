import React from 'react';
import { useParams } from 'react-router-dom';

import {
  GET_MODULE,
  POST_MODULE,
  PUT_MODULE,
} from '../../../../routes/contenster/modules';

import { usePermissions } from '../../../../utils/hooks.util';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const Modules: React.FC = () => {
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
                saveContentUrl={PUT_MODULE}
                getContentUrl={GET_MODULE((id ?? '').toString())}
                permissionType={permission.type}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={POST_MODULE}
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

export default Modules;

import React from 'react';
import { useParams } from 'react-router-dom';

import {
  GET_FUNCTIONALITY,
  POST_FUNCTIONALITY,
  PUT_FUNCTIONALITY,
} from '../../../../routes/contenster/functionalities';
import { usePermissions } from '../../../../utils/hooks.util';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const Functionalities: React.FC = () => {
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
                saveContentUrl={PUT_FUNCTIONALITY}
                getContentUrl={GET_FUNCTIONALITY((id ?? '').toString())}
                permissionType={permission.type}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={POST_FUNCTIONALITY}
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

export default Functionalities;

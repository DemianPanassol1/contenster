import React from 'react';
import { useParams } from 'react-router-dom';

import routes from '@/routes';
import { usePermission } from '@/hooks/session.hook';

import Main from './Main';
import Save from './Save';
import Page from '@/components/Page';

const Modules: React.FC = () => {
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
                saveContentUrl={routes.CONTENSTER.MODULES.PUT_MODULE}
                getContentUrl={routes.CONTENSTER.MODULES.GET_MODULE(
                  (id ?? '').toString()
                )}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                permissionType={permission.type}
                saveContentUrl={routes.CONTENSTER.MODULES.POST_MODULE}
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

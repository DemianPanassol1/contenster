import React from 'react';
import { useParams } from 'react-router-dom';

import routes from '@/routes';
import { usePermission } from '@/hooks/session.hook';

import Main from './Main';
import Save from './Save';
import Page from '@/components/Page';

const Functionalities: React.FC = () => {
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
                saveContentUrl={
                  routes.CONTENSTER.FUNCTIONALITY.PUT_FUNCTIONALITY
                }
                getContentUrl={routes.CONTENSTER.FUNCTIONALITY.GET_FUNCTIONALITY(
                  (id ?? '').toString()
                )}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                permissionType={permission.type}
                saveContentUrl={
                  routes.CONTENSTER.FUNCTIONALITY.POST_FUNCTIONALITY
                }
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

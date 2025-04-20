import React from 'react';
import { useParams } from 'react-router-dom';

import routes from '@/routes';
import { usePermission } from '@/hooks/session.hook';

import Main from './Main';
import Save from './Save';
import Page from '@components/Page';

const EmailSetting: React.FC = () => {
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
                saveContentUrl={
                  routes.CONTENSTER.EMAIL_SETTINGS.PUT_EMAIL_SETTING
                }
                getContentUrl={routes.CONTENSTER.EMAIL_SETTINGS.GET_EMAIL_SETTING(
                  (id ?? '').toString()
                )}
                permissionType={permission.type}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={
                  routes.CONTENSTER.EMAIL_SETTINGS.POST_EMAIL_SETTING
                }
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

export default EmailSetting;

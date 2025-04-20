import React from 'react';
import { useParams } from 'react-router-dom';

import {
  GET_EMAIL_SETTING,
  POST_EMAIL_SETTING,
  PUT_EMAIL_SETTING,
} from '../../../../routes/contenster/emailSettings';
import { usePermissions } from '../../../../utils/hooks.util';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const EmailSetting: React.FC = () => {
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
                saveContentUrl={PUT_EMAIL_SETTING}
                getContentUrl={GET_EMAIL_SETTING((id ?? '').toString())}
                permissionType={permission.type}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={POST_EMAIL_SETTING}
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

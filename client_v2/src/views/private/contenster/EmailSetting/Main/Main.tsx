import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  DELETE_EMAIL_SETTING,
  GET_EMAIL_SETTING_LIST,
} from '../../../../../routes/contenster/emailSettings';
import {
  usePermissions,
  useUserSession,
} from '../../../../../utils/hooks.util';

import Table from '../../../../../components/Table';
import Wrapper from '../../../../../components/Wrapper';

const Main: React.FC = () => {
  const session = useUserSession();
  const permission = usePermissions();
  const { t } = useTranslation(['common', 'validations']);

  return (
    <Wrapper hasSubmitButton={false}>
      <Table
        columns={
          [
            permission.type === 'general' && {
              name: t('validations:establishment.field'),
              field: 'establishment',
              selector: 'establishment.corporateName',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: t('validations:purpose.field'),
              field: 'purpose',
              selector: 'purpose',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: t('validations:emailTitle.field'),
              field: 'title',
              selector: 'titles.text',
              sortable: true,
              searchable: true,
              type: 'text',
            },
          ].filter(Boolean) as Columns[]
        }
        urlList={GET_EMAIL_SETTING_LIST}
        urlDelete={DELETE_EMAIL_SETTING}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: (session?.establishment.id ?? '').toString(),
        }}
      />
    </Wrapper>
  );
};

export default Main;

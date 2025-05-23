import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  DELETE_FUNCTIONALITY,
  GET_FUNCTIONALITIES_LIST,
} from '../../../../../routes/contenster/functionalities';
import { usePermissions, useUserSession } from '../../../../../utils/hooks.util';
import { GET_MODULES_LIST, GET_SYNC_USER } from '../../../../../routes/contenster/global';

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
              selector: 'module.establishment.corporateName',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: t('validations:icon.field'),
              field: 'icon',
              selector: 'icon',
              sortable: false,
              searchable: false,
              type: 'icon',
            },
            {
              name: t('validations:title.field'),
              field: 'title',
              selector: 'titles.text',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: t('validations:slug.field'),
              field: 'slug',
              selector: 'slug',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: t('validations:position.field'),
              field: 'position',
              selector: 'position',
              sortable: true,
              searchable: false,
              type: 'text',
            },
          ].filter(Boolean) as Columns[]
        }
        urlList={GET_FUNCTIONALITIES_LIST}
        urlDelete={DELETE_FUNCTIONALITY}
        urlRefreshOnDelete={[GET_MODULES_LIST, GET_SYNC_USER]}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: (session?.establishment.id ?? '').toString(),
        }}
      />
    </Wrapper>
  );
};

export default Main;

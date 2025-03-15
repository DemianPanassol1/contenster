import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  DELETE_MODULE,
  GET_MODULES_LIST,
} from '../../../../../routes/contenster/modules';
import { usePermissions, useUserSession } from '../../../../../utils/hooks.util';

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
              name: t('validations:title.field'),
              field: 'title',
              selector: 'titles.text',
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
        urlList={GET_MODULES_LIST}
        urlDelete={DELETE_MODULE}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: (session?.establishment.id ?? '').toString(),
        }}
      />
    </Wrapper>
  );
};

export default Main;

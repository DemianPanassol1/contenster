import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  DELETE_PERMISSION,
  GET_PERMISSIONS_LIST,
} from '../../../../../routes/contenster/permissions';

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
        columns={[
          {
            name: t('validations:establishment.field'),
            field: 'establishment',
            selector: 'role.establishment.corporateName',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: t('validations:role.field'),
            field: 'role',
            selector: 'role.titles.text',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: t('validations:functionality.field'),
            field: 'functionality',
            selector: 'functionality.titles.text',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: t('validations:canRead.field'),
            field: 'canRead',
            selector: 'canRead',
            sortable: false,
            searchable: false,
            type: 'checkbox',
          },
          {
            name: t('validations:canCreate.field'),
            field: 'canCreate',
            selector: 'canCreate',
            sortable: false,
            searchable: false,
            type: 'checkbox',
          },
          {
            name: t('validations:canUpdate.field'),
            field: 'canUpdate',
            selector: 'canUpdate',
            sortable: false,
            searchable: false,
            type: 'checkbox',
          },
          {
            name: t('validations:canDelete.field'),
            field: 'canDelete',
            selector: 'canDelete',
            sortable: false,
            searchable: false,
            type: 'checkbox',
          },
        ]}
        urlList={GET_PERMISSIONS_LIST}
        urlDelete={DELETE_PERMISSION}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: (session?.establishment.id ?? '').toString(),
        }}
      />
    </Wrapper>
  );
};

export default Main;

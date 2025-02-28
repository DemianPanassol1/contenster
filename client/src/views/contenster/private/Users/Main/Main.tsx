import React from 'react';
import { useTranslation } from 'react-i18next';

import { usePermissions, useUserSession } from '../../../../../utils/hooks.util';
import { DELETE_USER, GET_USERS_LIST } from '../../../../../routes/contenster/users';

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
            name: t('validations:name.field'),
            field: 'name',
            selector: 'name',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: t('validations:email.field'),
            field: 'email',
            selector: 'email',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: t('validations:username.field'),
            field: 'username',
            selector: 'username',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: t('validations:lastLoggedAt.field'),
            field: 'lastLoggedAt',
            selector: 'lastLoggedAt',
            sortable: true,
            searchable: false,
            type: 'datetime',
          },
          {
            name: t('validations:isActive.field'),
            field: 'isActive',
            selector: 'isActive',
            sortable: false,
            searchable: false,
            type: 'checkbox',
          },
          {
            name: t('validations:isBlocked.field'),
            field: 'isBlocked',
            selector: 'isBlocked',
            sortable: false,
            searchable: false,
            type: 'checkbox',
          },
        ]}
        urlList={GET_USERS_LIST}
        urlDelete={DELETE_USER}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: (session?.establishment.id ?? '').toString(),
        }}
        urlRefreshOnDelete={GET_USERS_LIST}
      />
    </Wrapper>
  );
};

export default Main;

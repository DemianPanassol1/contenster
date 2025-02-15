import React from 'react';
import { useTranslation } from 'react-i18next';

import { DELETE_ROLE, GET_ROLES_LIST } from '../../../../../routes/contenster/roles';

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
            name: t('validations:title.field'),
            field: 'title',
            selector: 'titles.text',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: t('validations:description.field'),
            field: 'description',
            selector: 'descriptions.text',
            sortable: true,
            searchable: true,
            type: 'text',
          },
        ]}
        urlList={GET_ROLES_LIST}
        urlDelete={DELETE_ROLE}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: (session?.establishment.id ?? '').toString(),
        }}
      />
    </Wrapper>
  );
};

export default Main;

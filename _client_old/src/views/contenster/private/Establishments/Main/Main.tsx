import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  DELETE_ESTABLISHMENT,
  GET_ESTABLISHMENTS_LIST,
} from '../../../../../routes/contenster/establishments';
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
            name: t('validations:corporateName.field'),
            field: 'corporateName',
            selector: 'corporateName',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: t('validations:document.field'),
            field: 'document',
            selector: 'document',
            sortable: true,
            searchable: true,
            type: 'text',
          },
        ]}
        urlList={GET_ESTABLISHMENTS_LIST}
        urlDelete={DELETE_ESTABLISHMENT}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: (session?.establishment.id ?? '').toString(),
        }}
        hasAddButton={permission.type === 'general'}
        hasFilter={permission.type === 'general'}
      />
    </Wrapper>
  );
};

export default Main;

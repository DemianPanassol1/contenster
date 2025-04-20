import React from 'react';

import routes from '@/routes';
import strings from '@/strings';
import { usePermission, useSession } from '@/hooks/session.hook';

import Table from '@/components/Table';
import Wrapper from '@/components/Wrapper';

const Main: React.FC = () => {
  const session = useSession();
  const permission = usePermission();

  return (
    <Wrapper hasSubmitButton={false}>
      <Table
        columns={
          [
            permission.type === 'general' && {
              name: strings.validations.establishment.field,
              field: 'establishment',
              selector: 'role.establishment.corporateName',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: strings.validations.role.field,
              field: 'role',
              selector: 'role.titles.text',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: strings.validations.functionality.field,
              field: 'functionality',
              selector: 'functionality.titles.text',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: strings.validations.canRead.field,
              field: 'canRead',
              selector: 'canRead',
              sortable: false,
              searchable: false,
              type: 'checkbox',
            },
            {
              name: strings.validations.canCreate.field,
              field: 'canCreate',
              selector: 'canCreate',
              sortable: false,
              searchable: false,
              type: 'checkbox',
            },
            {
              name: strings.validations.canUpdate.field,
              field: 'canUpdate',
              selector: 'canUpdate',
              sortable: false,
              searchable: false,
              type: 'checkbox',
            },
            {
              name: strings.validations.canDelete.field,
              field: 'canDelete',
              selector: 'canDelete',
              sortable: false,
              searchable: false,
              type: 'checkbox',
            },
          ].filter(Boolean) as Columns[]
        }
        urlList={routes.CONTENSTER.PERMISSIONS.GET_PERMISSIONS_LIST}
        urlDelete={routes.CONTENSTER.PERMISSIONS.DELETE_PERMISSION}
        urlRefreshOnDelete={[
          routes.CONTENSTER.GLOBAL.GET_SYNC_USER,
          routes.CONTENSTER.GLOBAL.GET_MODULES_LIST,
        ]}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: session!.establishment.id.toString(),
        }}
      />
    </Wrapper>
  );
};

export default Main;

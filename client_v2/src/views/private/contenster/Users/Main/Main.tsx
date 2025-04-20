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
        columns={[
          {
            name: strings.validations.name.field,
            field: 'name',
            selector: 'name',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: strings.validations.email.field,
            field: 'email',
            selector: 'email',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: strings.validations.username.field,
            field: 'username',
            selector: 'username',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: strings.validations.lastLoggedAt.field,
            field: 'lastLoggedAt',
            selector: 'lastLoggedAt',
            sortable: true,
            searchable: false,
            type: 'datetime',
          },
          {
            name: strings.validations.isActive.field,
            field: 'isActive',
            selector: 'isActive',
            sortable: false,
            searchable: false,
            type: 'checkbox',
          },
          {
            name: strings.validations.isBlocked.field,
            field: 'isBlocked',
            selector: 'isBlocked',
            sortable: false,
            searchable: false,
            type: 'checkbox',
          },
        ]}
        urlList={routes.CONTENSTER.USERS.GET_USERS_LIST}
        urlDelete={routes.CONTENSTER.USERS.DELETE_USER}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: session!.establishment.id.toString(),
        }}
      />
    </Wrapper>
  );
};

export default Main;

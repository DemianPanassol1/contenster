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
              selector: 'establishment.corporateName',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: strings.validations.title.field,
              field: 'title',
              selector: 'titles.text',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: strings.validations.description.field,
              field: 'description',
              selector: 'descriptions.text',
              sortable: true,
              searchable: true,
              type: 'text',
            },
          ].filter(Boolean) as Columns[]
        }
        urlList={routes.CONTENSTER.ROLES.GET_ROLES_LIST}
        urlDelete={routes.CONTENSTER.ROLES.DELETE_ROLE}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: session!.establishment.id.toString(),
        }}
      />
    </Wrapper>
  );
};

export default Main;

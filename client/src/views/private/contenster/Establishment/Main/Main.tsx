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
            name: strings.validations.corporateName.field,
            field: 'corporateName',
            selector: 'corporateName',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: strings.validations.document.field,
            field: 'document',
            selector: 'document',
            sortable: true,
            searchable: true,
            type: 'text',
            mask: '###.###.###/####-##',
          },
        ]}
        urlList={routes.CONTENSTER.ESTABLISHMENT.GET_ESTABLISHMENTS_LIST}
        urlDelete={routes.CONTENSTER.ESTABLISHMENT.DELETE_ESTABLISHMENT}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: session!.establishment.id.toString(),
        }}
        hasAddButton={permission.type === 'general'}
        hasFilter={permission.type === 'general'}
      />
    </Wrapper>
  );
};

export default Main;

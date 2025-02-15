import React from 'react';

import { DELETE_ROLES, GET_ROLES_LIST } from '../../../../../routes/contenster/roles';

import { useUserSession } from '../../../../../utils/hooks.util';

import Table from '../../../../../components/Table';
import Wrapper from '../../../../../components/Wrapper';

const Main: React.FC = () => {
  const session = useUserSession();

  return (
    <Wrapper hasSubmitButton={false}>
      <Table
        columns={[
          {
            name: 'Título',
            field: 'title',
            selector: 'titles.text',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            name: 'Descrição',
            field: 'description',
            selector: 'descriptions.text',
            sortable: true,
            searchable: true,
            type: 'text',
          },
        ]}
        urlList={GET_ROLES_LIST}
        urlDelete={DELETE_ROLES}
        bodyContent={{ establishmentId: (session?.establishment.id ?? '').toString() }}
      />
    </Wrapper>
  );
};

export default Main;

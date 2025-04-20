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
              selector: 'module.establishment.corporateName',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: strings.validations.icon.field,
              field: 'icon',
              selector: 'icon',
              sortable: false,
              searchable: false,
              type: 'icon',
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
              name: strings.validations.slug.field,
              field: 'slug',
              selector: 'slug',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: strings.validations.position.field,
              field: 'position',
              selector: 'position',
              sortable: true,
              searchable: false,
              type: 'text',
            },
          ].filter(Boolean) as Columns[]
        }
        urlList={routes.CONTENSTER.FUNCTIONALITY.GET_FUNCTIONALITIES_LIST}
        urlDelete={routes.CONTENSTER.FUNCTIONALITY.DELETE_FUNCTIONALITY}
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

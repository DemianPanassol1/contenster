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
              name: strings.validations.purpose.field,
              field: 'purpose',
              selector: 'purpose',
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
          ].filter(Boolean) as Columns[]
        }
        urlList={routes.CONTENSTER.EMAIL_SETTINGS.GET_EMAIL_SETTING_LIST}
        urlDelete={routes.CONTENSTER.EMAIL_SETTINGS.DELETE_EMAIL_SETTING}
        bodyContent={{
          permissionType: permission.type,
          establishmentId: session!.establishment.id.toString(),
        }}
      />
    </Wrapper>
  );
};

export default Main;

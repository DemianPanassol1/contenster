import React from 'react';

import routes from '@/routes';
import strings from '@/strings';

import Table from '@/components/Table';
import Wrapper from '@/components/Wrapper';

const Main: React.FC = () => {
  return (
    <Wrapper hasSubmitButton={false}>
      <Table
        columns={
          [
            {
              name: strings.validations.read.field,
              field: 'read',
              selector: 'read',
              sortable: false,
              searchable: false,
              type: 'checkbox',
            },
            {
              name: strings.validations.subject.field,
              field: 'subject',
              selector: 'subject',
              sortable: true,
              searchable: true,
              type: 'text',
            },
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
          ].filter(Boolean) as Columns[]
        }
        urlList={routes.PORTFOLIO.MESSAGES.GET_MESSAGES_LIST}
        urlDelete={routes.PORTFOLIO.MESSAGES.DELETE_MESSAGE}
      />
    </Wrapper>
  );
};

export default Main;

import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  DELETE_MESSAGE,
  GET_MESSAGES_LIST,
} from '../../../../../routes/portfolio/messages';

import Table from '../../../../../components/Table';
import Wrapper from '../../../../../components/Wrapper';

const Main: React.FC = () => {
  const { t } = useTranslation(['common', 'validations']);

  return (
    <Wrapper hasSubmitButton={false}>
      <Table
        columns={
          [
            {
              name: t('validations:read.field'),
              field: 'read',
              selector: 'read',
              sortable: false,
              searchable: false,
              type: 'checkbox',
            },
            {
              name: t('validations:subject.field'),
              field: 'subject',
              selector: 'subject',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: t('validations:name.field'),
              field: 'name',
              selector: 'name',
              sortable: true,
              searchable: true,
              type: 'text',
            },
            {
              name: t('validations:email.field'),
              field: 'email',
              selector: 'email',
              sortable: true,
              searchable: true,
              type: 'text',
            },
          ].filter(Boolean) as Columns[]
        }
        urlList={GET_MESSAGES_LIST}
        urlDelete={DELETE_MESSAGE}
      />
    </Wrapper>
  );
};

export default Main;

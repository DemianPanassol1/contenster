import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  DELETE_ESTABLISHMENTS,
  GET_ESTABLISHMENTS_LIST,
} from '../../../../../routes/contenster/establishments';

import Table from '../../../../../components/Table';
import Wrapper from '../../../../../components/Wrapper';

const Main: React.FC = () => {
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
            mask: '##.###.###/####-##',
          },
        ]}
        urlList={GET_ESTABLISHMENTS_LIST}
        urlDelete={DELETE_ESTABLISHMENTS}
      />
    </Wrapper>
  );
};

export default Main;

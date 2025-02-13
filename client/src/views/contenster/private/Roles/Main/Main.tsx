import React from 'react';

import Wrapper from '../../../../../components/Wrapper';
import Table from '../../../../../components/Table';

const columns = [
  {
    name: 'Título',
    selector: 'title',
  },
  {
    name: 'Descrição',
    selector: 'description',
  },
];

const Main: React.FC = () => {
  console.log(columns);

  return (
    <Wrapper hasSubmitButton={false}>
      <Table
        columns={[
          {
            field: 'title',
            selector: 'title',
            sortable: true,
            searchable: true,
            type: 'text',
          },
          {
            field: 'description',
            selector: 'description',
            sortable: true,
            searchable: true,
            type: 'text',
          },
        ]}
        urlList={''}
        urlDelete={''}
      />
    </Wrapper>
  );
};

export default Main;

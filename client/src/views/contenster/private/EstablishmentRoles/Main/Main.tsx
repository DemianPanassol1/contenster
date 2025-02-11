import React from 'react';

import Wrapper from '../../../../../components/Wrapper';

const columns = [
  {
    name: 'Empresa',
    selector: 'company',
  },
];

const Main: React.FC = () => {
  console.log(columns);

  return (
    <Wrapper hasSubmitButton={false}>
      <h1>content</h1>
    </Wrapper>
  );
};

export default Main;

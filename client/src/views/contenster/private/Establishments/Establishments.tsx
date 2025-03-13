import React from 'react';
import { useParams } from 'react-router-dom';

import {
  GET_ESTABLISHMENT,
  POST_ESTABLISHMENT,
  PUT_ESTABLISHMENT,
} from '../../../../routes/contenster/establishments';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const Establishments: React.FC = () => {
  const { id, type } = useParams();
  return (
    <Page>
      {(() => {
        switch (type) {
          case 'edit':
            return (
              <Save
                pageType={type}
                saveContentUrl={PUT_ESTABLISHMENT}
                getContentUrl={GET_ESTABLISHMENT((id ?? '').toString())}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={POST_ESTABLISHMENT}
              />
            );
          default:
            return <Main />;
        }
      })()}
    </Page>
  );
};

export default Establishments;

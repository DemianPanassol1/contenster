import React from 'react';
import { useParams } from 'react-router-dom';

import {
  GET_MODULE,
  POST_MODULE,
  PUT_MODULE,
} from '../../../../routes/contenster/modules';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const Modules: React.FC = () => {
  const { id, type } = useParams();

  return (
    <Page>
      {(() => {
        switch (type) {
          case 'edit':
            return (
              <Save
                pageType={type}
                saveContentUrl={PUT_MODULE}
                getContentUrl={GET_MODULE(id as string)}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={POST_MODULE}
              />
            );
          default:
            return <Main />;
        }
      })()}
    </Page>
  );
};

export default Modules;

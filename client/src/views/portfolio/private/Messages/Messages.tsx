import React from 'react';
import { useParams } from 'react-router-dom';

import {
  GET_MESSAGE,
  POST_MESSAGE,
  PUT_MESSAGE,
} from '../../../../routes/portfolio/messages';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const Messages: React.FC = () => {
  const { id, type } = useParams();

  return (
    <Page>
      {(() => {
        switch (type) {
          case 'edit':
            return (
              <Save
                pageType={type}
                saveContentUrl={PUT_MESSAGE}
                getContentUrl={GET_MESSAGE((id ?? '').toString())}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={POST_MESSAGE}
              />
            );
          default:
            return <Main />;
        }
      })()}
    </Page>
  );
};

export default Messages;

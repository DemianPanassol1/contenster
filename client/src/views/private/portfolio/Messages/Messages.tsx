import React from 'react';
import { useParams } from 'react-router-dom';

import routes from '@/routes';

import Main from './Main';
import Save from './Save';
import Page from '@/components/Page';

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
                saveContentUrl={routes.PORTFOLIO.MESSAGES.PUT_MESSAGE}
                getContentUrl={routes.PORTFOLIO.MESSAGES.GET_MESSAGE(
                  (id ?? '').toString()
                )}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={routes.PORTFOLIO.MESSAGES.POST_MESSAGE}
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

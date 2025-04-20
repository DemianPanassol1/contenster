import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import routes from '@/routes';
import { useNavigate } from '@/hooks/router.hook';
import { usePermission, useSession } from '@/hooks/session.hook';

import Main from './Main';
import Save from './Save';
import Page from '@/components/Page';

const Establishments: React.FC = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { id, type } = useParams();
  const permission = usePermission();

  useEffect(() => {
    if (permission.type === 'establishment') {
      navigate('/establishments/edit/' + session?.establishment.id);
    }
  }, []);

  return (
    <Page pageChip={permission.type === 'general'}>
      {permission.type === 'establishment' && <Box sx={{ py: '2rem' }} />}
      {(() => {
        switch (type) {
          case 'edit':
            return (
              <Save
                pageType={type}
                saveContentUrl={
                  routes.CONTENSTER.ESTABLISHMENT.PUT_ESTABLISHMENT
                }
                getContentUrl={routes.CONTENSTER.ESTABLISHMENT.GET_ESTABLISHMENT(
                  (id ?? '').toString()
                )}
                permissionType={permission.type}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={
                  routes.CONTENSTER.ESTABLISHMENT.POST_ESTABLISHMENT
                }
                permissionType={permission.type}
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

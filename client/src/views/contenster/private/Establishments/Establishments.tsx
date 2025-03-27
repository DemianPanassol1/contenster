import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  useNavigate,
  usePermissions,
  useUserSession,
} from '../../../../utils/hooks.util';
import {
  GET_ESTABLISHMENT,
  POST_ESTABLISHMENT,
  PUT_ESTABLISHMENT,
} from '../../../../routes/contenster/establishments';

import Main from './Main';
import Save from './Save';
import Page from '../../../../components/Page';

const Establishments: React.FC = () => {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const session = useUserSession();
  const permission = usePermissions();

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
                saveContentUrl={PUT_ESTABLISHMENT}
                getContentUrl={GET_ESTABLISHMENT((id ?? '').toString())}
                permissionType={permission.type}
              />
            );
          case 'create':
            return (
              <Save
                pageType={type}
                saveContentUrl={POST_ESTABLISHMENT}
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

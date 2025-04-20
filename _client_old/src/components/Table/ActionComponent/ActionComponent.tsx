import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { usePermissions } from '../../../utils/hooks.util';

interface ActionComponentProps {
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  canUpdate?: boolean;
  canDelete?: boolean;
}

const ActionComponent: React.FC<ActionComponentProps> = ({
  onUpdateClick,
  onDeleteClick,
  canUpdate = true,
  canDelete = true,
}) => {
  const { t } = useTranslation(['common']);
  const { canUpdate: canUpdatePerm, canDelete: canDeletePerm } = usePermissions();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {canUpdate && (
        <IconButton
          size="small"
          color="info"
          title={t('common:edit')}
          disabled={!canUpdatePerm}
          onClick={onUpdateClick}
        >
          <EditIcon />
        </IconButton>
      )}

      {canDelete && (
        <IconButton
          size="small"
          color="error"
          title={t('common:delete')}
          disabled={!canDeletePerm}
          onClick={onDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ActionComponent;

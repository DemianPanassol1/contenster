import React from 'react';
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
          title="Editar"
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
          title="Excluir"
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

import React from 'react';
import { Box, Breadcrumbs, Chip } from '@mui/material';

import { useNavigate } from '../../utils/hooks.util';

interface PageChipProps {
  chipLabel?: string | null;
  mainChipLabel?: string | null;
}

const PageChip: React.FC<PageChipProps> = ({
  chipLabel = null,
  mainChipLabel = null,
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: '1rem 0' }}>
      <Breadcrumbs aria-label="breadcrumb">
        {mainChipLabel && (
          <Chip
            label={mainChipLabel}
            onClick={() => navigate(-1)}
          />
        )}
        {mainChipLabel && chipLabel && (
          <Chip
            clickable
            label={chipLabel}
          />
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default PageChip;

import {
  Box,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
  IconButton,
  Skeleton,
  Paper,
} from '@mui/material';
import { useDebounce } from '@uidotdev/usehooks';
import React, { useState, ChangeEvent } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';

import routes from '@/routes';
import strings from '@/strings';

import { usePOST } from '@/hooks/swr.hook';
import { buildReqFilter } from '@/utils/functions.util';

import Icon from '@/components/Icon';

interface IconPickerProps {
  selectedIcon: string;
  setIconValue: (value: string) => void;
}

interface IconListResponse {
  data: Array<{ name: string; path: string }>;
  meta: {
    pageNumber: number;
    pageSize: number;
    totalFiltered: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

const IconPicker: React.FC<IconPickerProps> = ({
  selectedIcon,
  setIconValue,
}) => {
  const [qnt] = useState(12);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 800);

  const requestFilter = buildReqFilter({
    pageSize: qnt,
    pageNumber: page,
    filters: [
      {
        field: 'name',
        value: debouncedSearch,
        disjunctive: false,
        type: 'STRING',
        operation: 'LIKE',
      },
    ],
  });

  const { data, isLoading } = usePOST<IconListResponse>(
    routes.CONTENSTER.GLOBAL.GET_ICON_LIST,
    requestFilter
  );

  const handleSearchTerm = (elem: ChangeEvent<HTMLInputElement>) => {
    setSearch(elem.target.value);
    setPage(1);
  };

  const iconList = data?.data ?? [];
  const iconCount = data?.meta?.totalFiltered ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;
  const currentPage = data?.meta?.pageNumber ?? 1;
  const hasNextPage = data?.meta?.hasNextPage ?? false;

  return (
    <Box
      sx={{
        width: '12rem',
        display: 'flex',
        margin: '0.5rem 0 0',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '2.5rem',
        }}
      >
        <Input
          size="small"
          value={search}
          onChange={handleSearchTerm}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => {
                  if (search) setSearch('');
                  setPage(1);
                }}
                title={search ? 'Limpar filtro' : 'Filtrar'}
              >
                {search ? (
                  <ClearIcon fontSize="small" />
                ) : (
                  <SearchIcon fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
      <Paper
        sx={{
          width: '100%',
          height: '14rem',
        }}
      >
        <Grid
          container
          sx={{
            columns: '3',
            display: 'flex',
          }}
        >
          {isLoading ? (
            Array.from(Array(12).keys()).map((key) => (
              <Skeleton
                key={key}
                variant="rounded"
                sx={{
                  margin: '2px',
                  width: 'calc(4rem - (2 * 3px))',
                  height: 'calc(3.5rem - (2 * 3px))',
                }}
              />
            ))
          ) : iconList.length ? (
            iconList.map((item: { name: string; path: string }) => (
              <Grid key={item.name}>
                <MenuItem
                  title={item.name}
                  selected={selectedIcon === item.path}
                  onClick={() => setIconValue(item.path)}
                  sx={{
                    width: '4rem',
                    display: 'flex',
                    stroke: 'black',
                    height: '3.5rem',
                    justifyContent: 'center',
                  }}
                >
                  <Icon
                    scale={1.1}
                    icon={item.path}
                  />
                </MenuItem>
              </Grid>
            ))
          ) : (
            <Typography
              variant="caption"
              sx={{
                width: '100%',
                display: 'block',
                textAlign: 'center',
                margin: '0.5rem 0 0',
              }}
            >
              {strings.common.noRecords}
            </Typography>
          )}
        </Grid>
      </Paper>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between' }}
      >
        <Typography
          variant="caption"
          sx={{ margin: '0.3rem 0' }}
        >
          {`${currentPage}-${totalPages} de ${iconCount}`}
        </Typography>
        <Stack
          direction="row"
          sx={{
            margin: '0.3rem 0',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            size="small"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            <NavigateBeforeOutlinedIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setPage(currentPage + 1)}
            disabled={!hasNextPage}
          >
            <NavigateNextOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default IconPicker;

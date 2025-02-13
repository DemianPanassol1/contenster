import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Checkbox,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  useTheme,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';
import DataTable, { TableColumn } from 'react-data-table-component';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/ArrowDownward';
import LastPageOutlinedIcon from '@mui/icons-material/LastPageOutlined';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';

import {
  buildReqFilter,
  formatStringToMask,
  parseString,
} from '../../utils/functions.util';
import { useGlobalContext } from '../../contexts/global.context';
import { useNavigate, usePermissions, usePOST } from '../../utils/hooks.util';

import DeleteDialog from './DeleteDialog';
import IconButton from '../IconButton';
import LoadingComponent from './LoadingComponent';
import EmptyRow from './EmptyRow';
import ActionComponent from './ActionComponent';
import Icon from '../Icon';

interface Columns {
  field: string;
  selector: string;
  sortable: boolean;
  searchable: boolean;
  type:
    | 'text'
    | 'date'
    | 'datetime'
    | 'time'
    | 'currency'
    | 'icon'
    | 'checkbox'
    | 'image';
  mask?: string;
  width?: string;
}

interface TableProps {
  urlList: string;
  columns: Columns[];
  urlDelete: string;
  defaultPage?: number;
  defaultPageSize?: number;
  hasFilter?: boolean;
  hasAddButton?: boolean;
  urlRefreshOnDelete?: string | string[] | null;
}

const Table: React.FC<TableProps> = ({
  urlList,
  columns,
  urlDelete,
  defaultPage = 1,
  defaultPageSize = 10,
  hasFilter = true,
  hasAddButton = true,
  urlRefreshOnDelete = null,
}) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const { canCreate } = usePermissions();
  const { handleOnSubmit } = useGlobalContext();

  const [page, setPage] = useState<number>(defaultPage);
  const [qnt, setQnt] = useState<number>(defaultPageSize);
  const [search, setSearch] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ id: number } | null>(null);
  const [contentList, setContentList] = useState<Record<string, unknown>[]>([]);

  const debouncedSearch = useDebounce(search, 800);
  console.log(debouncedSearch);

  const requestFilter = buildReqFilter({
    pageSize: qnt,
    pageNumber: page,
  });

  const { data, isLoading, refresh } = usePOST(urlList, requestFilter, true);

  const handleCloseDialog = () => setDeleteDialog(null);
  const handleOpenDialog = (row: { id: number }) => setDeleteDialog(row);

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(parseString(event.target.value));

  const handleUpdateClick = (row: { id: number }) =>
    navigate(`${location.pathname}/edit/${row?.id}`);

  const handleDeleteClick = (row: { id: number }) => {
    handleOnSubmit({
      type: 'DELETE',
      url: `${urlDelete}?id=${row.id}`,
      message: true,
      onSuccess: () => {
        refresh();

        if (typeof urlRefreshOnDelete === 'string') {
          refresh(urlRefreshOnDelete);
        } else if (Array.isArray(urlRefreshOnDelete)) {
          urlRefreshOnDelete.forEach((url) => refresh(url));
        }
      },
    });
  };

  useEffect(() => {
    if (isLoading) return;
    setContentList(data?.data ?? []);
  }, [data, isLoading]);

  // disable DataTable component errors that cannot be fixed.
  console.error = () => {};
  console.warn = () => {};
  return (
    <>
      <DeleteDialog
        open={deleteDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteClick}
      />
      <Box
        sx={{
          display: 'flex',
          margin: '0 0 1rem',
          height: '2.625rem',
          alignItems: 'flex-end',
        }}
      >
        {hasFilter && (
          <FormControl
            variant="standard"
            sx={{ margin: '0 0.5rem 0 0' }}
          >
            <InputLabel htmlFor="table-filter">Filtrar</InputLabel>
            <Input
              size="small"
              value={search}
              id="table-filter"
              onChange={handleSearchTerm}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => search && setSearch('')}
                    tippy={search ? 'Limpar filtro' : 'Filtrar'}
                    icon={
                      search ? (
                        <ClearIcon fontSize="small" />
                      ) : (
                        <SearchIcon fontSize="small" />
                      )
                    }
                    customStyles={{ margin: '0 0 0.2rem' }}
                  />
                </InputAdornment>
              }
            />
          </FormControl>
        )}
        <Box sx={{ flex: 1 }} />
        {hasAddButton && canCreate && (
          <IconButton
            disabled={!canCreate}
            tippy="Criar registro"
            icon={<AddIcon fontSize="small" />}
            customStyles={{
              color: theme.palette.common.white,
              backgroundColor: theme.palette.primary.main,
              ':hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={() => navigate(`${location.pathname}/create`)}
          />
        )}
      </Box>
      <Paper variant="outlined">
        <DataTable
          striped
          pagination
          pointerOnHover
          highlightOnHover
          persistTableHead
          paginationServer
          data={contentList}
          paginationPerPage={5}
          progressPending={isLoading}
          noDataComponent={<EmptyRow />}
          onChangePage={(page) => setPage(page)}
          progressComponent={<LoadingComponent />}
          sortIcon={<IconButton icon={<SortIcon />} />}
          paginationRowsPerPageOptions={[5, 10, 25, 50]}
          paginationIconLastPage={<LastPageOutlinedIcon />}
          paginationIconNext={<NavigateNextOutlinedIcon />}
          paginationTotalRows={data?.meta?.totalItems ?? 0}
          onChangeRowsPerPage={(pageQnt) => setQnt(pageQnt)}
          paginationIconFirstPage={<FirstPageOutlinedIcon />}
          paginationIconPrevious={<NavigateBeforeOutlinedIcon />}
          onRowClicked={(row: unknown) => handleUpdateClick(row as { id: number })}
          paginationComponentOptions={{
            rowsPerPageText: 'Linhas por página',
            selectAllRowsItemText: 'Todos',
            rangeSeparatorText: 'de',
          }}
          columns={
            [
              columns.map(({ field, selector, sortable, type, mask, width }) => {
                switch (type) {
                  case 'checkbox':
                    return {
                      name: field,
                      selector: (row: Record<string, unknown>) => row[selector],
                      sortable: sortable,
                      maxWidth: width ?? '64px',
                      cell: (row: { [key: string]: any }) => (
                        <Checkbox
                          disabled
                          size="small"
                          checked={row[selector] as boolean}
                        />
                      ),
                    };
                  case 'icon':
                    return {
                      name: field,
                      selector: (row: Record<string, unknown>) => row[selector],
                      sortable: sortable,
                      maxWidth: width ?? '64px',
                      cell: (row: { icon: string }) => (
                        <Box sx={{ stroke: 'black' }}>
                          <Icon icon={row.icon} />
                        </Box>
                      ),
                    };
                  case 'image':
                    return {
                      name: field,
                      selector: (row: Record<string, unknown>) => row[selector],
                      sortable: sortable,
                      maxWidth: width ?? '125px',
                      cell: (row: { name: string; image: string }) => (
                        <Avatar
                          alt={row.name}
                          src={row.image}
                          title=""
                        />
                      ),
                    };
                  default:
                    return {
                      name: field,
                      selector: (row: Record<string, unknown>) =>
                        formatStringToMask(row[selector] as string, mask as string),
                      sortable: sortable,
                      maxWidth: width,
                    };
                }
              }),
              {
                center: true,
                name: 'Ações',
                maxWidth: '100px',
                cell: (row: { id: number }) => (
                  <ActionComponent
                    onUpdateClick={() => handleUpdateClick(row)}
                    onDeleteClick={() => handleOpenDialog(row)}
                  />
                ),
              },
            ].flat() as TableColumn<unknown>[]
          }
          // onSort={(column, sortDirection) => { }}
        />
      </Paper>
    </>
  );
};

export default Table;

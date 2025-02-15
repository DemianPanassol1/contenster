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
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/ArrowDownward';
import LastPageOutlinedIcon from '@mui/icons-material/LastPageOutlined';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';

import { useGlobalContext } from '../../contexts/global.context';
import { useNavigate, usePermissions, usePOST } from '../../utils/hooks.util';
import { buildReqFilter, formatStringToMask } from '../../utils/functions.util';

import Icon from '../Icon';
import EmptyRow from './EmptyRow';
import IconButton from '../IconButton';
import DeleteDialog from './DeleteDialog';
import ActionComponent from './ActionComponent';
import LoadingComponent from './LoadingComponent';

interface Columns {
  name: string;
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
  bodyContent?: Record<string, string>;
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
  bodyContent = {},
}) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const { canCreate } = usePermissions();
  const { handleOnSubmit } = useGlobalContext();
  const { t, i18n } = useTranslation(['common', 'validations']);

  const [page, setPage] = useState<number>(defaultPage);
  const [qnt, setQnt] = useState<number>(defaultPageSize);
  const [search, setSearch] = useState<string | null>(null);
  const [orderList, setOrderList] = useState<SortBy[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<{ id: number } | null>(null);
  const [contentList, setContentList] = useState<Record<string, unknown>[]>([]);

  const debouncedSearch = useDebounce(search, 800);

  const requestFilter = buildReqFilter({
    pageSize: qnt,
    pageNumber: page,
    customFields: bodyContent,
    filters: columns
      .filter((col) => col.searchable)
      .map((col, index) => ({
        field: col.selector,
        operation: 'LIKE',
        type: 'STRING',
        value: (col.mask
          ? debouncedSearch?.replace(/[^a-zA-Z0-9]/g, '')
          : debouncedSearch) as string,
        disjunctive: index !== 0,
      }))
      .filter((item) => item.value) as Filter[],
    sortBy: orderList,
  });

  const { data, isLoading, refresh } = usePOST(urlList, requestFilter, true);

  const handleCloseDialog = () => setDeleteDialog(null);
  const handleOpenDialog = (row: { id: number }) => setDeleteDialog(row);

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

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
            <InputLabel
              shrink={!!search}
              htmlFor="table-filter"
            >
              {t('common:filter')}
            </InputLabel>
            <Input
              size="small"
              value={search ?? ''}
              id="table-filter"
              onChange={handleSearchTerm}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setSearch(null)}
                    tippy={t(search ? 'common:clearFilter' : 'common:filter')}
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
            tippy={t('common:createRecord')}
            icon={<AddIcon fontSize="small" />}
            customStyles={{
              color: theme.palette.common.white,
              backgroundColor: theme.palette.info.main,
              ':hover': {
                backgroundColor: theme.palette.info.dark,
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
          paginationPerPage={10}
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
            rowsPerPageText: t('common:rowsPerPage'),
            selectAllRowsItemText: t('common:all'),
            rangeSeparatorText: t('common:of'),
          }}
          columns={
            [
              columns.map(({ name, field, sortable, type, mask, width }) => {
                switch (type) {
                  case 'checkbox':
                    return {
                      name: name,
                      selector: (row: Record<string, unknown>) => row[field],
                      sortable: sortable,
                      maxWidth: width ?? '64px',
                      cell: (row: { [key: string]: unknown }) => (
                        <Checkbox
                          disabled
                          size="small"
                          checked={row[field] as boolean}
                        />
                      ),
                    };
                  case 'icon':
                    return {
                      name: name,
                      selector: (row: Record<string, unknown>) => row[field],
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
                      name: name,
                      selector: (row: Record<string, unknown>) => row[field],
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
                  case 'datetime':
                    return {
                      name: name,
                      selector: (row: Record<string, unknown>) =>
                        new Date(row[field] as string).toLocaleString(i18n.language),
                      sortable: sortable,
                      maxWidth: width,
                    };
                  case 'date':
                    return {
                      name: name,
                      selector: (row: Record<string, unknown>) =>
                        new Date(row[field] as string).toLocaleDateString(i18n.language, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }),
                      sortable: sortable,
                      maxWidth: width,
                    };
                  case 'time':
                    return {
                      name: name,
                      selector: (row: Record<string, unknown>) =>
                        new Date(row[field] as string).toLocaleTimeString(i18n.language, {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        }),
                      sortable: sortable,
                      maxWidth: width,
                    };
                  default:
                    return {
                      name: name,
                      selector: (row: Record<string, unknown>) =>
                        formatStringToMask(row[field] as string, mask as string),
                      sortable: sortable,
                      maxWidth: width,
                    };
                }
              }),
              {
                center: true,
                name: t('common:actions'),
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
          sortServer
          onSort={(column, sortDirection) => {
            const item = columns.find((col) => col.name === column.name);

            if (item && item.sortable) {
              setOrderList([
                {
                  field: item.selector,
                  order: sortDirection.toUpperCase() as SortBy['order'],
                },
              ]);
            } else {
              setOrderList([]);
            }
          }}
        />
      </Paper>
    </>
  );
};

export default Table;

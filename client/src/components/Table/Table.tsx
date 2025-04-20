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

import config from '@config';
import { useGlobalContext } from '@/contexts/global.context';
import { buildReqFilter, formatStringToMask } from '@/utils/functions.util';

import Icon from '@/components/Icon';
import IconButton from '@/components/IconButton';

import EmptyRow from './EmptyRow';
import DeleteDialog from './DeleteDialog';
import ActionComponent from './ActionComponent';
import LoadingComponent from './LoadingComponent';
import { useNavigate } from '@/hooks/router.hook';
import { usePermission } from '@/hooks/session.hook';
import { usePOST } from '@/hooks/swr.hook';
import strings from '@/strings';

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

  const { canCreate } = usePermission();
  const { handleOnSubmit } = useGlobalContext();

  const [page, setPage] = useState<number>(defaultPage);
  const [qnt, setQnt] = useState<number>(defaultPageSize);
  const [search, setSearch] = useState<string | null>(null);
  const [orderList, setOrderList] = useState<SortBy[]>([]);
  const [contentList, setContentList] = useState<DataTable['data']>([]);
  const [deleteDialog, setDeleteDialog] = useState<{ id: number } | null>(null);

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

  const { data, isLoading, refresh } = usePOST<DataTable>(
    urlList,
    requestFilter,
    true
  );

  const handleCloseDialog = () => setDeleteDialog(null);
  const handleOpenDialog = (row: { id: number }) => setDeleteDialog(row);

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  const handleUpdateClick = (row: { id: number }) =>
    navigate(`${location.pathname}/edit/${row?.id}`);

  const handleDeleteClick = (row: { id: number }) => {
    handleOnSubmit({
      type: 'DELETE',
      endpoint: `${urlDelete}?id=${row.id}`,
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
              {strings.actions.filter}
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
                    tippy={
                      search
                        ? strings.actions.clearFilter
                        : strings.actions.filter
                    }
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
            tippy={strings.actions.createRecord}
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
          paginationPerPage={defaultPageSize}
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
          onRowClicked={(row: unknown) =>
            handleUpdateClick(row as { id: number })
          }
          paginationComponentOptions={{
            rowsPerPageText: strings.common.rowsPerPage,
            selectAllRowsItemText: strings.common.all,
            rangeSeparatorText: strings.common.of,
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
                      selector: (row: Record<string, unknown>) => {
                        if (!row[field]) {
                          return '-';
                        }
                        return new Date(row[field] as string).toLocaleString(
                          config.DEFAULT_LANGUAGE
                        );
                      },
                      sortable: sortable,
                      maxWidth: width,
                    };
                  case 'date':
                    return {
                      name: name,
                      selector: (row: Record<string, unknown>) => {
                        if (!row[field]) {
                          return '-';
                        }

                        return new Date(
                          row[field] as string
                        ).toLocaleDateString(config.DEFAULT_LANGUAGE, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        });
                      },
                      sortable: sortable,
                      maxWidth: width,
                    };
                  case 'time':
                    return {
                      name: name,
                      selector: (row: Record<string, unknown>) => {
                        if (!row[field]) {
                          return '-';
                        }

                        return new Date(
                          row[field] as string
                        ).toLocaleTimeString(config.DEFAULT_LANGUAGE, {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        });
                      },
                      sortable: sortable,
                      maxWidth: width,
                    };
                  default:
                    return {
                      name: name,
                      selector: (row: Record<string, unknown>) =>
                        formatStringToMask(
                          row[field] as string,
                          mask as string
                        ),
                      sortable: sortable,
                      maxWidth: width,
                    };
                }
              }),
              {
                center: true,
                name: strings.actions.actions,
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

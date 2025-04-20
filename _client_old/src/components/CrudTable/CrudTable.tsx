/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Control,
  FieldValues,
  useForm,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {
  Box,
  SxProps,
  Theme,
  useTheme,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Checkbox as CheckboxComponent,
  Paper,
  Avatar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
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

import {
  filterDataByField,
  formatStringToMask,
  generateUniqueId,
} from '../../utils/functions.util';

import EditDialog from './EditDialog';
import IconButton from '../IconButton';
import SectionTitle from '../SectionTitle';
import ActionComponent from '../Table/ActionComponent';
import Icon from '../Icon';
import EmptyRow from './EmptyRow';

interface Fields {
  name: string;
  label: string;
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'autocomplete'
    | 'checkbox'
    | 'textArea'
    | 'switch';
  mask: string;
  content: string;
  bodyContent: Record<string, unknown>;
  style: SxProps<Theme>;
  validation: Record<string, unknown>;
  unique: boolean;
}

interface Column {
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

interface CrudTableProps {
  title?: string;
  listName: string;
  deleteListName: string;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  controller: Control<FieldValues>;
  readOnly?: boolean;
  canCreate?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  containerStyle?: SxProps<Theme>;
  fields: Fields[];
  columns: Column[];
}

interface ContentItem {
  tempId: string;
  [key: string]: any;
}

const CrudTable: React.FC<CrudTableProps> = ({
  listName,
  deleteListName,
  watch,
  setValue,
  controller,
  fields,
  columns,
  title = null,
  readOnly = false,
  canCreate = true,
  canUpdate = true,
  canDelete = true,
  containerStyle = {},
}) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation(['common', 'validations']);

  const defaultValues = (() => {
    const initialValues = {
      id: '',
      tempId: '',
    };

    fields.forEach(({ name }) => {
      const [first, second] = name.split('.');
      let nestedValue: any = '';

      if (second) {
        nestedValue = { [second]: '' };
      }

      Object.assign(initialValues, { [first]: nestedValue });
    });

    return initialValues;
  })();

  const {
    reset,
    control,
    setError,
    handleSubmit,
    watch: watchForm,
    setValue: setValueForm,
    formState: { errors },
  } = useForm({ defaultValues });

  const [search, setSearch] = useState<string | null>(null);
  const [content, setContent] = useState<Record<string, unknown> | null | boolean>(null);
  const [contentList, setContentList] = useState<ContentItem[]>([]);

  const debouncedSearch = useDebounce(search, 800);

  const handleClose = () => setContent(null);
  const handleSearchTerm = (elem: any) => setSearch(elem.target.value);
  const handleOpen = (row?: any) => setContent(row?.target ? true : row);

  const onSubmit = (content: ContentItem) => {
    if (!content.tempId) Object.assign(content, { tempId: generateUniqueId() });

    fields.forEach(({ name }) => {
      const [first, second] = name.split('.');

      if (second) {
        Object.assign(content, {
          [first]: {
            id: content[first][second],
            [second]:
              (document.querySelector(`[name="${name}"]`) as HTMLInputElement)?.value ??
              '',
          },
        });
      }
    });

    const uniqueFields = fields.filter((e) => e.unique).map((i) => i.name);

    const contentListFiltered = contentList.filter((i) => i.tempId !== content.tempId);

    let error = false;

    uniqueFields.forEach((field) => {
      const [first, second] = field.split('.');
      const compareValue = second ? content[first][second] : content[first];

      contentListFiltered.forEach((contentItem) => {
        const fieldValue = second ? contentItem[first][second] : contentItem[first];

        if (fieldValue === compareValue) {
          setError(field as any, {
            type: 'custom',
            message: t('common:duplicateRecordError'),
          });
          error = true;
        }
      });
    });

    if (error) return;

    const index = watch(listName).findIndex(
      (elem: ContentItem) => elem.tempId === content.tempId
    );

    if (index !== -1) {
      const updatedList = [...watch(listName)];
      updatedList[index] = content;
      setValue(listName, updatedList);
    } else {
      setValue(listName, [...watch(listName), content]);
    }

    handleClose();
  };

  const handleDeleteClick = (row: ContentItem) => {
    const item = watch(listName).find((elem: ContentItem) => elem.tempId === row.tempId);
    const filteredList = watch(listName).filter(
      (i: ContentItem) => i.tempId !== row.tempId
    );

    setValue(listName, filteredList);
    setValue(deleteListName, [...watch(deleteListName), item]);
  };

  const generateErrorMessage = (name: string, error: Record<string, any>) => {
    const [first, second] = name.split('.');

    if (second) {
      return error[first]?.[second]?.message;
    }

    return error[first]?.message;
  };

  useEffect(() => {
    console.log(watchForm());
  }, []);

  useEffect(() => {
    console.log(watch(listName));
    console.log(watch(deleteListName));

    // setContentList(
    //   watch(listName).map((item: ContentItem) =>
    //     Object.assign(item, { tempId: generateUniqueId() })
    //   )
    // );
  }, [watch(listName), watch(deleteListName)]);

  useEffect(() => {
    // reset();
    // if (!content || typeof content === 'boolean') return;
    // const item: any = contentList.find((item) => item.tempId === content.tempId);
    // setValueForm('id', item.id);
    // setValueForm('tempId', item.tempId);
    // Object.keys(item).forEach((field) => {
    //   fields.forEach(({ name }) => {
    //     const [first, second]: any = name.split('.');
    //     if (second && field === first) {
    //       setValueForm(first, { [second]: item[first].id }, { shouldValidate: true });
    //     } else if (field === first) {
    //       setValueForm(first, item[first], { shouldValidate: true });
    //     }
    //   });
    // });
  }, [content]);

  useEffect(() => {
    // setContentList(
    //   filterDataByField(
    //     watch(listName),
    //     columns.map((c) => c.selector),
    //     debouncedSearch as string
    //   )
    // );
  }, [debouncedSearch]);

  // disable DataTable component errors that cannot be fixed.
  console.error = () => {};
  console.warn = () => {};

  return (
    <>
      {title && <SectionTitle title={title} />}
      <EditDialog
        open={!!content}
        readOnly={readOnly}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>content</h2>
      </EditDialog>
      <Box
        sx={{
          display: 'flex',
          margin: '1rem 0',
          height: '2.625rem',
          alignItems: 'flex-end',
          ...containerStyle,
        }}
      >
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
        <Box sx={{ flex: 1 }} />
        {canCreate && (
          <IconButton
            onClick={handleOpen}
            tippy={t('common:createRecord')}
            icon={<AddIcon fontSize="small" />}
            customStyles={{
              color: theme.palette.common.white,
              backgroundColor: theme.palette.info.main,
              ':hover': {
                backgroundColor: theme.palette.info.dark,
              },
            }}
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
          data={contentList}
          paginationPerPage={5}
          noDataComponent={<EmptyRow />}
          sortIcon={<IconButton icon={<SortIcon />} />}
          paginationRowsPerPageOptions={[5, 10, 25, 50]}
          paginationIconLastPage={<LastPageOutlinedIcon />}
          paginationIconNext={<NavigateNextOutlinedIcon />}
          paginationTotalRows={(controller._formValues[listName] ?? []).length}
          paginationIconFirstPage={<FirstPageOutlinedIcon />}
          paginationIconPrevious={<NavigateBeforeOutlinedIcon />}
          onRowClicked={(row) => handleOpen(row)}
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
                        <CheckboxComponent
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
                    canUpdate={canUpdate}
                    canDelete={canDelete}
                    onUpdateClick={() => handleOpen(row)}
                    onDeleteClick={() => handleDeleteClick(row as unknown as ContentItem)}
                  />
                ),
              },
            ].flat() as TableColumn<unknown>[]
          }
        />
      </Paper>
    </>
  );
};

export default CrudTable;

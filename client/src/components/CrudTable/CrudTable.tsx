import { useTheme } from '@mui/material';
import { useDebounce } from '@uidotdev/usehooks';
import React, { useEffect, useState } from 'react';
import {
  Control,
  FieldValues,
  useForm,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { filterDataByField, generateUniqueId } from '../../utils/functions.util';

interface ExtendedCSSProperties extends React.CSSProperties {
  [key: string]: unknown;
}

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
  style: ExtendedCSSProperties;
  validation: Record<string, unknown>;
  unique: boolean;
}

interface Column {
  name: string;
  selector: string;
}

interface CrudTableProps {
  title: string;
  listName: string;
  deleteListName: string;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  controller: Control<FieldValues>;
  readOnly?: boolean;
  canCreate?: boolean;
  canRead?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  containerStyle?: ExtendedCSSProperties;
  fields: Fields[];
  columns: Column[];
}

interface ContentItem {
  tempId: string;
  [key: string]: any;
}

const CrudTable: React.FC<CrudTableProps> = ({
  title,
  listName,
  deleteListName,
  watch,
  setValue,
  controller,
  fields,
  columns,
  readOnly = false,
  canCreate = true,
  canRead = true,
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
  const handleOpen = (row: any) => setContent(row?.target ? true : row);

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
            message: 'Já existe um registro com esse valor',
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
    setContentList(
      watch(listName).map((item: ContentItem) =>
        Object.assign(item, { tempId: generateUniqueId() })
      )
    );
  }, [watch(listName), watch(deleteListName)]);

  useEffect(() => {
    setContentList(
      filterDataByField(
        watch(listName),
        columns.map((c) => c.selector),
        debouncedSearch as string
      )
    );
  }, [debouncedSearch]);

  // disable DataTable component errors that cannot be fixed.
  console.error = () => {};
  console.warn = () => {};

  return (
    <div>
      <h1>Crud Table</h1>
      {/* Add your table and CRUD operations here */}
    </div>
  );
};

export default CrudTable;

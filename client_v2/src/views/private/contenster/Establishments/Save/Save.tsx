import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { emailValidation, genericValidation } from '@/utils/validations.util';
import { useGlobalContext } from '@/contexts/global.context';
import { handlePopulateFields } from '@/utils/functions.util';

import Input from '@/components/Input';
import Select from '@/components/Select';
import Wrapper from '@/components/Wrapper';
import FileUpload from '@/components/FileUpload';

interface FormFields {
  id: string;
  corporateName: string;
  fantasyName: string;
  address: string;
  addressNumber: string;
  zipCode: string;
  district: string;
  document: string;
  documentType: Establishment['documentType'];
  phone1: string;
  phone2: string;
  email: string;
  imageId: string;
}

const fields: FormFields = {
  id: '',
  corporateName: '',
  fantasyName: '',
  address: '',
  addressNumber: '',
  zipCode: '',
  district: '',
  document: '',
  documentType: 'cnpj',
  phone1: '',
  phone2: '',
  email: '',
  imageId: '',
};

interface SaveProps {
  pageType: 'create' | 'edit';
  saveContentUrl: string;
  getContentUrl?: string | null;
  permissionType: Permission['type'];
}

const Save: React.FC<SaveProps> = ({
  pageType,
  saveContentUrl,
  permissionType,
  getContentUrl = null,
}) => {
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ defaultValues: fields });

  const theme = useTheme();
  const navigate = useNavigate();
  const { handleOnSubmit } = useGlobalContext();
  const { t } = useTranslation(['common', 'validations']);
  const { data, isLoading, refresh } = useGET(getContentUrl as string);

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    handleOnSubmit({
      type: pageType === 'create' ? 'POST' : 'PUT',
      url: saveContentUrl,
      body: content,
      onSuccess() {
        if (getContentUrl) {
          refresh();
        }

        refresh(GET_MODULES_LIST);
        refresh(GET_SYNC_USER);

        setTimeout(() => navigate(-1), 500);
      },
    });
  };

  useEffect(() => {
    if (getContentUrl && !isLoading && data) {
      handlePopulateFields(setValue, fields, data);
    }
  }, [isLoading, data]);

  return (
    <Wrapper
      hasCancelButton={permissionType === 'general'}
      onCancel={() => navigate(-1)}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonContent={t('common:save')}
      cancelButtonContent={t('common:cancel')}
    >
      <Box
        sx={{
          display: 'grid',
          gap: '1.5rem 2rem',
          margin: '0 0 2rem',
          gridTemplateColumns: '1fr',
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr',
          },
          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: '1fr 1fr 1fr',
          },
        }}
      >
        <Input
          name="corporateName"
          label={t('validations:corporateName.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation(t)}
          helperText={errors.corporateName?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="fantasyName"
          label={t('validations:fantasyName.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation(t)}
          helperText={errors.fantasyName?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="email"
          label={t('validations:email.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={emailValidation(t)}
          helperText={errors.email?.message}
          containerStyle={{ margin: '0' }}
        />
        <Select
          name="documentType"
          label={t('validations:documentType.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation(t)}
          fixedData={[
            { label: 'CNPJ', value: 'cnpj' },
            { label: 'CPF', value: 'cpf' },
          ]}
          inputStyle={{ margin: '0' }}
        />
        <Input
          name="document"
          label={t('validations:document.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          mask={
            watch('documentType') === 'cnpj'
              ? '##.###.###/####-##'
              : '###.###.###-##'
          }
          validation={genericValidation(t)}
          helperText={errors.document?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="address"
          label={t('validations:address.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation(t)}
          helperText={errors.address?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="addressNumber"
          label={t('validations:addressNumber.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation(t)}
          helperText={errors.addressNumber?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="zipCode"
          label={t('validations:zipCode.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          mask="#####-###"
          validation={genericValidation(t)}
          helperText={errors.zipCode?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="district"
          label={t('validations:district.field') + ' *'}
          controller={control as unknown as Control<FieldValues>}
          validation={genericValidation(t)}
          helperText={errors.district?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="phone1"
          label={t('validations:phone.field') + ' 1 *'}
          controller={control as unknown as Control<FieldValues>}
          mask="+## (##) #####-####"
          validation={genericValidation(t)}
          helperText={errors.phone1?.message}
          containerStyle={{ margin: '0' }}
        />
        <Input
          name="phone2"
          label={t('validations:phone.field') + ' 2'}
          controller={control as unknown as Control<FieldValues>}
          mask="+## (##) #####-####"
          helperText={errors.phone2?.message}
          containerStyle={{ margin: '0' }}
        />
      </Box>
      <FileUpload
        fileId={watch('imageId')}
        label={t('common:image')}
        onImageUpload={(fileId) => setValue('imageId', fileId)}
      />
    </Wrapper>
  );
};

export default Save;

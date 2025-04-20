import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import routes from '@/routes';
import strings from '@/strings';
import { useGET } from '@/hooks/swr.hook';
import { useNavigate } from '@/hooks/router.hook';
import { useGlobalContext } from '@/contexts/global.context';
import { handlePopulateFields } from '@/utils/functions.util';
import {
  emailValidation,
  genericValidation,
  phoneValidation,
} from '@/utils/validations.util';

import Input from '@/components/Input';
import Wrapper from '@/components/Wrapper';
import FileUpload from '@/components/FileUpload';

type DocumentType = 'cnpj' | 'cpf';

interface FormFields {
  id: string;
  corporateName: string;
  fantasyName: string;
  address: string;
  addressNumber: string;
  zipCode: string;
  district: string;
  document: string;
  documentType: DocumentType;
  phone1: string;
  phone2: string;
  email: string;
  imageId: string;
}

interface SaveProps {
  pageType: 'create' | 'edit';
  saveContentUrl: string;
  permissionType: Permission['type'];
  getContentUrl?: string | null;
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

const Save: React.FC<SaveProps> = ({
  pageType,
  saveContentUrl,
  permissionType,
  getContentUrl = null,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { handleOnSubmit } = useGlobalContext();
  const { watch, control, setValue, handleSubmit } = useForm({
    defaultValues: fields,
  });
  const { data, isLoading, refresh } = useGET(getContentUrl ?? '');

  const onSubmit: SubmitHandler<FormFields> = (content) => {
    handleOnSubmit({
      type: pageType === 'create' ? 'POST' : 'PUT',
      endpoint: saveContentUrl,
      body: content,
      onSuccess() {
        if (getContentUrl) {
          refresh();
        }

        refresh(routes.CONTENSTER.GLOBAL.GET_MODULES_LIST);
        refresh(routes.CONTENSTER.GLOBAL.GET_SYNC_USER);

        if (permissionType === 'general') {
          setTimeout(() => navigate(-1), 500);
        }
      },
    });
  };

  useEffect(() => {
    if (getContentUrl && !isLoading && data) {
      handlePopulateFields(
        setValue,
        fields as unknown as Record<string, unknown>,
        data as unknown as Record<string, unknown>
      );
    }
  }, [isLoading, data]);

  return (
    <Wrapper
      hasCancelButton={permissionType === 'general'}
      onCancel={() => navigate(-1)}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonContent={strings.actions.save}
      cancelButtonContent={strings.actions.cancel}
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
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
          label={strings.validations.corporateName.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
        />
        <Input
          name="fantasyName"
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
          label={strings.validations.fantasyName.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
        />
        <Input
          name="email"
          validation={emailValidation()}
          containerStyle={{ margin: '0' }}
          label={strings.validations.email.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
        />
        <Input
          name="document"
          mask="##.###.###/####-##"
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
          label={strings.validations.document.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
        />
        <Input
          name="address"
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
          label={strings.validations.address.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
        />
        <Input
          name="addressNumber"
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
          label={strings.validations.addressNumber.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
        />
        <Input
          name="zipCode"
          mask="#####-###"
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
          label={strings.validations.zipCode.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
        />
        <Input
          name="district"
          validation={genericValidation()}
          containerStyle={{ margin: '0' }}
          label={strings.validations.district.field + ' *'}
          controller={control as unknown as Control<FieldValues>}
        />
        <Input
          name="phone1"
          mask="(##) #####-####"
          validation={phoneValidation()}
          containerStyle={{ margin: '0' }}
          label={strings.validations.phone.field + ' 1 *'}
          controller={control as unknown as Control<FieldValues>}
        />
        <Input
          name="phone2"
          mask="(##) #####-####"
          validation={phoneValidation(false)}
          containerStyle={{ margin: '0' }}
          label={strings.validations.phone.field + ' 2'}
          controller={control as unknown as Control<FieldValues>}
        />
      </Box>
      <FileUpload
        fileId={watch('imageId')}
        label={strings.common.image}
        onImageUpload={(fileId) => setValue('imageId', fileId)}
      />
    </Wrapper>
  );
};

export default Save;
